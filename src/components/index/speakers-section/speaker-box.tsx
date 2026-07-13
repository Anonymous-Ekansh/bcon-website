import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

interface SpeakerBoxProps {
  name: string;
  designation: string;
  description: string;
  image: string;
  lineImg?: string;
  lineTransform?: string;
  bgIcon?: string;
  idx: "odd" | "even";
}

const fetchSvgContent = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const text = await response.text();
  return text;
};

function SpeakerBox({
  name,
  designation,
  description,
  image,
  lineImg,
  lineTransform,
  bgIcon,
  idx,
}: SpeakerBoxProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"],
  });

  const fadeInDown = useTransform(scrollYProgress, [0, 0.3], [-50, 0]);
  const fadeInOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const transformedLineLength = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [lineLength, setLineLength] = useState(0);

  useMotionValueEvent(transformedLineLength, "change", (latest) => {
    setLineLength(latest);
  });

  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (lineImg) {
      fetchSvgContent(lineImg).then(setSvgContent).catch(console.error);
    }
  }, [lineImg]);

  return (
    <>
      <Grid
        ref={containerRef}
        h={["auto", "20rem"]}
        templateColumns={["1fr", idx === "even" ? "1fr 2fr" : "2fr 1fr"]}
        templateRows={["auto", "1fr"]}
        zIndex={10}
        gap={[10, 20]}
        mb={["5rem", 0]}
        position="relative"
      >
        <GridItem
          as={motion.div}
          order={[0, idx === "even" ? -1 : 1]}
          animate={{ y: fadeInDown.get() }} // Apply y transform directly
          style={{ opacity: fadeInOpacity.get() }} // Apply opacity through style
        >
          <Flex flexDir="column" alignItems="center">
            <Image
              width={400}
              height={800}
              alt={name}
              src={image}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 4px 25px 2px rgba(0,0,0,0.25)",
              }}
            />
          </Flex>
        </GridItem>
        <GridItem
          as={motion.div}
          order={[1, idx === "even" ? 1 : -1]}
          animate={{ y: fadeInDown.get() }} // Apply y transform directly
          style={{ opacity: fadeInOpacity.get() }} // Apply opacity through style
        >
          <Text fontWeight={600} fontSize={[24, 34]} color="#FB8328">
            {name}
          </Text>
          <Text fontWeight={600} fontSize={[16, 18]}>
            {designation}
          </Text>
          <Text mt={6}>{description}</Text>
        </GridItem>
      </Grid>

      {/* SVG Line Growing Animation */}
      {svgContent ? (
        <Flex
          as={motion.div}
          display={["none", "flex"]}
          w="100%"
          justifyContent="center"
          position="relative"
          transform={lineTransform}
          zIndex={2}
          dangerouslySetInnerHTML={{
            __html: svgContent.replace(
              "<path",
              `<path style="stroke-dasharray: 1000; stroke-dashoffset: ${
                1000 - (1000 * lineLength) / 100
              }"`
            ),
          }}
        />
      ) : null}
    </>
  );
}

export default SpeakerBox;
