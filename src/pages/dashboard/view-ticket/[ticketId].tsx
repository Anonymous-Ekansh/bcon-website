import {
  Box,
  Text,
  Heading,
  Image,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "~/components/layout";

function ViewTicketPage() {
  const router = useRouter();
  const { ticketId, ticketOwnerName } = router.query;

  const [isImageLoading, setIsImageLoading] = useState(true);

  const ticketSrc = ticketId
    ? `https://businessconclave.in/ticket/view?bookingId=${
        ticketId as string
      }&name=${encodeURIComponent(ticketOwnerName as string)}`
    : "";

  const handleBackToDashboard = () => {
    void router.push("/dashboard");
  };

  return (
    <Layout title="View Ticket">
      {ticketId && ticketOwnerName ? (
        <>
          {/* Show Spinner while the image is loading */}
          {isImageLoading && (
            <Flex justify="center" align="center" minH="60vh">
              <Spinner size="xl" />
            </Flex>
          )}

          <Image
            mx="auto"
            maxH="80vh"
            src={ticketSrc}
            alt="Ticket"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            style={{ display: isImageLoading ? "none" : "block" }}
          />

          {/* Back to Dashboard Button */}
          <Box textAlign="center" mb={6}>
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="orange"
              bgColor="#FB8328"
              variant="solid"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </Button>
          </Box>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Layout>
  );
}

export default ViewTicketPage;
