"use client";
import { Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollBackground = () => {
  const { scrollYProgress } = useScroll();
  const mauveOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35, 0.5], [0, 1, 1, 0]);
  const orchidOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.8], [0, 1, 1, 0]);
  const magentaOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
  const darkOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <Box
      position="fixed"
      inset="0"
      w="100vw"
      h="100vh"
      zIndex={0}
      pointerEvents="none"
      bg="#2D1147" // Base layer
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 100% 0%, rgba(186, 39, 206, 0.25) 0%, rgba(198, 100, 219, 0.15) 30%, rgba(45, 17, 71, 0.05) 60%, transparent 100%)",
          opacity: heroGlowOpacity
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(129, 100, 147, 0.35) 100%)",
          opacity: mauveOpacity
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, transparent 0%, rgba(198, 100, 219, 0.25) 100%)",
          opacity: orchidOpacity
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(186, 39, 206, 0.25) 100%)",
          opacity: magentaOpacity
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, #1A0A29 100%)",
          opacity: darkOpacity
        }}
      />
    </Box>
  );
};

export default ScrollBackground;
