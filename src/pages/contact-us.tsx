import { Box, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";

const organizers = [
  {
    name: "Arsh Baruah",
    role: "Chairperson",
    phone: "+91 97735 52877",
  },
  {
    name: "Vaanya Bansal",
    role: "Co Chairperson",
    phone: "+91 85100 13355",
  },
  {
    name: "Adityavardhan Sood",
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


          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 4, md: 6 }} w="100%" mb={{ base: 10, md: 16 }}>
            <GridItem as={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 } as unknown as string}>
              <Flex flexDir="column" bg="rgba(255, 255, 255, 0.03)" borderRadius="20px" p={{ base: 6, md: 10 }} border="1px solid rgba(255, 255, 255, 0.05)" h="100%" position="relative" overflow="hidden" _hover={{ borderColor: "rgba(207, 175, 137, 0.3)", bg: "rgba(255, 255, 255, 0.05)" }} transition="all 0.4s ease">
                <Box position="absolute" top="-20px" right="-20px" opacity={0.1} color="#CFAF89">
                  <Mail size={120} />
                </Box>
                <Flex align="center" gap={4} mb={{ base: 4, md: 6 }}>
                  <Flex align="center" justify="center" w={{ base: "40px", md: "50px" }} h={{ base: "40px", md: "50px" }} borderRadius="full" bg="rgba(207, 175, 137, 0.1)" color="#CFAF89">
                    <Mail size={20} />
                  </Flex>
                  <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "20px", md: "24px" }} color="white">General Inquiries</Text>
                </Flex>
                <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize={{ base: "15px", md: "18px" }} color="rgba(255,255,255,0.7)" mb={4}>
                  For any general questions about the conclave.
                </Text>
                <Text as="a" href="mailto:inspiria.scs@snu.edu.in" fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize={{ base: "16px", md: "20px" }} color="#CFAF89" fontWeight="500" mt="auto" _hover={{ textDecoration: "underline" }}>
                  inspiria.scs@snu.edu.in
                </Text>
              </Flex>
            </GridItem>
            <GridItem as={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 } as unknown as string}>
              <Flex flexDir="column" bg="rgba(255, 255, 255, 0.03)" borderRadius="20px" p={{ base: 6, md: 10 }} border="1px solid rgba(255, 255, 255, 0.05)" h="100%" position="relative" overflow="hidden" _hover={{ borderColor: "rgba(207, 175, 137, 0.3)", bg: "rgba(255, 255, 255, 0.05)" }} transition="all 0.4s ease">
                <Box position="absolute" top="-20px" right="-20px" opacity={0.1} color="#CFAF89">
                  <MapPin size={120} />
                </Box>
                <Flex align="center" gap={4} mb={{ base: 4, md: 6 }}>
                  <Flex align="center" justify="center" w={{ base: "40px", md: "50px" }} h={{ base: "40px", md: "50px" }} borderRadius="full" bg="rgba(207, 175, 137, 0.1)" color="#CFAF89">
                    <MapPin size={20} />
                  </Flex>
                  <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "20px", md: "24px" }} color="white">Location</Text>
                </Flex>
                <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize={{ base: "15px", md: "18px" }} color="rgba(255,255,255,0.7)" mb={2} lineHeight="1.6">
                  G Block, Shiv Nadar Institution of Eminence<br />
                  NH91, Tehsil Dadri, Greater Noida<br />
                  Uttar Pradesh - 201314
                </Text>
              </Flex>
            </GridItem>
          </Grid>

          <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "26px", md: "32px" }} color="white" mb={{ base: 6, md: 10 }} alignSelf="flex-start">
            Organizing <span style={{ color: "#CFAF89" }}>Committee</span>
          </Text>


          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={{ base: 4, md: 6 }}
            w="100%"
          >
            {organizers.map((person, i) => (
              <GridItem key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  style={{ height: '100%' }}
                >
                  <Flex
                    flexDir="column"
                    h="100%"
                    bg="rgba(255, 255, 255, 0.02)"
                    borderRadius="20px"
                    border="1px solid rgba(255, 255, 255, 0.05)"
                    p={{ base: 6, md: 8 }}
                    transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                    position="relative"
                    overflow="hidden"
                    role="group"
                    _hover={{
                      borderColor: "rgba(207, 175, 137, 0.4)",
                      bg: "rgba(207, 175, 137, 0.03)",
                      transform: "translateY(-5px)",
                      boxShadow: "0px 20px 40px rgba(0,0,0,0.3)"
                    }}
                  >
                    <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="linear-gradient(135deg, rgba(207, 175, 137, 0.1) 0%, transparent 100%)" opacity={0} transition="opacity 0.4s" _groupHover={{ opacity: 1 }} />
                    <Box position="relative" zIndex={1}>
                      <Text
                        fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                        fontSize={{ base: "22px", md: "24px", lg: "22px", xl: "24px" }}
                        color="#CFAF89"
                        mb={1}
                      >
                        {person.name}
                      </Text>
                      <Text
                        fontFamily="'Proxima Nova', 'Inter', sans-serif"
                        fontSize={{ base: "13px", md: "15px" }}
                        letterSpacing="0.05em"
                        textTransform="uppercase"
                        fontWeight="600"
                        color="rgba(255,255,255,0.6)"
                        mb={{ base: 6, md: 8 }}
                      >
                        {person.role}
                      </Text>

                      <Flex align="center" gap={3} mt="auto">
                        <Flex align="center" justify="center" w="36px" h="36px" borderRadius="full" bg="rgba(255,255,255,0.05)" color="white" transition="all 0.3s" _groupHover={{ bg: "#CFAF89", color: "black" }}>
                          <Phone size={16} />
                        </Flex>
                        <Text
                          as="a"
                          href={`tel:${person.phone}`}
                          fontFamily="'Proxima Nova', 'Inter', sans-serif"
                          fontSize="16px"
                          fontWeight="500"
                          color="rgba(255,255,255,0.8)"
                          _hover={{ color: "white" }}
                        >
                          {person.phone}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </motion.div>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </Layout>
  );
}
