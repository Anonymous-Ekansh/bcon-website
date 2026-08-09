// speakers-container.tsx

import { Box, Flex, Spacer, useMediaQuery } from "@chakra-ui/react";
import MobileStackedSpeakerBox from "./mobile-stacked-speaker-box";
import SpeakerBox from "./speaker-box";
import speakersData from "./speakers-data";

interface SpeakersContainerProps {
  limit?: number;
}

function SpeakersContainer({ limit }: SpeakersContainerProps = {}) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const displayedSpeakers = limit ? speakersData.slice(0, limit) : speakersData;

  return (
    <Flex
      flexDir="column"
      maxW="60rem"
      mx="auto"
      mt={[16, 4]} // Adjusted margin
      px={4}
      position="relative"
    >
      {displayedSpeakers.map((speaker, i) => (
        <Box
          key={i}
          position="relative"
          zIndex={i + 1} // Higher index value means it will stack on top
        >
          <Box position="sticky" top="5rem">
            {isMobile ? (
              <>
                <MobileStackedSpeakerBox
                  {...speaker}
                  idx={i % 2 === 0 ? "even" : "odd"}
                />
                <Spacer h="2rem" />
              </>
            ) : (
              <SpeakerBox {...speaker} idx={i % 2 === 0 ? "even" : "odd"} />
            )}
          </Box>
        </Box>
      ))}
    </Flex>
  );
}

export default SpeakersContainer;
