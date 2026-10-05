"use client";
import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Icon,
  IconButton,
  VStack,
  Link as ChakraLink,
  useDisclosure,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "About", href: "#about" },
  { title: "Past Speakers", href: "#speakers" },
  { title: "Events", href: "#events" },
  { title: "Competitions", href: "#competitions" },
  { title: "Sponsors", href: "sponsors" },
  { title: "Contact", href: "contact-us" },
];

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const target = document.querySelector(href);
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href.startsWith("/") ? href : `/${href}`);
    }
  };

  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0" 
      right="0" 
      zIndex="1000"
      bg={scrolled ? "rgba(45, 17, 71, 0.8)" : "transparent"}
      backdropFilter={scrolled ? "blur(12px)" : "none"}
      borderBottom={scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent"}
      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
    >
      <Flex
        as="nav"
        alignItems="center"
        justify="space-between"
        maxW="1536px"
        mx="auto"
        py={scrolled ? 3 : 5}
        px={8}
        transition="padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        <Box cursor="pointer" onClick={() => router.push("/")} transition="transform 0.3s ease" _hover={{ transform: "scale(1.05)" }}>
          <Image
            alt="Business Conclave × Shiv Nadar University"
            h={{ base: 8, md: 12 }}
            src="/images/bcon-x-snu-navbar.png"
          />
        </Box>

        {isMobile ? (
          <>
            <IconButton
              aria-label="Open Menu"
              icon={<Icon as={FiMenu} boxSize={7} />}
              onClick={onOpen}
              size="md"
              variant="ghost"
              position="relative"
              zIndex="20"
              color="white"
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
            />
            <Drawer isOpen={isOpen} placement="top" onClose={onClose} size="full">
              <DrawerOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(8px)" />
              <DrawerContent bg="rgba(45, 17, 71, 0.95)" backdropFilter="blur(16px)" borderBottomRadius="3xl">
                <DrawerCloseButton mt={6} mr={5} color="white" size="lg" />
                <VStack spacing={8} align="center" mt={24} p={6}>
                  {navItems.map((item, index) => (
                    <ChakraLink
                      key={index}
                      href={item.href}
                      color="white"
                      fontSize="2xl"
                      fontWeight="400"
                      fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        onClose();
                      }}
                      _hover={{ color: "#CFAF89", textDecoration: "none" }}
                    >
                      {item.title}
                    </ChakraLink>
                  ))}

                  <VStack spacing={4} w="100%" pt={8}>
                    <Button
                      as="a"
                      href="https://forms.rishabhj.in/bcon"
                      target="_blank"
                      bg="#CFAF89"
                      color="#2D1147"
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontWeight="600"
                      size="lg"
                      _hover={{ bg: "white", transform: "translateY(-2px)" }}
                      transition="all 0.3s ease"
                      w="80%"
                      borderRadius="full"
                    >
                      Register Now
                    </Button>
                  </VStack>
                </VStack>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Flex flex="1" justify="center" alignItems="center" fontFamily="'Proxima Nova', 'Inter', sans-serif" gap={10}>
            {navItems.map(({ title, href }, i) => (
              <ChakraLink
                key={i}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                fontSize="15px"
                fontWeight="500"
                color="rgba(255, 255, 255, 0.8)"
                letterSpacing="0.05em"
                textTransform="uppercase"
                position="relative"
                _hover={{ color: "#CFAF89", textDecoration: "none" }}
                sx={{
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "1px",
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bg: "#CFAF89",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  }
                }}
              >
                {title}
              </ChakraLink>
            ))}
          </Flex>
        )}

        {!isMobile && (
          <Flex gap={5} alignItems="center" zIndex="10">
            <Button
              as="a"
              href="https://forms.rishabhj.in/bcon"
              target="_blank"
              bg="#CFAF89"
              color="#2D1147"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontWeight="600"
              px={8}
              py={5}
              borderRadius="full"
              _hover={{ bg: "white", transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              transition="all 0.3s ease"
            >
              Register Now
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;
