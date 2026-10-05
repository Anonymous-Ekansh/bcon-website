import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { type FC, useState, useRef, useEffect } from "react";
interface Competition {
  title: string;
  date: string;
  price: string;
  buttonText: string;
  image: string;
  link: string;
}
const competitions: Competition[] = [
  {
    title: "BizQuest: The Ultimate Business Simulation",
    date: "14 November 2026",
    price: "FREE",
    buttonText: "Apply Now",
    image: "/images/landing/competitions/bizquest.png",
    link: "https://unstop.com/competitions/crisis-management-bizquest-shiv-nadar-university-snu-greater-noida-1177416",
  },
  {
    title: "Brand Masters: Rebranding Challenge",
    date: "13 November 2026",
    price: "FREE",
    buttonText: "Apply Now",
    image: "/images/landing/competitions/brandmasters.jpg",
    link: "https://unstop.com/o/zs5owq8?lb=x7uScpG&utm_medium=Share&utm_source=shortUrl",
  },
  {
    title: "Pitch Perfect: Business Idea Challenge",
    date: "14 November 2026",
    price: "FREE",
    buttonText: "Apply Now",
    image: "/images/landing/competitions/pitchperfect.png",
    link: "https://unstop.com/competitions/pitch-perfect-business-idea-challenge-the-business-conclave-2024-shiv-nadar-university-snu-greater-noida-1177413",
  },
];
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
interface CompetitionCardProps extends Competition {
  isInView: boolean;
}

const CompetitionCard: FC<CompetitionCardProps> = ({
  title,
  date,
  price,
  image,
  link,
  isInView,
}) => (
  <GridItem
    as={motion.a}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={cardVariants}
    whileHover={{ y: -10, boxShadow: "0px 20px 40px rgba(207, 175, 137, 0.2)" }}
    transition="all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    position="relative"
    display="block"
    h="400px"
    w="100%"
    borderRadius="24px"
    overflow="hidden"
    role="group"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      zIndex={0}
      _groupHover={{ transform: "scale(1.05)" }}
      transition="transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
    >
      <Image fallback={<Skeleton w="100%" h="100%" startColor="rgba(255,255,255,0.05)" endColor="rgba(255,255,255,0.15)" />} src={image} alt={title} objectFit="cover" w="100%" h="100%" />
      <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)" />
      <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="rgba(0,0,0,0.2)" transition="all 0.4s ease" _groupHover={{ bg: "rgba(0,0,0,0.4)" }} />
    </Box>
    <Flex
      position="relative"
      zIndex={1}
      h="100%"
      flexDir="column"
      justify="flex-end"
      p={8}
    >
      <Flex gap={3} mb={4} opacity={0.9} transform="translateY(20px)" transition="all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" _groupHover={{ transform: "translateY(0)" }}>
        <Box bg="rgba(255,255,255,0.15)" backdropFilter="blur(10px)" px={4} py={1.5} borderRadius="full" border="1px solid rgba(255,255,255,0.2)">
          <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="12px" fontWeight="600" color="white" textTransform="uppercase" letterSpacing="0.05em">
            {date}
          </Text>
        </Box>
        <Box bg="rgba(207, 175, 137, 0.2)" backdropFilter="blur(10px)" px={4} py={1.5} borderRadius="full" border="1px solid rgba(207, 175, 137, 0.3)">
          <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="12px" fontWeight="600" color="#CFAF89" textTransform="uppercase" letterSpacing="0.05em">
            {price}
          </Text>
        </Box>
      </Flex>

      <Text
        fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
        fontSize={{ base: "24px", md: "28px" }}
        color="#FFFFFF"
        fontWeight="300"
        lineHeight="1.2"
        mb={4}
        transform="translateY(20px)"
        transition="all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s"
        _groupHover={{ transform: "translateY(0)" }}
      >
        {title}
      </Text>
      <Flex align="center" gap={2} opacity={0} transform="translateY(20px)" transition="all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s" _groupHover={{ opacity: 1, transform: "translateY(0)" }}>
        <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="14px" fontWeight="600" color="#CFAF89" textTransform="uppercase" letterSpacing="0.1em">
          Apply Now
        </Text>
        <Box w="24px" h="1px" bg="#CFAF89" transition="width 0.3s ease" _groupHover={{ w: "40px" }} />
      </Flex>
    </Flex>
    <Box position="absolute" top={0} left={0} w="100%" h="100%" borderRadius="24px" border="1px solid rgba(255,255,255,0.1)" pointerEvents="none" transition="all 0.4s ease" _groupHover={{ border: "1px solid rgba(207, 175, 137, 0.5)", boxShadow: "inset 0 0 40px rgba(207, 175, 137, 0.2)" }} />
  </GridItem>
);
const CompetitionSection: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const displayCompetitions = [...competitions, ...competitions, ...competitions];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const singleSetWidth = scrollWidth / 3;

        if (scrollLeft >= singleSetWidth * 2 - clientWidth) {
          scrollRef.current.scrollTo({ left: scrollLeft - singleSetWidth, behavior: "auto" });
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              scrollRef.current?.scrollBy({ left: clientWidth * 0.85, behavior: "smooth" });
            });
          });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      id="competitions"
      bg="transparent"
      py={{ base: 8, md: 16 }}
      px={{ base: 4, md: 8 }}
    >
      <Flex direction="column" maxW="60rem" mx="auto" align="center">
        <Text
          fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
          fontSize={{ base: "3xl", md: "5xl" }}
          color="#FFFFFF"
          fontWeight="300"
          textAlign="center"
          mb={{ base: 2, md: 12 }}
        >
          Our Past <span style={{ color: "#CFAF89" }}>Competitions</span>
        </Text>
        <Text
          display={{ base: "block", md: "none" }}
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
        <Grid
          ref={gridRef}
          templateColumns="repeat(3, 1fr)"
          gap={8}
          w="100%"
          display={{ base: "none", md: "grid" }}
        >
          {competitions.map((competition, i) => (
            <CompetitionCard key={i} {...competition} isInView={gridInView} />
          ))}
        </Grid>
        <Flex
          ref={scrollRef}
          w="100%"
          overflowX="auto"
          display={{ base: "flex", md: "none" }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 4000);
          }}
          sx={{
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
          gap={5}
          pb={8}
        >
          {displayCompetitions.map((competition, i) => (
            <Box
              key={i}
              minW="85vw"
              maxW="85vw"
              scrollSnapAlign="center"
            >
              <CompetitionCard {...competition} isInView={true} />
            </Box>
          ))}
        </Flex>
        <Text
          mt={{ base: 10, md: 16 }}
          fontFamily="'Cinzel', serif"
          fontSize={{ base: "20px", md: "28px" }}
          color="#CFAF89"
          fontWeight="400"
          textAlign="center"
          letterSpacing="0.05em"
        >
          Coming soon ... Stay Tuned
        </Text>
      </Flex>
    </Box>
  );
};

export default CompetitionSection;
