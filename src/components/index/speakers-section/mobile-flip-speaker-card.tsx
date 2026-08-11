import { useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Props {
  name: string;
  designation: string;
  description: string;
  image: string;
}

export default function MobileFlipSpeakerCard({ name, designation, description, image }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box 
      w="80vw" 
      maxW="320px" 
      h="480px" 
      style={{ perspective: "1200px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      cursor="pointer"
      flexShrink={0}
      scrollSnapAlign="center"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Face */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          borderRadius="24px"
          overflow="hidden"
          style={{ backfaceVisibility: "hidden" }}
          bg="rgba(255, 255, 255, 0.05)"
          border="1px solid rgba(255,255,255,0.1)"
          boxShadow="0px 20px 40px rgba(0,0,0,0.5)"
        >
          {image ? (
            <Image src={image} alt={name} w="100%" h="100%" objectFit="cover" />
          ) : (
            <Flex w="100%" h="100%" alignItems="center" justifyContent="center" bg="rgba(207, 175, 137, 0.1)">
               <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize="48px" color="rgba(207, 175, 137, 0.3)" fontWeight="300">
                  {name.split(" ").map(n => n[0]).join("")}
               </Text>
            </Flex>
          )}
          {/* Gradient Overlay */}
          <Box
            position="absolute"
            bottom="0"
            left="0"
            w="100%"
            h="60%"
            bg="linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)"
          />
          <Flex
            position="absolute"
            bottom="0"
            left="0"
            w="100%"
            p={6}
            flexDir="column"
          >
            <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontWeight={300} fontSize="28px" color="#CFAF89" lineHeight="1.2" mb={2}>
              {name}
            </Text>
            <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontWeight={500} fontSize="14px" color="rgba(255,255,255,0.8)">
              {designation}
            </Text>
            
            <Flex alignItems="center" mt={5} gap={3} opacity={0.8}>
              <Box w="6px" h="6px" borderRadius="full" bg="#CFAF89" className="pulse-dot" />
              <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="10px" textTransform="uppercase" letterSpacing="0.1em" color="#CFAF89">Tap to read</Text>
            </Flex>
          </Flex>
        </Box>

        {/* Back Face */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          borderRadius="24px"
          overflow="hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          bg="rgba(15, 15, 15, 0.9)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(207, 175, 137, 0.25)"
          p={6}
          display="flex"
          flexDir="column"
        >
          <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontWeight={300} fontSize="24px" color="#CFAF89" mb={1}>
            {name}
          </Text>
          <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontWeight={500} fontSize="14px" color="rgba(255,255,255,0.6)" mb={6} borderBottom="1px solid rgba(255,255,255,0.1)" pb={4}>
            {designation}
          </Text>
          <Box flex="1" overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontWeight={300} fontSize="14px" color="rgba(255,255,255,0.85)" lineHeight="1.8">
              {description}
            </Text>
          </Box>
          <Flex justifyContent="center" mt={4} opacity={0.5}>
            <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="10px" textTransform="uppercase" letterSpacing="0.1em" color="#FFF">Tap to close</Text>
          </Flex>
        </Box>
      </motion.div>
      <style>{`
        .pulse-dot {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(207, 175, 137, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(207, 175, 137, 0); }
          100% { box-shadow: 0 0 0 0 rgba(207, 175, 137, 0); }
        }
      `}</style>
    </Box>
  );
}
