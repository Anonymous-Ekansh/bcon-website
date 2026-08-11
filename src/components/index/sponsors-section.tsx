import { Box, Flex, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type FC } from "react";

const currentSponsors = [
  { name: "Foodrik", image: "/images/sponsors/foodrik.png" },
  { name: "DNT (Design Build N Transform)", image: "/images/sponsors/DNT.png" },
  { name: "Shiv Nadar Institution of Eminence", image: "/images/sponsors/shiv-nadar.png" },
  { name: "Campus Bloggers", image: "/images/sponsors/campus-bloggers.png" },
  { name: "Blue Tokai Coffee Roasters", image: "/images/sponsors/blue-tokai.png" },
  { name: "FinLadder", image: "/images/sponsors/finLadder.png" },
  { name: "ED Times", image: "/images/sponsors/EDTimes.png" },
  { name: "The Education Tree", image: "/images/sponsors/TheEducationTree.png" },
  { name: "Asian Roots Skin & Hair Clinic", image: "/images/sponsors/asian-roots.png" },
  { name: "NSE", image: "/images/sponsors/NSE.png" },
  { name: "Bingo!", image: "/images/sponsors/bingo.png" },
  { name: "Xoxoday", image: "/images/sponsors/xoxoday.png" },
  { name: "DHI (Direct Hair Implantation)", image: "/images/sponsors/DHI.png" },
  { name: "Insight Counselling Services", image: "/images/sponsors/insight.png" },
  { name: "Nestlé", image: "/images/sponsors/nestle.png" },
  { name: "First Choice", image: "/images/sponsors/firstchoice.png" },
  { name: "DU Updates", image: "/images/sponsors/DU-Updates.png" },
  { name: "Talerang", image: "/images/sponsors/talerang.png" },
  { name: "Ascend (Harvard Business Review)", image: "/images/sponsors/ascend.png" },
  { name: "Axis Bank", image: "/images/sponsors/axisbank.png" },
  { name: "AIC-SNU (Atal Incubation Centre)", image: "/images/sponsors/aic-snu.png" },
  { name: "Nescafé", image: "/images/sponsors/nescafe.png" },
  { name: "Red Bull", image: "/images/sponsors/red-bull.svg" },
  { name: "Learning While Travelling", image: "/images/sponsors/learning-while-travelling.png" },
  { name: "Brew House Tea Brewing Co.", image: "/images/sponsors/brew-house.png" },
  { name: "Unorthodox Gateau", image: "/images/sponsors/unorthodox-gateau.png" },
  { name: "Zauk (Biryani & More)", image: "/images/sponsors/zauk.png" },
  { name: "Cornitos", image: "/images/sponsors/cornitos.png" },
  { name: "Harvard Business Review", image: "/images/sponsors/harvard-business-review.png" },
  { name: "Mamagoto", image: "/images/sponsors/mamagoto.png" },
  { name: "Tutorage", image: "/images/sponsors/tutorage.png" },
  { name: "Gree Air Conditioner", image: "/images/sponsors/gree.png" },
  { name: "Sole Savvy", image: "/images/sponsors/sole-savvy.png" },
  { name: "Essvee Bath Fittings", image: "/images/sponsors/essvee.png" },
  { name: "Fresca Juices", image: "/images/sponsors/fresca-juices.png" },
  { name: "Crax", image: "/images/sponsors/crax.png" },
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
          {currentSponsors.slice(0, 8).map((sponsor, i) => (
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
                    <Image src={sponsor.image} alt={sponsor.name} h="80px" w="80%" objectFit="contain" />
                  ) : (
                    <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.5)" fontSize="13px" textAlign="center" px={2}>{sponsor.name}</Text>
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
