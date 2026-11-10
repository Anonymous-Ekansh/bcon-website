import { Box, Flex, Text, IconButton, Icon } from "@chakra-ui/react";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  const socialMedia = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/snioebusinessconclave/",
      label: "Instagram",
    },
    {
      icon: FaLinkedin,
      href: "https://in.linkedin.com/company/snioe-business-conclave",
      label: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      href: "mailto:inspiria.scs@snu.edu.in",
      label: "Email",
    },
  ];

  return (
    <Box
      as="footer"
      position="relative"
      zIndex={2}
      bg="transparent"
      color="white"
      pt={{ base: 10, md: 12 }}
      pb={{ base: 8, md: 10 }}
      px={{ base: 5, sm: 8, md: 10 }}
      borderTop="1px solid rgba(207, 175, 137, 0.14)"
    >
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxW="1160px"
        mx="auto"
        gap={{ base: 5, md: 4 }}
      >
        <Flex justifyContent={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }}>
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "lg", md: "xl" }}
            color="#FFFFFF"
            letterSpacing="0.05em"
            opacity={0.92}
          >
            Building Tomorrow<Text as="span" color="#CFAF89">.</Text>
          </Text>
        </Flex>

        <Flex gap={4} justifyContent={{ base: "center", md: "flex-end" }}>
          {socialMedia.map(({ icon, href, label }, i) => (
            <IconButton
              key={i}
              as="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              icon={<Icon as={icon} />}
              variant="ghost"
              color="white"
              borderRadius="full"
              border="1px solid rgba(255, 255, 255, 0.1)"
              bg="rgba(255, 255, 255, 0.03)"
              _hover={{
                bg: "#CFAF89",
                color: "#1A0A29",
                borderColor: "#CFAF89",
                transform: "translateY(-2px)",
              }}
              transition="all 0.25s ease"
              size="md"
            />
          ))}
        </Flex>
      </Flex>

      <Flex justifyContent="center" mt={{ base: 6, md: 8 }} px={4}>
        <Text
          fontSize={{ base: "xs", sm: "sm" }}
          color="rgba(255, 255, 255, 0.5)"
          textAlign="center"
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
        >
          © 2026 Business Conclave, Shiv Nadar University. All Rights Reserved.
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;
