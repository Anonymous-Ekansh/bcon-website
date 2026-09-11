import { Box, Flex, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";
import { sponsors as currentSponsors } from "~/data/sponsors";


export default function SponsorsPage() {
  return (
    <Layout title="Sponsors">
      <PageHero eyebrow="Built With" heading="Our Sponsors" />

      <Box position="relative" pb={24}>
        <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }} maxW="1200px" mx="auto">
          {/* Sponsors Grid */}
          <Grid
            templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(6, 1fr)" }}
            autoFlow="row dense"
            gap={{ base: 3, md: 5 }}
            w="100%"
          >
            {currentSponsors.map((sponsor, i) => (
              <GridItem key={i} colSpan={sponsor.colSpan} rowSpan={sponsor.rowSpan}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  style={{ height: "100%" }}
                >
                  <Flex
                    w="100%"
                    h="100%"
                    p={4}
                    bg="rgba(255, 255, 255, 0.9)"
                    borderRadius="15px"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    _hover={{
                      transform: "scale(1.05) translateY(-5px)",
                      bg: "rgba(255, 255, 255, 1)",
                      filter: "drop-shadow(0 15px 25px rgba(207, 175, 137, 0.3))",
                      zIndex: 10,
                    }}
                  >
                    {sponsor.image ? (
                      <Image 
                        src={sponsor.image} 
                        alt={sponsor.name} 
                        h={sponsor.rowSpan === 2 ? { base: "140px", md: "240px" } : { base: "70px", md: "110px" }} 
                        w="100%" 
                        objectFit="contain"
                      />
                    ) : (
                      <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.5)" fontSize="13px" textAlign="center" px={2}>{sponsor.name}</Text>
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
