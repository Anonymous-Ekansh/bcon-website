/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars */
import { useSession, getSession } from "next-auth/react";
import { api } from "~/utils/api";
import Link from "next/link";
import { type GetServerSideProps } from "next";
import {
  Flex,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  Box,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import Layout from "~/components/layout";
import { truncate } from "lodash";

function DashboardPage() {
  const { data: session } = useSession();

  // Fetch the user's tickets using the API query hook
  const {
    data: bookings,
    isLoading,
    error,
  } = api.booking.getTicketDetails.useQuery();

  // Handle loading state
  if (isLoading) {
    return (
      <Layout title="Dashboard">
        <Flex
          direction="column"
          maxW="1200px"
          mx="auto"
          py={12}
          px={{ base: 4, md: 8 }}
        >
          {/* Header Skeleton */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            mb={8}
          >
            <Box mb={{ base: 4, md: 0 }} w="full">
              <Skeleton height="60px" w="250px" mb={2} />
              <Skeleton height="20px" w="400px" mb={4} />
              <Skeleton height="40px" w="120px" />
            </Box>
          </Flex>

          {/* Tickets Skeleton */}
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            mb={8}
          >
            {[...Array(4)].map((_, i) => (
              <GridItem key={i}>
                <Skeleton height="150px" borderRadius="md" />
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Layout>
    );
  }

  // Handle errors
  if (error) {
    return (
      <Layout title="Dashboard">
        <Flex justify="center" align="center" h="100vh">
          <Alert status="error">
            <AlertIcon />
            Error: {error.message}
          </Alert>
        </Flex>
      </Layout>
    );
  }

  // Extract all tickets from bookings
  const allTickets = bookings?.flatMap((booking: any) => booking.Ticket) ?? [];

  return (
    <Layout title="Dashboard">
      <Flex
        direction="column"
        maxW="1200px"
        mx="auto"
        py={12}
        px={{ base: 4, md: 8 }}
      >
        {/* Header Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={8}
        >
          <Box mb={{ base: 4, md: 0 }}>
            <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={2}>
              Hi,{" "}
              <Text as="span" color="orange.400">
                {session?.user?.name
                  ? session.user.name.split(" ")[0]
                  : "there"}
              </Text>
              .
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" mb={4}>
              Book tickets for BCon 2024 and manage your bookings here.
            </Text>
            <Button as={Link} href="/book-ticket" bg="orange.400" color="white" _hover={{ bg: "orange.500" }}>
              Buy Tickets
            </Button>
          </Box>
        </Flex>

        {/* Tickets Section */}
        {allTickets.length > 0 ? (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            mb={8}
          >
            {allTickets.map((ticket: any) => (
              <GridItem
                key={ticket.id}
                bg="gray.700"
                p={4}
                borderRadius="md"
                shadow="md"
              >
                <Text fontSize="lg" fontWeight="bold">
                  {ticket.name}
                </Text>
                <Text fontSize="md" color="gray.400">
                  {ticket.email}
                </Text>
                <Text fontSize="md" color="gray.400">
                  {ticket.phone}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Uploaded File:{" "}
                  {truncate(ticket.fileName, { length: 25, omission: "..." })}
                </Text>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <VStack spacing={4} align="center" mt={8}>
            <Text fontSize="lg" color="gray.400">
              You don&apos;t have any tickets yet.
            </Text>
          </VStack>
        )}
      </Flex>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default DashboardPage;
