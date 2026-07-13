import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Navbar from "../layout/navbar";

// Define animations for both background balls
const ballAnimation1 = {
  initial: { y: 0 },
  animate: {
    y: 200,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const ballAnimation2 = {
  initial: { y: 0 },
  animate: {
    y: -200,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const HeroSection = () => {
  const router = useRouter();

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      <Navbar />

      {/* First Background Ball */}
      <Box
        as={motion.div}
        variants={ballAnimation1}
        initial="initial"
        animate="animate"
        borderRadius="full"
        position="absolute"
        zIndex="5"
        left="-10%"
        top="10%"
      >
        <Image
          src="/images/animated-ball.png"
          alt="Ball One"
          w="100%"
          h="100%"
          transform={["scale(0.5) translateX(-125px)", "translateX(100px)"]}
        />
      </Box>

      {/* Second Background Ball */}
      <Box
        as={motion.div}
        variants={ballAnimation2}
        initial="initial"
        animate="animate"
        borderRadius="full"
        position="absolute"
        zIndex="5"
        right="-10%"
        bottom="10%"
      >
        <Image
          src="/images/animated-ball-2.png"
          alt="Ball Two"
          w="100%"
          h="100%"
          transform={["scale(0.5) translateX(125px)", "translateX(-100px)"]}
        />
      </Box>

      {/* Hero Content */}
      <Flex
        mt={{ base: "6rem", md: "10rem" }}
        direction="column"
        align="center"
        justify="center"
        position="relative"
        zIndex="20"
        color="white"
        textAlign="center"
        px={6}
      >
        {/* Business Conclave Logo */}
        <Image
          src="/images/inspiriaXbcon-hero-section.png"
          alt="Business Conclave Logo"
          width={{ base: "250px", md: "400px" }}
          height="auto"
          mb={0}
        />

        {/* Hero Text */}
        <Text
          fontSize={["5xl", "6xl"]}
          fontWeight="bold"
          mb={4}
          fontFamily="Satoshi"
          color="#B5B5B5"
          lineHeight={{ base: "1.2", md: "1.5" }}
        >
          Charting New{" "}
          <Text
            as="span"
            color="#FB8328"
            fontFamily="Satoshi"
            fontWeight="bold"
          >
            Horizons.
          </Text>
        </Text>

        <Text
          fontSize={{ base: "14px", md: "18px", lg: "20px" }}
          maxWidth="800px"
          mb={6}
          fontFamily="Satoshi"
        >
          Capturing the essence of Business and Beyond.
        </Text>

        <Text
          fontSize={{ base: "14px", md: "18px", lg: "20px" }}
          maxWidth="800px"
          mb={6}
          fontFamily="Satoshi"
        >
          A unique platform where visionaries, industry leaders, and aspiring
          entrepreneurs come together. From engaging panels and networking
          opportunities, it&apos;s all here.
        </Text>

        <Text
          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
          color="white"
          mb={6}
          fontFamily="Satoshi"
          fontWeight="bold"
        >
          Join us at Shiv Nadar University&apos;s Business Conclave.
        </Text>

        {/* Book Tickets Button */}
        {/* <Button
          size={{ base: "md", md: "lg" }}
          bg="#FB8328"
          color="white"
          _hover={{ bg: "#E5731B" }}
          shadow="3px 3px 0px rgba(181, 81, 0, 0.6)"
          borderRadius="8px"
          padding={{ base: "1rem 2rem", md: "1.5rem 2.5rem" }}
          // onClick={handleRegister} // Call the register function on click
          onClick={() => router.push("/register")}
        >
          Book tickets now
        </Button> */}
      </Flex>
    </Box>
  );
};

export default HeroSection;
