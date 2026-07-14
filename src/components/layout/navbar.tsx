"use client";
import React from "react";
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
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDoubleTap } from "use-double-tap";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Speakers", href: "#speakers" },
  { title: "Events", href: "#events" },
  { title: "Competitions", href: "#competitions" },
  { title: "Sponsors", href: "#sponsors" },
  { title: "Contact", href: "#contact" },
];

function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  // Handle double-tap or double-click to navigate to /emoji-ping-pong
  const bind = useDoubleTap(() => {
    router.push("/emoji-ping-pong");
  });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (pathname === "/") {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <Box bg="transparent" w="100%" position="absolute" top="0" left="0" right="0" zIndex="20">
    <Flex
      as="nav"
      alignItems="center"
      justify="space-between"
      maxW="1536px"
      mx="auto"
      py={4}
      px={8}
    >
      {/* Logo Section */}
      <Box
        {...bind} // Attach the double-tap/click handler here for both mobile and desktop
        cursor="pointer"
      >
        <Image
          alt="Business Conclave × Shiv Nadar University"
          h={{ base: 10, md: 14 }}
          src="/images/bcon-x-snu-navbar.png"
        />
      </Box>

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
            <DrawerContent bg="#000000">
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

                {/* Buttons placed directly after the nav items */}
                <VStack spacing={4} w="100%" pt={4}>
                  {session ? (
                    <HStack
                      borderTop="1px solid #4A5568"
                      pt={4}
                      justify="space-between"
                      w="100%"
                    >
                      <HStack>
                        <Icon as={FaUserCircle} w={6} h={6} color="#C9A467" />
                        <Text fontFamily="Satoshi">
                          {session?.user?.name ?? "Guest"}
                        </Text>
                      </HStack>
                      <Button variant="ghost" onClick={() => signOut()}>
                        Logout
                      </Button>
                    </HStack>
                  ) : (
                    <VStack spacing={4} w="100%">
                      <Button
                        bg="transparent"
                        color="#C9A467"
                        border="1px solid #C9A467"
                        _hover={{ bg: "rgba(201,164,103,0.1)" }}
                        w="100%"
                        onClick={() => router.push("/register")}
                      >
                        Register
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="whiteAlpha"
                        w="100%"
                        onClick={() => router.push("/login")}
                        color="white"
                        _hover={{ bg: "#2D3748" }}
                      >
                        Login
                      </Button>
                    </VStack>
                  )}
                </VStack>
              </VStack>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Flex flex="1" justify="center" fontFamily="'Inter', sans-serif" gap={8}>
          {navItems.map(({ title, href }, i) => (
            <ChakraLink
              key={i}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              fontSize="md"
              color="white"
            >
              {title}
            </ChakraLink>
          ))}
        </Flex>
      )}

      {!isMobile && (
        <Flex gap={5} alignItems="center" zIndex="10">
          {loading && <Text color="white">Loading...</Text>}
          {!loading && !session && (
            <>
              <Button
                as={Link}
                href="/login"
                variant="outline"
                _hover={{ bg: "rgba(245,242,240,0.05)", color: "white" }}
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                bg="transparent"
                color="#C9A467"
                border="1px solid #C9A467"
                _hover={{ bg: "rgba(201,164,103,0.1)" }}
              >
                Register
              </Button>
            </>
          )}
          {!loading && session && (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<ChevronDownIcon />}
              >
                <HStack>
                  <Icon as={FaUserCircle} w={6} h={6} color="#C9A467" />
                  <Text fontFamily="Satoshi">
                    {session?.user?.name ?? "Guest"}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList bg="#3A2159" border="1px solid rgba(201,164,103,0.15)">
                <MenuItem
                  icon={<ExternalLinkIcon />}
                  as={ChakraLink}
                  href="/dashboard"
                  color="white"
                  _hover={{ bg: "rgba(201,164,103,0.1)" }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  icon={<FaSignOutAlt />}
                  onClick={() => signOut()}
                  color="white"
                  _hover={{ bg: "rgba(201,164,103,0.1)" }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      )}
    </Flex>
    </Box>
  );
}

export default Navbar;
