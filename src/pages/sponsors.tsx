import { Box, Flex, Text } from "@chakra-ui/react";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";
import { LogoMarquee } from "~/components/ui/infinite-slider";

const allSponsors = [
  "aic-snu.png", "AMD.jpg", "ascend.png", "asian-roots.png", "axisbank.png",
  "bingo.png", "blue-tokai.png", "brew-house.png", "campus-bloggers.png",
  "cocacola.avif", "cornitos.png", "crax.png", "DHI.png", "DNT.png",
  "DU-Updates.png", "EDTimes.png", "essvee.png", "finLadder.png",
  "firstchoice.png", "foodrik.png", "fresca-juices.png", "gree.png",
  "harvard-business-review.png", "insight.png", "krescon.png",
  "learning-while-travelling.png", "mamagoto.png", "nescafe.png",
  "nestle.png", "NSE.png", "Oddy.jpg", "red-bull.svg", "shiv-nadar.png",
  "sole-savvy.png", "taazaatech.png", "talerang.png", "TheEducationTree.png",
  "tutorage.png", "unorthodox-gateau.png", "xoxoday.png", "zauk.png"
].map(file => ({ src: `/images/sponsors/${file}`, alt: file.split('.')[0] ?? "sponsor" }));

export default function SponsorsPage() {
  return (
    <Layout title="Sponsors">
      <PageHero eyebrow="Built With" heading="Our Sponsors" />

      <Box position="relative" pb={24}>
        <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }} maxW="1536px" mx="auto" gap={12}>

          <Box w="100%">
            <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.6)" textAlign="center" mb={6} textTransform="uppercase" letterSpacing="0.1em" fontSize="sm">
              Our Sponsors
            </Text>
            <LogoMarquee logos={allSponsors.slice(0, 14)} />
          </Box>

          <Box w="100%">
            <LogoMarquee reverse={true} logos={allSponsors.slice(14, 28)} />
          </Box>

          <Box w="100%">
            <Text fontFamily="'Proximrpima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.6)" textAlign="center" mb={6} textTransform="uppercase" letterSpacing="0.1em" fontSize="sm">
              Partners & Associates
            </Text>
            <LogoMarquee logos={allSponsors.slice(28)} />
          </Box>

        </Flex>
      </Box>
    </Layout>
  );
}
