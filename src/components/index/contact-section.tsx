import { Box, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type FC } from "react";

const organizers = [
  {
    name: "John Doe",
    role: "Convener",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
  },
  {
    name: "Jane Smith",
    role: "Co-Convener",
    email: "jane.smith@example.com",
    phone: "+91 98765 43211",
  },
  {
    name: "Alex Johnson",
    role: "Head of Operations",
    email: "alex.j@example.com",
    phone: "+91 98765 43212",
  },
  {
    name: "Sarah Williams",
    role: "Head of Marketing",
    email: "sarah.w@example.com",
    phone: "+91 98765 43213",
  },
];

const ContactSection: FC = () => {
  return (
    <Box id="contact" bg="transparent" position="relative" pt={32} pb={24}>
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
            Get In Touch
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
            Contact <span style={{ color: "#CFAF89" }}>Us</span>
          </Text>
        </motion.div>

        {/* Contact Cards Grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={6}
          w="100%"
        >
          {organizers.map((person, i) => (
            <GridItem key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <Flex
                  flexDir="column"
                  bg="rgba(255, 255, 255, 0.05)"
                  borderRadius="15px"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  p={8}
                  transition="all 0.4s ease"
                  _hover={{
                    borderColor: "rgba(207, 175, 137, 0.5)",
                    bg: "rgba(255, 255, 255, 0.07)",
                    transform: "translateY(-5px)",
                  }}
                >
                  <Text
                    fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                    fontSize="24px"
                    color="#CFAF89"
                    mb={2}
                  >
                    {person.name}
                  </Text>
                  <Text
                    fontFamily="'Proxima Nova', 'Inter', sans-serif"
                    fontSize="16px"
                    fontWeight="500"
                    color="white"
                    mb={6}
                  >
                    {person.role}
                  </Text>
                  
                  <Flex flexDir="column" gap={2}>
                    <Text
                      as="a"
                      href={`mailto:${person.email}`}
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize="14px"
                      color="rgba(255,255,255,0.7)"
                      _hover={{ color: "white", textDecoration: "underline" }}
                    >
                      {person.email}
                    </Text>
                    <Text
                      as="a"
                      href={`tel:${person.phone}`}
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize="14px"
                      color="rgba(255,255,255,0.7)"
                      _hover={{ color: "white" }}
                    >
                      {person.phone}
                    </Text>
                  </Flex>
                </Flex>
              </motion.div>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default ContactSection;
