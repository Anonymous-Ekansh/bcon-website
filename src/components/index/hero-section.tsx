import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import Navbar from "../layout/navbar";
import CountdownVisual from "./countdown-visual";

/* ─── SVG Blueprint Grid ────────────────────────────────────────────────
   Thin gold hairlines forming an architectural coordinate grid + a single
   floor-plan motif. Lines draw themselves in on mount via stroke-dashoffset.
   ──────────────────────────────────────────────────────────────────────── */

const GOLD = "#C9A467";
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
    preserveAspectRatio="xMidYMid slice"
    pointerEvents="none"
    zIndex="1"
  >
    {/* Background coordinate grid — very faint */}
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

    {/* Architectural floor-plan motif — right side */}
    {/* Outer structure */}
    <BlueprintLine
      d="M 920 280 L 1280 280 L 1280 680 L 920 680 Z"
      delay={0.4}
      duration={2.5}
      opacity={0.18}
      strokeWidth={0.7}
    />
    {/* Inner rooms */}
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
    {/* Doorway cuts */}
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
    {/* Staircase */}
    <BlueprintLine
      d="M 1140 500 L 1140 520 L 1160 520 L 1160 540 L 1180 540 L 1180 560 L 1200 560 L 1200 580 L 1220 580 L 1220 600"
      delay={1.5}
      duration={1.8}
      opacity={0.15}
    />
    {/* Dimension line — bottom */}
    <BlueprintLine
      d="M 920 720 L 1280 720"
      delay={2.0}
      duration={1.2}
      opacity={0.10}
      strokeWidth={0.3}
    />
    {/* Dimension ticks */}
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

    {/* Cross-hair accent top-left */}
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

    {/* Diagonal section cut */}
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
      w="100vw"
      minH="100vh"
      overflow="hidden"
      bg="#12081F"
    >
      {/* ── Seamless Ambient Glow ── */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w="100%"
        h="100%"
        background="radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.25) 0%, rgba(109, 40, 217, 0.15) 30%, rgba(76, 29, 149, 0.05) 60%, transparent 100%)"
        pointerEvents="none"
        zIndex="0"
      />

      {/* ── Film Grain Noise ── */}
      <Box
        position="absolute"
        inset="0"
        zIndex="0"
        opacity="0.05"
        style={{ mixBlendMode: "overlay" }}
        backgroundImage="url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;)"
      />

      <Navbar />

      {/* Blueprint grid overlay */}
      <BlueprintGrid />

      {/* ── Hero content: asymmetric grid ── */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        position="relative"
        zIndex="10"
        minH="calc(100vh - 100px)"
        maxW="1440px"
        mx="auto"
        px={{ base: 6, md: 12, lg: 20 }}
        pt={{ base: "7rem", md: "6rem" }}
        pb={{ base: 16, md: 20 }}
        gap={{ base: 12, lg: 8 }}
      >
        <Flex direction="column" justify="center" flex="1" maxW="600px">
        {/* Eyebrow Image */}
        <Box
          as={motion.div}
          variants={eyebrowVariant}
          initial="hidden"
          animate={controls}
          mb={{ base: 6, md: 8 }}
          alignSelf="flex-start"
        >
          <Image 
            src="/images/snioe-inspiria.png" 
            alt="SNIoE &times; Inspiria Presents" 
            h={{ base: "80px", md: "120px", lg: "150px", xl: "180px" }}
            maxW="100%"
            objectFit="contain"
            objectPosition="left center"
            ml={{ base: "-8px", md: "-12px", lg: "-16px", xl: "-20px" }}
          />
        </Box>

        {/* Gold divider — thin architectural hairline */}
        <Box
          as={motion.div}
          variants={dividerVariant}
          initial="hidden"
          animate={controls}
          w={{ base: "60px", md: "90px" }}
          h="1px"
          bg={GOLD}
          mb={{ base: 6, md: 8 }}
          transformOrigin="left"
        />

        {/* Headline */}
        <Box
          as={motion.div}
          variants={headlineVariant}
          initial="hidden"
          animate={controls}
          mb={{ base: 4, md: 6 }}
          ml={{ base: "-4px", md: "-8px", lg: "-10px", xl: "-12px" }} // Stronger optical alignment adjustment
        >
          <Text
            fontFamily="'Fraunces', serif"
            fontSize={{ base: "52px", sm: "68px", md: "96px", lg: "120px", xl: "140px" }}
            fontWeight="300"
            lineHeight="0.9"
            color="#F5F2F0"
            letterSpacing="-0.02em"
          >
            Building
          </Text>
          <Text
            fontFamily="'Fraunces', serif"
            fontSize={{ base: "52px", sm: "68px", md: "96px", lg: "120px", xl: "140px" }}
            fontWeight="300"
            lineHeight="0.9"
            color="#F5F2F0"
            letterSpacing="-0.02em"
          >
            Tomorrow
            <Text
              as="span"
              color={GOLD}
              fontFamily="'Fraunces', serif"
              fontWeight="300"
            >
              .
            </Text>
          </Text>
        </Box>

        {/* Sub-headline */}
        <Text
          as={motion.p}
          variants={subtextVariant}
          initial="hidden"
          animate={controls}
          fontFamily="'Inter', sans-serif"
          fontSize={{ base: "14px", md: "16px", lg: "18px" }}
          fontWeight="300"
          color="rgba(245, 242, 240, 0.55)"
          maxW="520px"
          lineHeight="1.7"
          mb={{ base: 8, md: 10 }}
        >
          Where visionaries, industry leaders, and aspiring entrepreneurs
          converge to draft the blueprints of what comes next.
        </Text>

        {/* Year + Event marker */}
        <Flex
          as={motion.div}
          variants={yearVariant}
          initial="hidden"
          animate={controls}
          align="center"
          gap={4}
        >
          <Text
            fontFamily="'Fraunces', serif"
            fontSize={{ base: "28px", md: "36px" }}
            fontWeight="300"
            color={GOLD}
            letterSpacing="0.08em"
          >
            2026
          </Text>
          <Box w="30px" h="1px" bg="rgba(201,164,103,0.3)" />
          <Text
            fontFamily="'Inter', sans-serif"
            fontSize={{ base: "11px", md: "12px" }}
            fontWeight="500"
            textTransform="uppercase"
            color="rgba(245, 242, 240, 0.35)"
            letterSpacing="0.25em"
          >
            Business Conclave
          </Text>
        </Flex>
        </Flex>

        <Box flex="1" w="100%" display="flex" justifyContent="center">
          <CountdownVisual />
        </Box>
      </Flex>

      {/* Bottom edge — thin gold hairline */}
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
