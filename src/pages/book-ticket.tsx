import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "~/components/layout";
import { api } from "~/utils/api";

interface Ticket {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  discounts: Record<number, number>; // Updated to use Record instead of index signature
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
  const [cart, setCart] = useState<Ticket[]>([]);
  const [transactionId, setTransactionId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    mutate: createBooking,
    data: booking,
    error,
    ...createBookingMut
  } = api.booking.createBooking.useMutation();

  const getTicketPrice = (ticket: Ticket) =>
    ticket.discounts[ticket.quantity] ?? ticket.basePrice * ticket.quantity; // Replaced || with ??

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + getTicketPrice(item), 0);

  const addToCart = (ticket: Ticket) => {
    const existingTicket = cart.find((item) => item.id === ticket.id);
    if (existingTicket && existingTicket.quantity < 4) {
      const newQuantity = existingTicket.quantity === 1 ? 2 : 4;
      setCart(
        cart.map((item) =>
          item.id === ticket.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } else if (!existingTicket) {
      setCart([...cart, { ...ticket, quantity: 1 }]);
    }
  };

  const decrementTicket = (ticketId: string) => {
    setCart(
      cart
        .map((item) =>
          item.id === ticketId
            ? { ...item, quantity: item.quantity === 4 ? 2 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (ticketId: string) =>
    setCart(cart.filter((item) => item.id !== ticketId));

  const handleCheckout = () => onOpen(); // Open the modal for payment

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionId.trim().length === 12) {
      createBooking({ transactionId: transactionId ?? null }); // Create the booking
    }
  };

  return (
    <Layout title="Dashboard">
      <Flex
        direction="row"
        justify="space-between"
        px={12}
        py={8}
        maxW="1200px"
        mx="auto"
      >
        {/* Available Tickets Section */}
        <VStack w="50%" align="flex-start" spacing={6}>
          <Heading>Available Tickets</Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            {availableTickets.map((ticket) => (
              <GridItem
                key={ticket.id}
                bg="gray.800"
                opacity={1}
                p={4}
                borderRadius="md"
                shadow="md"
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
                  bg="orange.400"
                  color="white"
                  _hover={{ bg: "orange.500" }}
                  onClick={() => addToCart(ticket)}
                >
                  Add to Cart
                </Button>
              </GridItem>
            ))}
          </Grid>
        </VStack>

        {/* Cart Section */}
        <VStack w="45%" align="flex-start">
          <Heading>Your Cart</Heading>
          {cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <Flex
                  key={index}
                  justify="space-between"
                  w="100%"
                  alignItems="center"
                  my={2}
                >
                  <Text>
                    {item.quantity} x {item.name}
                  </Text>
                  <Flex direction="column" alignItems="flex-end" w="30%">
                    {item.quantity > 1 && (
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        textDecoration="line-through"
                      >
                        ₹ {item.basePrice * item.quantity}
                      </Text>
                    )}
                    <Text fontSize="lg" fontWeight="bold" color="green.400">
                      ₹ {getTicketPrice(item)}
                    </Text>
                    <Flex gap={2} mt={2}>
                      <Button
                        size="sm"
                        onClick={() => decrementTicket(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        disabled={item.quantity >= 4}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
              <Text mt={4} fontWeight="bold">
                Total: ₹ {getTotalPrice()}
              </Text>
              <Button
                mt={4}
                bg="orange.400"
                color="white"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </>
          ) : (
            <Text color="gray.400">
              Your cart is empty. Add some tickets to proceed.
            </Text>
          )}
        </VStack>
      </Flex>

      {/* Payment Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complete Your Payment</ModalHeader>
          <ModalBody>
            <Text fontSize="xl" mb={4}>
              Scan the QR code below to pay ₹ {getTotalPrice()}
            </Text>
            <Box mb={4}>
              <Box bg="gray.300" height="200px" width="200px" mx="auto" />
            </Box>
            <form onSubmit={handleTransactionSubmit}>
              <Input
                placeholder="Enter 12-digit UPI Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                mb={4}
                required
              />
              <Button
                type="submit"
                bg="orange.400"
                color="white"
                width="100%"
                _hover={{ bg: "orange.500" }}
                isLoading={createBookingMut.status === "pending"}
              >
                Submit
              </Button>
            </form>
            {error && (
              <Text color="red.500" mt={2}>
                Error: {error.message}
              </Text>
            )}
            {booking && (
              <Text color="green.500" mt={2}>
                Booking created successfully!
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default DashboardPage;
