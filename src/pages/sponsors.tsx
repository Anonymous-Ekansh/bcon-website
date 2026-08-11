import { Box, Flex, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";

const currentSponsors = [
  { name: "Foodrik", image: "/images/sponsors/foodrik.png", colSpan: 1, rowSpan: 1 },
  { name: "DNT (Design Build N Transform)", image: "/images/sponsors/DNT.png", colSpan: 1, rowSpan: 1 },
  { name: "Shiv Nadar Institution of Eminence", image: "/images/sponsors/shiv-nadar.png", colSpan: 2, rowSpan: 1 },
  { name: "Campus Bloggers", image: "/images/sponsors/campus-bloggers.png", colSpan: 1, rowSpan: 1 },
  { name: "Blue Tokai Coffee Roasters", image: "/images/sponsors/blue-tokai.png", colSpan: 1, rowSpan: 1 },

  { name: "FinLadder", image: "/images/sponsors/finLadder.png", colSpan: 2, rowSpan: 1 },
  { name: "ED Times", image: "/images/sponsors/EDTimes.png", colSpan: 1, rowSpan: 1 },
  { name: "The Education Tree", image: "/images/sponsors/TheEducationTree.png", colSpan: 1, rowSpan: 1 },
  { name: "Asian Roots Skin & Hair Clinic", image: "/images/sponsors/asian-roots.png", colSpan: 2, rowSpan: 1 },

  { name: "NSE", image: "/images/sponsors/NSE.png", colSpan: 2, rowSpan: 1 },
  { name: "Bingo!", image: "/images/sponsors/bingo.png", colSpan: 1, rowSpan: 1 },
  { name: "Xoxoday", image: "/images/sponsors/xoxoday.png", colSpan: 1, rowSpan: 1 },
  { name: "DHI (Direct Hair Implantation)", image: "/images/sponsors/DHI.png", colSpan: 2, rowSpan: 1 },

  { name: "Insight Counselling Services", image: "/images/sponsors/insight.png", colSpan: 1, rowSpan: 1 },
  { name: "Nestlé", image: "/images/sponsors/nestle.png", colSpan: 1, rowSpan: 1 },
  { name: "First Choice", image: "/images/sponsors/firstchoice.png", colSpan: 2, rowSpan: 1 },
  { name: "Axis Bank", image: "/images/sponsors/axisbank.png", colSpan: 2, rowSpan: 2 },
  
  { name: "DU Updates", image: "/images/sponsors/DU-Updates.png", colSpan: 1, rowSpan: 1 },
  { name: "Talerang", image: "/images/sponsors/talerang.png", colSpan: 1, rowSpan: 1 },
  { name: "Ascend (Harvard Business Review)", image: "/images/sponsors/ascend.png", colSpan: 2, rowSpan: 1 },

  { name: "AIC-SNU (Atal Incubation Centre)", image: "/images/sponsors/aic-snu.png", colSpan: 2, rowSpan: 1 },
  { name: "Nescafé", image: "/images/sponsors/nescafe.png", colSpan: 2, rowSpan: 1 },
  { name: "Red Bull", image: "/images/sponsors/red-bull.svg", colSpan: 2, rowSpan: 1 },

  { name: "Learning While Travelling", image: "/images/sponsors/learning-while-travelling.png", colSpan: 1, rowSpan: 1 },
  { name: "Brew House Tea Brewing Co.", image: "/images/sponsors/brew-house.png", colSpan: 1, rowSpan: 1 },
  { name: "Unorthodox Gateau", image: "/images/sponsors/unorthodox-gateau.png", colSpan: 1, rowSpan: 1 },
  { name: "Zauk (Biryani & More)", image: "/images/sponsors/zauk.png", colSpan: 2, rowSpan: 1 },
  { name: "Cornitos", image: "/images/sponsors/cornitos.png", colSpan: 1, rowSpan: 1 },

  { name: "Harvard Business Review", image: "/images/sponsors/harvard-business-review.png", colSpan: 2, rowSpan: 1 },
  { name: "Mamagoto", image: "/images/sponsors/mamagoto.png", colSpan: 2, rowSpan: 1 },
  { name: "Tutorage", image: "/images/sponsors/tutorage.png", colSpan: 1, rowSpan: 1 },
  { name: "Gree Air Conditioner", image: "/images/sponsors/gree.png", colSpan: 1, rowSpan: 1 },

  { name: "Sole Savvy", image: "/images/sponsors/sole-savvy.png", colSpan: 2, rowSpan: 1 },
  { name: "Essvee Bath Fittings", image: "/images/sponsors/essvee.png", colSpan: 1, rowSpan: 1 },
  { name: "Fresca Juices", image: "/images/sponsors/fresca-juices.png", colSpan: 2, rowSpan: 1 },
  { name: "Crax", image: "/images/sponsors/crax.png", colSpan: 1, rowSpan: 1 },
];

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
