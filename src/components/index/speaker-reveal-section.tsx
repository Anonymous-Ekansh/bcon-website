import React, { useState, useEffect, useRef } from "react";
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
  image: string;
  objectPosition?: string;
  fontFamily: string;
  fontSize?: { base: string; sm: string; md: string };
  letterSpacing?: string;
}

const SPEAKERS: SpeakerItem[] = [
  {
    id: "harsh-kumar",
    category: "Keynote Speaker",
    name: "Mr. Harsh Kumar",
    role: "Senior Partner & Member of the Board at Ernst & Young (EY)",
    description:
      "Senior Partner and Board Member at EY leading strategic digital transformation and technology advisory across major global enterprises. Harsh brings over two decades of high-level counsel working directly with corporate boards and global CXOs.",
    image: "/images/landing/speakers/harsh_kumar.png",
    objectPosition: "center top",
    fontFamily: "'Tan Vivre Libre', 'Playfair Display', serif",
    fontSize: { base: "42px", sm: "56px", md: "56px" },
    letterSpacing: "normal",
  },
  {
    id: "kaustubh-agarwal",
    category: "Special Guest",
    name: "Kaustubh Agarwal",
    role: "Stand-Up Comedian • India’s Got Latent Panelist",
    description:
      "Kaustubh Agarwal is a popular stand-up comedian and breakout panelist on Samay Raina’s India’s Got Latent. An engineer-turned-creator, he is celebrated across India for his sharp wit, authentic deadpan humor, and viral relatable comedy that perfectly bridges corporate hustle with creative passion.",
    image: "/images/landing/speakers/kaustubh_agarwal.jpg",
    objectPosition: "top center",
    fontFamily: "'Cabin Sketch', cursive, sans-serif",
    fontSize: { base: "42px", sm: "56px", md: "64px" },
    letterSpacing: "0.02em",
  },
];

const entireBoxVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? 10 : -10,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28, mass: 0.9 },
      rotateY: { type: "spring", stiffness: 260, damping: 28 },
      scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.38, ease: "easeOut" },
      filter: { duration: 0.32 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? -10 : 10,
    filter: "blur(8px)",
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28, mass: 0.9 },
      rotateY: { type: "spring", stiffness: 260, damping: 28 },
      scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.28, ease: "easeIn" },
      filter: { duration: 0.25 },
    },
  }),
};

export default function SpeakerRevealSection() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isBoxHovered, setIsBoxHovered] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [boxTilt, setBoxTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
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

  const tabsY = useTransform(scrollYProgress, [0, 0.34, 0.7, 1], [60, 0, 0, -40]);
  const tabsOpacity = useTransform(scrollYProgress, [0, 0.24, 0.8, 1], [0, 1, 1, 0.3]);
  const smoothTabsY = useSpring(tabsY, springConfig);
  const smoothTabsOpacity = useSpring(tabsOpacity, springConfig);

  const boxScrollY = useTransform(scrollYProgress, [0, 0.36, 0.65, 1], [150, 0, 0, -90]);
  const boxScrollScale = useTransform(scrollYProgress, [0, 0.36, 0.65, 1], [0.86, 1, 1, 0.92]);
  const boxScrollRotateX = useTransform(scrollYProgress, [0, 0.36, 0.65, 1], [14, 0, 0, -10]);
  const boxScrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.15, 1, 1, 0.25]);
  const smoothBoxY = useSpring(boxScrollY, springConfig);
  const smoothBoxScale = useSpring(boxScrollScale, springConfig);
  const smoothBoxRotateX = useSpring(boxScrollRotateX, springConfig);
  const smoothBoxOpacity = useSpring(boxScrollOpacity, springConfig);

  const active = SPEAKERS[currentIndex] ?? SPEAKERS[0]!;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + SPEAKERS.length) % SPEAKERS.length);
  };

  const goToSpeaker = (targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
  };

  useEffect(() => {
    if (!mounted || isPaused) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    const threshold = 60;
    if (info.offset.x < -threshold || info.velocity.x < -300) {
      paginate(1);
    } else if (info.offset.x > threshold || info.velocity.x > 300) {
      paginate(-1);
    }
  };

  const handleBoxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setBoxTilt({ rx: -py * 4.5, ry: px * 4.5 });
    setMousePos({ x, y });
    if (!isBoxHovered) setIsBoxHovered(true);
  };

  const handleBoxMouseEnter = () => {
    setIsPaused(true);
    setIsBoxHovered(true);
  };

  const handleBoxMouseLeave = () => {
    setIsPaused(false);
    setIsBoxHovered(false);
    setBoxTilt({ rx: 0, ry: 0 });
  };

  return (
    <Box
      ref={sectionRef}
      id="speaker-reveal"
      position="relative"
      py={{ base: 14, sm: 20, md: 28 }}
      px={{ base: 4, sm: 8, md: 12 }}
      overflow="hidden"
      zIndex={2}
      onWheel={handleWheel}
    >
      <Box
        position="absolute"
        top="8%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "320px", md: "850px" }}
        h={{ base: "320px", md: "500px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(207, 175, 137, 0.14) 0%, rgba(45, 17, 71, 0.3) 50%, transparent 75%)"
        filter="blur(80px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Flex
        direction="column"
        align="center"
        maxW="1100px"
        mx="auto"
        position="relative"
        zIndex={1}
      >
        <motion.div
          style={{
            y: smoothSubheadlineY,
            opacity: smoothSubheadlineOpacity,
            scale: smoothSubheadlineScale,
          }}
        >
          <Flex align="center" gap={3} mb={3.5}>
            <Box w={{ base: "20px", md: "32px" }} h="1px" bg="rgba(207, 175, 137, 0.45)" />
            <Text
              fontFamily="'Cinzel', serif"
              fontSize={{ base: "11px", md: "13px" }}
              letterSpacing={{ base: "0.26em", md: "0.34em" }}
              color="#CFAF89"
              textTransform="uppercase"
              textAlign="center"
              fontWeight="700"
            >
              14 November 2026 • G-Block Auditorium
            </Text>
            <Box w={{ base: "20px", md: "32px" }} h="1px" bg="rgba(207, 175, 137, 0.45)" />
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
            fontSize={{ base: "38px", sm: "52px", md: "68px" }}
            fontWeight={300}
            color="#FFFFFF"
            textAlign="center"
            lineHeight="1.1"
            mb={{ base: 7, md: 10 }}
            letterSpacing="-0.01em"
          >
            Speaker{" "}
            <Box
              as="span"
              color="#CFAF89"
              fontStyle="italic"
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
            >
              Reveal
            </Box>
          </Text>
        </motion.div>

        <motion.div
          style={{
            y: smoothTabsY,
            opacity: smoothTabsOpacity,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Flex
            wrap="wrap"
            justify="center"
            align="center"
            gap={{ base: 2, sm: 3 }}
            mb={4}
            w="100%"
            maxW="640px"
          >
            {SPEAKERS.map((speaker, idx) => {
              const isSelected = idx === currentIndex;

              return (
                <Box
                  key={speaker.id}
                  as="button"
                  onClick={() => goToSpeaker(idx)}
                  position="relative"
                  py={2.5}
                  px={{ base: 4, sm: 6 }}
                  borderRadius="full"
                  fontSize={{ base: "12px", md: "13.5px" }}
                  fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  color={isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)"}
                  display="flex"
                  alignItems="center"
                  gap={2.5}
                  transition="all 0.25s ease"
                  _hover={{
                    color: "#FFFFFF",
                    transform: "translateY(-1.5px)",
                  }}
                >
                  {isSelected && mounted && (
                    <motion.div
                      layoutId="minimalActiveTab"
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(207, 175, 137, 0.16)",
                        border: "1px solid rgba(207, 175, 137, 0.55)",
                        borderRadius: "9999px",
                        boxShadow: "0 4px 25px rgba(207, 175, 137, 0.22)",
                        zIndex: -1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <Box as="span" fontSize="10px" opacity={0.6} fontFamily="'Proxima Nova', sans-serif">
                    0{idx + 1}
                  </Box>
                  <Box as="span">{speaker.category}</Box>
                  <Box
                    w="5px"
                    h="5px"
                    borderRadius="full"
                    bg={isSelected ? "#CFAF89" : "rgba(255, 255, 255, 0.3)"}
                    boxShadow={isSelected ? "0 0 8px #CFAF89" : "none"}
                  />
                </Box>
              );
            })}

            <Box
              py={2.5}
              px={{ base: 4, sm: 6 }}
              borderRadius="full"
              border="1px dashed rgba(255, 255, 255, 0.14)"
              bg="rgba(255, 255, 255, 0.02)"
              color="rgba(255, 255, 255, 0.35)"
              fontSize={{ base: "12px", md: "13.5px" }}
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontWeight="700"
              letterSpacing="0.08em"
              textTransform="uppercase"
              display="flex"
              alignItems="center"
              gap={2.5}
              cursor="not-allowed"
              userSelect="none"
              opacity={0.6}
              aria-disabled="true"
            >
              <Box as="span" fontSize="10px" opacity={0.5} fontFamily="'Proxima Nova', sans-serif">
                03
              </Box>
              <Box as="span">Guest 03</Box>
              <Box
                as="span"
                fontSize="11.5px"
                color="#CFAF89"
                fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                [ Coming Soon ]
              </Box>
            </Box>
          </Flex>

          <Flex align="center" gap={4} mb={{ base: 6, md: 8 }}>
            <Box
              as="button"
              aria-label="Previous speaker"
              onClick={() => paginate(-1)}
              color="#CFAF89"
              fontSize="20px"
              p={1.5}
              borderRadius="full"
              opacity={0.75}
              _hover={{ opacity: 1, transform: "scale(1.15) translateX(-2px)", bg: "rgba(207, 175, 137, 0.1)" }}
              transition="all 0.2s ease"
              cursor="pointer"
            >
              ←
            </Box>
            <Box
              w="80px"
              h="2.5px"
              bg="rgba(207, 175, 137, 0.15)"
              borderRadius="full"
              overflow="hidden"
            >
              {mounted && (
                <motion.div
                  key={`${currentIndex}-${isPaused}`}
                  initial={{ width: "0%" }}
                  animate={isPaused ? { width: "0%" } : { width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #CFAF89, #FFF)",
                    boxShadow: "0 0 10px #CFAF89",
                  }}
                />
              )}
            </Box>
            <Box
              as="button"
              aria-label="Next speaker"
              onClick={() => paginate(1)}
              color="#CFAF89"
              fontSize="20px"
              p={1.5}
              borderRadius="full"
              opacity={0.75}
              _hover={{ opacity: 1, transform: "scale(1.15) translateX(2px)", bg: "rgba(207, 175, 137, 0.1)" }}
              transition="all 0.2s ease"
              cursor="pointer"
            >
              →
            </Box>
          </Flex>
        </motion.div>

        <motion.div
          style={{
            y: smoothBoxY,
            scale: smoothBoxScale,
            rotateX: smoothBoxRotateX,
            opacity: smoothBoxOpacity,
            perspective: 1400,
            transformStyle: "preserve-3d",
            width: "100%",
            maxWidth: "980px",
            overflow: "hidden",
            borderRadius: "32px",
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
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
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
                borderRadius={{ base: "24px", md: "32px" }}
                bg={
                  isBoxHovered
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.055) 0%, rgba(207, 175, 137, 0.04) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(207, 175, 137, 0.02) 100%)"
                }
                border="1px solid"
                borderColor={isBoxHovered ? "rgba(207, 175, 137, 0.65)" : "rgba(207, 175, 137, 0.3)"}
                p={{ base: 5, sm: 8, md: 10 }}
                boxShadow={
                  isBoxHovered
                    ? "0 35px 85px rgba(0, 0, 0, 0.8), 0 0 50px rgba(207, 175, 137, 0.24), inset 0 0 25px rgba(207, 175, 137, 0.05)"
                    : "0 30px 70px rgba(0, 0, 0, 0.7), 0 0 35px rgba(207, 175, 137, 0.1)"
                }
                backdropFilter="blur(20px)"
                position="relative"
                overflow="hidden"
                transform={
                  isBoxHovered
                    ? `perspective(1000px) rotateX(${boxTilt.rx}deg) rotateY(${boxTilt.ry}deg) translateY(-5px)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)"
                }
                transition="transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease"
                onMouseMove={handleBoxMouseMove}
                onMouseEnter={handleBoxMouseEnter}
                onMouseLeave={handleBoxMouseLeave}
              >
                <Box
                  position="absolute"
                  inset={0}
                  pointerEvents="none"
                  opacity={isBoxHovered ? 1 : 0}
                  transition="opacity 0.35s ease"
                  background={`radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(207, 175, 137, 0.14), transparent 65%)`}
                  zIndex={1}
                />

                <Box
                  position="absolute"
                  top={0}
                  left="12%"
                  right="12%"
                  h="1px"
                  bg="linear-gradient(90deg, transparent, #CFAF89, transparent)"
                  opacity={isBoxHovered ? 1 : 0.35}
                  transition="opacity 0.35s ease"
                  zIndex={2}
                />

                <Box
                  position="absolute"
                  inset={0}
                  backgroundImage="radial-gradient(rgba(207, 175, 137, 0.08) 1px, transparent 1px)"
                  backgroundSize="24px 24px"
                  pointerEvents="none"
                  opacity={isBoxHovered ? 0.9 : 0.6}
                  transition="opacity 0.35s ease"
                  zIndex={0}
                />

                <Box
                  position="absolute"
                  top="12px"
                  left="14px"
                  color={isBoxHovered ? "#CFAF89" : "rgba(207, 175, 137, 0.5)"}
                  transform={isBoxHovered ? "scale(1.2)" : "scale(1)"}
                  transition="all 0.3s ease"
                  fontSize="12px"
                  fontFamily="monospace"
                  pointerEvents="none"
                  zIndex={3}
                >
                  +
                </Box>
                <Box
                  position="absolute"
                  top="12px"
                  right="14px"
                  color={isBoxHovered ? "#CFAF89" : "rgba(207, 175, 137, 0.5)"}
                  transform={isBoxHovered ? "scale(1.2)" : "scale(1)"}
                  transition="all 0.3s ease"
                  fontSize="12px"
                  fontFamily="monospace"
                  pointerEvents="none"
                  zIndex={3}
                >
                  +
                </Box>
                <Box
                  position="absolute"
                  bottom="12px"
                  left="14px"
                  color={isBoxHovered ? "#CFAF89" : "rgba(207, 175, 137, 0.5)"}
                  transform={isBoxHovered ? "scale(1.2)" : "scale(1)"}
                  transition="all 0.3s ease"
                  fontSize="12px"
                  fontFamily="monospace"
                  pointerEvents="none"
                  zIndex={3}
                >
                  +
                </Box>
                <Box
                  position="absolute"
                  bottom="12px"
                  right="14px"
                  color={isBoxHovered ? "#CFAF89" : "rgba(207, 175, 137, 0.5)"}
                  transform={isBoxHovered ? "scale(1.2)" : "scale(1)"}
                  transition="all 0.3s ease"
                  fontSize="12px"
                  fontFamily="monospace"
                  pointerEvents="none"
                  zIndex={3}
                >
                  +
                </Box>

                <Grid
                  templateColumns={{ base: "1fr", md: "320px 1fr" }}
                  gap={{ base: 7, md: 10 }}
                  alignItems="center"
                  position="relative"
                  zIndex={2}
                >
                  <Flex direction="column" align="center">
                    <Box
                      position="relative"
                      w={{ base: "230px", sm: "270px", md: "300px" }}
                      h={{ base: "285px", sm: "335px", md: "375px" }}
                      borderRadius="22px"
                      overflow="hidden"
                      border="1px solid"
                      borderColor={isBoxHovered ? "rgba(207, 175, 137, 0.8)" : "rgba(207, 175, 137, 0.55)"}
                      boxShadow={
                        isBoxHovered
                          ? "0 25px 55px rgba(207, 175, 137, 0.32), 0 0 35px rgba(207, 175, 137, 0.2)"
                          : "0 20px 45px rgba(207, 175, 137, 0.22), 0 0 25px rgba(207, 175, 137, 0.1)"
                      }
                      transform={isBoxHovered ? "scale(1.025) translateY(-3px)" : "none"}
                      transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                    >
                      <Box
                        position="absolute"
                        top="10px"
                        left="10px"
                        w="10px"
                        h="10px"
                        borderTop="1.5px solid #CFAF89"
                        borderLeft="1.5px solid #CFAF89"
                        pointerEvents="none"
                        zIndex={6}
                        transform={isBoxHovered ? "scale(1.15)" : "scale(1)"}
                        transition="transform 0.3s ease"
                      />
                      <Box
                        position="absolute"
                        top="10px"
                        right="10px"
                        w="10px"
                        h="10px"
                        borderTop="1.5px solid #CFAF89"
                        borderRight="1.5px solid #CFAF89"
                        pointerEvents="none"
                        zIndex={6}
                        transform={isBoxHovered ? "scale(1.15)" : "scale(1)"}
                        transition="transform 0.3s ease"
                      />
                      <Box
                        position="absolute"
                        bottom="10px"
                        left="10px"
                        w="10px"
                        h="10px"
                        borderBottom="1.5px solid #CFAF89"
                        borderLeft="1.5px solid #CFAF89"
                        pointerEvents="none"
                        zIndex={6}
                        transform={isBoxHovered ? "scale(1.15)" : "scale(1)"}
                        transition="transform 0.3s ease"
                      />
                      <Box
                        position="absolute"
                        bottom="10px"
                        right="10px"
                        w="10px"
                        h="10px"
                        borderBottom="1.5px solid #CFAF89"
                        borderRight="1.5px solid #CFAF89"
                        pointerEvents="none"
                        zIndex={6}
                        transform={isBoxHovered ? "scale(1.15)" : "scale(1)"}
                        transition="transform 0.3s ease"
                      />

                      <Flex
                        position="absolute"
                        top="12px"
                        left="22px"
                        right="22px"
                        justify="space-between"
                        align="center"
                        zIndex={5}
                        pointerEvents="none"
                        opacity={isBoxHovered ? 1 : 0.85}
                        transition="opacity 0.3s ease"
                      >

                      </Flex>

                      <ChakraImage
                        src={active.image}
                        alt={active.name}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition={active.objectPosition ?? "center top"}
                        loading="eager"
                        draggable={false}
                      />
                    </Box>
                  </Flex>

                  <Flex direction="column" justify="center">
                    <Flex align="center" gap={2.5} mb={2}>
                      <Box
                        w={isBoxHovered ? "20px" : "14px"}
                        h="1.5px"
                        bg="#CFAF89"
                        transition="width 0.3s ease"
                      />
                      <Text
                        fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                        fontWeight="700"
                        fontSize={{ base: "15px", md: "18px" }}
                        letterSpacing="0.14em"
                        color="#CFAF89"
                        textTransform="uppercase"
                      >
                        {active.category}
                      </Text>

                    </Flex>

                    <Box mb={2}>
                      <Text
                        fontFamily={active.fontFamily}
                        fontSize={active.fontSize}
                        letterSpacing={active.letterSpacing}
                        fontWeight={active.id === "kaustubh-agarwal" ? 700 : 300}
                        color="#FFFFFF"
                        lineHeight="1.15"
                      >
                        {active.name}
                      </Text>
                    </Box>

                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize={{ base: "15px", md: "17px" }}
                      fontWeight="500"
                      color="rgba(207, 175, 137, 0.9)"
                      mb={4}
                      lineHeight="1.45"
                    >
                      {active.role}
                    </Text>

                    <Text
                      fontFamily="'Proxima Nova', 'Inter', sans-serif"
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={300}
                      color="rgba(255, 255, 255, 0.85)"
                      lineHeight="1.75"
                      mb={5}
                    >
                      {active.description}
                    </Text>

                    <Flex align="center" gap={2.5} pt={2} opacity={0.88}>
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg="#4ade80"
                        boxShadow={isBoxHovered ? "0 0 14px #4ade80" : "0 0 10px #4ade80"}
                        transition="box-shadow 0.3s ease"
                      />
                      <Text
                        fontFamily="'Cinzel', serif"
                        fontSize="11.5px"
                        color="#CFAF89"
                        letterSpacing="0.12em"
                        textTransform="uppercase"
                        fontWeight="600"
                      >
                        14 NOVEMBER 2026
                      </Text>
                    </Flex>
                  </Flex>
                </Grid>
              </Box>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <Flex align="center" gap={2} mt={4} opacity={0.5}>
          <Text
            fontFamily="'Proxima Nova', sans-serif"
            fontSize="11px"
            letterSpacing="0.1em"
            color="rgba(207, 175, 137, 0.75)"
            textTransform="uppercase"
          >
            ← Swipe or use arrow keys to navigate guests →
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
