import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type FC } from "react";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
}

const PageHero: FC<PageHeroProps> = ({ eyebrow, heading }) => {
  return (
    <Box position="relative" pt={40} pb={16} bg="transparent">
      <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }} textAlign="center">
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
            animation="trackingIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          >
            {eyebrow}
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
            fontSize={{ base: "40px", md: "56px" }}
            fontWeight="300"
            color="#FFFFFF"
            mb={8}
          >
            {heading.split(" ").map((word, i, arr) => (
              <span key={i} style={{ color: i === arr.length - 1 ? "#CFAF89" : "#FFFFFF" }}>
                {word}{i !== arr.length - 1 ? " " : ""}
              </span>
            ))}
          </Text>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default PageHero;
