import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  Image as ChakraImage,
} from "@chakra-ui/react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

interface SpeakerItem {
  id: string;
  category: string;
  name: string;
  role: string;
  description: string;
  sessionTime: string;
  image: string;
  objectPosition?: string;
  fontFamily: string;
  fontSize?: { base: string; sm: string; md: string; lg?: string };
  letterSpacing?: string;
  fontWeight?: number;
}

const SLIDE_DURATION_SEC = 4;

const SPEAKERS: SpeakerItem[] = [
  {
    id: "harsh-kumar",
    category: "Keynote Speaker",
    name: "Mr. Harsh Kumar",
    role: "Senior Partner & Member of the Board at Ernst & Young (EY)",
    description:
      "Senior Partner and Board Member at EY leading strategic digital transformation and technology advisory across major global enterprises. Harsh brings over two decades of high-level counsel working directly with corporate boards and global CXOs.",
    sessionTime: "10:30 AM - 11:30 AM • 14 November 2026",
    image: "/images/landing/speakers/harsh_kumar.png",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "28px", sm: "38px", md: "44px", lg: "52px" },
    letterSpacing: "normal",
    fontWeight: 300,
  },
  {
    id: "kaustubh-agarwal",
    category: "Special Guest",
    name: "Kaustubh Agarwal",
    role: "Stand-Up Comedian • India’s Got Latent Panelist",
    description:
      "Kaustubh Agarwal is a popular stand-up comedian and breakout panelist on Samay Raina’s India’s Got Latent. An engineer-turned-creator, he is celebrated across India for his sharp wit, authentic deadpan humor, and viral relatable comedy that perfectly bridges corporate hustle with creative passion.",
    sessionTime: "5:30 PM Onwards • 14 November 2026",
    image: "/images/landing/speakers/kaustubh_agarwal.jpg",
    objectPosition: "top center",
    fontFamily: "'Cabin Sketch', cursive, sans-serif",
    fontSize: { base: "30px", sm: "42px", md: "48px", lg: "56px" },
    letterSpacing: "0.02em",
    fontWeight: 700,
  },
  {
    id: "dovleen-bhatti",
    category: "Workshop Host",
    name: "Ms. Dovleen Bhatti",
    role: "Clarity Coach • Psychologist & NLP Master Practitioner",
    description:
      "A certified Life and Career Clarity Coach, applied psychologist, and NLP Master Practitioner dedicated to helping individuals overcome self-doubt and decision fatigue. Drawing from behavioral psychology and structured coaching frameworks, she empowers emerging leaders and professionals to transition from overwhelm to purposeful action.",
    sessionTime: "11:30 AM – 12:30 PM • 14 November 2026",
    image: "/images/landing/speakers/dovleen_bhatti.jpg",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "28px", sm: "38px", md: "44px", lg: "50px" },
    letterSpacing: "normal",
    fontWeight: 300,
  },
  {
    id: "sana-bhatega",
    category: "Offbeat Roundtable",
    name: "Ms. Sana Bhatega",
    role: "Entrepreneur & EdTech Influencer • 150K+ Followers on Instagram",
    description:
      "Entrepreneur, youth mentor, and EdTech creator with a thriving community of over 150K+ followers on Instagram. As the co-founder of The Inquisitive Mind, she has guided thousands of students across India through college admissions, career strategy, and personal brand building in the digital creator economy.",
    sessionTime: "2:15 PM – 3:00 PM • 14 November 2026",
    image: "/images/landing/speakers/sana_bhatega.jpg",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "28px", sm: "38px", md: "44px", lg: "50px" },
    letterSpacing: "normal",
    fontWeight: 300,
  },
  {
    id: "bikash-jain",
    category: "Canopy Conversations",
    name: "Mr. Bikash Jain",
    role: "General Manager @ Dabur • Ex-Chief Financial Officer @ Hero Cycles",
    description:
      "A Chartered Accountant and seasoned corporate finance leader with over two decades of leadership experience across premier consumer and manufacturing enterprises including Dabur, Hero Cycles, GSK, and Coca-Cola. He specializes in strategic financial stewardship, commercial scaling, and operational turnarounds.",
    sessionTime: "3:30 PM - 5:00 PM • 14 November 2026",
    image: "/images/landing/speakers/bikash_jain.jpg",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "28px", sm: "38px", md: "44px", lg: "50px" },
    letterSpacing: "normal",
    fontWeight: 300,
  },
  {
    id: "tanaya-rao",
    category: "Canopy Conversations",
    name: "Ms. Tanaya Rao",
    role: "Founder @ Ekatran Label",
    description:
      "Contemporary visual artist and founder of Ekatran Label, a New Delhi-based sustainable and upcycled fashion brand. An alumna of the College of Art (DU) and Shiv Nadar University, she bridges fine art with circular slow fashion by transforming textile remnants and deadstock into bespoke wearable art.",
    sessionTime: "3:30 PM - 5:00 PM • 14 November 2026",
    image: "/images/landing/speakers/tanaya_rao.jpg",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "28px", sm: "38px", md: "44px", lg: "50px" },
    letterSpacing: "normal",
    fontWeight: 300,
  },
  {
    id: "saurabh-gupta",
    category: "Canopy Conversations",
    name: "Mr. Saurabh Gupta",
    role: "Consulting Technical Director @ Oracle",
    description:
      "Consulting Technical Director at Oracle driving enterprise cloud architecture, large-scale data modernization, and mission-critical technology transformations. With deep expertise in distributed systems and enterprise engineering, he advises organizations on building resilient, future-ready digital infrastructure.",
    sessionTime: "3:30 PM - 5:00 PM • 14 November 2026",
    image: "/images/landing/speakers/saurabh_gupta.jpg",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "28px", sm: "38px", md: "44px", lg: "50px" },
    letterSpacing: "normal",
    fontWeight: 300,
  },
  {
    id: "amit-verma",
    category: "Canopy Conversations",
    name: "Mr. Amit Verma",
    role: "Director @ KPMG",
    description:
      "Director at KPMG advising leading enterprises on business transformation, strategic risk management, and operational excellence. He brings extensive Big Four advisory experience in guiding corporate leadership teams through complex market transitions, governance, and sustainable long-term growth.",
    sessionTime: "3:30 PM - 5:00 PM • 14 November 2026",
    image: "/images/landing/speakers/amit_verma.jpg",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "28px", sm: "38px", md: "44px", lg: "50px" },
    letterSpacing: "normal",
    fontWeight: 300,
  },
];

const entireBoxVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "60%" : "-60%",
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30, mass: 0.85 },
      scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.35, ease: "easeOut" },
      filter: { duration: 0.28 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-60%" : "60%",
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30, mass: 0.85 },
      scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.25, ease: "easeIn" },
      filter: { duration: 0.22 },
    },
  }),
};

function getInitials(fullName: string): string {
  const cleaned = fullName.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s+/i, "").trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return (parts[0]?.slice(0, 2) ?? "").toUpperCase();
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
}

export default function SpeakerRevealSection() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isBoxHovered, setIsBoxHovered] = useState<boolean>(false);
  const [imgFailed, setImgFailed] = useState<Record<string, boolean>>({});
  const lastScrollTimeRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 95, damping: 20, mass: 0.75 };

  const subheadlineY = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [70, 0, 0, -45]);
  const subheadlineOpacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0.2]);
  const subheadlineScale = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [0.85, 1, 1, 0.92]);
  const smoothSubheadlineY = useSpring(subheadlineY, springConfig);
  const smoothSubheadlineOpacity = useSpring(subheadlineOpacity, springConfig);
  const smoothSubheadlineScale = useSpring(subheadlineScale, springConfig);

  const titleY = useTransform(scrollYProgress, [0, 0.3, 0.72, 1], [95, 0, 0, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [0, 1, 1, 0.2]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3, 0.72, 1], [0.85, 1, 1, 0.94]);
  const smoothTitleY = useSpring(titleY, springConfig);
  const smoothTitleOpacity = useSpring(titleOpacity, springConfig);
  const smoothTitleScale = useSpring(titleScale, springConfig);

  const controlsY = useTransform(scrollYProgress, [0, 0.34, 0.7, 1], [60, 0, 0, -40]);
  const controlsOpacity = useTransform(scrollYProgress, [0, 0.24, 0.8, 1], [0, 1, 1, 0.3]);
  const smoothControlsY = useSpring(controlsY, springConfig);
  const smoothControlsOpacity = useSpring(controlsOpacity, springConfig);

  const boxScrollY = useTransform(scrollYProgress, [0, 0.36, 0.65, 1], [120, 0, 0, -70]);
  const boxScrollScale = useTransform(scrollYProgress, [0, 0.36, 0.65, 1], [0.92, 1, 1, 0.95]);
  const boxScrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.15, 1, 1, 0.25]);
  const smoothBoxY = useSpring(boxScrollY, springConfig);
  const smoothBoxScale = useSpring(boxScrollScale, springConfig);
  const smoothBoxOpacity = useSpring(boxScrollOpacity, springConfig);

  const active = SPEAKERS[currentIndex] ?? SPEAKERS[0]!;

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + SPEAKERS.length) % SPEAKERS.length);
  }, []);

  const goToSpeaker = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndex) return;
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setCurrentIndex(targetIndex);
    },
    [currentIndex]
  );

  useEffect(() => {
    if (!mounted || isPaused) return;

    const timer = setTimeout(() => {
      paginate(1);
    }, SLIDE_DURATION_SEC * 1000);

    return () => clearTimeout(timer);
  }, [mounted, isPaused, currentIndex, paginate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 40) {
      const now = Date.now();
      if (now - lastScrollTimeRef.current > 550) {
        lastScrollTimeRef.current = now;
        paginate(e.deltaX > 0 ? 1 : -1);
      }
    }
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const threshold = 45;
    if (info.offset.x < -threshold || info.velocity.x < -280) {
      paginate(1);
    } else if (info.offset.x > threshold || info.velocity.x > 280) {
      paginate(-1);
    }
  };

  // Only pause / apply hover elevation for fine mouse pointers so touch taps never freeze autoplay
  const handleBoxPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      setIsPaused(true);
      setIsBoxHovered(true);
    }
  };

  const handleBoxPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      setIsPaused(false);
      setIsBoxHovered(false);
    }
  };

  const showFallbackPortrait = !active.image || Boolean(imgFailed[active.id]);

  return (
    <Box
      ref={sectionRef}
      id="speaker-reveal"
      position="relative"
      py={{ base: 12, sm: 18, md: 28 }}
      px={{ base: 4, sm: 6, md: 10, lg: 12 }}
      overflow="hidden"
      zIndex={2}
      onWheel={handleWheel}
    >
      <Box
        position="absolute"
        top="12%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "300px", sm: "500px", md: "880px" }}
        h={{ base: "300px", sm: "400px", md: "520px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(207, 175, 137, 0.11) 0%, rgba(45, 17, 71, 0.28) 55%, transparent 75%)"
        filter="blur(90px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Flex
        direction="column"
        align="center"
        maxW="960px"
        mx="auto"
        position="relative"
        zIndex={1}
      >
        <motion.div
          style={{
            y: smoothSubheadlineY,
            opacity: smoothSubheadlineOpacity,
            scale: smoothSubheadlineScale,
            maxWidth: "100%",
          }}
        >
          <Flex align="center" justify="center" gap={{ base: 2, sm: 3 }} mb={3.5}>
            <Box
              w={{ base: "14px", sm: "22px", md: "32px" }}
              h="1px"
              bg="rgba(207, 175, 137, 0.4)"
              flexShrink={0}
            />
            <Text
              fontFamily="'Cinzel', serif"
              fontSize={{ base: "10px", sm: "11px", md: "13px" }}
              letterSpacing={{ base: "0.14em", sm: "0.24em", md: "0.34em" }}
              color="#CFAF89"
              textTransform="uppercase"
              textAlign="center"
              fontWeight="700"
            >
              14 November 2026 • G-Block Auditorium
            </Text>
            <Box
              w={{ base: "14px", sm: "22px", md: "32px" }}
              h="1px"
              bg="rgba(207, 175, 137, 0.4)"
              flexShrink={0}
            />
          </Flex>
        </motion.div>

        <motion.div
          style={{
            y: smoothTitleY,
            opacity: smoothTitleOpacity,
            scale: smoothTitleScale,
          }}
        >
          <Text
            fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            fontSize={{ base: "34px", sm: "48px", md: "66px" }}
            fontWeight={300}
            color="#FFFFFF"
            textAlign="center"
            lineHeight="1.1"
            mb={{ base: 5, sm: 6, md: 8 }}
            letterSpacing="-0.01em"
          >
            Speaker{" "}
            <Box
              as="span"
              color="#CFAF89"
              fontStyle="italic"
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            >
              Lineup
            </Box>
          </Text>
        </motion.div>

        {/* Navigation Controls (Left / Segmented Progress Pills / Right) */}
        <motion.div
          style={{
            y: smoothControlsY,
            opacity: smoothControlsOpacity,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Flex
            align="center"
            justify="center"
            gap={{ base: 2.5, sm: 5 }}
            mb={{ base: 5, sm: 6, md: 8 }}
            w="100%"
          >
            <Box
              as="button"
              type="button"
              role="group"
              aria-label="Previous speaker"
              onClick={() => paginate(-1)}
              flexShrink={0}
              w={{ base: "38px", sm: "42px", md: "46px" }}
              h={{ base: "38px", sm: "42px", md: "46px" }}
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.045)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              color="rgba(255, 255, 255, 0.85)"
              backdropFilter="blur(12px)"
              boxShadow="0 8px 20px rgba(0, 0, 0, 0.28)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                bg: "rgba(207, 175, 137, 0.14)",
                borderColor: "rgba(207, 175, 137, 0.45)",
                color: "#CFAF89",
                transform: "translateY(-1px) scale(1.06)",
                boxShadow: "0 10px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(207, 175, 137, 0.15)",
              }}
              _active={{
                transform: "scale(0.95)",
              }}
              cursor="pointer"
            >
              <Box
                as="svg"
                viewBox="0 0 24 24"
                w={{ base: "17px", md: "19px" }}
                h={{ base: "17px", md: "19px" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                transition="transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                _groupHover={{ transform: "translateX(-2px)" }}
              >
                <path d="M15 18l-6-6 6-6" />
              </Box>
            </Box>

            <Flex align="center" gap={{ base: 1.5, sm: 2 }} px={{ base: 1, sm: 2 }}>
              {SPEAKERS.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <Box
                    key={item.id}
                    as="button"
                    type="button"
                    aria-label={`Go to ${item.name}`}
                    onClick={() => goToSpeaker(idx)}
                    w={isCurrent ? { base: "24px", sm: "38px" } : { base: "7px", sm: "10px" }}
                    h="4px"
                    borderRadius="full"
                    bg="rgba(255, 255, 255, 0.16)"
                    overflow="hidden"
                    position="relative"
                    transition="width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.32)",
                    }}
                    cursor="pointer"
                  >
                    {mounted && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{
                          width: isCurrent && !isPaused ? "100%" : "0%",
                        }}
                        transition={
                          isCurrent && !isPaused
                            ? { duration: SLIDE_DURATION_SEC, ease: "linear" }
                            : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                        }
                        style={{
                          height: "100%",
                          borderRadius: "9999px",
                          background: "linear-gradient(90deg, #CFAF89, #FFFFFF)",
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Flex>

            <Box
              as="button"
              type="button"
              role="group"
              aria-label="Next speaker"
              onClick={() => paginate(1)}
              flexShrink={0}
              w={{ base: "38px", sm: "42px", md: "46px" }}
              h={{ base: "38px", sm: "42px", md: "46px" }}
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.045)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              color="rgba(255, 255, 255, 0.85)"
              backdropFilter="blur(12px)"
              boxShadow="0 8px 20px rgba(0, 0, 0, 0.28)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                bg: "rgba(207, 175, 137, 0.14)",
                borderColor: "rgba(207, 175, 137, 0.45)",
                color: "#CFAF89",
                transform: "translateY(-1px) scale(1.06)",
                boxShadow: "0 10px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(207, 175, 137, 0.15)",
              }}
              _active={{
                transform: "scale(0.95)",
              }}
              cursor="pointer"
            >
              <Box
                as="svg"
                viewBox="0 0 24 24"
                w={{ base: "17px", md: "19px" }}
                h={{ base: "17px", md: "19px" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                transition="transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                _groupHover={{ transform: "translateX(2px)" }}
              >
                <path d="M9 18l6-6-6-6" />
              </Box>
            </Box>
          </Flex>
        </motion.div>

        {/* Main Speaker Panel */}
        <motion.div
          style={{
            y: smoothBoxY,
            scale: smoothBoxScale,
            opacity: smoothBoxOpacity,
            width: "100%",
            maxWidth: "880px",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={entireBoxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                width: "100%",
                touchAction: "pan-y",
                cursor: "grab",
              }}
              whileTap={{ cursor: "grabbing" }}
            >
              <Box
                role="group"
                w="100%"
                minH={{ base: "540px", sm: "560px", md: "420px" }}
                display="flex"
                alignItems="center"
                borderRadius={{ base: "22px", sm: "26px", md: "30px" }}
                bg={
                  isBoxHovered
                    ? "linear-gradient(145deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%)"
                    : "linear-gradient(145deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%)"
                }
                border="1px solid"
                borderColor={
                  isBoxHovered
                    ? "rgba(255, 255, 255, 0.16)"
                    : "rgba(255, 255, 255, 0.08)"
                }
                p={{ base: 5, sm: 7, md: 9, lg: 10 }}
                boxShadow={
                  isBoxHovered
                    ? "0 36px 80px rgba(0, 0, 0, 0.65), 0 12px 32px rgba(0, 0, 0, 0.4)"
                    : "0 24px 60px rgba(0, 0, 0, 0.5)"
                }
                backdropFilter="blur(24px)"
                position="relative"
                overflow="hidden"
                transform={
                  isBoxHovered
                    ? "translateY(-6px) scale(1.01)"
                    : "translateY(0px) scale(1)"
                }
                transition="transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease, border-color 0.32s ease, background 0.32s ease"
                onPointerEnter={handleBoxPointerEnter}
                onPointerLeave={handleBoxPointerLeave}
              >
                <Grid
                  w="100%"
                  templateColumns={{ base: "1fr", md: "250px 1fr", lg: "285px 1fr" }}
                  gap={{ base: 5, sm: 7, md: 8, lg: 10 }}
                  alignItems="center"
                  position="relative"
                  zIndex={2}
                >
                  {/* Speaker Portrait */}
                  <Flex direction="column" align="center">
                    <Box
                      position="relative"
                      w={{ base: "195px", sm: "235px", md: "250px", lg: "285px" }}
                      h={{ base: "242px", sm: "292px", md: "312px", lg: "355px" }}
                      borderRadius={{ base: "18px", md: "20px" }}
                      overflow="hidden"
                      bg="rgba(255, 255, 255, 0.03)"
                      border="1px solid"
                      borderColor={
                        isBoxHovered
                          ? "rgba(255, 255, 255, 0.16)"
                          : "rgba(255, 255, 255, 0.08)"
                      }
                      boxShadow={
                        isBoxHovered
                          ? "0 24px 50px rgba(0, 0, 0, 0.6)"
                          : "0 16px 36px rgba(0, 0, 0, 0.45)"
                      }
                      transform={
                        isBoxHovered
                          ? "scale(1.03) translateY(-4px)"
                          : "scale(1) translateY(0px)"
                      }
                      transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                    >
                      {!showFallbackPortrait ? (
                        <ChakraImage
                          src={active.image}
                          alt={active.name}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          objectPosition={active.objectPosition ?? "center top"}
                          loading="eager"
                          draggable={false}
                          onError={() =>
                            setImgFailed((prev) => ({ ...prev, [active.id]: true }))
                          }
                        />
                      ) : (
                        <Flex
                          w="100%"
                          h="100%"
                          direction="column"
                          align="center"
                          justify="center"
                          position="relative"
                          bg="linear-gradient(160deg, rgba(255, 255, 255, 0.05) 0%, rgba(45, 17, 71, 0.55) 100%)"
                          p={5}
                          userSelect="none"
                        >
                          <Box
                            position="absolute"
                            w="160px"
                            h="160px"
                            borderRadius="full"
                            bg="radial-gradient(circle, rgba(207, 175, 137, 0.16) 0%, transparent 70%)"
                            filter="blur(24px)"
                            pointerEvents="none"
                          />
                          <Flex
                            w={{ base: "72px", sm: "84px" }}
                            h={{ base: "72px", sm: "84px" }}
                            borderRadius="full"
                            bg="rgba(255, 255, 255, 0.04)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            align="center"
                            justify="center"
                            mb={3.5}
                          >
                            <Text
                              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                              fontSize={{ base: "26px", sm: "32px" }}
                              fontWeight={300}
                              color="#CFAF89"
                              letterSpacing="0.06em"
                            >
                              {getInitials(active.name)}
                            </Text>
                          </Flex>
                          <Text
                            fontFamily="'Cinzel', serif"
                            fontSize="9.5px"
                            letterSpacing="0.2em"
                            color="rgba(255, 255, 255, 0.45)"
                            textTransform="uppercase"
                            textAlign="center"
                          >
                            {active.category}
                          </Text>
                        </Flex>
                      )}
                    </Box>
                  </Flex>

                  {/* Speaker Info */}
                  <Flex
                    direction="column"
                    justify="center"
                    align={{ base: "center", md: "flex-start" }}
                    textAlign={{ base: "center", md: "left" }}
                    minW={0}
                  >
                    <Flex
                      align="center"
                      justify={{ base: "center", md: "space-between" }}
                      w="100%"
                      mb={{ base: 2.5, md: 3 }}
                      gap={3}
                      flexWrap="wrap"
                    >
                      <Box
                        px={{ base: 3, sm: 3.5 }}
                        py={1}
                        borderRadius="full"
                        bg="rgba(207, 175, 137, 0.1)"
                        border="1px solid rgba(207, 175, 137, 0.22)"
                      >
                        <Text
                          fontFamily="'Cinzel', serif"
                          fontWeight="600"
                          fontSize={{ base: "10.5px", sm: "11px", md: "12px" }}
                          letterSpacing="0.16em"
                          color="#CFAF89"
                          textTransform="uppercase"
                        >
                          {active.category}
                        </Text>
                      </Box>

                      <Text
                        display={{ base: "none", md: "block" }}
                        fontFamily="'Proxima Nova', 'Inter', sans-serif"
                        fontSize="12px"
                        letterSpacing="0.14em"
                        color="rgba(255, 255, 255, 0.4)"
                        fontWeight="500"
                      >
                        0{currentIndex + 1} / 0{SPEAKERS.length}
                      </Text>
                    </Flex>

                    <Box mb={2} w="100%">
                      <Text
                        fontFamily={active.fontFamily}
                        fontSize={active.fontSize}
                        letterSpacing={active.letterSpacing}
                        fontWeight={active.fontWeight ?? 300}
                        color="#FFFFFF"
                        lineHeight="1.15"
                        wordBreak="break-word"
                      >
                        {active.name}
                      </Text>
                    </Box>

                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize={{ base: "14px", sm: "15.5px", md: "16.5px" }}
                      fontWeight="500"
                      color="rgba(207, 175, 137, 0.92)"
                      mb={{ base: 3, md: 4 }}
                      lineHeight="1.45"
                    >
                      {active.role}
                    </Text>

                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize={{ base: "13.5px", sm: "14.5px", md: "15.5px", lg: "16px" }}
                      fontWeight={300}
                      color="rgba(255, 255, 255, 0.82)"
                      lineHeight={{ base: "1.68", md: "1.78" }}
                      mb={{ base: 4, md: 5 }}
                    >
                      {active.description}
                    </Text>

                    <Flex
                      align="center"
                      justify={{ base: "space-between", md: "flex-start" }}
                      gap={3}
                      pt={3}
                      w="100%"
                      borderTop="1px solid rgba(255, 255, 255, 0.07)"
                    >
                      <Text
                        fontFamily="'Cinzel', serif"
                        fontSize={{ base: "10.5px", sm: "11.5px" }}
                        color="rgba(207, 175, 137, 0.85)"
                        letterSpacing="0.14em"
                        textTransform="uppercase"
                        fontWeight="600"
                      >
                        {active.sessionTime}
                      </Text>

                      <Text
                        display={{ base: "block", md: "none" }}
                        fontFamily="'Proxima Nova', 'Inter', sans-serif"
                        fontSize="11px"
                        letterSpacing="0.12em"
                        color="rgba(255, 255, 255, 0.45)"
                        fontWeight="500"
                      >
                        0{currentIndex + 1} / 0{SPEAKERS.length}
                      </Text>
                    </Flex>
                  </Flex>
                </Grid>
              </Box>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <Flex align="center" gap={2} mt={{ base: 4, md: 5 }} opacity={0.45}>
          <Text
            fontFamily="'Proxima Nova', sans-serif"
            fontSize={{ base: "10px", sm: "11px" }}
            letterSpacing="0.12em"
            color="rgba(255, 255, 255, 0.7)"
            textTransform="uppercase"
            textAlign="center"
          >
            Swipe or use arrow keys to navigate speakers
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
