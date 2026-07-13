// PaymentModal.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  transactionId: string;
  setTransactionId: (value: string) => void;
  handleTransactionSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  totalPrice,
  transactionId,
  setTransactionId,
  handleTransactionSubmit,
  isLoading,
  error,
  successMessage,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Complete Your Payment</ModalHeader>
      <ModalBody>
        <Text fontSize="xl" mb={4}>
          Scan the QR code below to pay ₹ {totalPrice}
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
            isLoading={isLoading}
          >
            Submit
          </Button>
        </form>
        {error && (
          <Text color="red.500" mt={2}>
            Error: {error}
          </Text>
        )}
        {successMessage && (
          <Text color="green.500" mt={2}>
            {successMessage}
          </Text>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default PaymentModal;
