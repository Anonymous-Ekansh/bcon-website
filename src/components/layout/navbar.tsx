"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiArrowRight, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  number: string;
  tag?: string;
}

const navItems: NavItem[] = [
  { title: "About", href: "#about", number: "01" },
  { title: "Speakers", href: "#speaker-reveal", number: "02", tag: "Confirmed" },
  { title: "Past Speakers", href: "#speakers", number: "03" },
  { title: "Events", href: "#events", number: "04" },
  { title: "Competitions", href: "#competitions", number: "05" },
  { title: "Sponsors", href: "sponsors", number: "06" },
  { title: "Contact", href: "contact-us", number: "07" },
];

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);

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
    <>
      {/* ── Fixed Main Navigation Bar ── */}
      <Box
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        bg={scrolled ? "rgba(25, 8, 42, 0.88)" : "transparent"}
        backdropFilter={scrolled ? "blur(18px)" : "none"}
        borderBottom={scrolled ? "1px solid rgba(207, 175, 137, 0.22)" : "1px solid transparent"}
        boxShadow={scrolled ? "0 10px 30px rgba(0, 0, 0, 0.45)" : "none"}
        transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        <Flex
          as="nav"
          alignItems="center"
          justify="space-between"
          maxW="1536px"
          mx="auto"
          py={scrolled ? { base: 2.5, md: 3 } : { base: 3.5, md: 5 }}
          px={{ base: 4, sm: 6, md: 8, lg: 10 }}
          transition="padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          {/* Logo with micro-hover scaling */}
          <Box
            cursor="pointer"
            onClick={() => router.push("/")}
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.04)" }}
            display="flex"
            alignItems="center"
          >
            <Image
              alt="Business Conclave × Shiv Nadar University"
              h={{ base: "32px", sm: "38px", md: "46px" }}
              src="/images/bcon-x-snu-navbar.png"
              objectFit="contain"
            />
          </Box>

          {/* ── Desktop Navigation Links (Visible on lg and up) ── */}
          <Flex
            display={{ base: "none", lg: "flex" }}
            flex="1"
            justify="center"
            alignItems="center"
            fontFamily="'Proxima Nova', 'Inter', sans-serif"
            gap={{ lg: 7, xl: 9 }}
          >
            {navItems.map(({ title, href, tag }, i) => (
              <ChakraLink
                key={i}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                fontSize="14.5px"
                fontWeight="500"
                color="rgba(255, 255, 255, 0.82)"
                letterSpacing="0.06em"
                textTransform="uppercase"
                position="relative"
                display="flex"
                alignItems="center"
                gap={1.5}
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
                  },
                }}
              >
                {title}
                {tag && (
                  <Box
                    as="span"
                    fontSize="9px"
                    fontFamily="'Cinzel', serif"
                    fontWeight="700"
                    color="#CFAF89"
                    bg="rgba(207, 175, 137, 0.15)"
                    border="1px solid rgba(207, 175, 137, 0.4)"
                    px={1.5}
                    py={0.5}
                    borderRadius="full"
                    letterSpacing="0.08em"
                  >
                    {tag}
                  </Box>
                )}
              </ChakraLink>
            ))}
          </Flex>

          {/* ── Desktop Action Button (Visible on lg and up) ── */}
          <Flex display={{ base: "none", lg: "flex" }} gap={5} alignItems="center" zIndex="10">
            <Button
              as="a"
              href="https://forms.rishabhj.in/bcon"
              target="_blank"
              bg="linear-gradient(135deg, #E8D8C3 0%, #CFAF89 100%)"
              color="#2D1147"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontWeight="700"
              fontSize="14.5px"
              letterSpacing="0.04em"
              px={7}
              py={5}
              borderRadius="full"
              boxShadow="0 4px 20px rgba(207, 175, 137, 0.25)"
              _hover={{
                bg: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 25px rgba(207, 175, 137, 0.4)",
              }}
              transition="all 0.3s ease"
            >
              Register Now
            </Button>
          </Flex>

          {/* ── Mobile Right Actions (Visible on base to lg) ── */}
          <Flex display={{ base: "flex", lg: "none" }} alignItems="center" gap={2.5}>
            {/* Quick Register Pill for mobile */}
            <Button
              as="a"
              href="https://forms.rishabhj.in/bcon"
              target="_blank"
              display={{ base: "none", sm: "inline-flex" }}
              size="sm"
              bg="rgba(207, 175, 137, 0.14)"
              color="#CFAF89"
              border="1px solid rgba(207, 175, 137, 0.5)"
              borderRadius="full"
              fontSize="12px"
              fontWeight="600"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              letterSpacing="0.05em"
              px={3.5}
              h="34px"
              _hover={{ bg: "#CFAF89", color: "#2D1147" }}
              transition="all 0.25s ease"
            >
              Register
            </Button>

            {/* Custom Luxury Mobile Hamburger / Close Button */}
            <Box
              as="button"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              onClick={() => setIsOpen(!isOpen)}
              w="42px"
              h="42px"
              borderRadius="full"
              bg={isOpen ? "rgba(207, 175, 137, 0.2)" : "rgba(207, 175, 137, 0.08)"}
              border="1px solid rgba(207, 175, 137, 0.45)"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={1.5}
              transition="all 0.3s ease"
              _hover={{ bg: "rgba(207, 175, 137, 0.25)", transform: "scale(1.05)" }}
              _active={{ transform: "scale(0.95)" }}
              cursor="pointer"
              position="relative"
              zIndex="10001"
            >
              <Box
                w="18px"
                h="1.5px"
                bg="#CFAF89"
                borderRadius="full"
                transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                transform={isOpen ? "rotate(45deg) translate(4px, 4px)" : "none"}
              />
              <Box
                w="18px"
                h="1.5px"
                bg="#CFAF89"
                borderRadius="full"
                transition="all 0.2s ease"
                opacity={isOpen ? 0 : 1}
                transform={isOpen ? "scale(0)" : "scale(1)"}
              />
              <Box
                w="18px"
                h="1.5px"
                bg="#CFAF89"
                borderRadius="full"
                transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                transform={isOpen ? "rotate(-45deg) translate(4px, -4px)" : "none"}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* ── Full-Screen Editorial Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              backgroundColor: "rgba(18, 6, 30, 0.98)",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Ambient Blueprint Glow Orbs inside mobile drawer */}
            <Box
              position="absolute"
              top="-10%"
              right="-15%"
              w="320px"
              h="320px"
              borderRadius="full"
              bg="radial-gradient(circle, rgba(207, 175, 137, 0.16) 0%, transparent 70%)"
              filter="blur(60px)"
              pointerEvents="none"
            />
            <Box
              position="absolute"
              bottom="-10%"
              left="-15%"
              w="320px"
              h="320px"
              borderRadius="full"
              bg="radial-gradient(circle, rgba(186, 39, 206, 0.15) 0%, transparent 70%)"
              filter="blur(60px)"
              pointerEvents="none"
            />

            {/* Blueprint Grid Watermark */}
            <Box
              position="absolute"
              inset="0"
              backgroundImage="radial-gradient(rgba(207, 175, 137, 0.08) 1px, transparent 1px)"
              backgroundSize="24px 24px"
              pointerEvents="none"
              opacity={0.7}
            />

            {/* Corner Registration Crosshairs */}
            <Box position="absolute" top="16px" left="16px" color="rgba(207, 175, 137, 0.4)" fontSize="11px" fontFamily="monospace" pointerEvents="none">+</Box>
            <Box position="absolute" top="16px" right="16px" color="rgba(207, 175, 137, 0.4)" fontSize="11px" fontFamily="monospace" pointerEvents="none">+</Box>
            <Box position="absolute" bottom="16px" left="16px" color="rgba(207, 175, 137, 0.4)" fontSize="11px" fontFamily="monospace" pointerEvents="none">+</Box>
            <Box position="absolute" bottom="16px" right="16px" color="rgba(207, 175, 137, 0.4)" fontSize="11px" fontFamily="monospace" pointerEvents="none">+</Box>

            {/* Mobile Drawer Content Container */}
            <Flex
              direction="column"
              minH="100%"
              p={{ base: 6, sm: 8 }}
              pt={{ base: "84px", sm: "96px" }}
              pb={{ base: 8, sm: 10 }}
              position="relative"
              zIndex="2"
              justify="space-between"
            >
              <Box>
                {/* Event Status Live Pill */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Flex
                    align="center"
                    gap={2.5}
                    mb={6}
                    p="6px 14px"
                    borderRadius="full"
                    bg="rgba(207, 175, 137, 0.08)"
                    border="1px solid rgba(207, 175, 137, 0.25)"
                    w="fit-content"
                  >
                    <Box
                      w="7px"
                      h="7px"
                      borderRadius="full"
                      bg="#4ade80"
                      boxShadow="0 0 10px #4ade80"
                    />
                    <Text
                      fontFamily="'Cinzel', serif"
                      fontSize="10.5px"
                      fontWeight="600"
                      color="#CFAF89"
                      letterSpacing="0.2em"
                      textTransform="uppercase"
                    >
                      Edition 2026 • 14 November 2026
                    </Text>
                  </Flex>
                </motion.div>

                {/* Staggered Navigation Items List */}
                <Flex direction="column" gap={1}>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.12 + index * 0.05,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Box
                        onClick={(e) => handleNavClick(e, item.href)}
                        cursor="pointer"
                        py={3}
                        px={3}
                        borderRadius="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        borderBottom="1px solid rgba(207, 175, 137, 0.1)"
                        transition="all 0.25s ease"
                        _hover={{
                          bg: "rgba(207, 175, 137, 0.08)",
                          transform: "translateX(6px)",
                        }}
                        _active={{
                          bg: "rgba(207, 175, 137, 0.14)",
                          transform: "scale(0.98)",
                        }}
                      >
                        <Flex align="center" gap={3.5}>
                          <Text
                            fontFamily="monospace"
                            fontSize="11.5px"
                            color="rgba(207, 175, 137, 0.7)"
                            letterSpacing="0.1em"
                          >
                            {item.number}
                          </Text>
                          <Text
                            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                            fontSize={{ base: "22px", sm: "26px" }}
                            fontWeight="600"
                            color="#FFFFFF"
                            letterSpacing="0.01em"
                            lineHeight="1.2"
                          >
                            {item.title}
                          </Text>
                          {item.tag && (
                            <Box
                              as="span"
                              fontSize="9.5px"
                              fontFamily="'Cinzel', serif"
                              fontWeight="700"
                              color="#CFAF89"
                              bg="rgba(207, 175, 137, 0.18)"
                              border="1px solid rgba(207, 175, 137, 0.45)"
                              px={2}
                              py={0.5}
                              borderRadius="full"
                              letterSpacing="0.08em"
                              textTransform="uppercase"
                            >
                              {item.tag}
                            </Box>
                          )}
                        </Flex>
                        <Box color="#CFAF89" fontSize="16px" opacity={0.7}>
                          →
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Flex>
              </Box>

              {/* Bottom Actions inside Mobile Drawer */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Box pt={6}>
                  {/* Primary Full-Width Glowing Register Button */}
                  <Button
                    as="a"
                    href="https://forms.rishabhj.in/bcon"
                    target="_blank"
                    w="100%"
                    h="52px"
                    bg="linear-gradient(135deg, #E8D8C3 0%, #CFAF89 100%)"
                    color="#2D1147"
                    fontFamily="'Proxima Nova', 'Inter', sans-serif"
                    fontWeight="700"
                    fontSize="16px"
                    letterSpacing="0.04em"
                    borderRadius="full"
                    boxShadow="0 10px 30px rgba(207, 175, 137, 0.35)"
                    mb={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    _hover={{ bg: "#FFFFFF", transform: "translateY(-2px)" }}
                    _active={{ transform: "scale(0.98)" }}
                    transition="all 0.25s ease"
                  >
                    <span>Register for Conclave</span>
                    <FiArrowRight size={18} />
                  </Button>

                  {/* University & Venue Info Tag */}
                  <Text
                    fontFamily="'Proxima Nova', sans-serif"
                    fontSize="11.5px"
                    color="rgba(255, 255, 255, 0.5)"
                    textAlign="center"
                    mb={4}
                    letterSpacing="0.06em"
                  >
                    Shiv Nadar University • Greater Noida, Delhi NCR
                  </Text>

                  {/* Social & Contact Icons */}
                  <Flex justify="center" align="center" gap={6} pt={2}>
                    <Box
                      as="a"
                      href="https://www.instagram.com/snioebusinessconclave/"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="rgba(207, 175, 137, 0.75)"
                      _hover={{ color: "#CFAF89", transform: "scale(1.15)" }}
                      transition="all 0.2s ease"
                      fontSize="18px"
                      aria-label="Instagram"
                    >
                      <FiInstagram />
                    </Box>
                    <Box
                      as="a"
                      href="https://in.linkedin.com/company/snioe-business-conclave"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="rgba(207, 175, 137, 0.75)"
                      _hover={{ color: "#CFAF89", transform: "scale(1.15)" }}
                      transition="all 0.2s ease"
                      fontSize="18px"
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin />
                    </Box>
                    <Box
                      as="a"
                      href="mailto:inspiria.scs@snu.edu.in"
                      color="rgba(207, 175, 137, 0.75)"
                      _hover={{ color: "#CFAF89", transform: "scale(1.15)" }}
                      transition="all 0.2s ease"
                      fontSize="18px"
                      aria-label="Email"
                    >
                      <FiMail />
                    </Box>
                  </Flex>
                </Box>
              </motion.div>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
