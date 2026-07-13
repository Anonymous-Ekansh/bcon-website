// mobile-stacked-speaker-box.tsx

import { Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MobileStackedSpeakerBoxProps {
  name: string;
  designation: string;
  description: string;
  image: string;
  idx: "odd" | "even";
}

function MobileStackedSpeakerBox({
  name,
  designation,
  description,
  image,
  idx,
}: MobileStackedSpeakerBoxProps) {
  // const containerRef = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"],
  // });

  // const translateY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Move up slightly
  // const opacity = 1; // Keep opacity constant

  return (
    <Grid
      // ref={containerRef}
      h="auto"
      templateColumns="1fr"
      bgColor="#232323"
      borderRadius="15px"
      border="1px solid #474747"
      p={6}
      gap={6}
      mb="1rem" // Reduced margin between cards for tighter stacking
      as={motion.div}
      // style={{ y: translateY }} // Only animate Y position
      position="relative"
    >
      {/* Speaker Image */}
      <GridItem as={Flex} flexDir="column" alignItems="center">
        <Image
          src={image}
          alt={name}
          width={200}
          height={280}
          style={{
            borderRadius: "10px",
            boxShadow: "0px 4px 25px 2px rgba(0, 0, 0, 0.25)",
          }}
        />
      </GridItem>

      {/* Speaker Details */}
      <GridItem>
        <Text
          fontWeight={600}
          fontSize="24px"
          color="#FB8328"
          textAlign="center"
        >
          {name}
        </Text>
        <Text fontWeight={600} fontSize="16px" textAlign="center" color="white">
          {designation}
        </Text>
        <Text mt={4} color="white" textAlign="justify">
          {description}
        </Text>
      </GridItem>
    </Grid>
  );
}

export default MobileStackedSpeakerBox;
