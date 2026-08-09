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
      bgColor="rgba(255, 255, 255, 0.05)"
      borderRadius="15px"
      border="1px solid rgba(255,255,255,0.1)"
      p={6}
      gap={6}
      mb="1rem" // Reduced margin between cards for tighter stacking
      as={motion.div}
      // style={{ y: translateY }} // Only animate Y position
      position="relative"
    >
      {/* Speaker Image */}
      <GridItem as={Flex} flexDir="column" alignItems="center">
        {image ? (
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
        ) : (
          <Flex
            w="200px"
            h="280px"
            bg="rgba(207, 175, 137, 0.08)"
            border="1px solid rgba(207, 175, 137, 0.2)"
            borderRadius="10px"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 4px 25px 2px rgba(0, 0, 0, 0.25)"
          >
            <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize="40px" color="rgba(207, 175, 137, 0.3)" fontWeight="300">
              {name.split(" ").map(n => n[0]).join("")}
            </Text>
          </Flex>
        )}
      </GridItem>

      {/* Speaker Details */}
      <GridItem>
        <Text
          fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
          fontWeight={300}
          fontSize="24px"
          color="#CFAF89"
          textAlign="center"
        >
          {name}
        </Text>
        <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontWeight={500} fontSize="16px" textAlign="center" color="rgba(255,255,255,0.7)">
          {designation}
        </Text>
        <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontWeight={300} mt={4} color="rgba(255,255,255,0.8)" textAlign="justify">
          {description}
        </Text>
      </GridItem>
    </Grid>
  );
}

export default MobileStackedSpeakerBox;
