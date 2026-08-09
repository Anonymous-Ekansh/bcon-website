import { Box, Flex, Spacer, Text, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import SpeakersContainer from "./speakers-container";

function SpeakersSection() {
  const container = useRef(null);

  // Set up scroll-based animations
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Create transform for fade-in-up effect
  const fadeInUp = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
  const fadeInOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // Create delayed transforms for subtitle
  const subtitleFadeInUp = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);
  const subtitleFadeInOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.8],
    [0, 1]
  );

  return (
    <Box
      bg="transparent"
      position="relative"
    >
      <Flex
        id="speakers"
        ref={container}
        flexDir="column"
        alignItems="center"
        gap={4}
        pt={20} // Added padding to compensate for background container
      >
        <motion.div
          style={{ y: fadeInUp, opacity: fadeInOpacity }}
        >
          <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize="46px" fontWeight={300} color="#FFFFFF" zIndex={10}>
            Past{" "}
            <span
              style={{
                color: "#CFAF89",
              }}
            >
              Speakers
            </span>
          </Text>
        </motion.div>

        <motion.div
          style={{
            y: subtitleFadeInUp,
            opacity: subtitleFadeInOpacity,
          }}
        >
          <Text
            fontFamily="'Proxima Nova', 'Inter', sans-serif"
            maxW="30rem"
            fontWeight={300}
            color="rgba(255, 255, 255, 0.7)"
            fontSize={["16px", "18px"]}
            textAlign="center"
            zIndex={2}
          >
            Visionaries and industry leaders who make the magic in today&apos;s
            business landscape possible.
          </Text>
        </motion.div>
      </Flex>

      <Spacer h={["1rem", "10rem"]} />

      <SpeakersContainer limit={6} />

      <Flex w="100%" justifyContent="center" mt={12}>
        <Button
          as={Link}
          href="/past-speakers"
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
          bg="transparent"
          color="#CFAF89"
          border="1px solid #CFAF89"
          px={8}
          py={6}
          borderRadius="full"
          fontWeight="500"
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          _hover={{
            bg: "rgba(207, 175, 137, 0.15)",
            transform: "translateY(-2px)",
            boxShadow: "0px 4px 15px rgba(207, 175, 137, 0.2)",
          }}
        >
          View All Past Speakers
        </Button>
      </Flex>

      <Spacer h="1rem" />
    </Box>
  );
}

export default SpeakersSection;
