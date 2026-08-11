
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import Layout from "~/components/layout";

// Define a safer type for discounts using `Record`
interface Ticket {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  discounts: Record<number, number>;
}

const availableTickets: Ticket[] = [
  {
    id: "1",
    name: "Regular Delegate Pass",
    basePrice: 600,
    quantity: 0,
    discounts: { 1: 600, 2: 1150, 4: 2100 },
  },
  {
    id: "2",
    name: "Premium Delegate Pass",
    basePrice: 825,
    quantity: 0,
    discounts: { 1: 825, 2: 1400, 4: 2350 },
  },
  {
    id: "3",
    name: "SNU Student Pass",
    basePrice: 600,
    quantity: 0,
    discounts: { 1: 600, 2: 1100, 4: 2000 },
  },
];

const DashboardPage = () => {
  return (
    <Layout title="Dashboard">
      <Box maxW="1200px" mx="auto" my={8}>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Feature</Th>
              <Th>Regular Delegate Pass</Th>
              <Th>Premium Delegate Pass</Th>
              <Th>SNU Student Pass</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Access to Events</Td>
              <Td>
                <Icon as={CheckCircleIcon} color="green.400" />
              </Td>
              <Td>
                <Icon as={CheckCircleIcon} color="green.400" />
              </Td>
              <Td>
                <Icon as={CheckCircleIcon} color="green.400" />
              </Td>
            </Tr>
            {/* Add more rows as needed */}
          </Tbody>
        </Table>
      </Box>

      <Flex
        direction={["column", "row"]}
        justify="space-between"
        py={8}
        maxW="1200px"
        mx="auto"
      >
        {/* Available Tickets Section */}
        <VStack w={["100%", "50%"]} align="flex-start" spacing={6}>
          <Heading>Available Tickets</Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            {availableTickets.map((ticket) => (
              <GridItem
                key={ticket.id}
                bg="gray.700"
                p={4}
                borderRadius="md"
                shadow="md"
                opacity={0.5} // Reduce opacity to indicate disabled state
              >
                <Text fontSize="lg" fontWeight="bold">
                  {ticket.name}
                </Text>
                <Text mt={2} fontWeight="bold">
                  ₹ {ticket.basePrice}
                </Text>
                <Button
                  mt={4}
                  w="100%"
                  bg="gray.500"
                  color="white"
                  disabled // Disable the button
                >
                  Add to Cart
                </Button>
              </GridItem>
            ))}
          </Grid>
        </VStack>

        {/* Cart Section */}
        <VStack w={["100%", "45%"]} align="flex-start">
          <Heading>Your Cart</Heading>
          <Text color="gray.400">Ticket booking is currently disabled.</Text>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default DashboardPage;
