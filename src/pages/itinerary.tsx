import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image as ChakraImage,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiClock, FiCalendar, FiArrowRight, FiMapPin } from "react-icons/fi";
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
  period: "Morning" | "Afternoon" | "Evening";
  description: string;
  speakers?: SessionSpeaker[];
  eventImage?: string;
  accentLabel?: string;
}

const ITINERARY_SESSIONS: ItinerarySession[] = [
  {
    id: "keynote-1",
    number: "01",
    title: "Keynote Session 1",
    category: "Opening Keynote",
    time: "10:15 AM TO 11:00 AM",
    period: "Morning",
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
    eventImage: "/images/landing/events/keynote-speaker-session.png",
  },
  {
    id: "steve-sir-speech",
    number: "02",
    title: "Speech by Steve Sir",
    category: "Leadership Address",
    time: "11:00 AM TO 11:15 AM",
    period: "Morning",
    accentLabel: "Special Institutional Address",
    description:
      "An inspiring leadership address setting the vision for Business Conclave 2026 — welcoming industry luminaries, delegates, and aspiring student entrepreneurs to draft the blueprints of tomorrow.",
    eventImage: "/images/landing/speakers/steve_ismail.jpg",
  },
  {
    id: "keynote-2",
    number: "03",
    title: "Keynote Session 2",
    category: "Keynote Address",
    time: "11:15 AM TO 12:00 PM",
    period: "Morning",
    accentLabel: "Industry Visionary Session",
    description:
      "Join influential leaders as they share perspectives on market trends, disruptive innovation, and the future of modern enterprise across an ever-evolving global business landscape.",
    eventImage: "/images/landing/events/keynote-speaker-session.png",
  },
  {
    id: "workshop",
    number: "04",
    title: "Workshop",
    category: "Interactive Masterclass",
    time: "12:15 PM TO 1:15 PM",
    period: "Afternoon",
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
    eventImage: "/images/landing/speakers/dovleen_bhatti.jpg",
  },
  {
    id: "lunch",
    number: "05",
    title: "Lunch",
    category: "Break & Networking",
    time: "1:15 PM TO 2:30 PM",
    period: "Afternoon",
    accentLabel: "Networking Interlude",
    description:
      "A curated midday interlude for attendees, student founders, and guests to recharge and connect over lunch across the conclave grounds before the afternoon panels commence.",
    eventImage: "/images/landing/events/corporate-gala.png",
  },
  {
    id: "canopy-conversations",
    number: "06",
    title: "Canopy Conversations",
    category: "Open-Air Fireside Panel",
    time: "2:45 PM TO 4:15 PM",
    period: "Afternoon",
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
    eventImage: "/images/landing/events/canopy-conversations.png",
  },
  {
    id: "offbeat-roundtable",
    number: "07",
    title: "Offbeat Roundtable",
    category: "Roundtable Discussion",
    time: "4:45 PM TO 5:45 PM",
    period: "Evening",
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
    eventImage: "/images/landing/events/offbeat-roundtable.png",
  },
  {
    id: "comedy-set",
    number: "08",
    title: "Comedy Set",
    category: "Closing Live Special",
    time: "6:00 PM TO 7:00 PM",
    period: "Evening",
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
    eventImage: "/images/landing/events/corporate-gala.png",
  },
];

const ConnectorCurve = ({ flip }: { flip: boolean }) => (
  <Flex
    display={{ base: "none", md: "flex" }}
    w="100%"
    justify="center"
    my={2}
    pointerEvents="none"
    opacity={0.55}
  >
    <Box
      as="svg"
      w="320px"
      h="84px"
      viewBox="0 0 320 84"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      <motion.path
        d="M 40 4 C 40 46, 280 38, 280 80"
        stroke="url(#goldLineGrad)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <circle cx="40" cy="4" r="3" fill="#CFAF89" opacity="0.7" />
      <circle cx="280" cy="80" r="3" fill="#CFAF89" opacity="0.7" />
      <defs>
        <linearGradient id="goldLineGrad" x1="40" y1="4" x2="280" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(207, 175, 137, 0.7)" />
          <stop offset="50%" stopColor="rgba(198, 100, 219, 0.55)" />
          <stop offset="100%" stopColor="rgba(207, 175, 137, 0.7)" />
        </linearGradient>
      </defs>
    </Box>
  </Flex>
);

function SessionVisual({ session }: { session: ItinerarySession }) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const speakers = session.speakers ?? [];

  if (speakers.length > 1) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      >
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={{ base: 2.5, sm: 3 }}
          w="100%"
          maxW={{ base: "320px", sm: "340px" }}
          mx="auto"
          p={{ base: 2.5, sm: 3 }}
          borderRadius="18px"
          bg="rgba(255, 255, 255, 0.03)"
          border="1px solid rgba(255, 255, 255, 0.08)"
          boxShadow="0px 18px 40px rgba(0, 0, 0, 0.38)"
        >
          {speakers.map((sp) => (
            <Box
              key={sp.name}
              position="relative"
              borderRadius="12px"
              overflow="hidden"
              aspectRatio="4/5"
              bg="rgba(26, 9, 43, 0.9)"
              border="1px solid rgba(255, 255, 255, 0.07)"
            >
              {!failedImages[sp.name] ? (
                <ChakraImage
                  src={sp.image}
                  alt={sp.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  objectPosition={sp.objectPosition ?? "center top"}
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [sp.name]: true }))
                  }
                />
              ) : (
                <Flex w="100%" h="100%" align="center" justify="center">
                  <Text
                    fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                    fontSize="24px"
                    color="rgba(207, 175, 137, 0.5)"
                  >
                    {sp.name
                      .replace(/^(Mr\.|Ms\.|Dr\.)\s+/i, "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                </Flex>
              )}
              <Box
                position="absolute"
                inset="0"
                bg="linear-gradient(to top, rgba(12, 4, 22, 0.92) 0%, rgba(12, 4, 22, 0.25) 45%, transparent 100%)"
              />
              <Box position="absolute" bottom="8px" left="8px" right="8px">
                <Text
                  fontFamily="'Proxima Nova', 'Inter', sans-serif"
                  fontSize="11px"
                  fontWeight="600"
                  color="#FFFFFF"
                  lineHeight="1.2"
                  noOfLines={1}
                >
                  {sp.name}
                </Text>
                <Text
                  fontFamily="'Proxima Nova', 'Inter', sans-serif"
                  fontSize="9.5px"
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
      </motion.div>
    );
  }

  if (speakers.length === 1 && speakers[0]) {
    const sp = speakers[0];
    return (
      <Flex flexDir="column" alignItems="center">
        <motion.div
          whileHover={{
            scale: 1.02,
            y: -4,
            boxShadow: "0px 20px 40px rgba(198, 100, 219, 0.16)",
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ borderRadius: "14px" }}
        >
          <Box
            position="relative"
            w={{ base: "240px", sm: "260px", md: "265px" }}
            h={{ base: "300px", sm: "325px", md: "330px" }}
            borderRadius="14px"
            overflow="hidden"
            bg="rgba(26, 9, 43, 0.85)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            boxShadow="0px 10px 30px rgba(0, 0, 0, 0.35)"
          >
            {!failedImages[sp.name] ? (
              <ChakraImage
                src={sp.image}
                alt={sp.name}
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition={sp.objectPosition ?? "center top"}
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [sp.name]: true }))
                }
              />
            ) : (
              <Flex w="100%" h="100%" align="center" justify="center">
                <Text
                  fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                  fontSize="48px"
                  color="rgba(207, 175, 137, 0.4)"
                  fontWeight="300"
                >
                  {sp.name
                    .replace(/^(Mr\.|Ms\.|Dr\.)\s+/i, "")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </Flex>
            )}
            <Box
              position="absolute"
              inset="0"
              bg="linear-gradient(to top, rgba(14, 5, 26, 0.88) 0%, rgba(14, 5, 26, 0.15) 45%, transparent 100%)"
            />
            <Box position="absolute" bottom="14px" left="14px" right="14px">
              <Text
                fontFamily="'Cinzel', serif"
                fontSize="9.5px"
                letterSpacing="0.16em"
                color="#CFAF89"
                textTransform="uppercase"
                mb={0.5}
              >
                {session.category}
              </Text>
              <Text
                fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                fontSize="18px"
                color="#FFFFFF"
                fontWeight="300"
                lineHeight="1.2"
              >
                {sp.name}
              </Text>
            </Box>
          </Box>
        </motion.div>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" alignItems="center">
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -4,
          boxShadow: "0px 20px 40px rgba(207, 175, 137, 0.14)",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderRadius: "14px" }}
      >
        <Box
          position="relative"
          w={{ base: "240px", sm: "260px", md: "265px" }}
          h={{ base: "260px", sm: "285px", md: "300px" }}
          borderRadius="14px"
          overflow="hidden"
          bg="rgba(26, 9, 43, 0.85)"
          border="1px solid rgba(255, 255, 255, 0.1)"
          boxShadow="0px 10px 30px rgba(0, 0, 0, 0.35)"
        >
          {session.eventImage && !failedImages[session.id] ? (
            <ChakraImage
              src={session.eventImage}
              alt={session.title}
              w="100%"
              h="100%"
              objectFit="cover"
              filter="brightness(0.82) contrast(1.05)"
              onError={() =>
                setFailedImages((prev) => ({ ...prev, [session.id]: true }))
              }
            />
          ) : null}
          <Box
            position="absolute"
            inset="0"
            bg="linear-gradient(180deg, rgba(20, 7, 35, 0.35) 0%, rgba(16, 5, 28, 0.88) 100%)"
          />
          <Flex
            position="absolute"
            inset="0"
            direction="column"
            justify="space-between"
            p={5}
          >
            <Flex justify="space-between" align="center">
              <Text
                fontFamily="'Cinzel', serif"
                fontSize="11px"
                fontWeight="700"
                letterSpacing="0.2em"
                color="#CFAF89"
              >
                SESSION {session.number}
              </Text>
              <Box
                w="8px"
                h="8px"
                borderRadius="full"
                bg="rgba(207, 175, 137, 0.6)"
              />
            </Flex>
            <Box>
              <Text
                fontFamily="'Cinzel', serif"
                fontSize="9.5px"
                letterSpacing="0.16em"
                color="#CFAF89"
                textTransform="uppercase"
                mb={1}
              >
                {session.category}
              </Text>
              <Text
                fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                fontSize="22px"
                color="#FFFFFF"
                fontWeight="300"
                lineHeight="1.2"
              >
                {session.title}
              </Text>
            </Box>
          </Flex>
        </Box>
      </motion.div>
    </Flex>
  );
}

export default function ItineraryPage() {
  return (
    <Layout title="Event Itinerary | Business Conclave">
      <Box position="relative" pt={{ base: 28, md: 36 }} pb={{ base: 6, md: 10 }} bg="transparent">
        <Flex
          flexDir="column"
          alignItems="center"
          maxW="1060px"
          mx="auto"
          px={{ base: 5, sm: 6, md: 8 }}
          textAlign="center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Flex
              align="center"
              gap={2.5}
              px={4}
              py={1.5}
              mb={4}
              borderRadius="full"
              bg="rgba(207, 175, 137, 0.08)"
              border="1px solid rgba(207, 175, 137, 0.25)"
            >
              <FiCalendar size={12} color="#CFAF89" />
              <Text
                textTransform="uppercase"
                fontSize={{ base: "10px", sm: "11px" }}
                fontWeight="600"
                letterSpacing="0.24em"
                color="#CFAF89"
                fontFamily="'Cinzel', serif"
              >
                14 November 2026 • Full Day Schedule
              </Text>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <Text
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              fontSize={{ base: "14.5px", sm: "16px", md: "17px" }}
              fontWeight="300"
              color="rgba(255, 255, 255, 0.72)"
              maxW="600px"
              lineHeight="1.65"
              mb={3}
            >
              A curated full-day convergence of keynote sessions, hands-on workshops, candid fireside panels, and live entertainment.
            </Text>
            <Flex
              as="a"
              href="https://maps.app.goo.gl/4mspRRssrjY563N9A"
              target="_blank"
              rel="noopener noreferrer"
              align="center"
              justify="center"
              gap={2}
              color="rgba(207, 175, 137, 0.8)"
              fontSize="12.5px"
              fontFamily="'Proxima Nova', 'Inter', sans-serif"
              transition="all 0.25s ease"
              _hover={{
                color: "#CFAF89",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              <FiMapPin size={13} />
              <Text>G-Block, Shiv Nadar University</Text>
            </Flex>
          </motion.div>
        </Flex>
      </Box>

      {/* Main Alternating Timeline Container (Matching Past Speakers Layout) */}
      <Box position="relative" pb={24}>
        <Flex
          flexDir="column"
          maxW="58rem"
          mx="auto"
          px={{ base: 5, sm: 6, md: 8 }}
          position="relative"
        >
          {ITINERARY_SESSIONS.map((session, i) => {
            const isEven = i % 2 === 0;
            const speakers = session.speakers ?? [];

            return (
              <React.Fragment key={session.id}>
                <motion.div
                  id={session.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: isEven ? "1fr 1.65fr" : "1.65fr 1fr",
                    }}
                    gap={{ base: 6, md: 12, lg: 16 }}
                    alignItems="center"
                    bg={{ base: "rgba(255, 255, 255, 0.03)", md: "rgba(255, 255, 255, 0.02)" }}
                    p={{ base: 6, sm: 7, md: 8 }}
                    borderRadius="22px"
                    border="1px solid rgba(255, 255, 255, 0.07)"
                    boxShadow="0 20px 50px rgba(0, 0, 0, 0.28)"
                    backdropFilter="blur(14px)"
                    mb={{ base: 6, md: 0 }}
                    position="relative"
                    transition="border-color 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                      borderColor: "rgba(207, 175, 137, 0.28)",
                      boxShadow: "0 24px 60px rgba(0, 0, 0, 0.42)",
                    }}
                  >
                    {/* Visual Column */}
                    <GridItem order={{ base: 0, md: isEven ? 0 : 1 }}>
                      <SessionVisual session={session} />
                    </GridItem>

                    {/* Content Column */}
                    <GridItem order={{ base: 1, md: isEven ? 1 : 0 }}>
                      <Flex
                        direction="column"
                        align={{ base: "center", md: "flex-start" }}
                        textAlign={{ base: "center", md: "left" }}
                      >
                        {/* Session Number + Time Badge */}
                        <Flex
                          wrap="wrap"
                          align="center"
                          justify={{ base: "center", md: "flex-start" }}
                          gap={2.5}
                          mb={3}
                        >
                          <Box
                            px={2.5}
                            py={0.5}
                            borderRadius="full"
                            bg="rgba(207, 175, 137, 0.14)"
                            border="1px solid rgba(207, 175, 137, 0.35)"
                          >
                            <Text
                              fontFamily="'Cinzel', serif"
                              fontSize="10px"
                              fontWeight="700"
                              letterSpacing="0.16em"
                              color="#CFAF89"
                              textTransform="uppercase"
                            >
                              {session.number} • {session.category}
                            </Text>
                          </Box>

                          <Flex
                            align="center"
                            gap={1.5}
                            px={3}
                            py={0.5}
                            borderRadius="full"
                            bg="rgba(255, 255, 255, 0.05)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                          >
                            <FiClock size={11} color="#CFAF89" />
                            <Text
                              fontFamily="'Proxima Nova', 'Inter', sans-serif"
                              fontSize="11.5px"
                              fontWeight="600"
                              letterSpacing="0.08em"
                              color="rgba(255, 255, 255, 0.9)"
                            >
                              {session.time}
                            </Text>
                          </Flex>
                        </Flex>

                        {/* Session Title */}
                        <Text
                          fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
                          fontWeight={300}
                          fontSize={{ base: "26px", sm: "30px", md: "34px" }}
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
                              fontSize={{ base: "16px", md: "18px" }}
                              color="#FFFFFF"
                            >
                              {speakers[0].name}
                            </Text>
                            <Text
                              fontFamily="'Proxima Nova', 'Inter', sans-serif"
                              fontWeight={400}
                              fontSize={{ base: "13.5px", md: "14.5px" }}
                              color="rgba(207, 175, 137, 0.85)"
                            >
                              {speakers[0].role}
                            </Text>
                          </Box>
                        )}

                        {/* Accent Label for Non-Speaker / Multi-Speaker Sessions */}
                        {session.accentLabel && (
                          <Text
                            fontFamily="'Proxima Nova', 'Inter', sans-serif"
                            fontWeight={500}
                            fontSize={{ base: "14px", md: "15.5px" }}
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
                          fontSize={{ base: "14px", sm: "15px", md: "15.5px" }}
                          color="rgba(255, 255, 255, 0.8)"
                          lineHeight="1.75"
                          mb={speakers.length > 1 ? 5 : 0}
                        >
                          {session.description}
                        </Text>

                        {/* Multi-Speaker Roster (e.g., Canopy Conversations) */}
                        {speakers.length > 1 && (
                          <Box w="100%" pt={3} borderTop="1px solid rgba(255, 255, 255, 0.08)">
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
                              gap={2.5}
                              w="100%"
                            >
                              {speakers.map((sp) => (
                                <Flex
                                  key={sp.name}
                                  direction="column"
                                  align={{ base: "center", md: "flex-start" }}
                                  p={2.5}
                                  borderRadius="12px"
                                  bg="rgba(255, 255, 255, 0.03)"
                                  border="1px solid rgba(255, 255, 255, 0.06)"
                                >
                                  <Text
                                    fontFamily="'Proxima Nova', 'Inter', sans-serif"
                                    fontSize="13.5px"
                                    fontWeight="600"
                                    color="#FFFFFF"
                                  >
                                    {sp.name}
                                  </Text>
                                  <Text
                                    fontFamily="'Proxima Nova', 'Inter', sans-serif"
                                    fontSize="11.5px"
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

                {i < ITINERARY_SESSIONS.length - 1 && (
                  <ConnectorCurve flip={!isEven} />
                )}
              </React.Fragment>
            );
          })}
        </Flex>

        {/* Bottom CTA Card */}
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
            bg="rgba(255, 255, 255, 0.025)"
            border="1px solid rgba(207, 175, 137, 0.22)"
            boxShadow="0 20px 50px rgba(0, 0, 0, 0.35)"
            backdropFilter="blur(16px)"
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

