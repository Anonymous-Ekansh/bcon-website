/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/prefer-optional-chain, @typescript-eslint/prefer-nullish-coalescing */
"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Box, Flex, Text, IconButton, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { sponsors, type Sponsor } from "~/data/sponsors";

// Dynamically import Globe to avoid SSR issues with Three.js
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const distributePoints = (numPoints: number) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  
  for (let i = 0; i < numPoints; i++) {
    // y goes from 0.8 to -0.8 to avoid the extreme North and South poles (the "edges")
    const y = 0.8 - (i / Math.max(1, numPoints - 1)) * 1.6;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    
    const lat = Math.asin(y) * (180 / Math.PI);
    const lng = Math.atan2(z, x) * (180 / Math.PI);

    points.push({ lat, lng });
  }
  return points;
};

export default function SponsorGlobe() {
  const globeRef = useRef<any>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [globeData, setGlobeData] = useState<any[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Stop wheel and pinch events in the capture phase so OrbitControls never sees them.
    // This allows the browser to natively scroll the page without the globe zooming or blocking the scroll.
    const blockWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    const blockTouchPinch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.stopPropagation();
      }
    };

    wrapper.addEventListener("wheel", blockWheel, { capture: true, passive: true });
    wrapper.addEventListener("touchmove", blockTouchPinch, { capture: true, passive: true });
    wrapper.addEventListener("touchstart", blockTouchPinch, { capture: true, passive: true });

    return () => {
      wrapper.removeEventListener("wheel", blockWheel, { capture: true });
      wrapper.removeEventListener("touchmove", blockTouchPinch, { capture: true });
      wrapper.removeEventListener("touchstart", blockTouchPinch, { capture: true });
    };
  }, []);

  useEffect(() => {
    // Only take top 30 sponsors to not overcrowd the globe, or take all
    const activeSponsors = sponsors.slice(0, 40);
    const coords = distributePoints(activeSponsors.length);
    const data = activeSponsors.map((sponsor, i) => ({
      ...sponsor,
      lat: coords[i]?.lat || 0,
      lng: coords[i]?.lng || 0,
    }));
    setGlobeData(data);
  }, []);

  useEffect(() => {
    // Globe controls might not be immediately available on mount
    const initControls = () => {
      if (globeRef.current && typeof globeRef.current.controls === 'function') {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
          controls.enableRotate = true; // Allow manual dragging
          controls.enableZoom = false; // Disable zooming
          controls.enablePan = false; // Disable panning
          
          // Mathematically lock the zoom distance as a fail-safe
          if (globeRef.current.camera && typeof globeRef.current.camera === 'function') {
            const cam = globeRef.current.camera();
            if (cam && cam.position) {
              const dist = cam.position.length();
              // If distance is already calculated, lock it. Otherwise lock to a reasonable default.
              const lockDist = dist > 10 ? dist : 250;
              controls.minDistance = lockDist;
              controls.maxDistance = lockDist;
            }
          }
        }

        // Apply a golden/yellowish tint to the earth map
        if (typeof globeRef.current.globeMaterial === 'function') {
          const material = globeRef.current.globeMaterial();
          if (material && material.color) {
            material.color.set('#CFAF89');
            material.emissive.set('#2D1147');
            material.roughness = 0.7;
            material.metalness = 0.4;
          }
        }
      } else {
        setTimeout(initControls, 100);
      }
    };
    initControls();
  }, [globeData]);

  return (
    <Box position="relative" w={{ base: "100%", md: "600px" }} maxW="600px" mx="auto">
      {/* Subtle radial gradient vignette behind the globe */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="130%"
        h="130%"
        background="radial-gradient(circle, rgba(207,175,137,0.15) 0%, rgba(45,17,71,0) 60%)"
        zIndex={0}
        pointerEvents="none"
      />
      <Flex 
        ref={wrapperRef}
        position="relative" 
        w={{ base: "350px", md: "550px" }} 
        h={{ base: "350px", md: "550px" }} 
        mx="auto" 
        justifyContent="center"
        alignItems="center"
        cursor="grab" 
        _active={{ cursor: "grabbing" }}
        borderRadius="50%"
        zIndex={1}
      >
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true}
          atmosphereColor="#CFAF89"
          atmosphereAltitude={0.15}
        htmlElementsData={globeData}
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.title = d.name;
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.background = "rgba(255, 255, 255, 0.90)";
          el.style.borderRadius = "50%";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.cursor = "pointer";
          el.style.pointerEvents = "auto";
          el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.border = "1px solid rgba(207, 175, 137, 0.8)";
          el.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3), 0px 0px 12px rgba(207, 175, 137, 0.4)";
          el.style.overflow = "hidden";
          
          el.onmouseenter = () => { 
            el.style.transform = "scale(1.15) translateY(-2px)";
            el.style.boxShadow = "0px 6px 15px rgba(0,0,0,0.4), 0px 0px 20px rgba(207, 175, 137, 0.8)";
          };
          el.onmouseleave = () => { 
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3), 0px 0px 12px rgba(207, 175, 137, 0.4)";
          };
          
          if (d.image) {
            el.innerHTML = `<img src="${d.image}" alt="${d.name}" style="width: 75%; height: 75%; object-fit: contain;" />`;
          } else {
            el.innerHTML = `<span style="color: #2D1147; font-size: 10px; font-weight: bold; text-align: center;">${d.name.substring(0,2)}</span>`;
          }

          el.onclick = () => {
            setSelectedSponsor(d as Sponsor);
            if (globeRef.current && typeof globeRef.current.controls === 'function') {
               const controls = globeRef.current.controls();
               if (controls) controls.autoRotate = false;
            }
          };
          return el;
        }}
      />

      {selectedSponsor && (
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="rgba(45, 17, 71, 0.85)"
          backdropFilter="blur(12px)"
          border="1px solid rgba(207,175,137,0.5)"
          borderRadius="20px"
          p={6}
          flexDir="column"
          alignItems="center"
          boxShadow="0px 20px 50px rgba(0,0,0,0.6), 0px 0px 30px rgba(207,175,137,0.15)"
          zIndex={100}
          w={{ base: "300px", md: "400px" }}
        >
          <IconButton
            icon={<CloseIcon />}
            aria-label="Close"
            size="sm"
            position="absolute"
            top={3}
            right={3}
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255,255,255,0.15)" }}
            onClick={() => {
              setSelectedSponsor(null);
              if (globeRef.current && typeof globeRef.current.controls === 'function') {
                 const controls = globeRef.current.controls();
                 if (controls) controls.autoRotate = true;
              }
            }}
          />
          {selectedSponsor.image && (
             <Box bg="rgba(255,255,255,0.95)" p={3} borderRadius="12px" mb={4} w="100px" h="100px" display="flex" alignItems="center" justifyContent="center">
                <Image src={selectedSponsor.image} alt={selectedSponsor.name} maxH="100%" maxW="100%" objectFit="contain" />
             </Box>
          )}
          <Text color="white" fontWeight="300" fontSize="xl" textAlign="center" fontFamily="'Tan Vivre Libre', 'Playfair Display', serif">
            {selectedSponsor.name}
          </Text>
          <Text color="#CFAF89" fontSize="xs" mt={2} textTransform="uppercase" letterSpacing="wider" fontWeight="600">
            {selectedSponsor.designation || "Official Sponsor"}
          </Text>
          {selectedSponsor.description && (
            <Text color="rgba(255,255,255,0.7)" fontSize="sm" mt={4} textAlign="center" lineHeight="1.6">
              {selectedSponsor.description}
            </Text>
          )}
        </Flex>
      )}

      {/* Instructional Text */}
      <Flex position="absolute" bottom={{ base: "-20px", md: "0" }} left="50%" transform="translateX(-50%)" align="center" gap={2} pointerEvents="none" zIndex={2}>
        <Box as="svg" w="12px" h="12px" viewBox="0 0 24 24" fill="none" stroke="rgba(207,175,137,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 9l4-4 4 4" />
          <path d="M9 5v14" />
          <path d="M19 15l-4 4-4-4" />
          <path d="M15 19V5" />
        </Box>
        <Text color="rgba(207, 175, 137, 0.7)" fontSize="10px" textTransform="uppercase" letterSpacing="0.2em" fontFamily="'Proxima Nova', 'Inter', sans-serif">
          Drag to rotate • Click to explore
        </Text>
      </Flex>
    </Flex>
    </Box>
  );
}
