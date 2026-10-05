/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { Box, Flex, Text, Image, usePrefersReducedMotion } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { type FC } from "react";
import { sponsors as currentSponsors } from "~/data/sponsors";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const SponsorsSection: FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion ? undefined : `${scroll} 40s linear infinite`;

  const homeSponsorNames = [
    "AMD",
    "CocaCola",
    "Brew House Tea Brewing Co.",
    "Nescafé",
    "Nestlé",
    "NSE",
    "Shiv Nadar Institution of Eminence",
    "Red Bull",
  ];
  const homeSponsors = homeSponsorNames
    .map((name) => currentSponsors.find((s) => s.name === name))
    .filter(Boolean) as typeof currentSponsors;

  // Duplicate for seamless infinite scrolling
  const marqueeSponsors = [...homeSponsors, ...homeSponsors];

  return (
    <Box id="sponsors" bg="transparent" position="relative" pt={32} pb={16} overflow="hidden">
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

        {/* Infinite Marquee Container */}
        <Box w="100vw" maxW="100vw" overflow="hidden" position="relative" mb={20} left="50%" right="50%" ml="-50vw" mr="-50vw">
          {/* Gradient Masks */}
          <Box position="absolute" left={0} top={0} bottom={0} w="100px" bg="linear-gradient(to right, #050505, transparent)" zIndex={2} pointerEvents="none" />
          <Box position="absolute" right={0} top={0} bottom={0} w="100px" bg="linear-gradient(to left, #050505, transparent)" zIndex={2} pointerEvents="none" />

          <Flex
            w="fit-content"
            animation={animation}
            _hover={{ animationPlayState: "paused" }}
          >
            {marqueeSponsors.map((sponsor, i) => (
              <Flex
                key={i}
                w={{ base: "180px", md: "250px" }}
                h={{ base: "80px", md: "100px" }}
                p={{ base: 2, md: 3 }}
                mx={{ base: 3, md: 6 }}
                bg="rgba(255, 255, 255, 0.03)"
                borderRadius="15px"
                border="1px solid rgba(255, 255, 255, 0.1)"
                alignItems="center"
                justifyContent="center"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: "scale(1.05) translateY(-5px)",
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(207, 175, 137, 0.5)",
                  boxShadow: "0 15px 25px rgba(207, 175, 137, 0.15)",
                }}
                flexShrink={0}
              >
                {sponsor.image ? (
                  <Image 
                    src={sponsor.image} 
                    alt={sponsor.name} 
                    h="100%" 
                    w="100%" 
                    objectFit="contain" 
                    filter="grayscale(100%) brightness(200%)"
                    _hover={{ filter: "grayscale(0%) brightness(100%)" }}
                    transition="all 0.3s ease"
                    transform={sponsor.scale ? `scale(${sponsor.scale})` : "none"}
                  />
                ) : (
                  <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.5)" fontSize="13px" textAlign="center" px={2}>{sponsor.name}</Text>
                )}
              </Flex>
            ))}
          </Flex>
        </Box>

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
