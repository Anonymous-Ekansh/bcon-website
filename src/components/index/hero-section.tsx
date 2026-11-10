import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import Navbar from "../layout/navbar";
import CountdownVisual from "./countdown-visual";

/* ─── SVG Blueprint Grid ────────────────────────────────────────────────
   Thin gold hairlines forming an architectural coordinate grid + a single
   floor-plan motif. Lines draw themselves in on mount via stroke-dashoffset.
   ──────────────────────────────────────────────────────────────────────── */

const GOLD = "#CFAF89";
const PURPLE_WHITE = "rgba(255,255,255,0.04)";

interface BlueprintLineProps {
  d: string;
  delay: number;
  duration?: number;
  opacity?: number;
  strokeWidth?: number;
}

const BlueprintLine = ({
  d,
  delay,
  duration = 1.8,
  opacity = 1,
  strokeWidth = 0.5,
}: BlueprintLineProps) => (
  <motion.path
    d={d}
    stroke={PURPLE_WHITE}
    strokeWidth={strokeWidth}
    fill="none"
    opacity={opacity}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration, delay, ease: "easeInOut" }}
  />
);

/* ─── Blueprint Motif SVG ───────────────────────────────────────────── */
const BlueprintGrid = () => (
  <Box
    as="svg"
    position="absolute"
    inset="0"
    w="100%"
    h="100%"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMaxYMid slice"
    pointerEvents="none"
    zIndex="1"
  >
    {[180, 360, 540, 720, 900, 1080, 1260].map((x, i) => (
      <BlueprintLine
        key={`v-${i}`}
        d={`M${x} 0 L${x} 900`}
        delay={0.1 * i}
        duration={2.2}
        opacity={0.07}
        strokeWidth={0.5}
      />
    ))}
    {[150, 300, 450, 600, 750].map((y, i) => (
      <BlueprintLine
        key={`h-${i}`}
        d={`M0 ${y} L1440 ${y}`}
        delay={0.15 * i}
        duration={2.2}
        opacity={0.07}
        strokeWidth={0.5}
      />
    ))}
    <BlueprintLine
      d="M 920 280 L 1280 280 L 1280 680 L 920 680 Z"
      delay={0.4}
      duration={2.5}
      opacity={0.18}
      strokeWidth={0.7}
    />
    <BlueprintLine
      d="M 1060 280 L 1060 680"
      delay={0.9}
      duration={1.6}
      opacity={0.14}
    />
    <BlueprintLine
      d="M 920 460 L 1280 460"
      delay={1.0}
      duration={1.6}
      opacity={0.14}
    />
    <BlueprintLine
      d="M 1060 420 L 1060 500"
      delay={1.3}
      duration={0.8}
      opacity={0.22}
      strokeWidth={2}
    />
    <BlueprintLine
      d="M 980 460 L 1000 460"
      delay={1.4}
      duration={0.6}
      opacity={0.22}
      strokeWidth={2}
    />
    <BlueprintLine
      d="M 1140 500 L 1140 520 L 1160 520 L 1160 540 L 1180 540 L 1180 560 L 1200 560 L 1200 580 L 1220 580 L 1220 600"
      delay={1.5}
      duration={1.8}
      opacity={0.15}
    />
    <BlueprintLine
      d="M 920 720 L 1280 720"
      delay={2.0}
      duration={1.2}
      opacity={0.10}
      strokeWidth={0.3}
    />
    <BlueprintLine
      d="M 920 715 L 920 725"
      delay={2.2}
      duration={0.3}
      opacity={0.12}
    />
    <BlueprintLine
      d="M 1280 715 L 1280 725"
      delay={2.3}
      duration={0.3}
      opacity={0.12}
    />
    <BlueprintLine
      d="M 80 80 L 80 140"
      delay={0.3}
      duration={0.8}
      opacity={0.12}
    />
    <BlueprintLine
      d="M 50 110 L 110 110"
      delay={0.4}
      duration={0.8}
      opacity={0.12}
    />
    <BlueprintLine
      d="M 920 680 L 840 780"
      delay={2.0}
      duration={1.0}
      opacity={0.08}
      strokeWidth={0.3}
    />
  </Box>
);

/* ─── Framer Motion variants ────────────────────────────────────────── */
const eyebrowVariant = {
  hidden: { opacity: 0, letterSpacing: "0.2em" },
  visible: {
    opacity: 1,
    letterSpacing: "0.35em",
    transition: { duration: 1.0, delay: 0.3, ease: "easeOut" },
  },
};

const headlineVariant = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, delay: 0.6, ease: [0.77, 0, 0.175, 1] },
  },
};

const subtextVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 1.4, ease: "easeOut" },
  },
};

const dividerVariant = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, delay: 1.0, ease: "easeInOut" },
  },
};

const yearVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 1.8, ease: "easeOut" },
  },
};

/* ─── Hero Section ──────────────────────────────────────────────────── */
const HeroSection = () => {
  const controls = useAnimation();

  useEffect(() => {
    void controls.start("visible");
  }, [controls]);

  return (
    <Box
      position="relative"
      w="100%"
      minH="100vh"
      overflow="hidden"
      bg="transparent"
    >
      <Navbar />
      <BlueprintGrid />
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        position="relative"
        zIndex="10"
        minH="100vh"
        maxW="1240px"
        mx="auto"
        px={{ base: 5, sm: 8, md: 10, lg: 10, xl: 14 }}
        pt={{ base: "5rem", md: "5.5rem", lg: "5.25rem", xl: "6rem" }}
        pb={{ base: 10, md: 8, lg: 6 }}
        gap={{ base: 6, lg: 8 }}
      >
        <Flex direction="column" justify="center" flex="1" maxW={{ base: "100%", md: "520px", lg: "540px", xl: "620px" }}>
        <Box
          as={motion.div}
          variants={eyebrowVariant}
          initial="hidden"
          animate={controls}
          mb={{ base: 2.5, md: 3 }}
          alignSelf={{ base: "center", lg: "flex-start" }}
        >
          <Image 
            src="/images/snioe-inspiria.png" 
            alt="SNIoE &times; Inspiria Presents" 
            h={{ base: "60px", sm: "70px", md: "78px", lg: "74px", xl: "96px" }}
            maxW="100%"
            objectFit="contain"
            objectPosition={{ base: "center", lg: "left center" }}
          />
        </Box>
        <Box
          as={motion.div}
          variants={dividerVariant}
          initial="hidden"
          animate={controls}
          w={{ base: "60px", md: "80px" }}
          h="1px"
          bg={GOLD}
          mb={{ base: 2.5, md: 3 }}
          mx={{ base: "auto", lg: 0 }}
          transformOrigin={{ base: "center", lg: "left" }}
        />
        <Box
          as={motion.div}
          variants={headlineVariant}
          initial="hidden"
          animate={controls}
          mb={{ base: 2.5, md: 3.5 }}
          ml={{ base: "0", lg: "-3px", xl: "-5px" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "38px", sm: "48px", md: "62px", lg: "66px", xl: "86px" }}
            fontWeight="300"
            lineHeight="0.92"
            color="#FFFFFF"
            letterSpacing="-0.02em"
            whiteSpace="nowrap"
          >
            Building
          </Text>
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "38px", sm: "48px", md: "62px", lg: "66px", xl: "86px" }}
            fontWeight="300"
            lineHeight="0.92"
            color="#FFFFFF"
            letterSpacing="-0.02em"
            whiteSpace="nowrap"
          >
            Tomorrow
            <Text
              as="span"
              color={GOLD}
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontWeight="300"
            >
              .
            </Text>
          </Text>
        </Box>
        <Text
          as={motion.p}
          variants={subtextVariant}
          initial="hidden"
          animate={controls}
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
          fontSize={{ base: "13.5px", md: "14.5px", lg: "15px", xl: "16px" }}
          fontWeight="300"
          color="rgba(255, 255, 255, 0.7)"
          maxW="460px"
          lineHeight="1.6"
          mb={{ base: 4, md: 5 }}
          textAlign={{ base: "center", lg: "left" }}
          mx={{ base: "auto", lg: 0 }}
        >
          Where visionaries, industry leaders, and aspiring entrepreneurs
          converge to draft the blueprints of what comes next.
        </Text>
        <Flex
          as={motion.div}
          variants={yearVariant}
          initial="hidden"
          animate={controls}
          align="center"
          justifyContent={{ base: "center", lg: "flex-start" }}
          gap={3}
          display={{ base: "none", md: "flex" }}
        >
          <Text
            fontFamily="'Cinzel', serif"
            fontSize={{ base: "22px", md: "24px", lg: "26px", xl: "30px" }}
            fontWeight="500"
            color={GOLD}
            letterSpacing="0.08em"
          >
            2026
          </Text>
          <Text
            fontSize={{ base: "14px", md: "15px" }}
            color="rgba(207, 175, 137, 0.8)"
          >
            -
          </Text>
          <Text
            fontFamily="'Proxima Nova', 'Inter', sans-serif"
            fontSize={{ base: "10.5px", md: "11.5px" }}
            fontWeight="500"
            textTransform="uppercase"
            color="rgba(255, 255, 255, 0.6)"
            letterSpacing="0.25em"
          >
            Business Conclave
          </Text>
        </Flex>
        </Flex>

        <Box flex="1" w="100%" display="flex" justifyContent="center">
          <CountdownVisual />
        </Box>
        <Flex
          display={{ base: "flex", lg: "none" }}
          position="absolute"
          bottom={{ base: "0.5rem", md: "4rem" }}
          left="0"
          w="100%"
          justifyContent="center"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2.5, duration: 1 }, 
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" } 
          } as unknown as string}
          pointerEvents="none"
        >
          <Flex flexDir="column" alignItems="center" gap={2}>
            <Text 
              color="rgba(255, 255, 255, 0.4)" 
              fontSize="10px" 
              textTransform="uppercase" 
              letterSpacing="0.2em"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
            >
              Scroll to explore
            </Text>
            <Box 
              w="1px" 
              h="20px" 
              bg="linear-gradient(to bottom, rgba(207, 175, 137, 0.5), transparent)"
            />
          </Flex>
        </Flex>
      </Flex>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        h="1px"
        bg={`linear-gradient(90deg, transparent, rgba(201,164,103,0.25), transparent)`}
        zIndex="5"
      />
    </Box>
  );
};

export default HeroSection;
