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
    { icon: FaEnvelope, href: "mailto:inspiria@snu.edu.in", label: "Email" },
  ];

  return (
    <Box bg="transparent" color="white" py={10} px={{ base: 6, md: 10 }}>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", md: "center" }}
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 10 }}
      >
        {/* Tagline Section */}
        <Flex
          justifyContent="flex-start"
          textAlign="left"
          mb={{ base: 6, md: 0 }}
          display={{ base: "none", md: "flex" }}
        >
          <Text 
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "lg", md: "xl" }}
            color="#FFFFFF"
            letterSpacing="0.05em"
            opacity={0.9}
          >
            Building Tomorrow<Text as="span" color="#CFAF89">.</Text>
          </Text>
        </Flex>

        {/* Social Media Section */}
        <Flex gap={6} justifyContent={{ base: "flex-start", md: "flex-end" }} w={{ base: "100%", md: "auto" }}>
          {socialMedia.map(({ icon, href, label }, i) => (
            <IconButton
              key={i}
              as="a"
              href={href}
              target="_blank"
              aria-label={label}
              icon={<Icon as={icon} />}
              variant="ghost"
              color="white"
              _hover={{ bg: "#CFAF89", color: "#1A0A29" }}
              size="lg"
            />
          ))}
        </Flex>
      </Flex>

      {/* Copyright Section */}
      <Flex justifyContent="center" mt={8} px={{ base: 4, md: 0 }}>
        <Text fontSize="sm" color="gray.500" textAlign="center" fontFamily="'Proxima Nova', 'Inter', sans-serif">
          © 2026 Business Conclave, Shiv Nadar University. All Rights Reserved.
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;
