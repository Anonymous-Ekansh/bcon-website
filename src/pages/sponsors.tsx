import { Box, Flex, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";

const currentSponsors = [
  { name: "Sponsor 1", image: "" },
  { name: "Sponsor 2", image: "" },
  { name: "Sponsor 3", image: "" },
  { name: "Sponsor 4", image: "" },
  { name: "Sponsor 5", image: "" },
  { name: "Sponsor 6", image: "" },
  { name: "Sponsor 7", image: "" },
  { name: "Sponsor 8", image: "" },
];

export default function SponsorsPage() {
  return (
    <Layout title="Sponsors" childrenHaveNavbar>
      <PageHero eyebrow="Built With" heading="Our Sponsors" />

      <Box position="relative" pb={24}>
        <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }} maxW="1200px" mx="auto">
          {/* Sponsors Grid */}
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={8}
            w="100%"
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
        </Flex>
      </Box>
    </Layout>
  );
}
