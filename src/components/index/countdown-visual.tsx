"use client";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

const GOLD = "#CFAF89";
const GOLD_DARK = "#B08A30";
const LABEL_COLOR = "#816493"; // Soft Mauve

const EVENT_DATE = new Date("2026-11-14T10:00:00").getTime(); // 14th Nov, 2026, 10:00 AM

const STAIR_COUNT = 5;
const STAIR_WIDTH = 40;
const STAIR_HEIGHT = 20;
const START_X = 20;
const START_Y = 140;

const CountdownItem = ({ label, value, isSeconds = false }: { label: string; value: string | number; isSeconds?: boolean }) => {
  const formattedValue = String(value).padStart(2, '0');

  return (
    <Flex direction="column" align="center" mx={{ base: 1.5, sm: 2.5, md: 3.5 }}>
      <Box h={{ base: "36px", sm: "42px", md: "56px", lg: "68px" }} overflow="hidden" position="relative">
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
                fontSize={{ base: "28px", sm: "34px", md: "44px", lg: "56px" }}
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
            fontSize={{ base: "28px", sm: "34px", md: "44px", lg: "56px" }}
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
        fontSize={{ base: "9px", sm: "10px", md: "11px" }}
        fontWeight="600"
        color={LABEL_COLOR}
        letterSpacing={{ base: "0.14em", sm: "0.2em" }}
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
    <Flex direction="column" align="center" justify="center" w="100%" maxW="480px" mx="auto" minH="auto" position="relative">
      <Box mb={3} mt={0} position="relative" w={{ base: "165px", md: "180px", xl: "200px" }} h={{ base: "124px", md: "135px", xl: "150px" }}>
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
          {Array.from({ length: STAIR_COUNT }).map((_, i) => {
            const blockX = START_X + i * STAIR_WIDTH;
            const blockY = START_Y - i * STAIR_HEIGHT;
            return (
              <motion.g
                key={`stair-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1], // Cinematic snap
                }}
              >
                <rect
                  x={blockX}
                  y={blockY}
                  width={STAIR_WIDTH}
                  height={(i + 1) * STAIR_HEIGHT} // Extends to the floor to form a solid bar
                  fill={GOLD}
                  stroke={GOLD_DARK}
                  strokeWidth="1"
                />
                <rect
                  x={blockX}
                  y={blockY}
                  width={STAIR_WIDTH}
                  height={2}
                  fill="rgba(255,255,255,0.4)"
                />
              </motion.g>
            );
          })}
          <motion.path
            d={`M ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT - 45}
                L ${START_X + (STAIR_COUNT - 1) * STAIR_WIDTH + STAIR_WIDTH} ${START_Y - (STAIR_COUNT - 1) * STAIR_HEIGHT}`}
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.8,
              delay: STAIR_COUNT * 0.12 + 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: STAIR_COUNT * 0.12 + 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      >
        <Flex direction="column" align="center" mt={0} mb={3.5} w="100%">
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "19px", md: "22px", lg: "25px" }}
            fontWeight="300"
            letterSpacing="-0.02em"
            color="#FFFFFF"
          >
            Build your door to tomorrow.
          </Text>
        </Flex>
      </motion.div>
      <Flex align="flex-start" justify="center" zIndex="1" position="relative" mb={5} w="100%">
        <CountdownItem label="DAYS" value={timeLeft.days} />
        <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "28px", sm: "34px", md: "44px", lg: "56px" }} color={GOLD} lineHeight="1" mx={0.5}>:</Text>
        <CountdownItem label="HOURS" value={timeLeft.hours} />
        <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "28px", sm: "34px", md: "44px", lg: "56px" }} color={GOLD} lineHeight="1" mx={0.5}>:</Text>
        <CountdownItem label="MINUTES" value={timeLeft.minutes} />
        <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize={{ base: "28px", sm: "34px", md: "44px", lg: "56px" }} color={GOLD} lineHeight="1" mx={0.5}>:</Text>
        <CountdownItem label="SECONDS" value={timeLeft.seconds} isSeconds={true} />
      </Flex>
      <Flex direction="column" align="center" gap={3} w={{ base: "236px", sm: "248px", md: "256px" }} mx="auto">
        <Button
          as={Link}
          href="https://forms.rishabhj.in/bcon"
          target="_blank"
          w="100%"
          h={{ base: "48px", md: "52px" }}
          bg={GOLD}
          color="#12081F"
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
          fontSize={{ base: "13.5px", md: "14.5px" }}
          fontWeight="700"
          letterSpacing="0.14em"
          textTransform="uppercase"
          borderRadius="0"
          clipPath="polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))"
          rightIcon={<FiArrowRight size={18} />}
          _hover={{
            bg: "#E8C87A",
            transform: "translateY(-2px)",
            boxShadow: "0px 15px 35px rgba(207, 175, 137, 0.3)",
          }}
          _active={{
            transform: "translateY(0px)",
          }}
          transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        >
          Register Now
        </Button>

        <Box
          as={Link}
          href="/itinerary"
          role="group"
          w="100%"
          p="1px"
          bg="linear-gradient(135deg, rgba(207, 175, 137, 0.85) 0%, rgba(207, 175, 137, 0.28) 50%, rgba(207, 175, 137, 0.85) 100%)"
          clipPath="polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
          transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
          _hover={{
            bg: GOLD,
            transform: "translateY(-2px)",
            filter: "drop-shadow(0px 10px 24px rgba(207, 175, 137, 0.24))",
          }}
          _active={{
            transform: "translateY(0px)",
          }}
        >
          <Flex
            w="100%"
            h={{ base: "42px", md: "44px" }}
            bg="rgba(26, 9, 43, 0.9)"
            clipPath="polygon(0 0, calc(100% - 11.5px) 0, 100% 11.5px, 100% 100%, 11.5px 100%, 0 calc(100% - 11.5px))"
            align="center"
            justify="center"
            gap={2.5}
            px={5}
            transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{
              bg: "rgba(42, 16, 68, 0.92)",
            }}
          >
            <FiCalendar size={14} color={GOLD} />
            <Text
              as="span"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontSize={{ base: "12px", md: "12.5px" }}
              fontWeight="600"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color={GOLD}
              transition="color 0.3s ease"
              _groupHover={{ color: "#FFFFFF" }}
            >
              Event Itinerary
            </Text>
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              color={GOLD}
              transition="transform 0.3s ease, color 0.3s ease"
              _groupHover={{ transform: "translateX(3px)", color: "#FFFFFF" }}
            >
              <FiArrowRight size={14} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CountdownVisual;
