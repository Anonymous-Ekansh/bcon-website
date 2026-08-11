"use client";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

const GOLD = "#CFAF89";
const GOLD_DARK = "#B08A30";
const LABEL_COLOR = "#816493"; // Soft Mauve

const EVENT_DATE = new Date("2026-11-14T00:00:00").getTime(); // 14th Nov, 2026, 12:00 AM

const STAIR_COUNT = 5;
const STAIR_WIDTH = 40;
const STAIR_HEIGHT = 20;
const START_X = 20;
const START_Y = 140;

const CountdownItem = ({ label, value, isSeconds = false }: { label: string; value: string | number; isSeconds?: boolean }) => {
  const formattedValue = String(value).padStart(2, '0');

  return (
    <Flex direction="column" align="center" mx={{ base: 2, md: 4 }}>
      <Box h={{ base: "40px", md: "60px", lg: "80px" }} overflow="hidden" position="relative">
        {isSeconds ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={formattedValue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Text
                fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                fontSize={{ base: "32px", md: "48px", lg: "64px" }}
                fontWeight="300"
                color="#FFFFFF"
                lineHeight="1"
              >
                {formattedValue}
              </Text>
            </motion.div>
          </AnimatePresence>
        ) : (
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "32px", md: "48px", lg: "64px" }}
            fontWeight="300"
            color="#FFFFFF"
            lineHeight="1"
          >
            {formattedValue}
          </Text>
        )}
      </Box>
      <Text
        fontFamily="'Proxima Nova', 'Inter', sans-serif"
        fontSize={{ base: "10px", md: "12px" }}
        fontWeight="600"
        color={LABEL_COLOR}
        letterSpacing="0.2em"
        mt={2}
      >
        {label}
      </Text>
    </Flex>
  );
};

const CountdownVisual = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = EVENT_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <Flex direction="column" align="center" justify="center" w="100%" maxW="600px" mx="auto" minH={{ base: "auto", md: "400px" }} position="relative">
      {/* ── Visual: Steps to Tomorrow ── */}
      <Box mb={8} mt={{ base: -6, md: -8 }} position="relative" w="240px" h="180px">
        <Box
          as="svg"
          w="100%"
          h="100%"
          viewBox="0 0 240 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="doorGlow" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#CFAF89" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#CFAF89" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Staggered Stairs (Floating Architectural Blocks) */}
          {Array.from({ length: STAIR_COUNT }).map((_, i) => {
            const blockX = START_X + i * STAIR_WIDTH;
            const blockY = START_Y - i * STAIR_HEIGHT;
            return (
              <motion.g
                key={`stair-${i}`}
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1], // Cinematic snap
                }}
              >
                {/* Main block */}
                <rect
                  x={blockX}
                  y={blockY}
                  width={STAIR_WIDTH}
                  height={(i + 1) * STAIR_HEIGHT} // Extends to the floor to form a solid bar
                  fill={GOLD}
                  stroke={GOLD_DARK}
                  strokeWidth="1"
                />
                {/* Subtle top highlight */}
                <rect
                  x={blockX}
                  y={blockY}
                  width={STAIR_WIDTH}
                  height={2}
                  fill="rgba(255,255,255,0.4)"
                />
                {/* Subtle bottom shadow removed for bar graph, since it sits on the baseline */}
              </motion.g>
            );
          })}

          {/* 2. Top Rectangular Box (Draws after bars) */}
          <motion.path
            d={`M ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT}`}
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: STAIR_COUNT * 0.12 + 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* 3. Subtle Warm Glow Inside Box (Fades in last) */}
          <motion.path
            d={`M ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 1}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH - 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH - 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 1} Z`}
            fill="url(#doorGlow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 1, 0.5, 1], // Pulsating intensity
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 2.5,
              delay: STAIR_COUNT * 0.12 + 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        </Box>
      </Box>

      {/* ── Text Section (Below visual) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.0, delay: STAIR_COUNT * 0.12 + 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      >
        <Flex direction="column" align="center" mt={0} mb={8} w="100%">
        <Text
          fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
          fontSize={{ base: "20px", md: "24px", lg: "28px" }}
          fontWeight="300"
          letterSpacing="-0.02em"
          color="#FFFFFF"
        >
          Build your door to tomorrow.
        </Text>
        </Flex>
      </motion.div>

      {/* ── Foreground Countdown ── */}
      <Flex align="flex-start" justify="center" zIndex="1" position="relative" mb={10}>
        <CountdownItem label="DAYS" value={timeLeft.days} />
        <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "32px", md: "48px", lg: "64px" }} color={GOLD} lineHeight="1" mx={1}>:</Text>
        <CountdownItem label="HOURS" value={timeLeft.hours} />
        <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "32px", md: "48px", lg: "64px" }} color={GOLD} lineHeight="1" mx={1}>:</Text>
        <CountdownItem label="MINUTES" value={timeLeft.minutes} />
        <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "32px", md: "48px", lg: "64px" }} color={GOLD} lineHeight="1" mx={1}>:</Text>
        <CountdownItem label="SECONDS" value={timeLeft.seconds} isSeconds={true} />
      </Flex>

      {/* ── Premium CTA Button (Below countdown) ── */}
      <Button
        as={Link}
        href="/register"
        bg={GOLD}
        color="#12081F"
        fontFamily="'Proxima Nova', 'Inter', sans-serif"
        fontSize="16px"
        fontWeight="600"
        letterSpacing="0.12em"
        textTransform="uppercase"
        px={12}
        py={7}
        borderRadius="0"
        clipPath="polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))"
        rightIcon={<FiArrowRight size={22} />}
        _hover={{
          bg: "#E8C87A",
          transform: "translateY(-3px)",
          boxShadow: "0px 15px 35px rgba(207, 175, 137, 0.3)"
        }}
        _active={{
          transform: "translateY(0px)",
        }}
        transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      >
        Register Now
      </Button>
    </Flex>
  );
};

export default CountdownVisual;
