import React, { useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Keynote Speaker Session",
    description:
      "Join influential speakers as they share insights on market trends, innovations, and the future of various industries. This session is designed to inspire and educate, providing attendees with a deeper understanding of the ever-evolving business landscape.",
    image: "/images/landing/events/keynote-speaker-session.png",
  },
  {
    title: "Workshops",
    description:
      "Hands-on workshops led by experts in the field, focusing on skill-building and practical knowledge. Whether you're looking to hone your leadership skills or gain new technical expertise, our workshops offer something for everyone.",
    image: "/images/landing/events/workshops.png",
  },
  {
    title: "Offbeat Roundtable",
    description:
      "Engage in dynamic conversations on unconventional topics. Our roundtable discussions bring together thought leaders and disruptors to challenge norms, explore new ideas, and reimagine the future of business.",
    image: "/images/landing/events/offbeat-roundtable.png",
  },
  {
    title: "Canopy Conversations",
    description:
      "Experience intimate dialogues with industry veterans under a relaxed, open setting. Canopy Conversations are designed for candid discussions that foster connections and offer unique perspectives on business challenges and opportunities.",
    image: "/images/landing/events/canopy-conversations.png",
  },
];

function EventsSection() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return isMobile ? <MobileEvents /> : <DesktopEvents />;
}

export default EventsSection;

function DesktopEvents() {
  const containerRef = useRef(null);

  return (
    <Box id="events" mt="15rem" ref={containerRef} bg="transparent">
      <Flex flexDir="column" align="center" maxW="1000px" mx="auto" py={16}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Text
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="300"
            mb={4}
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            color="#FFFFFF"
          >
            Our <span style={{ color: "#CFAF89" }}>events</span>
          </Text>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Text
            fontSize={{ base: "16px", md: "20px" }}
            maxWidth="600px" // Reduced text width
            mb={16}
            fontFamily="'Proxima Nova', 'Inter', sans-serif"
            fontWeight="300"
            color="rgba(255, 255, 255, 0.7)"
            textAlign="center"
          >
            The heart and soul of Business Conclave.
          </Text>
        </motion.div>

        {/* Desktop Event Cards */}
        {events.map(({ title, description, image }, i) => (
          <Grid
            key={i}
            templateColumns={{
              base: "1fr",
              md: i % 2 === 0 ? "1fr 2fr" : "2fr 1fr",
            }}
            gap={6}
            mb={8}
            alignItems="center"
          >
            {i % 2 === 0 ? (
              <>
                <GridItem>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Flex align="center" justify="center">
                      <Image src={image} h="400px" objectFit="cover" />
                    </Flex>
                  </motion.div>
                </GridItem>
                <GridItem>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Text
                      fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                      fontSize="40px"
                      fontWeight="300"
                      mb={4}
                      color="#CFAF89"
                    >
                      {title}
                    </Text>
                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize="20px"
                      fontWeight="300"
                      color="rgba(255, 255, 255, 0.8)"
                      maxW="600px" // Ensure text width is limited
                      lineHeight="1.6"
                    >
                      {description}
                    </Text>
                  </motion.div>
                </GridItem>
              </>
            ) : (
              <>
                <GridItem>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Text
                      fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                      fontSize="40px"
                      fontWeight="300"
                      mb={4}
                      color="#CFAF89"
                    >
                      {title}
                    </Text>
                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize="20px"
                      fontWeight="300"
                      color="rgba(255, 255, 255, 0.8)"
                      maxW="600px" // Ensure text width is limited
                      lineHeight="1.6"
                    >
                      {description}
                    </Text>
                  </motion.div>
                </GridItem>
                <GridItem>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Flex align="center" justify="center">
                      <Image src={image} h="400px" objectFit="cover" />
                    </Flex>
                  </motion.div>
                </GridItem>
              </>
            )}
          </Grid>
        ))}
      </Flex>
    </Box>
  );
}

function MobileEvents() {
  return (
    <Box id="events" mt="8rem" px={6} bg="transparent">
      <Flex flexDir="column" align="center" maxW="1000px" mx="auto" py={16}>
        {/* Title */}
        <Text
          fontSize="4xl"
          fontWeight="300"
          mb={4}
          fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
          color="#FFFFFF"
        >
          Our <span style={{ color: "#CFAF89" }}>events</span>
        </Text>

        {/* Subtitle */}
        <Text
          fontSize="18px"
          maxWidth="600px"
          mb={8}
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
          fontWeight="300"
          color="rgba(255, 255, 255, 0.7)"
          textAlign="center"
        >
          The heart and soul of Business Conclave.
        </Text>

        {/* Mobile Event Cards */}
        {events.map(({ title, description, image }, i) => (
          <Box key={i} mb={12}>
            <Image
              src={image}
              w="100%"
              maxW="500px"
              mx="auto"
              mb={4}
              borderRadius="15px"
            />
            <Text
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontSize="28px"
              fontWeight="300"
              mb={2}
              color="#CFAF89"
              textAlign="center"
            >
              {title}
            </Text>
            <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="16px" fontWeight="300" color="rgba(255, 255, 255, 0.8)" textAlign="justify">
              {description}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
