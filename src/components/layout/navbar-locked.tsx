"use client";
import React from "react"; // No longer necessary in newer React versions
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
  HStack,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
// Removed use-double-tap

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

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href.startsWith("/") ? href : `/${href}`);
    }
  };

  return (
    <Flex
      as="nav"
      alignItems="center"
      justify="space-between"
      maxW="1536px"
      mx="auto"
      py={6}
      px={8}
      zIndex="10"
    >
      {/* Logo Section */}
      <Box
        cursor="pointer"
      >
        <Image
          alt="BCon X SNU Logo"
          h={{ base: 12, md: 16 }} // Larger height on desktop
          src="/images/BCon_X_SNU_Logo.png"
        />
      </Box>

      {/* Hamburger Menu for Mobile */}
      {isMobile ? (
        <>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            size="lg"
            variant="ghost"
            position="relative"
            zIndex="20"
          />
          <Drawer isOpen={isOpen} placement="top" onClose={onClose} size="full">
            <DrawerOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(5px)" />
            <DrawerContent bg="#292929">
              <DrawerCloseButton mt={6} mr={5} color="white" />
              <VStack spacing={8} align="start" mt={12} p={6}>
                {navItems.map((item, index) => (
                  <ChakraLink
                    key={index}
                    href={item.href}
                    color="white"
                    fontSize="xl"
                    fontWeight="semibold"
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      onClose();
                    }}
                  >
                    {item.title}
                  </ChakraLink>
                ))}
              </VStack>
              <Box mt="auto" p={6} w="100%">
                <Text color="gray.400" textAlign="center">
                  Bookings Coming Soon
                </Text>
              </Box>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Flex flex="1" justify="center" fontFamily="Satoshi" gap={8}>
          {navItems.map(({ title, href }, i) => (
            <ChakraLink
              key={i}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              fontSize="md" // Smaller font on desktop
              color="white"
            >
              {title}
            </ChakraLink>
          ))}
        </Flex>
      )}

      {!isMobile && (
        <Flex gap={5} alignItems="center" zIndex="10">
          <Text color="gray.400">Bookings Coming Soon</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default Navbar;
