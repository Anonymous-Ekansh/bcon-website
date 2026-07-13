import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import type { NextPage, GetServerSideProps } from "next";
import { useZxing } from "react-zxing";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Result } from "@zxing/library";
import { api } from "~/utils/api";

// Define the authorized emails for ScanTicketPage
const SCAN_TICKET_PAGE_EMAILS = Array.from(
  new Set([
    "sk970@snu.edu.in",
    "us997@snu.edu.in",
    "ak915@snu.edu.in",
    "ks261@snu.edu.in",
    "aa475@snu.edu.in",
    "rk684@snu.edu.in",
    "dk109@snu.edu.in",
    "nm663@snu.edu.in",
    "cs826@snu.edu.in",
    "bb400@snu.edu.in",
    "mk527@snu.edu.in",
    "ng359@snu.edu.in",
    "bs783@snu.edu.in",
  ])
);

interface ScanTicketPageProps {
  authorized: boolean;
}

const ScanTicketPage: NextPage<ScanTicketPageProps> = ({ authorized }) => {
  const [ticketID, setTicketID] = useState("");
  const [ticketData, setTicketData] = useState<null | {
    name: string;
    email: string;
    phone: string;
    status: string;
    inCampus: boolean;
  }>(null);
  const [invalidTicketData, setInvalidTicketData] = useState<string | null>(
    null
  );
  const toast = useToast();

  const fetchTicketDetailsMutation =
    api.adminBooking.fetchTicketDetails.useMutation({
      onSuccess: (data) => {
        if (data.valid) {
          setTicketData(
            data.data as {
              name: string;
              email: string;
              phone: string;
              status: string;
              inCampus: boolean;
            }
          );
          setInvalidTicketData(null);
        } else {
          setTicketData(null);
          setInvalidTicketData(data.data as string);
        }
      },
      onError: (error) => {
        toast({
          title: "Scan Error",
          description: error.message || "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  const toggleInCampusStatusMutation =
    api.adminBooking.toggleInCampusStatus.useMutation({
      onSuccess: (updatedTicket) => {
        setTicketData((prev) =>
          prev ? { ...prev, inCampus: updatedTicket.inCampus } : prev
        );
        toast({
          title: "Success",
          description: `Ticket status updated to ${
            updatedTicket.inCampus ? "In" : "Out"
          }`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Update Error",
          description: error.message || "Failed to update inCampus status.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  const { ref } = useZxing({
    onDecodeResult: (result: Result) => {
      const scannedTicketID = result.getText();
      setTicketID(scannedTicketID);
      fetchTicketDetailsMutation.mutate({ ticketID: scannedTicketID });
    },
    onError: (error) => {
      console.error("Scan Error:", error);
      if (error instanceof Error && error.name === "NotAllowedError") {
        toast({
          title: "Camera Permission Denied",
          description: "Please allow camera access in your browser settings.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Scan Error",
          description: "Could not scan the code. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  if (!authorized) {
    return (
      <Box maxW="600px" mx="auto" py={12}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={8}>
          Access Denied
        </Text>
        <Text>You do not have permission to view this page.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="600px" mx="auto" py={12}>
      <Image
        alt="Event Logo"
        height="50px"
        mx="auto"
        src="/images/bcon_x_inspiria_logo.png"
      />

      <Text fontSize="lg" textAlign="center" mt={4} mx={5} color="gray.600">
        Scan a participant&apos;s valid and approved ticket to view their
        details and let them in.
      </Text>

      <Box mt={4} position="relative">
        <video ref={ref} style={{ width: "100%", height: "auto" }} />
      </Box>

      {ticketData && (
        <Flex
          flexDir="column"
          alignItems="center"
          mt={8}
          p={6}
          borderWidth={1}
          borderRadius="md"
          bg="green.50"
        >
          <Text fontWeight="bold" fontSize="lg" color="green.800">
            {ticketData.name}
          </Text>
          <Text color="green.700" fontSize="md">
            Email: {ticketData.email}
          </Text>
          <Text color="green.700" fontSize="md">
            Phone: {ticketData.phone}
          </Text>
          <Text color="green.700" fontSize="md">
            Status:{" "}
            <Box
              as="span"
              py="5px"
              px="10px"
              borderRadius="6px"
              bgColor={ticketData.status === "approved" ? "green" : "red"}
              color="#ffffff"
              fontSize="sm"
            >
              {ticketData.status.toUpperCase()}
            </Box>
          </Text>
          <Button
            colorScheme={ticketData.inCampus ? "red" : "green"}
            size="lg"
            mt={6}
            onClick={() =>
              toggleInCampusStatusMutation.mutate({
                ticketID,
                inCampus: !ticketData.inCampus,
              })
            }
          >
            {ticketData.inCampus ? "Let Out" : "Let In"}
          </Button>
          {ticketData.inCampus && (
            <Text color="green.500" mt={4}>
              This ticket is marked as already let in.
            </Text>
          )}
        </Flex>
      )}

      {invalidTicketData && (
        <Box
          mt={8}
          p={6}
          borderWidth={1}
          borderRadius="md"
          bg="red.50"
          textAlign="center"
        >
          <Text fontWeight="bold" color="red.600" fontSize="lg" mb={2}>
            Invalid Ticket ID
          </Text>
          <Text color="red.800">Data: {invalidTicketData}</Text>
        </Box>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const authorized =
    !!session && SCAN_TICKET_PAGE_EMAILS.includes(session.user?.email ?? "");
  return { props: { authorized } };
};

export default ScanTicketPage;
