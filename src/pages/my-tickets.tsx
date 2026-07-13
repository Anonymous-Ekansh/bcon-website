// pages/my-tickets.tsx
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

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
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
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
    <Box mt={10} p={5} borderWidth={1} borderRadius="lg">
      <Heading size="lg" mb={5}>
        Your Bookings
      </Heading>
      {data?.map((booking) => (
        <Box
          key={booking.id}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          mb={5}
        >
          <Heading size="md">Booking ID: {booking.id}</Heading>
          <Text>Status: {booking.status}</Text>

          <Heading size="sm" mt={4}>
            Tickets:
          </Heading>
          <List spacing={3} mt={2}>
            {booking.Ticket.map((ticket) => (
              <ListItem key={ticket.id} p={3} bg="gray.100" borderRadius="md">
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
  );
};

export default MyTickets;
