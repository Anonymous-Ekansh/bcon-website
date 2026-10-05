import React from "react";
import Layout from "~/components/layout";
import HeroSection from "~/components/index/hero-section";
import AboutSection from "~/components/index/about-section";
import EventsSection from "~/components/index/events-section";
import CompSection from "~/components/index/comp-section";
import SponsorsSection from "~/components/index/sponsors-section";
import FaqSection from "~/components/index/faq-section";

function HomePage() {
  return (
    <Layout title="Home" childrenHaveNavbar={true}>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <CompSection />
      <SponsorsSection />
      <FaqSection />
    </Layout>
  );
}

export default HomePage;
