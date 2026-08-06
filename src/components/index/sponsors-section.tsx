import { Box, Flex, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type FC } from "react";

const currentSponsors = [
  { name: "Sponsor 1", image: "" },
  { name: "Sponsor 2", image: "" },
  { name: "Sponsor 3", image: "" },
  { name: "Sponsor 4", image: "" },
];

const SponsorsSection: FC = () => {
  return (
    <Box id="sponsors" bg="transparent" position="relative" pt={32} pb={16}>
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
            Built With
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
            Our <span style={{ color: "#CFAF89" }}>Sponsors</span>
          </Text>
        </motion.div>

        {/* Current Sponsors Grid */}
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={8}
          w="100%"
          mb={20}
        >
          {currentSponsors.map((sponsor, i) => (
            <GridItem key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <Flex
                  w="100%"
                  h="120px"
                  bg="rgba(255, 255, 255, 0.05)"
                  borderRadius="15px"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.4s ease"
                  filter="grayscale(100%) opacity(70%)"
                  _hover={{
                    filter: "grayscale(0%) opacity(100%)",
                    borderColor: "rgba(207, 175, 137, 0.5)",
                    bg: "rgba(255, 255, 255, 0.07)",
                    transform: "translateY(-5px)",
                  }}
                >
                  {sponsor.image ? (
                    <Image src={sponsor.image} alt={sponsor.name} maxH="80px" maxW="80%" objectFit="contain" />
                  ) : (
                    <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.3)">Logo</Text>
                  )}
                </Flex>
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
          <Box>
            <Box
              as="a"
              href="/sponsors"
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
              View All Sponsors
            </Box>
          </Box>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default SponsorsSection;
