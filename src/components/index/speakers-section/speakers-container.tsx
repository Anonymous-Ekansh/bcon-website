// speakers-container.tsx

import { Box, Flex, Text } from "@chakra-ui/react";
import SpeakerBox from "./speaker-box";
import MobileFlipSpeakerCard from "./mobile-flip-speaker-card";
import speakersData from "./speakers-data";

interface SpeakersContainerProps {
  limit?: number;
  useCarouselOnMobile?: boolean;
}

function SpeakersContainer({ limit, useCarouselOnMobile = true }: SpeakersContainerProps) {
  const displayedSpeakers = limit ? speakersData.slice(0, limit) : speakersData;

  const desktopView = (
    <Flex
      display={useCarouselOnMobile ? { base: "none", md: "flex" } : "flex"}
      flexDir="column"
      maxW="60rem"
      mx="auto"
      mt={4}
      px={4}
      position="relative"
    >
      {displayedSpeakers.map((speaker, i) => (
        <Box
          key={i}
          position="relative"
          zIndex={i + 1}
        >
          <Box position="sticky" top="5rem">
            <SpeakerBox {...speaker} idx={i % 2 === 0 ? "even" : "odd"} />
          </Box>
        </Box>
      ))}
    </Flex>
  );

  if (!useCarouselOnMobile) {
    return desktopView;
  }

  return (
    <>
      {/* Desktop View */}
      {desktopView}

      {/* Mobile Swipe View */}
      <Box display={{ base: "block", md: "none" }} w="100%" overflow="hidden" py={8}>
        <Text
          fontSize="15px"
          mb={8}
          fontFamily="'Proxima Nova', 'Inter', sans-serif"
          fontWeight="300"
          color="rgba(255, 255, 255, 0.7)"
          textAlign="center"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          ← Swipe to explore →
        </Text>
        <Flex
          w="100%"
          overflowX="auto"
          sx={{
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
          px={6}
          pb={8}
          gap={5}
        >
          {displayedSpeakers.map((speaker, i) => (
            <MobileFlipSpeakerCard key={i} {...speaker} />
          ))}
        </Flex>
      </Box>
    </>
  );
}

export default SpeakersContainer;
