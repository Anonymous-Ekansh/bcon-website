import { Box, Flex, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type FC } from "react";

const AboutSection: FC = () => {
  return (
    <Box id="about" bg="transparent" position="relative" pt={32} pb={16}>
      <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }}>
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
            animation="trackingIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          >
            Who We Are
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
            mb={8}
            textAlign="center"
          >
            About <span style={{ color: "#CFAF89" }}>Business Conclave</span>
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Container maxW="800px" p={0}>
            <Text
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="300"
              color="rgba(255, 255, 255, 0.8)"
              textAlign="center"
              lineHeight="1.8"
            >
              Business Conclave is Shiv Nadar Institution of Eminence&apos;s flagship business and management festival. 
              We bring together brilliant minds, industry leaders, and aspiring entrepreneurs to engage in meaningful 
              discussions, challenging competitions, and insightful workshops. Join us to explore new horizons in 
              the ever-evolving landscape of business.
            </Text>
          </Container>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default AboutSection;
