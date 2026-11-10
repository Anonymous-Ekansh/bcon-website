import React from "react";
import { Box } from "@chakra-ui/react";
import Layout from "~/components/layout";
import HeroSection from "~/components/index/hero-section";
import AboutSection from "~/components/index/about-section";
import SpeakerRevealSection from "~/components/index/speaker-reveal-section";
import SpeakersSection from "~/components/index/speakers-section";
import EventsSection from "~/components/index/events-section";
import CompSection from "~/components/index/comp-section";
import SponsorsSection from "~/components/index/sponsors-section";
import FaqSection from "~/components/index/faq-section";

function HomePage() {
  return (
    <Layout title="Home" childrenHaveNavbar={true}>
      <HeroSection />
      <AboutSection />
      <SpeakerRevealSection />
      <SpeakersSection />
      <EventsSection />
      <CompSection />
      <SponsorsSection />
      <Box px={{ base: 5, md: 8 }} pb={12} maxW="1060px" mx="auto" w="100%">
        <FaqSection />
      </Box>
    </Layout>
  );
}

export default HomePage;
