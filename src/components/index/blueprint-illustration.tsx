"use client";
import { Box, Text } from "@chakra-ui/react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Palette ──────────────────────────────────────────────────────── */
const GOLD = "#D4AF6A";
const GOLD_LIGHT = "#E8D4A0";
const VOID_BG = "#180B2A";
const SHADOW_CLR = "#2C1A4C";

const P = { top: "#F0EAF7", left: "#C9B8DE", right: "#A78FC7" };

/* ─── Component ────────────────────────────────────────────────────── */
const BlueprintIllustration = () => {
  const [isPlaced, setIsPlaced] = useState(false);
  const [restoredFromSession, setRestoredFromSession] = useState(false);
  const [counter, setCounter] = useState(1204);
  const [showMsg, setShowMsg] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  /* ── Restore session state ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const placed = sessionStorage.getItem("archway-placed");
    if (placed === "true") {
      setIsPlaced(true);
      setRestoredFromSession(true);
      setShowMsg(true);
    }
    const c = localStorage.getItem("archway-counter");
    if (c) setCounter(parseInt(c, 10));
    else localStorage.setItem("archway-counter", "1204");
  }, []);

  /* ── Place logic ── */
  const doPlace = useCallback(() => {
    if (isPlaced) return;
    setIsPlaced(true);
    sessionStorage.setItem("archway-placed", "true");

    const next = counter + 1;
    setCounter(next);
    localStorage.setItem("archway-counter", String(next));

    setTimeout(() => setShowMsg(true), 420);

    // Pulse the Register CTA in the navbar
    setTimeout(() => {
      const btn = document.querySelector<HTMLElement>(
        'a[href="/register"]'
      );
      if (btn) {
        btn.style.transition = "box-shadow 0.4s ease";
        btn.style.boxShadow = `0 0 18px ${GOLD}, 0 0 36px rgba(212,175,106,0.25)`;
        setTimeout(() => {
          btn.style.boxShadow = "none";
        }, 1400);
      }
    }, 500);
  }, [isPlaced, counter]);

  /* ── Drag handlers ── */
  const handleDragEnd = useCallback(
    (_: unknown, info: { point: { x: number; y: number } }) => {
      setIsDragging(false);
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();

      // Target zone — centre of the dashed outline in SVG-space:
      // SVG (300, 260) → fraction (0.50, 0.52) of viewBox 600×500
      const tx = r.width * 0.5;
      const ty = r.height * 0.52;
      const threshold = r.width * 0.14;

      const px = info.point.x - r.left;
      const py = info.point.y - r.top;

      if (Math.hypot(px - tx, py - ty) < threshold) {
        doPlace();
      } else {
        animate(dragX, 0, { type: "spring", stiffness: 300, damping: 20 });
        animate(dragY, 0, { type: "spring", stiffness: 300, damping: 20 });
      }
    },
    [doPlace, dragX, dragY]
  );

  /* ────────────────────────────────────────────────────────────────── */
  return (
    <Box ref={containerRef} position="relative" w="100%" maxW="550px" mx="auto">
      {/* ── Scene SVG ── */}
      <Box
        as="svg"
        viewBox="0 0 600 500"
        w="100%"
        h="auto"
        display="block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold dot-grid texture */}
          <pattern
            id="bpDotGrid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="0.7" fill={GOLD} opacity="0.2" />
          </pattern>

          {/* Figure torso gradient */}
          <linearGradient id="figTorso" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B98CE0" />
            <stop offset="100%" stopColor="#6B449F" />
          </linearGradient>
        </defs>

        {/* Transparent background */ }

        {/* ── Ambient shadows ── */}
        <ellipse
          cx="180"
          cy="418"
          rx="115"
          ry="16"
          fill={SHADOW_CLR}
          opacity="0.22"
        />
        <ellipse
          cx="420"
          cy="298"
          rx="115"
          ry="16"
          fill={SHADOW_CLR}
          opacity="0.22"
        />

        {/* ── Lower platform (left / near) ── */}
        <polygon
          points="60,320 180,260 300,320 180,380"
          fill={P.top}
        />
        <polygon
          points="60,320 60,345 180,405 180,380"
          fill={P.left}
        />
        <polygon
          points="180,380 180,405 300,345 300,320"
          fill={P.right}
        />

        {/* ── Upper platform (right / far) ── */}
        <polygon
          points="300,200 420,140 540,200 420,260"
          fill={P.top}
        />
        <polygon
          points="300,200 300,225 420,285 420,260"
          fill={P.left}
        />
        <polygon
          points="420,260 420,285 540,225 540,200"
          fill={P.right}
        />

        {/* Figures removed as requested */}

        {/* ── Dashed block outline (drop target) ── */}
        {!isPlaced && (
          <path
            d="M 275,320 L 275,260 L 325,260 L 325,320"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.55"
          />
        )}

        {/* ── Placed white block (solid white, snap-in animation) ── */}
        {isPlaced && (
          <motion.g
            initial={
              restoredFromSession
                ? { scale: 1, opacity: 1 }
                : { scale: 0.3, opacity: 0 }
            }
            animate={{ scale: 1, opacity: 1 }}
            transition={
              restoredFromSession
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 420,
                    damping: 14,
                    mass: 0.8,
                  }
            }
            style={{ transformOrigin: "300px 290px" }}
          >
            {/* Front face */}
            <path
              d="M 275,320 L 275,260 L 325,260 L 325,320 Z"
              fill="#FFFFFF"
            />
            {/* Right side face */}
            <path
              d="M 325,260 L 325,320 L 340,328 L 340,268 Z"
              fill="#EAEAEA"
            />
            {/* Top face */}
            <path
              d="M 275,260 L 325,260 L 340,268 L 290,268 Z"
              fill="#F5F5F5"
            />
          </motion.g>
        )}
      </Box>

      {/* ── Floating draggable block (HTML overlay) ── */}
      {!isPlaced && (
        <motion.div
          animate={!isDragging ? { y: [0, -4, 0] } : {}}
          transition={
            !isDragging
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
          style={{
            position: "absolute",
            right: "12%",
            top: "22%",
            width: "9%",
            zIndex: 5,
          }}
        >
          <motion.div
            data-archway="true"
            drag
            dragMomentum={false}
            style={{ x: dragX, y: dragY, cursor: "grab" }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onTap={() => doPlace()}
            whileDrag={{ cursor: "grabbing", scale: 1.08 }}
          >
            <svg
              viewBox="0 0 65 68"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", display: "block" }}
            >
              {/* Front face */}
              <path d="M 0,60 L 0,0 L 50,0 L 50,60 Z" fill="#FFFFFF" />
              {/* Right side face */}
              <path d="M 50,0 L 50,60 L 65,68 L 65,8 Z" fill="#EAEAEA" />
              {/* Top face */}
              <path d="M 0,0 L 50,0 L 65,8 L 15,8 Z" fill="#F5F5F5" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* ── Copy below graphic ── */}
      <Box mt={4} textAlign="center" minH="50px">
        {!isPlaced && !showMsg && (
          <Box>
            <Text
              fontFamily="'Fraunces', serif"
              fontSize={{ base: "13px", md: "15px" }}
              color={GOLD}
              opacity={0.75}
            >
              One block left to build.
            </Text>
            <Text
              fontFamily="'Inter', sans-serif"
              fontSize={{ base: "11px", md: "12px" }}
              color="rgba(245,242,240,0.3)"
              mt={1}
            >
              Drag it into place — or tap it.
            </Text>
          </Box>
        )}

        {showMsg && (
          <motion.div
            initial={restoredFromSession ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Text
              fontFamily="'Fraunces', serif"
              fontSize={{ base: "13px", md: "15px" }}
              color={GOLD}
            >
              You just helped build tomorrow.
            </Text>
            <Text
              fontFamily="'Inter', sans-serif"
              fontSize={{ base: "11px", md: "12px" }}
              color="rgba(245,242,240,0.35)"
              mt={1}
            >
              {counter.toLocaleString()} builders have placed this block so far.
            </Text>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default BlueprintIllustration;
