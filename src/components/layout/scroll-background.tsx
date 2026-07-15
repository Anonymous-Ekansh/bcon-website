"use client";
import { Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollBackground = () => {
  const { scrollYProgress } = useScroll();

  // Layer 1: Dark Purple (Base, always present)
  // Layer 2: Soft Mauve (Peaks around 0.25 - Speakers)
  const mauveOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35, 0.5], [0, 1, 1, 0]);
  
  // Layer 3: Orchid (Peaks around 0.5 - Events)
  const orchidOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.8], [0, 1, 1, 0]);

  // Layer 4: Magenta (Peaks around 0.75 - Competitions)
  const magentaOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);

  // Layer 5: Near Black (Peaks at 1 - Footer)
  const darkOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  // Ambient Hero Glow (Fades out as we scroll down)
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
      {/* Hero Glow */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 100% 0%, rgba(186, 39, 206, 0.25) 0%, rgba(198, 100, 219, 0.15) 30%, rgba(45, 17, 71, 0.05) 60%, transparent 100%)",
          opacity: heroGlowOpacity
        }}
      />
      
      {/* Soft Mauve Layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(129, 100, 147, 0.35) 100%)",
          opacity: mauveOpacity
        }}
      />

      {/* Orchid Layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, transparent 0%, rgba(198, 100, 219, 0.25) 100%)",
          opacity: orchidOpacity
        }}
      />

      {/* Magenta Layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(186, 39, 206, 0.25) 100%)",
          opacity: magentaOpacity
        }}
      />

      {/* Footer Deep Dark Layer */}
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
