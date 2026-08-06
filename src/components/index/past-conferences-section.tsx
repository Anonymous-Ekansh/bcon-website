import { Box, Flex, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type FC } from "react";

const stats = [
  { label: "Editions", value: "5+" },
  { label: "Attendees", value: "2000+" },
  { label: "Speakers", value: "50+" },
  { label: "Sessions", value: "30+" },
];

const pastEditions = [
  {
    year: "2023",
    title: "Navigating the Future",
    description: "Exploring the next wave of business innovation.",
    image: "/images/landing/events/corporate-gala.png",
  },
  {
    year: "2022",
    title: "Resilience & Growth",
    description: "Strategies for a rapidly changing world.",
    image: "/images/landing/events/keynote-speaker-session.png",
  },
  {
    year: "2021",
    title: "The Digital Shift",
    description: "Embracing transformation in the modern era.",
    image: "/images/landing/events/workshops.png",
  },
];

const PastConferencesSection: FC = () => {
  return (
    <Box id="past-conferences" bg="transparent" position="relative" pt={32} pb={16}>
      <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }} maxW="1200px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Text
            textTransform="uppercase"
            fontSize="12px"
            fontWeight="600"
            letterSpacing="0.3em"
            color="#CFAF89"
            mb={4}
            textAlign="center"
          >
            Our Journey
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "32px", md: "46px" }}
            fontWeight="300"
            color="#FFFFFF"
            mb={16}
            textAlign="center"
          >
            Past <span style={{ color: "#CFAF89" }}>Conferences</span>
          </Text>
        </motion.div>

        {/* Stats Strip */}
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={8}
          w="100%"
          mb={24}
        >
          {stats.map((stat, i) => (
            <GridItem key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <Flex flexDir="column" alignItems="center">
                  <Text
                    fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                    fontSize={{ base: "36px", md: "48px" }}
                    color="#CFAF89"
                    fontWeight="300"
                  >
                    {stat.value}
                  </Text>
                  <Text
                    fontFamily="'Proxima Nova', 'Inter', sans-serif"
                    fontSize="16px"
                    color="rgba(255,255,255,0.7)"
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                  >
                    {stat.label}
                  </Text>
                </Flex>
              </motion.div>
            </GridItem>
          ))}
        </Grid>

        {/* Editions Gallery */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          w="100%"
        >
          {pastEditions.map((edition, i) => (
            <GridItem key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <Box
                  bg="rgba(255, 255, 255, 0.05)"
                  borderRadius="15px"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  overflow="hidden"
                  transition="all 0.4s ease"
                  _hover={{
                    borderColor: "rgba(207, 175, 137, 0.5)",
                    bg: "rgba(255, 255, 255, 0.07)",
                    transform: "translateY(-5px)",
                  }}
                >
                  <Box position="relative" h="200px" w="100%">
                    <Image
                      src={edition.image}
                      alt={edition.title}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                      opacity={0.8}
                    />
                    <Box
                      position="absolute"
                      inset="0"
                      bg="linear-gradient(to top, rgba(45,17,71,0.9), transparent)"
                    />
                    <Text
                      position="absolute"
                      bottom={4}
                      left={6}
                      fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                      fontSize="24px"
                      color="#CFAF89"
                    >
                      {edition.year}
                    </Text>
                  </Box>
                  <Box p={6}>
                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize="20px"
                      fontWeight="600"
                      color="white"
                      mb={2}
                    >
                      {edition.title}
                    </Text>
                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize="14px"
                      color="rgba(255,255,255,0.7)"
                    >
                      {edition.description}
                    </Text>
                  </Box>
                </Box>
              </motion.div>
            </GridItem>
          ))}
        </Grid>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Box mt={16}>
            <Box
              as="a"
              href="/past-conferences"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              display="inline-block"
              bg="transparent"
              color="#CFAF89"
              border="1px solid #CFAF89"
              px={8}
              py={3}
              borderRadius="full"
              fontWeight="500"
              transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                bg: "rgba(207, 175, 137, 0.15)",
                transform: "translateY(-2px)",
                boxShadow: "0px 4px 15px rgba(207, 175, 137, 0.2)",
              }}
            >
              View All Past Conferences
            </Box>
          </Box>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default PastConferencesSection;
