import Layout from "~/components/layout";

import HeroSection from "~/components/index/hero-section";
import SpeakersSection from "~/components/index/speakers-section";
import EventsSection from "~/components/index/events-section";
import CompetitionSection from "~/components/index/comp-section";

function HomePage() {
  return (
    <Layout title="Home" childrenHaveNavbar>
      <HeroSection />
      <SpeakersSection />
      <EventsSection />
      <CompetitionSection />
    </Layout>
  );
}

export default HomePage;
