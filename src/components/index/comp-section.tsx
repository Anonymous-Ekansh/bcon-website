import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { type FC, useState } from "react";

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
  buttonText,
  image,
  link,
  isInView,
}) => (
  <GridItem
    as={motion.div}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={cardVariants}
    whileHover={{ scale: 1.05 }}
    transition="0.3s"
    overflow="hidden"
    borderRadius="12px"
    boxShadow="lg"
    bg="#1c1c1c"
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
        fontFamily="Satoshi"
        fontSize={{ base: "lg", md: "xl" }}
        color="orange.400"
        fontWeight="bold"
        mb={4}
        textAlign="center"
      >
        {title}
      </Text>
      <Button
        fontFamily="Satoshi"
        bg="orange.400"
        color="white"
        _hover={{ bg: "orange.500" }}
        borderRadius="full"
        fontWeight="bold"
        w="80%"
        onClick={() => window.open(link, "_blank")}
        mb={4}
      >
        {buttonText}
      </Button>
      <Flex justify="space-between" w="100%" px={4} fontFamily="Satoshi">
        <Text color="#B5B5B5">{price}</Text>
        <Text color="#B5B5B5">{date}</Text>
      </Flex>
    </Flex>
  </GridItem>
);

// Competition Section component
const CompetitionSection: FC = () => {
  const [] = useState(
    Array(competitions.length).fill(false)
  );

  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      id="competitions"
      bg="#232323"
      py={{ base: 8, md: 16 }}
      px={{ base: 4, md: 8 }}
    >
      <Flex direction="column" maxW="60rem" mx="auto" align="center">
        <Text
          fontFamily="Satoshi"
          fontSize={{ base: "2xl", md: "4xl" }}
          color="orange.400"
          fontWeight="bold"
          textAlign="center"
          mb={{ base: 6, md: 12 }}
        >
          Our Competitions
        </Text>
        <Grid
          ref={gridRef}
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          w="100%"
        >
          {competitions.map((competition, i) => (
            <CompetitionCard key={i} {...competition} isInView={gridInView} />
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default CompetitionSection;
