import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { type FC, useState, useRef, useEffect } from "react";

// Competition data interface
interface Competition {
  title: string;
  date: string;
  price: string;
  buttonText: string;
  image: string;
  link: string;
}

// Competitions array
const competitions: Competition[] = [
  {
    title: "BizQuest: The Ultimate Business Simulation",
    date: "9 November 2024",
    price: "FREE",
    buttonText: "Apply Now",
    image: "/images/landing/competitions/bizquest.png",
    link: "https://unstop.com/competitions/crisis-management-bizquest-shiv-nadar-university-snu-greater-noida-1177416",
  },
  {
    title: "Brand Masters: Rebranding Challenge",
    date: "7 November 2024",
    price: "FREE",
    buttonText: "Apply Now",
    image: "/images/landing/competitions/brandmasters.jpg",
    link: "https://unstop.com/o/zs5owq8?lb=x7uScpG&utm_medium=Share&utm_source=shortUrl",
  },
  {
    title: "Pitch Perfect: Business Idea Challenge",
    date: "9 November 2024",
    price: "FREE",
    buttonText: "Apply Now",
    image: "/images/landing/competitions/pitchperfect.png",
    link: "https://unstop.com/competitions/pitch-perfect-business-idea-challenge-the-business-conclave-2024-shiv-nadar-university-snu-greater-noida-1177413",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Define props type for CompetitionCard
interface CompetitionCardProps extends Competition {
  isInView: boolean;
}

// Competition Card component
const CompetitionCard: FC<CompetitionCardProps> = ({
  title,
  date,
  price,
  image,
  isInView,
}) => (
  <GridItem
    as={motion.div}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={cardVariants}
    whileHover={{ scale: 1.02, boxShadow: "0px 20px 40px rgba(186, 39, 206, 0.15)" }}
    transition="all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    overflow="hidden"
    borderRadius="12px"
    boxShadow="lg"
    bg="rgba(255, 255, 255, 0.05)"
    backdropFilter="blur(10px)"
    border="1px solid rgba(255,255,255,0.1)"
    maxW="100%"
  >
    <Box position="relative" overflow="hidden" borderRadius="12px">
      <Image src={image} alt={title} objectFit="cover" w="100%" h="250px" />
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.4)"
      />
    </Box>
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      p={8}
      mt={-4}
      borderRadius="12px"
    >
      <Text
        fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
        fontSize={{ base: "lg", md: "xl" }}
        color="#CFAF89"
        fontWeight="300"
        mb={4}
        textAlign="center"
      >
        {title}
      </Text>
      <Flex justify="space-between" w="100%" px={4} fontFamily="'Proxima Nova', 'Inter', sans-serif">
        <Text color="rgba(255, 255, 255, 0.6)">{price}</Text>
        <Text color="rgba(255, 255, 255, 0.6)">{date}</Text>
      </Flex>
    </Flex>
  </GridItem>
);

// Competition Section component
const CompetitionSection: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple the competitions to create a seamless infinite loop illusion
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
          Our <span style={{ color: "#CFAF89" }}>Competitions</span>
        </Text>
        
        {/* Mobile Swipe Text */}
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

        {/* Desktop Grid */}
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

        {/* Mobile Carousel */}
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
      </Flex>
    </Box>
  );
};

export default CompetitionSection;
