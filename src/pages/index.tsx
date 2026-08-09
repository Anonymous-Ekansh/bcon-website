import Layout from "~/components/layout";

import HeroSection from "~/components/index/hero-section";
import AboutSection from "~/components/index/about-section";
import SpeakersSection from "~/components/index/speakers-section";
import EventsSection from "~/components/index/events-section";
import CompetitionSection from "~/components/index/comp-section";
import SponsorsSection from "~/components/index/sponsors-section";

function HomePage() {
  return (
    <Layout title="Home" childrenHaveNavbar>
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <EventsSection />
      <CompetitionSection />
      <SponsorsSection />
    </Layout>
  );
}

export default HomePage;
