"use client";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

const GOLD = "#C9A24B";
const GOLD_DARK = "#B08A30";
const LABEL_COLOR = "#A78BFA"; // muted lavender-grey

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
                fontFamily="'Fraunces', serif"
                fontSize={{ base: "32px", md: "48px", lg: "64px" }}
                fontWeight="300"
                color="#F5F2F0"
                lineHeight="1"
              >
                {formattedValue}
              </Text>
            </motion.div>
          </AnimatePresence>
        ) : (
          <Text
            fontFamily="'Fraunces', serif"
            fontSize={{ base: "32px", md: "48px", lg: "64px" }}
            fontWeight="300"
            color="#F5F2F0"
            lineHeight="1"
          >
            {formattedValue}
          </Text>
        )}
      </Box>
      <Text
        fontFamily="'Inter', sans-serif"
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
    <Flex direction="column" align="center" justify="center" w="100%" maxW="600px" mx="auto" minH="400px" position="relative">
      {/* ── Visual: Steps to Tomorrow ── */}
      <Box mb={8} position="relative" w="240px" h="180px">
        <Box
          as="svg"
          w="100%"
          h="100%"
          viewBox="0 0 240 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="doorGlow" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Staggered Stairs (Floating Architectural Blocks) */}
          {Array.from({ length: STAIR_COUNT }).map((_, i) => {
            const blockX = START_X + i * STAIR_WIDTH;
            const blockY = START_Y - i * STAIR_HEIGHT;
            return (
              <motion.g
                key={`stair-${i}`}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              >
                {/* Main block */}
                <rect
                  x={blockX}
                  y={blockY}
                  width={STAIR_WIDTH}
                  height={STAIR_HEIGHT} // Just a step, not a column to the floor
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
                {/* Subtle bottom shadow */}
                <rect
                  x={blockX}
                  y={blockY + STAIR_HEIGHT - 2}
                  width={STAIR_WIDTH}
                  height={2}
                  fill="rgba(0,0,0,0.15)"
                />
              </motion.g>
            );
          })}

          {/* 2. Doorway Arch (Draws after stairs) */}
          <motion.path
            d={`M ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                A ${STAIR_WIDTH / 2} ${STAIR_WIDTH / 2} 0 0 1 ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT}`}
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.5,
              delay: STAIR_COUNT * 0.15 + 0.2,
              ease: "easeInOut",
            }}
          />

          {/* 3. Subtle Warm Glow Inside Arch (Fades in last) */}
          <motion.path
            d={`M ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 1}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                A ${(STAIR_WIDTH - 2) / 2} ${(STAIR_WIDTH - 2) / 2} 0 0 1 ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH - 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH - 1} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 1} Z`}
            fill="url(#doorGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: STAIR_COUNT * 0.15 + 0.7,
              ease: "easeOut",
            }}
          />
        </Box>
      </Box>

      {/* ── Text Section (Below visual) ── */}
      <Flex direction="column" align="center" mt={0} mb={8} w="100%">
        <Text
          fontFamily="'Fraunces', serif"
          fontSize={{ base: "20px", md: "24px", lg: "28px" }}
          fontStyle="italic"
          fontWeight="300"
          color="#F5F2F0"
        >
          Build your door to tomorrow.
        </Text>
      </Flex>

      {/* ── Foreground Countdown ── */}
      <Flex align="flex-start" justify="center" zIndex="1" position="relative" mb={10}>
        <CountdownItem label="DAYS" value={timeLeft.days} />
        <Text fontFamily="'Fraunces', serif" fontSize={{ base: "32px", md: "48px", lg: "64px" }} color={GOLD} lineHeight="1" mx={1}>:</Text>
        <CountdownItem label="HOURS" value={timeLeft.hours} />
        <Text fontFamily="'Fraunces', serif" fontSize={{ base: "32px", md: "48px", lg: "64px" }} color={GOLD} lineHeight="1" mx={1}>:</Text>
        <CountdownItem label="MINUTES" value={timeLeft.minutes} />
        <Text fontFamily="'Fraunces', serif" fontSize={{ base: "32px", md: "48px", lg: "64px" }} color={GOLD} lineHeight="1" mx={1}>:</Text>
        <CountdownItem label="SECONDS" value={timeLeft.seconds} isSeconds={true} />
      </Flex>

      {/* ── Premium CTA Button (Below countdown) ── */}
      <Button
        as={Link}
        href="/register"
        bg={GOLD}
        color="#12081F"
        fontSize="15px"
        fontWeight="600"
        letterSpacing="0.1em"
        textTransform="uppercase"
        px={12}
        py={7}
        borderRadius="0"
        clipPath="polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))"
        rightIcon={<FiArrowRight size={20} />}
        _hover={{ 
          bg: "#E8C87A",
          transform: "translateY(-3px)",
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
