// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Heading,
//   useToast,
// } from "@chakra-ui/react";
// import { api } from "~/utils/api";

// const BookingUploadForm: React.FC = () => {
//   const [bookingId, setBookingId] = useState<string | null>(null); // Store bookingId
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const toast = useToast();

//   // Create booking mutation
//   const createBookingMutation = api.booking.createBooking.useMutation({
//     onSuccess: (data) => {
//       setBookingId(data.bookingId); // Store the bookingId
//       toast({
//         title: "Booking created",
//         description: `Booking ID: ${data.bookingId}`,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error creating booking",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//   });

//   // Upload ticket mutation
//   const uploadBookingMutation = api.booking.uploadBookingForm.useMutation({
//     onSuccess: (data) => {
//       toast({
//         title: "Ticket uploaded",
//         description: `Ticket ID: ${data.id}`,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       uploadFile(data.uploadUrl); // Upload the file to the presigned URL
//     },
//     onError: (error) => {
//       toast({
//         title: "Error uploading ticket",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//   });

//   const uploadFile = async (uploadUrl: string) => {
//     if (!file) {
//       toast({
//         title: "Error",
//         description: "No file selected",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//       return;
//     }

//     try {
//       const response = await fetch(uploadUrl, {
//         method: "PUT",
//         body: file,
//         headers: {
//           "Content-Type": "application/pdf",
//         },
//       });

//       if (response.ok) {
//         toast({
//           title: "File uploaded successfully",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//         });
//       } else {
//         throw new Error("File upload failed");
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "File upload failed",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       setError("No file selected");
//       return;
//     }
//     setError(null); // Clear any previous errors

//     try {
//       let currentBookingId = bookingId;

//       // If no bookingId exists, create a new booking
//       if (!currentBookingId) {
//         const newBooking = await createBookingMutation.mutateAsync();
//         currentBookingId = newBooking.bookingId;
//         setBookingId(currentBookingId); // Store the new bookingId
//       }

//       // Upload the ticket details linked to the booking
//       uploadBookingMutation.mutate({
//         bookingId: currentBookingId, // Use the booking ID here
//         ticketOwnerDetails: {
//           memberName: name,
//           memberEmail: email,
//           memberPhone: phone,
//           fileName: file.name,
//         },
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create booking or upload ticket.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   return (
//     <Box maxWidth="500px" margin="auto" mt={8}>
//       <Heading mb={6}>Booking Upload</Heading>
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={4}>
//           <FormControl isRequired>
//             <FormLabel>Name</FormLabel>
//             <Input value={name} onChange={(e) => setName(e.target.value)} />
//           </FormControl>
//           <FormControl isRequired>
//             <FormLabel>Email</FormLabel>
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </FormControl>
//           <FormControl isRequired>
//             <FormLabel>Phone</FormLabel>
//             <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
//           </FormControl>
//           <FormControl isRequired>
//             <FormLabel>Aadhar Card (PDF)</FormLabel>
//             <Input type="file" accept=".pdf" onChange={handleFileChange} />
//           </FormControl>
//           <Button
//             type="submit"
//             colorScheme="blue"
//             isLoading={
//               uploadBookingMutation.status === "pending" ||
//               createBookingMutation.status === "pending"
//             }
//             loadingText="Submitting"
//           >
//             Submit
//           </Button>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default BookingUploadForm;

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Heading,
//   useToast,
//   HStack,
//   Text,
//   IconButton,
// } from "@chakra-ui/react";
// import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
// import { api } from "~/utils/api";

// interface Member {
//   name: string;
//   email: string;
//   phone: string;
//   file: File | null;
// }

// const BookingUploadForm: React.FC = () => {
//   const [bookingId, setBookingId] = useState<string | null>(null);
//   const [members, setMembers] = useState<Member[]>([
//     { name: "", email: "", phone: "", file: null },
//   ]);
//   const [error, setError] = useState<string | null>(null);
//   const toast = useToast();

//   const createBookingMutation = api.booking.createBooking.useMutation({
//     onSuccess: (data) => {
//       setBookingId(data.bookingId);
//       toast({
//         title: "Booking created",
//         description: `Booking ID: ${data.bookingId}`,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error creating booking",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//   });

//   const uploadBookingMutation = api.booking.uploadBookingForm.useMutation({
//     onSuccess: (data, variables) => {
//       toast({
//         title: "Ticket uploaded",
//         description: `Ticket ID: ${data.id}`,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       void uploadFile(data.uploadUrl, data.id);
//     },
//     onError: (error) => {
//       toast({
//         title: "Error uploading ticket",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//   });

//   const addMember = () => {
//     if (members.length < 4) {
//       setMembers([...members, { name: "", email: "", phone: "", file: null }]);
//     } else {
//       toast({
//         title: "Member limit reached",
//         description: "You can add up to 4 members only.",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const deleteMember = (index: number) => {
//     if (members.length > 1) {
//       setMembers(members.filter((_, idx) => idx !== index));
//     } else {
//       toast({
//         title: "Cannot delete",
//         description: "At least one member is required for booking.",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const updateMember = (
//     index: number,
//     field: string,
//     value: string | File | null
//   ) => {
//     const updatedMembers = members.map((member, idx) =>
//       idx === index ? { ...member, [field]: value } : member
//     );
//     setMembers(updatedMembers);
//     console.log("Updated members:", updatedMembers); // Debug log
//   };

//   const uploadFile = async (uploadUrl: string, ticketId: string) => {
//     try {
//       const response = await fetch(uploadUrl, {
//         method: "PUT",
//         body: members.find(
//           (member) => member.file?.name === uploadUrl.split("/").pop()
//         )?.file,
//         headers: {
//           "Content-Type": file.type,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("File upload failed");
//       }

//       toast({
//         title: "File uploaded successfully",
//         description: `Aadhar card uploaded for Ticket ID: ${ticketId}`,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "File upload failed",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (members.some((member) => !member.file)) {
//       setError("Please upload Aadhar Card for all members");
//       return;
//     }
//     setError(null);

//     try {
//       let currentBookingId = bookingId;

//       if (!currentBookingId) {
//         const newBooking = await createBookingMutation.mutateAsync({
//           transactionId: undefined,
//         });
//         currentBookingId = newBooking.bookingId;
//         setBookingId(currentBookingId);
//       }

//       // Upload ticket for each member
//       for (const member of members) {
//         await uploadBookingMutation.mutateAsync({
//           bookingId: currentBookingId,
//           ticketOwnerDetails: {
//             memberName: member.name,
//             memberEmail: member.email,
//             memberPhone: member.phone,
//             fileName: (member.file as unknown as File).name ?? "",
//           },
//         });
//       }

//       toast({
//         title: "Booking completed",
//         description:
//           "All member tickets and Aadhar cards uploaded successfully",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create booking or upload tickets.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const selectedFile = e.target.files?.[0] ?? null;
//     updateMember(index, "file", selectedFile);
//   };

//   return (
//     <Box maxWidth="500px" margin="auto" mt={8}>
//       <Heading mb={6}>Booking Upload</Heading>
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={4} align="stretch">
//           {members.map((member, index) => (
//             <Box
//               key={index}
//               p={4}
//               borderWidth={1}
//               borderRadius="md"
//               position="relative"
//             >
//               <HStack justify="space-between" mb={2}>
//                 <Heading size="sm">Member {index + 1}</Heading>
//                 <IconButton
//                   aria-label="Delete member"
//                   icon={<DeleteIcon />}
//                   size="sm"
//                   colorScheme="red"
//                   onClick={() => deleteMember(index)}
//                 />
//               </HStack>
//               <VStack spacing={3}>
//                 <FormControl isRequired>
//                   <FormLabel>Name</FormLabel>
//                   <Input
//                     value={member.name}
//                     onChange={(e) =>
//                       updateMember(index, "name", e.target.value)
//                     }
//                   />
//                 </FormControl>
//                 <FormControl isRequired>
//                   <FormLabel>Email</FormLabel>
//                   <Input
//                     type="email"
//                     value={member.email}
//                     onChange={(e) =>
//                       updateMember(index, "email", e.target.value)
//                     }
//                   />
//                 </FormControl>
//                 <FormControl isRequired>
//                   <FormLabel>Phone</FormLabel>
//                   <Input
//                     value={member.phone}
//                     onChange={(e) =>
//                       updateMember(index, "phone", e.target.value)
//                     }
//                   />
//                 </FormControl>
//                 <FormControl isRequired>
//                   <FormLabel htmlFor={`file-upload-${index}`}>
//                     <Button as="span" colorScheme="blue">
//                       Upload Aadhar Card (PDF)
//                     </Button>
//                   </FormLabel>
//                   <Input
//                     id={`file-upload-${index}`}
//                     type="file"
//                     accept=".pdf"
//                     onChange={(e) => handleFileChange(e, index)}
//                     display="none"
//                   />
//                 </FormControl>
//                 {member.file && (
//                   <Text fontSize="sm">Selected file: {member.file.name}</Text>
//                 )}
//               </VStack>
//             </Box>
//           ))}
//           <Button
//             leftIcon={<AddIcon />}
//             onClick={addMember}
//             isDisabled={members.length >= 4}
//           >
//             Add Member
//           </Button>
//           <Button type="submit" colorScheme="green" mt={4}>
//             Submit Booking
//           </Button>
//           {error && <Box color="red.500">{error}</Box>}
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default BookingUploadForm;

export default function BookingUpload() {
  return <></>;
}
