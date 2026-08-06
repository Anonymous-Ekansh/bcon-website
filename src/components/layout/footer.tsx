import { Box, Flex, Text, IconButton, Link, Icon } from "@chakra-ui/react";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation"; // Import hooks

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "About", href: "#about" },
  { title: "Speakers", href: "#speakers" },
  { title: "Events", href: "#events" },
  { title: "Competitions", href: "#competitions" },
  { title: "Past Conferences", href: "past-conferences" },
  { title: "Sponsors", href: "sponsors" },
  { title: "Contact", href: "contact-us" },
];

function Footer() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href.startsWith("/") ? href : `/${href}`);
    }
  };

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
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 10 }} // Added horizontal padding for mobile
      >
        {/* Links Section */}
        <Flex
          gap={10}
          flexWrap="wrap"
          justifyContent="center"
          textAlign="center" // Center align links for mobile
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
        >
          {navItems.map(({ title, href }, i) => (
            <Link
              key={i}
              href={href}
              color="white"
              _hover={{ textDecoration: "underline" }}
              onClick={(e) => handleNavClick(e, href)} // Handle nav click
            >
              {title}
            </Link>
          ))}
        </Flex>

        {/* Social Media Section */}
        <Flex gap={6} mt={{ base: 6, md: 0 }} justifyContent="center">
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
