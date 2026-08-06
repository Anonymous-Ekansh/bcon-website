import Layout from "~/components/layout";

import HeroSection from "~/components/index/hero-section";
import AboutSection from "~/components/index/about-section";
import SpeakersSection from "~/components/index/speakers-section";
import EventsSection from "~/components/index/events-section";
import CompetitionSection from "~/components/index/comp-section";
import PastConferencesSection from "~/components/index/past-conferences-section";
import SponsorsSection from "~/components/index/sponsors-section";
import ContactSection from "~/components/index/contact-section";

function HomePage() {
  return (
    <Layout title="Home" childrenHaveNavbar>
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <EventsSection />
      <CompetitionSection />
      <PastConferencesSection />
      <SponsorsSection />
      <ContactSection />
    </Layout>
  );
}

export default HomePage;
