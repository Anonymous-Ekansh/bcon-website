import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
    <>
      <Flex
        id="speakers"
        ref={container}
        flexDir="column"
        alignItems="center"
        gap={4}
      >
        <motion.div
          style={{ y: fadeInUp, opacity: fadeInOpacity }} // Apply scroll-based animations
        >
          <Text fontSize="46px" fontWeight={600} color="#B5B5B5" zIndex={10}>
            Speaker{" "}
            <span
              style={{
                color: "#FB8328",
              }}
            >
              lineup
            </span>
          </Text>
        </motion.div>

        <motion.div
          style={{
            y: subtitleFadeInUp,
            opacity: subtitleFadeInOpacity,
          }} // Apply scroll-based animations with delay
        >
          <Text
            maxW="30rem"
            fontWeight={500}
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

      <SpeakersContainer />

      <Spacer h="1rem" />
    </>
  );
}

export default SpeakersSection;
