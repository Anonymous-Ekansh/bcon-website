/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars */
// pages/my-tickets.tsx
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Alert,
  AlertIcon,
  Skeleton,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Layout from "~/components/layout";

const MyTickets = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = api.booking.getTicketDetails.useQuery();

  if (!session) {
    return (
      <Box textAlign="center" mt={10}>
        <Alert status="error">
          <AlertIcon />
          You need to be logged in to view your tickets.
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box mt={10} p={5}>
        <Skeleton height="40px" mb={5} width="200px" />
        <Skeleton height="150px" mb={5} borderRadius="lg" />
        <Skeleton height="150px" borderRadius="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt={10}>
        <AlertIcon />
        Error: {error.message}
      </Alert>
    );
  }

  if (data?.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Alert status="info">
          <AlertIcon />
          You have no bookings yet.
        </Alert>
      </Box>
    );
  }

  return (
    <Layout title="My Tickets">
      <Box mt={10} p={5} borderWidth={1} borderRadius="lg" bg="rgba(0,0,0,0.5)" color="white">
        <Heading size="lg" mb={5}>
          Your Bookings
        </Heading>
        {data?.map((booking: any) => (
          <Box
            key={booking.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            mb={5}
            bg="rgba(255,255,255,0.05)"
          >
            <Heading size="md">Booking ID: {booking.id}</Heading>
            <Text>Status: {booking.status}</Text>

            <Heading size="sm" mt={4}>
              Tickets:
            </Heading>
            <List spacing={3} mt={2}>
              {booking.Ticket.map((ticket: any) => (
                <ListItem key={ticket.id} p={3} bg="rgba(255,255,255,0.1)" borderRadius="md">
                  <Text>
                    <strong>Name:</strong> {ticket.name}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {ticket.email}
                  </Text>
                  <Text>
                    <strong>Phone:</strong> {ticket.phone}
                  </Text>
                  <Text>
                    <strong>Uploaded File:</strong> {ticket.fileName}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default MyTickets;
