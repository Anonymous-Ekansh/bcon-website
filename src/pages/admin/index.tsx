import React, { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { api } from "~/utils/api";
import type { Ticket } from "@prisma/client";
import {
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  VStack,
  HStack,
  Badge,
  useToast,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Define the admin email list
const ADMIN_EMAILS = [
  "sk970@snu.edu.in",
  "us997@snu.edu.in",
  "ak915@snu.edu.in",
  "ks261@snu.edu.in",
  "aa475@snu.edu.in",
  "rk684@snu.edu.in",
  "dk109@snu.edu.in",
];

// Define types for User and Booking
interface User {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
}

interface Booking {
  id: string;
  userId: string | null;
  transactionId: string | null;
  User: User | null;
  status: string;
}

interface BookingTableProps {
  bookings: Booking[];
  status: "pending" | "approved" | "rejected";
  onUpdateBooking: (
    bookingId: string,
    newStatus: "approved" | "rejected"
  ) => void;
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

// BookingDetailsModal Component
const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  isOpen,
  onClose,
  bookingId,
}) => {
  const {
    data: bookingDetails,
    isLoading,
    error,
  } = api.adminBooking.getBookingDetails.useQuery({
    bookingId,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Booking Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">Error: {error.message}</Text>
          ) : (
          <VStack align="start" spacing={4}>
            <Text>
              <strong>Booking ID:</strong> {bookingDetails?.id}
            </Text>
            <Text>
              <strong>User:</strong> {bookingDetails?.User?.name ?? "N/A"}
            </Text>
            <Text>
              <strong>Email:</strong> {bookingDetails?.User?.email ?? "N/A"}
            </Text>
            <Text>
              <strong>Transaction ID:</strong>{" "}
              {bookingDetails?.transactionId ?? "N/A"}
            </Text>
            <Text>
              <strong>Status:</strong> {bookingDetails?.status}
            </Text>

            <Heading size="md">Tickets</Heading>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookingDetails?.Ticket?.map((ticket: Ticket) => (
                  <Tr key={ticket.id}>
                    <Td>{ticket.name}</Td>
                    <Td>{ticket.email}</Td>
                    <Td>{ticket.phone}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// BookingTable Component
const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  status,
  onUpdateBooking,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const handleViewDetails = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    onOpen();
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Booking ID</Th>
            <Th>User</Th>
            <Th>Transaction ID</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking.id}>
              <Td>{booking.id}</Td>
              <Td>{booking.User?.name ?? "Unknown"}</Td>
              <Td>{booking.transactionId}</Td>
              <Td>
                <Badge
                  colorScheme={
                    status === "pending"
                      ? "yellow"
                      : status === "approved"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  {status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => onUpdateBooking(booking.id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => onUpdateBooking(booking.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleViewDetails(booking.id)}
                  >
                    View Details
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedBookingId && (
        <BookingDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          bookingId={selectedBookingId}
        />
      )}
    </>
  );
};

// AdminPage Component
const AdminPage: NextPage<{ authorized: boolean }> = ({ authorized }) => {
  const toast = useToast();

  const {
    data: bookings,
    isLoading,
    error,
    refetch,
  } = api.adminBooking.getAllBookings.useQuery();

  const updateBookingMutation = api.adminBooking.updateBooking.useMutation({
    onSuccess: () => {
      void refetch();
      toast({
        title: "Booking updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating booking.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleUpdateBooking = (
    bookingId: string,
    newStatus: "approved" | "rejected"
  ) => {
    updateBookingMutation.mutate({ bookingId, newStatus });
  };

  if (!authorized) {
    return (
      <Container maxW="container.md" py={8}>
        <Heading size="lg" mb={4}>
          Access Denied
        </Heading>
        <Text>You do not have permission to view this page.</Text>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Loading bookings...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500">Error loading bookings: {error.message}</Text>
      </Container>
    );
  }

  // return (
  //   <pre>
  //     {JSON.stringify(bookings, null, 2)}
  //   </pre>
  // )

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl">
          Admin Dashboard
        </Heading>

        <Tabs>
          <TabList>
            <Tab>Pending ({bookings?.pendingBookingsWithTickets?.length ?? 0})</Tab>
            <Tab>Approved ({bookings?.approvedBookingsWithTicket?.length ?? 0})</Tab>
            <Tab>Rejected ({bookings?.rejectedBookings?.length ?? 0})</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <BookingTable
                bookings={bookings?.pendingBookingsWithTickets ?? []}
                status="pending"
                onUpdateBooking={handleUpdateBooking}
              />
            </TabPanel>
            <TabPanel>
              <BookingTable
                bookings={bookings?.approvedBookingsWithTicket ?? []}
                status="approved"
                onUpdateBooking={handleUpdateBooking}
              />
            </TabPanel>
            <TabPanel>
              <BookingTable
                bookings={bookings?.rejectedBookings ?? []}
                status="rejected"
                onUpdateBooking={handleUpdateBooking}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

// Server-side session validation
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const authorized =
    !!session && ADMIN_EMAILS.includes(session.user?.email ?? "");

  return { props: { authorized } };
};

export default AdminPage;
