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
  const [globeData, setGlobeData] = useState<any[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

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
          controls.autoRotate = false;
          controls.enableRotate = true; // Allow manual dragging
          controls.enableZoom = false; // Disable zooming
          
          // Mathematically lock the zoom distance as a fail-safe
          if (globeRef.current.camera && typeof globeRef.current.camera === 'function') {
            const cam = globeRef.current.camera();
            if (cam && cam.position) {
              const dist = cam.position.length();
              controls.minDistance = dist;
              controls.maxDistance = dist;
            }
          }
        }

        // Apply a golden/yellowish tint to the earth map
        if (typeof globeRef.current.globeMaterial === 'function') {
          const material = globeRef.current.globeMaterial();
          if (material && material.color) {
            material.color.set('#ffe89c'); // Light goldenish yellow tint
            material.emissive.set('#1a1600'); // Very subtle gold emissive
          }
        }
      } else {
        setTimeout(initControls, 100);
      }
    };
    initControls();
  }, [globeData]);

  return (
    <Flex 
      position="relative" 
      w={{ base: "320px", md: "500px" }} 
      h={{ base: "320px", md: "500px" }} 
      mx="auto" 
      justifyContent="center"
      alignItems="center"
      cursor="grab" 
      _active={{ cursor: "grabbing" }}
      borderRadius="50%"
    >
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#FFD700"
        atmosphereAltitude={0.2}
        htmlElementsData={globeData}
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.background = "rgba(255, 255, 255, 0.95)";
          el.style.borderRadius = "50%";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.cursor = "pointer";
          el.style.pointerEvents = "auto";
          el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.border = "2px solid #CFAF89";
          el.style.boxShadow = "0px 0px 15px rgba(207, 175, 137, 0.4)";
          el.style.overflow = "hidden";
          
          el.onmouseenter = () => { 
            el.style.transform = "scale(1.4)";
            el.style.boxShadow = "0px 0px 25px rgba(207, 175, 137, 0.8)";
          };
          el.onmouseleave = () => { 
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0px 0px 15px rgba(207, 175, 137, 0.4)";
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
          border="1px solid #CFAF89"
          borderRadius="20px"
          p={8}
          flexDir="column"
          alignItems="center"
          boxShadow="0px 20px 50px rgba(0,0,0,0.6)"
          zIndex={100}
          minW="280px"
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
             <Box bg="white" p={4} borderRadius="12px" mb={5} w="120px" h="120px" display="flex" alignItems="center" justifyContent="center">
                <Image src={selectedSponsor.image} alt={selectedSponsor.name} maxH="100%" maxW="100%" objectFit="contain" />
             </Box>
          )}
          <Text color="white" fontWeight="300" fontSize="2xl" textAlign="center" fontFamily="'Tan Vivre Libre', 'Playfair Display', serif">
            {selectedSponsor.name}
          </Text>
          <Text color="#CFAF89" fontSize="sm" mt={2} textTransform="uppercase" letterSpacing="wider" fontWeight="600">
            Official Sponsor
          </Text>
        </Flex>
      )}

      {/* Instructional Text */}
      <Text
        position="absolute"
        bottom="10px"
        left="50%"
        transform="translateX(-50%)"
        color="rgba(255,255,255,0.6)"
        fontSize="sm"
        fontFamily="'Proxima Nova', 'Inter', sans-serif"
        pointerEvents="none"
        textAlign="center"
        letterSpacing="wide"
      >
        Drag to rotate • Click to explore
      </Text>
    </Flex>
  );
}
