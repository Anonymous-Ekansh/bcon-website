import Layout from "~/components/layout";

import HeroSection from "~/components/index/hero-section";
import AboutSection from "~/components/index/about-section";
import SpeakersSection from "~/components/index/speakers-section";
import EventsSection from "~/components/index/events-section";
import CompetitionSection from "~/components/index/comp-section";
import FAQSection from "~/components/index/faq-section";
import SponsorsSection from "~/components/index/sponsors-section";
import { Box } from "@chakra-ui/react";

function HomePage() {
  return (
    <Layout title="Home" childrenHaveNavbar>
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <EventsSection />
      <CompetitionSection />
      
      {/* Mobile FAQ */}
      <Box display={{ base: "block", lg: "none" }} px={{ base: 4, md: 8 }} py={8}>
        <FAQSection />
      </Box>

      <SponsorsSection />
    </Layout>
  );
}

export default HomePage;
