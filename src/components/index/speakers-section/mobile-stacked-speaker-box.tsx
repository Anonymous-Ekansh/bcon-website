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
}: MobileStackedSpeakerBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100px", "end start"], 
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const shortDescription = description.length > 90 ? description.substring(0, 90) + "..." : description;

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity, transformOrigin: "top center" }}
    >
      <Grid
        h="auto"
        templateColumns="1fr"
        bgColor="rgba(255, 255, 255, 0.05)"
        borderRadius="15px"
        border="1px solid rgba(255,255,255,0.1)"
        p={6}
        gap={4}
        mb="1rem"
        position="relative"
        boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
        backdropFilter="blur(10px)"
      >
        <GridItem as={Flex} flexDir="column" alignItems="center">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={160}
              height={220}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 4px 25px 2px rgba(0, 0, 0, 0.25)",
                objectFit: "cover",
                width: "160px",
                height: "220px",
              }}
            />
          ) : (
            <Flex
              w="160px"
              h="220px"
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
        <GridItem mt={2}>
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontWeight={300}
            fontSize="22px"
            color="#CFAF89"
            textAlign="center"
          >
            {name}
          </Text>
          <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontWeight={500} fontSize="14px" textAlign="center" color="rgba(255,255,255,0.7)">
            {designation}
          </Text>
          <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontWeight={300} mt={3} color="rgba(255,255,255,0.8)" textAlign="center" fontSize="14px" lineHeight="1.5">
            {shortDescription}
          </Text>
        </GridItem>
      </Grid>
    </motion.div>
  );
}

export default MobileStackedSpeakerBox;
