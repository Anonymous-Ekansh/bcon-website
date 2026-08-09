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
              mb={6}
            >
              Inspiria is the student-led business society of SNIoE, extending learning beyond the classroom through national-level competitions, keynote sessions, leadership roundtables and workshops. Its flagship event, Business Conclave, welcomes 600+ students each year alongside industry leaders, entrepreneurs and changemakers.
            </Text>
            <Text
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="300"
              color="rgba(255, 255, 255, 0.8)"
              textAlign="center"
              lineHeight="1.8"
              mb={6}
            >
              Inspiria&apos;s flagship annual business festival — keynotes, panel discussions and interactive sessions with industry leaders shaping the future of business.
            </Text>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: 4, md: 8 }}
              justifyContent="center"
              mb={6}
            >
              <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="14px" color="#CFAF89" fontWeight="500" textTransform="uppercase" letterSpacing="0.1em">
                14th November 2026
              </Text>
              <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="14px" color="rgba(255,255,255,0.6)" fontWeight="300">
                Shiv Nadar University, Delhi NCR Campus, Greater Noida
              </Text>
              <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="14px" color="rgba(255,255,255,0.6)" fontWeight="300">
                400–500 curated attendees
              </Text>
            </Flex>
            <Text
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="300"
              color="rgba(255, 255, 255, 0.8)"
              textAlign="center"
              lineHeight="1.8"
            >
              <Text as="span" color="#CFAF89" fontWeight="500">Building Tomorrow</Text> — A generation that chooses to create rather than adapt. Embracing innovation, leading with purpose, turning ideas into meaningful action.
            </Text>
          </Container>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default AboutSection;
