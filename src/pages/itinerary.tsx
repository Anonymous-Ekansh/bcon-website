import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image as ChakraImage,
  Button,
} from "@chakra-ui/react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import Layout from "~/components/layout";

interface SessionSpeaker {
  name: string;
  role: string;
  image: string;
  objectPosition?: string;
}

interface ItinerarySession {
  id: string;
  number: string;
  title: string;
  category: string;
  time: string;
  description: string;
  speakers?: SessionSpeaker[];
  accentLabel?: string;
}

const ITINERARY_SESSIONS: ItinerarySession[] = [
  {
    id: "keynote-1",
    number: "01",
    title: "Keynote Session",
    category: "Opening Keynote",
    time: "10:15 AM TO 11:00 AM",
    description:
      "Opening the 2026 Business Conclave with high-level boardroom insights on strategic digital transformation, enterprise advisory, and leadership at global scale.",
    speakers: [
      {
        name: "Mr. Harsh Kumar",
        role: "Senior Partner & Member of the Board at Ernst & Young (EY)",
        image: "/images/landing/speakers/harsh_kumar.png",
        objectPosition: "center top",
      },
    ],
  },
  {
    id: "steve-sir-speech",
    number: "02",
    title: "Speech by Steve Sir",
    category: "Leadership Address",
    time: "11:00 AM TO 11:15 AM",
    description:
      "An inspiring institutional address setting the vision for Business Conclave 2026 — drawing from over three decades of distinguished leadership to welcome delegates, industry luminaries, and student entrepreneurs.",
    speakers: [
      {
        name: "Brig. Steve Ismail (Retd.)",
        role: "Dean of Students, Shiv Nadar University • Sena Medal Awardee",
        image: "/images/landing/speakers/steve_ismail.jpg",
        objectPosition: "center top",
      },
    ],
  },
  {
    id: "workshop",
    number: "03",
    title: "Workshop",
    category: "Interactive Masterclass",
    time: "12:15 PM TO 1:15 PM",
    description:
      "A hands-on workshop drawing from applied psychology and NLP coaching frameworks to help emerging leaders overcome decision fatigue, build career clarity, and transition into purposeful action.",
    speakers: [
      {
        name: "Ms. Dovleen Bhatti",
        role: "Clarity Coach • Psychologist & NLP Master Practitioner",
        image: "/images/landing/speakers/dovleen_bhatti.jpg",
        objectPosition: "center top",
      },
    ],
  },
  {
    id: "lunch",
    number: "04",
    title: "Lunch",
    category: "Break & Networking",
    time: "1:15 PM TO 2:30 PM",
    accentLabel: "Networking Interlude",
    description:
      "A midday interlude for delegates, student founders, and guests to recharge and connect over lunch across the conclave grounds before the afternoon sessions commence.",
  },
  {
    id: "canopy-conversations",
    number: "05",
    title: "Canopy Conversations",
    category: "Open-Air Fireside Panel",
    time: "2:45 PM TO 4:15 PM",
    description:
      "Intimate, candid dialogues with seasoned industry veterans under a relaxed setting — exploring corporate finance, circular sustainable fashion, enterprise cloud architecture, and Big Four transformation.",
    speakers: [
      {
        name: "Mr. Bikash Jain",
        role: "General Manager @ Dabur • Ex-CFO @ Hero Cycles",
        image: "/images/landing/speakers/bikash_jain.jpg",
        objectPosition: "center top",
      },
      {
        name: "Ms. Tanaya Rao",
        role: "Founder @ Ekatran Label",
        image: "/images/landing/speakers/tanaya_rao.jpg",
        objectPosition: "center top",
      },
      {
        name: "Mr. Saurabh Gupta",
        role: "Consulting Technical Director @ Oracle",
        image: "/images/landing/speakers/saurabh_gupta.jpg",
        objectPosition: "center top",
      },
      {
        name: "Mr. Amit Verma",
        role: "Director @ KPMG",
        image: "/images/landing/speakers/amit_verma.jpg",
        objectPosition: "center top",
      },
    ],
  },
  {
    id: "offbeat-roundtable",
    number: "06",
    title: "Offbeat Roundtable",
    category: "Roundtable Discussion",
    time: "4:45 PM TO 5:45 PM",
    description:
      "Dynamic conversations on unconventional career paths and the digital creator economy — challenging norms, building authentic personal brands, and reimagining youth mentorship and EdTech.",
    speakers: [
      {
        name: "Ms. Sana Bhatega",
        role: "Entrepreneur & EdTech Influencer • 150K+ Followers on Instagram",
        image: "/images/landing/speakers/sana_bhatega.jpg",
        objectPosition: "center top",
      },
    ],
  },
  {
    id: "comedy-set",
    number: "07",
    title: "Comedy Set",
    category: "Closing Live Special",
    time: "6:00 PM TO 7:00 PM",
    description:
      "Wrapping up Business Conclave 2026 with an electrifying live stand-up comedy set — blending corporate hustle with sharp wit, deadpan humor, and viral storytelling.",
    speakers: [
      {
        name: "Kaustubh Agarwal",
        role: "Stand-Up Comedian • India’s Got Latent Panelist",
        image: "/images/landing/speakers/kaustubh_agarwal.jpg",
        objectPosition: "top center",
      },
    ],
  },
];

const CURVE_PATH =
  "M 6 6 C 6 6, 13.7 36.8, 22 59 C 31 83, 45.7 119, 64 136 C 85.5 156, 104.5 166.7, 135.5 163.5 C 181.4 158.8, 234 130.5, 234 130.5 C 234 130.5, 270.3 105.7, 321.5 83.5 C 393.4 52.3, 435.2 26.2, 513.5 25.5 C 547.9 25.2, 568 25.8, 601 35.5 C 628.9 43.7, 645.4 48.6, 661 73 C 676.8 97.5, 684.5 121.9, 684.5 163.5 C 684.5 199.5, 661 262, 661 262";

const ConnectorCurve = ({ flip, index }: { flip: boolean; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.35"],
  });

  const smoothLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.6,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothLength, [0, 0.15, 1], [0.15, 0.85, 0.95]);
  const gradId = `goldCurveGrad-${index}`;

  return (
    <Flex
      ref={ref}
      display={{ base: "none", md: "flex" }}
      w="100%"
      justify="center"
      my={{ md: -2, lg: -1 }}
      pointerEvents="none"
      position="relative"
      zIndex={1}
    >
      <motion.div style={{ opacity, willChange: "opacity" }}>
        <Box
          as="svg"
          w={{ md: "420px", lg: "500px" }}
          h={{ md: "145px", lg: "170px" }}
          viewBox="0 0 690 268"
          fill="none"
          style={{ transform: flip ? "scaleX(-1)" : "none" }}
        >
          <path
            d={CURVE_PATH}
            stroke="rgba(207, 175, 137, 0.12)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="28 28"
          />
          <motion.path
            d={CURVE_PATH}
            stroke={`url(#${gradId})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: smoothLength }}
          />
          <defs>
            <linearGradient
              id={gradId}
              x1="6"
              y1="6"
              x2="684"
              y2="262"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#CFAF89" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#E8D8C3" stopOpacity="1" />
              <stop offset="100%" stopColor="#CFAF89" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </Box>
      </motion.div>
    </Flex>
  );
};

function SessionVisual({
  session,
  eager,
}: {
  session: ItinerarySession;
  eager: boolean;
}) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const speakers = session.speakers ?? [];

  if (speakers.length > 1) {
    return (
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={{ base: 2, sm: 2.5, md: 3 }}
        w="100%"
        maxW={{ base: "260px", sm: "290px", md: "335px" }}
        mx="auto"
        p={{ base: 2, sm: 2.5, md: 3 }}
        borderRadius={{ base: "16px", sm: "18px" }}
        bg="linear-gradient(145deg, rgba(36, 14, 58, 0.92) 0%, rgba(20, 7, 35, 0.96) 100%)"
        border="1px solid rgba(207, 175, 137, 0.22)"
        boxShadow="0px 18px 40px rgba(0, 0, 0, 0.4)"
        transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease"
        _hover={{
          transform: "translateY(-4px)",
          borderColor: "rgba(207, 175, 137, 0.45)",
        }}
      >
        {speakers.map((sp) => (
          <Box
            key={sp.name}
            position="relative"
            borderRadius="12px"
            overflow="hidden"
            aspectRatio="4/5"
            bg="rgba(22, 8, 38, 0.95)"
            border="1px solid rgba(255, 255, 255, 0.08)"
          >
            {!failedImages[sp.name] ? (
              <ChakraImage
                src={sp.image}
                alt={sp.name}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition={sp.objectPosition ?? "center top"}
                transition="transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                _hover={{ transform: "scale(1.05)" }}
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [sp.name]: true }))
                }
              />
            ) : (
              <Flex w="100%" h="100%" align="center" justify="center">
                <Text
                  fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                  fontSize={{ base: "18px", sm: "22px" }}
                  color="rgba(207, 175, 137, 0.5)"
                >
                  {sp.name
                    .replace(/^(Mr\.|Ms\.|Dr\.|Brig\.)\s+/i, "")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </Flex>
            )}
            <Box
              position="absolute"
              inset="0"
              bg="linear-gradient(to top, rgba(12, 4, 22, 0.94) 0%, rgba(12, 4, 22, 0.25) 45%, transparent 100%)"
              pointerEvents="none"
            />
            <Box
              position="absolute"
              bottom={{ base: "6px", sm: "8px" }}
              left={{ base: "6px", sm: "8px" }}
              right={{ base: "6px", sm: "8px" }}
              pointerEvents="none"
            >
              <Text
                fontFamily="'Proxima Nova', 'Inter', sans-serif"
                fontSize={{ base: "9.5px", sm: "11px" }}
                fontWeight="600"
                color="#FFFFFF"
                lineHeight="1.2"
                noOfLines={1}
              >
                {sp.name}
              </Text>
              <Text
                fontFamily="'Proxima Nova', 'Inter', sans-serif"
                fontSize={{ base: "8px", sm: "9.5px" }}
                color="#CFAF89"
                lineHeight="1.2"
                noOfLines={1}
              >
                {sp.role.split("•")[0]?.trim()}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    );
  }

  if (speakers.length === 1 && speakers[0]) {
    const sp = speakers[0];
    return (
      <Flex flexDir="column" alignItems="center" w="100%">
        <Box
          position="relative"
          w={{ base: "100%", sm: "240px", md: "260px" }}
          maxW={{ base: "210px", sm: "240px", md: "260px" }}
          h={{ base: "255px", sm: "295px", md: "325px" }}
          borderRadius={{ base: "16px", sm: "18px" }}
          overflow="hidden"
          bg="rgba(22, 8, 38, 0.92)"
          border="1.5px solid rgba(207, 175, 137, 0.28)"
          boxShadow="0px 14px 34px rgba(0, 0, 0, 0.42)"
          transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease"
          _hover={{
            transform: "translateY(-5px) scale(1.015)",
            borderColor: "rgba(207, 175, 137, 0.55)",
            boxShadow: "0px 22px 44px rgba(0, 0, 0, 0.55)",
          }}
        >
          {!failedImages[sp.name] ? (
            <ChakraImage
              src={sp.image}
              alt={sp.name}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition={sp.objectPosition ?? "center top"}
              transition="transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{ transform: "scale(1.04)" }}
              onError={() =>
                setFailedImages((prev) => ({ ...prev, [sp.name]: true }))
              }
            />
          ) : (
            <Flex w="100%" h="100%" align="center" justify="center">
              <Text
                fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                fontSize={{ base: "36px", sm: "44px" }}
                color="rgba(207, 175, 137, 0.4)"
                fontWeight="300"
              >
                {sp.name
                  .replace(/^(Mr\.|Ms\.|Dr\.|Brig\.)\s+/i, "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </Flex>
          )}
          <Box
            position="absolute"
            inset="0"
            bg="linear-gradient(to top, rgba(14, 5, 26, 0.92) 0%, rgba(14, 5, 26, 0.18) 45%, transparent 100%)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            bottom={{ base: "10px", sm: "14px" }}
            left={{ base: "10px", sm: "14px" }}
            right={{ base: "10px", sm: "14px" }}
            pointerEvents="none"
          >
            <Text
              fontFamily="'Cinzel', serif"
              fontSize={{ base: "8.5px", sm: "9.5px" }}
              letterSpacing="0.16em"
              color="#CFAF89"
              textTransform="uppercase"
              mb={0.5}
            >
              {session.category}
            </Text>
            <Text
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontSize={{ base: "15.5px", sm: "18px" }}
              color="#FFFFFF"
              fontWeight="300"
              lineHeight="1.2"
            >
              {sp.name}
            </Text>
          </Box>
        </Box>
      </Flex>
    );
  }

  return null;
}

function ItinerarySessionCard({
  session,
  index,
  visualOrderIndex,
}: {
  session: ItinerarySession;
  index: number;
  visualOrderIndex: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const speakers = session.speakers ?? [];
  const hasVisual = speakers.length > 0;
  const isEven = visualOrderIndex % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.94", "end 0.08"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.65,
    restDelta: 0.001,
  });

  const cardY = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [28, 0, 0, -16]);
  const cardOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.9, 1],
    [0.15, 1, 1, 0.4]
  );
  const cardScale = useTransform(
    smoothProgress,
    [0, 0.25, 0.85, 1],
    [0.97, 1, 1, 0.985]
  );
  const visualParallaxY = useTransform(smoothProgress, [0, 0.5, 1], [14, 0, -14]);

  return (
    <motion.div
      ref={cardRef}
      id={session.id}
      style={{
        y: cardY,
        opacity: cardOpacity,
        scale: cardScale,
        willChange: "transform, opacity",
      }}
    >
      <Grid
        templateColumns={{
          base: "1fr",
          md: hasVisual ? (isEven ? "1fr 1.65fr" : "1.65fr 1fr") : "1fr",
        }}
        gap={{ base: 5, sm: 6, md: hasVisual ? 10 : 0, lg: hasVisual ? 14 : 0 }}
        alignItems="center"
        bg="linear-gradient(145deg, rgba(42, 16, 68, 0.82) 0%, rgba(20, 7, 34, 0.92) 100%)"
        backdropFilter="blur(20px)"
        p={{ base: 4, sm: 6, md: 8 }}
        borderRadius={{ base: "18px", sm: "24px" }}
        border="1px solid rgba(207, 175, 137, 0.2)"
        boxShadow="0 18px 45px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
        mb={{ base: 3, md: 0 }}
        position="relative"
        zIndex={2}
        overflow="hidden"
        transition="border-color 0.35s ease, box-shadow 0.35s ease"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "24px",
          right: "24px",
          h: "1px",
          bg: "linear-gradient(90deg, transparent, rgba(207, 175, 137, 0.5), transparent)",
        }}
        _hover={{
          borderColor: "rgba(207, 175, 137, 0.45)",
          boxShadow:
            "0 24px 55px rgba(0, 0, 0, 0.55), 0 0 25px rgba(207, 175, 137, 0.12), inset 0 1px 0 rgba(207, 175, 137, 0.25)",
        }}
      >
        {/* Visual Column */}
        {hasVisual && (
          <GridItem order={{ base: 0, md: isEven ? 0 : 1 }}>
            <motion.div
              style={{ y: visualParallaxY, willChange: "transform" }}
            >
              <SessionVisual session={session} eager={index < 2} />
            </motion.div>
          </GridItem>
        )}

        {/* Content Column */}
        <GridItem order={{ base: 1, md: isEven ? 1 : 0 }}>
          <Flex
            direction="column"
            align={{
              base: "center",
              md: hasVisual ? "flex-start" : "center",
            }}
            textAlign={{
              base: "center",
              md: hasVisual ? "left" : "center",
            }}
            maxW={hasVisual ? "100%" : "38rem"}
            mx={hasVisual ? 0 : "auto"}
          >
            {/* Non-Visual Session Icon Emblem (e.g., Lunch & Networking) */}
            {!hasVisual && (
              <Flex
                align="center"
                justify="center"
                w={{ base: "52px", sm: "60px" }}
                h={{ base: "52px", sm: "60px" }}
                borderRadius="full"
                bg="linear-gradient(145deg, rgba(50, 18, 80, 0.95) 0%, rgba(22, 8, 38, 0.98) 100%)"
                border="1.5px solid rgba(207, 175, 137, 0.5)"
                boxShadow="0 8px 24px rgba(0, 0, 0, 0.45), 0 0 18px rgba(207, 175, 137, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                mb={3.5}
              >
                <Box
                  as="svg"
                  w={{ base: "22px", sm: "26px" }}
                  h={{ base: "22px", sm: "26px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CFAF89"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </Box>
              </Flex>
            )}
            {/* Editorial Session Header + Bold Time Pill */}
            <Flex
              wrap="wrap"
              align="center"
              justify={{
                base: "center",
                md: hasVisual ? "flex-start" : "center",
              }}
              gap={{ base: 2, sm: 3 }}
              mb={{ base: 2.5, sm: 3.5 }}
            >
              <Flex align="center" gap={2}>
                <Text
                  fontFamily="'Cinzel', serif"
                  fontSize={{ base: "11px", sm: "12px" }}
                  fontWeight="800"
                  letterSpacing="0.14em"
                  color="#CFAF89"
                >
                  {session.number}
                </Text>
                <Box w="12px" h="1px" bg="rgba(207, 175, 137, 0.5)" />
                <Text
                  fontFamily="'Cinzel', serif"
                  fontSize={{ base: "10px", sm: "11px" }}
                  fontWeight="700"
                  letterSpacing="0.16em"
                  color="#CFAF89"
                  textTransform="uppercase"
                >
                  {session.category}
                </Text>
              </Flex>

              <Box
                display={{ base: "none", sm: "block" }}
                w="1px"
                h="12px"
                bg="rgba(255, 255, 255, 0.16)"
              />

              <Flex
                align="center"
                gap={1.5}
                px={3}
                py={1}
                borderRadius="full"
                bg="rgba(207, 175, 137, 0.12)"
                border="1px solid rgba(207, 175, 137, 0.35)"
              >
                <Box
                  as="svg"
                  w="11px"
                  h="11px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CFAF89"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  flexShrink={0}
                >
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15.5 14" />
                </Box>
                <Text
                  fontFamily="'Proxima Nova', 'Inter', sans-serif"
                  fontSize={{ base: "10.5px", sm: "11.5px" }}
                  fontWeight="700"
                  letterSpacing="0.08em"
                  color="#FFFFFF"
                  whiteSpace="nowrap"
                >
                  {session.time}
                </Text>
              </Flex>
            </Flex>

            {/* Session Title */}
            <Text
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontWeight={300}
              fontSize={{ base: "24px", sm: "28px", md: "34px" }}
              color="#CFAF89"
              lineHeight="1.15"
              mb={2}
            >
              {session.title}
            </Text>

            {/* Single Speaker Highlight */}
            {speakers.length === 1 && speakers[0] && (
              <Box mb={3}>
                <Text
                  fontFamily="'Proxima Nova', 'Inter', sans-serif"
                  fontWeight={600}
                  fontSize={{ base: "15.5px", md: "18px" }}
                  color="#FFFFFF"
                >
                  {speakers[0].name}
                </Text>
                <Text
                  fontFamily="'Proxima Nova', 'Inter', sans-serif"
                  fontWeight={400}
                  fontSize={{ base: "13px", md: "14.5px" }}
                  color="rgba(207, 175, 137, 0.85)"
                >
                  {speakers[0].role}
                </Text>
              </Box>
            )}

            {/* Accent Label for Non-Speaker Sessions (Lunch) */}
            {session.accentLabel && (
              <Text
                fontFamily="'Proxima Nova', 'Inter', sans-serif"
                fontWeight={500}
                fontSize={{ base: "13.5px", md: "15px" }}
                color="rgba(255, 255, 255, 0.78)"
                mb={3}
              >
                {session.accentLabel}
              </Text>
            )}

            {/* Description */}
            <Text
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontWeight={300}
              fontSize={{ base: "13.5px", sm: "14.5px", md: "15.5px" }}
              color="rgba(255, 255, 255, 0.8)"
              lineHeight={{ base: "1.65", md: "1.75" }}
              mb={speakers.length > 1 ? 5 : 0}
            >
              {session.description}
            </Text>

            {/* Multi-Speaker Roster (Canopy Conversations) */}
            {speakers.length > 1 && (
              <Box
                w="100%"
                pt={3}
                borderTop="1px solid rgba(255, 255, 255, 0.08)"
              >
                <Text
                  fontFamily="'Cinzel', serif"
                  fontSize="10px"
                  fontWeight="700"
                  letterSpacing="0.18em"
                  color="#CFAF89"
                  textTransform="uppercase"
                  mb={3}
                >
                  Featured Panelists
                </Text>
                <Grid
                  templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
                  gap={{ base: 2, sm: 2.5 }}
                  w="100%"
                >
                  {speakers.map((sp) => (
                    <Flex
                      key={sp.name}
                      direction="column"
                      align={{ base: "center", md: "flex-start" }}
                      p={{ base: 2, sm: 2.5 }}
                      borderRadius="12px"
                      bg="rgba(255, 255, 255, 0.035)"
                      border="1px solid rgba(255, 255, 255, 0.07)"
                      transition="border-color 0.25s ease, transform 0.25s ease"
                      _hover={{
                        borderColor: "rgba(207, 175, 137, 0.35)",
                        transform: "translateY(-2px)",
                      }}
                    >
                      <Text
                        fontFamily="'Proxima Nova', 'Inter', sans-serif"
                        fontSize={{ base: "12.5px", sm: "13.5px" }}
                        fontWeight="600"
                        color="#FFFFFF"
                      >
                        {sp.name}
                      </Text>
                      <Text
                        fontFamily="'Proxima Nova', 'Inter', sans-serif"
                        fontSize={{ base: "11px", sm: "11.5px" }}
                        color="rgba(207, 175, 137, 0.85)"
                        lineHeight="1.35"
                      >
                        {sp.role}
                      </Text>
                    </Flex>
                  ))}
                </Grid>
              </Box>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </motion.div>
  );
}

export default function ItineraryPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  let visualCounter = 0;

  return (
    <Layout title="Event Itinerary | Business Conclave">
      {/* Background Ambient Glows */}
      <Box
        position="fixed"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "320px", md: "600px" }}
        h={{ base: "320px", md: "400px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(207, 175, 137, 0.08) 0%, transparent 70%)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="fixed"
        top="40%"
        left="-5%"
        w={{ base: "280px", md: "500px" }}
        h={{ base: "280px", md: "500px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(120, 40, 180, 0.12) 0%, transparent 70%)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="fixed"
        bottom="10%"
        right="-5%"
        w={{ base: "280px", md: "500px" }}
        h={{ base: "280px", md: "500px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(207, 175, 137, 0.07) 0%, transparent 70%)"
        pointerEvents="none"
        zIndex={0}
      />

      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2.5px",
          background:
            "linear-gradient(90deg, #CFAF89 0%, #FFF3DF 50%, #CFAF89 100%)",
          boxShadow: "0 0 12px rgba(207, 175, 137, 0.65)",
          zIndex: 10002,
          willChange: "transform",
        }}
      />

      <Box
        position="relative"
        pt={{ base: 28, md: 36 }}
        pb={{ base: 8, md: 12 }}
        bg="transparent"
      >
        <Flex
          flexDir="column"
          alignItems="center"
          maxW="1060px"
          mx="auto"
          px={{ base: 5, sm: 6, md: 8 }}
          textAlign="center"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Flex justify="center" mb={{ base: 4, sm: 5 }}>
              <Flex
                align="center"
                gap={{ base: 2, sm: 2.5 }}
                px={{ base: 3.5, sm: 5 }}
                py={{ base: 1.5, sm: 2 }}
                borderRadius="full"
                bg="linear-gradient(180deg, rgba(46, 17, 72, 0.96) 0%, rgba(20, 7, 34, 0.98) 100%)"
                border="1.5px solid rgba(207, 175, 137, 0.65)"
                boxShadow="0 6px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(207, 175, 137, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.25)"
                backdropFilter="blur(20px)"
                maxW="92vw"
                transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                _hover={{
                  transform: "translateY(-1px)",
                  borderColor: "#CFAF89",
                  boxShadow:
                    "0 8px 30px rgba(0, 0, 0, 0.6), 0 0 26px rgba(207, 175, 137, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
              >
                {/* Luminous Pulsing Gold Beacon */}
                <Flex
                  align="center"
                  justify="center"
                  position="relative"
                  w="8px"
                  h="8px"
                  flexShrink={0}
                >
                  <Box
                    position="absolute"
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg="#21ff11ed"
                    opacity={0.8}
                  />
                </Flex>

                <Text
                  textTransform="uppercase"
                  fontSize={{ base: "9.5px", sm: "10.5px", md: "11px" }}
                  fontWeight="800"
                  letterSpacing={{ base: "0.14em", sm: "0.18em" }}
                  color="#CFAF89"
                  fontFamily="'Cinzel', serif"
                  whiteSpace="nowrap"
                >
                  Official Schedule
                </Text>
              </Flex>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Text
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontSize={{ base: "36px", sm: "44px", md: "56px" }}
              fontWeight="300"
              color="#FFFFFF"
              lineHeight="1.1"
              mb={4}
            >
              Event <Text as="span" color="#CFAF89">Itinerary</Text>
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <Text
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontSize={{ base: "14.5px", sm: "16px", md: "17px" }}
              fontWeight="300"
              color="rgba(255, 255, 255, 0.72)"
              maxW="600px"
              lineHeight="1.65"
              mb={4}
            >
              A curated full-day convergence of keynote sessions, hands-on workshops, candid fireside panels, and live entertainment.
            </Text>
            <Flex
              as="a"
              href="https://maps.app.goo.gl/4mspRRssrjY563N9A"
              target="_blank"
              rel="noopener noreferrer"
              role="group"
              display="inline-flex"
              align="center"
              justify="center"
              gap={2}
              px={{ base: 3.5, sm: 4 }}
              py={{ base: 1.5, sm: 2 }}
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.03)"
              border="1px solid rgba(207, 175, 137, 0.3)"
              color="#CFAF89"
              fontSize={{ base: "11.5px", sm: "12.5px" }}
              fontWeight="600"
              letterSpacing="0.04em"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              maxW="92vw"
              transition="all 0.25s ease"
              _hover={{
                bg: "rgba(207, 175, 137, 0.12)",
                borderColor: "#CFAF89",
                color: "#FFFFFF",
                transform: "translateY(-1px)",
              }}
            >
              <FiMapPin size={13} color="#CFAF89" style={{ flexShrink: 0 }} />
              <Text as="span" lineHeight="1.3">
                G-Block, Shiv Nadar University, Delhi-NCR
              </Text>
              <Box
                as="svg"
                w="12px"
                h="12px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.75}
                flexShrink={0}
                transition="transform 0.2s ease"
                _groupHover={{ transform: "translate(2px, -2px)", opacity: 1 }}
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </Box>
            </Flex>
          </motion.div>
        </Flex>
      </Box>

      <Box position="relative" pb={24}>
        <Flex
          flexDir="column"
          maxW="56rem"
          mx="auto"
          px={{ base: 3.5, sm: 6, md: 8 }}
          position="relative"
        >
          {ITINERARY_SESSIONS.map((session, i) => {
            const hasVisual = (session.speakers?.length ?? 0) > 0;
            const currentVisualOrder = hasVisual ? visualCounter++ : i;

            return (
              <React.Fragment key={session.id}>
                <ItinerarySessionCard
                  session={session}
                  index={i}
                  visualOrderIndex={currentVisualOrder}
                />

                {i < ITINERARY_SESSIONS.length - 1 && (
                  <>
                    <ConnectorCurve flip={i % 2 === 1} index={i} />
                    <Flex
                      display={{ base: "flex", md: "none" }}
                      direction="column"
                      align="center"
                      my={3}
                    >
                      <Box
                        w="1.5px"
                        h="22px"
                        bg="linear-gradient(180deg, rgba(207, 175, 137, 0.5) 0%, rgba(207, 175, 137, 0.1) 100%)"
                      />
                      <Box
                        w="5px"
                        h="5px"
                        borderRadius="full"
                        bg="#CFAF89"
                        boxShadow="0 0 8px #CFAF89"
                        my={0.5}
                      />
                      <Box
                        w="1.5px"
                        h="22px"
                        bg="linear-gradient(180deg, rgba(207, 175, 137, 0.1) 0%, rgba(207, 175, 137, 0.5) 100%)"
                      />
                    </Flex>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </Flex>

        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="42rem"
          mx="auto"
          mt={{ base: 10, md: 16 }}
          px={6}
        >
          <Box
            w="100%"
            p={{ base: 7, sm: 9 }}
            borderRadius="24px"
            bg="linear-gradient(145deg, rgba(44, 17, 72, 0.85) 0%, rgba(20, 7, 35, 0.95) 100%)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(207, 175, 137, 0.28)"
            boxShadow="0 24px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: "24px",
              right: "24px",
              h: "1.5px",
              bg: "linear-gradient(90deg, transparent, rgba(207, 175, 137, 0.65), transparent)",
            }}
          >
            <Text
              fontFamily="'Cinzel', serif"
              fontSize="10.5px"
              letterSpacing="0.22em"
              color="#CFAF89"
              textTransform="uppercase"
              mb={2}
            >
              14 November 2026 • Shiv Nadar University
            </Text>
            <Text
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontSize={{ base: "26px", sm: "32px" }}
              fontWeight="300"
              color="#FFFFFF"
              mb={3}
            >
              Reserve Your Seat for <Text as="span" color="#CFAF89">2026</Text>
            </Text>
            <Text
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontSize={{ base: "14px", sm: "15px" }}
              color="rgba(255, 255, 255, 0.72)"
              maxW="460px"
              mx="auto"
              mb={6}
              lineHeight="1.65"
            >
              Join us for a full day of keynotes, workshops, candid conversations, and networking with India’s foremost leaders.
            </Text>
            <Flex
              direction={{ base: "column", sm: "row" }}
              justify="center"
              align="center"
              gap={3.5}
            >
              <Button
                as={Link}
                href="https://forms.rishabhj.in/bcon"
                target="_blank"
                bg="#CFAF89"
                color="#12081F"
                fontFamily="'Proxima Nova', 'Inter', sans-serif"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="0.1em"
                textTransform="uppercase"
                px={8}
                h="48px"
                borderRadius="full"
                rightIcon={<FiArrowRight size={16} />}
                _hover={{
                  bg: "#FFFFFF",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 12px 28px rgba(207, 175, 137, 0.3)",
                }}
                transition="all 0.3s ease"
                w={{ base: "100%", sm: "auto" }}
              >
                Register Now
              </Button>
              <Button
                as={Link}
                href="/"
                bg="transparent"
                color="#CFAF89"
                border="1px solid rgba(207, 175, 137, 0.45)"
                fontFamily="'Proxima Nova', 'Inter', sans-serif"
                fontSize="13.5px"
                fontWeight="500"
                letterSpacing="0.06em"
                px={7}
                h="48px"
                borderRadius="full"
                _hover={{
                  bg: "rgba(207, 175, 137, 0.12)",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
                w={{ base: "100%", sm: "auto" }}
              >
                Back to Home
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}
