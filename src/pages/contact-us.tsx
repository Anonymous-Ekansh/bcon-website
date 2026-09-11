import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";

const organizers = [
  {
    name: "Arsh Baruah",
    role: "Chairperson",
    phone: "+91 97735 52877",
  },
  {
    name: "Vaanya Khosla",
    role: "Co Chairperson",
    phone: "+91 85100 13355",
  },
  {
    name: "Adityavardhan",
    role: "Managing Director",
    phone: "+91 98118 23301",
  },
  {
    name: "Shaurya Dani",
    role: "Executive Director",
    phone: "+91 98116 77965",
  },
  {
    name: "Adhiraj Singh",
    role: "Senior Director",
    phone: "+91 99539 06182",
  },
];

export default function ContactUsPage() {
  return (
    <Layout title="Contact Us">
      <PageHero eyebrow="Get In Touch" heading="Contact Us" />
      
      <Box position="relative" pb={24}>
        <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }} maxW="1200px" mx="auto">
          {/* Contact Cards Grid */}
          <Flex
            flexWrap="wrap"
            justifyContent="center"
            gap={6}
            w="100%"
          >
            {organizers.map((person, i) => (
              <Box 
                key={i}
                w={{ 
                  base: "100%", 
                  md: "calc((100% - 24px) / 2)", 
                  lg: "calc((100% - 72px) / 4)" 
                }}
              >
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
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}
