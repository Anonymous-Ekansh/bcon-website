import { Box } from "@chakra-ui/react";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";
import SpeakersContainer from "~/components/index/speakers-section/speakers-container";

export default function PastSpeakersPage() {
  return (
    <Layout title="Past Speakers" childrenHaveNavbar>
      <PageHero eyebrow="Our Journey" heading="Past Speakers" />
      
      <Box position="relative" pb={24}>
        <SpeakersContainer />
      </Box>
    </Layout>
  );
}
