/* eslint-disable */
"use client";

import React, { memo, useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { useMotionValue, animate, motion } from "framer-motion";
import useMeasure from "react-use-measure";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    let controls: any;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prev) => prev + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div style={{ overflow: "hidden" }} className={className}>
      <motion.div
        ref={ref}
        style={{
          display: "flex",
          width: "max-content",
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

export const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        borderColor: "rgba(207, 175, 137, 0.5)", 
        boxShadow: "0px 4px 20px rgba(207, 175, 137, 0.2)" 
      }}
      transition={{ duration: 0.2 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: "140px",
        height: "90px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "12px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {!loaded && (
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "50%",
            height: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
          }}
        />
      )}
      <img
        alt={logo.alt}
        src={logo.src}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.div>
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  className,
  reverse = false,
}: {
  logos: Logo[];
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        overflow: "hidden",
        padding: "1rem 0",
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
      }}
    >
      <InfiniteSlider gap={32} reverse={reverse} duration={40} durationOnHover={80}>
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <LogoImage key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;

