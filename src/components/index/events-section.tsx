import React, { useRef, useState, useEffect } from "react";
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
    title: "Keynote Address",
    description:
      "Join influential speakers as they share insights on market trends, innovations, and the future of various industries. This session is designed to inspire and educate, providing attendees with a deeper understanding of the ever-evolving business landscape.",
    image: "/images/landing/events/keynote-speaker-session.png",
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
  {
    title: "Workshops",
    description:
      "Hands-on workshops led by experts in the field, focusing on skill-building and practical knowledge. Whether you're looking to hone your leadership skills or gain new technical expertise, our workshops offer something for everyone.",
    image: "/images/landing/events/workshops.png",
  },
  {
    title: "Corporate Gala",
    description:
      "An evening of celebration and networking bringing together speakers, sponsors, and attendees for a memorable night of connection, entertainment, and inspiration.",
    image: "/images/landing/events/corporate-gala.png",
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
                      {image ? (
                        <Image src={image} h="400px" objectFit="cover" />
                      ) : (
                        <Flex w="100%" h="400px" bg="rgba(207, 175, 137, 0.06)" border="1px solid rgba(207, 175, 137, 0.15)" borderRadius="10px" alignItems="center" justifyContent="center">
                          <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize="28px" color="rgba(207, 175, 137, 0.2)" fontWeight="300">{title}</Text>
                        </Flex>
                      )}
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
                      {image ? (
                        <Image src={image} h="400px" objectFit="cover" />
                      ) : (
                        <Flex w="100%" h="400px" bg="rgba(207, 175, 137, 0.06)" border="1px solid rgba(207, 175, 137, 0.15)" borderRadius="10px" alignItems="center" justifyContent="center">
                          <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize="28px" color="rgba(207, 175, 137, 0.2)" fontWeight="300">{title}</Text>
                        </Flex>
                      )}
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple the events to create a seamless infinite loop illusion
  const displayEvents = [...events, ...events, ...events];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const singleSetWidth = scrollWidth / 3;
        
        // If we've scrolled into the third set, silently jump back to the second set
        if (scrollLeft >= singleSetWidth * 2 - clientWidth) {
          scrollRef.current.scrollTo({ left: scrollLeft - singleSetWidth, behavior: "auto" });
          
          // Wait a frame for the jump to render, then smooth scroll to next
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              scrollRef.current?.scrollBy({ left: clientWidth * 0.85, behavior: "smooth" });
            });
          });
        } else {
          // Scroll by roughly one card width (85vw + gap)
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <Box id="events" mt={{ base: "4rem", md: "8rem" }} bg="transparent" overflow="hidden">
      <Flex flexDir="column" align="center" pt={{ base: 8, md: 16 }}>
        {/* Title */}
        <Text
          fontSize="4xl"
          fontWeight="300"
          mb={2}
          fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
          color="#FFFFFF"
        >
          Our <span style={{ color: "#CFAF89" }}>events</span>
        </Text>

        {/* Subtitle */}
        <Text
          fontSize="15px"
          mb={8}
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
          fontWeight="300"
          color="rgba(255, 255, 255, 0.7)"
          textAlign="center"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          ← Swipe to explore →
        </Text>

        {/* Mobile Horizontal Carousel */}
        <Flex
          ref={scrollRef}
          w="100%"
          overflowX="auto"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // Resume auto-play after 4 seconds of inactivity
            setTimeout(() => setIsPaused(false), 4000);
          }}
          sx={{
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
          px={6}
          pb={10}
          gap={5}
        >
          {displayEvents.map(({ title, description, image }, i) => (
            <Box
              key={i}
              minW="85vw"
              maxW="85vw"
              scrollSnapAlign="center"
              bg="rgba(255, 255, 255, 0.03)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="24px"
              p={5}
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              backdropFilter="blur(15px)"
            >
              {image ? (
                <Image
                  src={image}
                  w="100%"
                  h="220px"
                  objectFit="cover"
                  mb={5}
                  borderRadius="16px"
                />
              ) : (
                <Flex w="100%" h="220px" mb={5} bg="rgba(207, 175, 137, 0.06)" border="1px solid rgba(207, 175, 137, 0.15)" borderRadius="16px" alignItems="center" justifyContent="center">
                  <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize="20px" color="rgba(207, 175, 137, 0.2)" fontWeight="300">{title}</Text>
                </Flex>
              )}
              <Text
                fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                fontSize="24px"
                fontWeight="300"
                mb={3}
                color="#CFAF89"
              >
                {title}
              </Text>
              <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="14px" fontWeight="300" color="rgba(255, 255, 255, 0.75)" lineHeight="1.6">
                {description}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
