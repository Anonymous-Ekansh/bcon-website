import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";
import { sponsors as currentSponsors } from "~/data/sponsors";
import MarqueeAlongSvgPath from "~/components/ui/marquee-along-svg-path";

// A continuous cursive path spelling "bcon" (approximate SVG path)
const bconPath = "M 100,300 C 150,300 200,100 200,50 C 200,0 150,0 150,100 C 150,200 150,300 200,300 C 250,300 250,250 250,250 C 250,230 230,230 230,250 C 230,280 270,300 300,300 C 350,300 350,200 350,200 C 350,150 300,150 300,200 C 300,250 300,300 350,300 C 400,300 450,200 450,200 C 450,150 400,150 400,200 C 400,250 400,300 450,300 C 500,300 500,200 500,200 C 500,180 480,180 480,200 C 480,250 500,300 550,300 C 580,300 600,200 600,200 C 600,150 550,150 550,200 C 550,300 600,300 650,300 C 700,300 750,250 750,250";

export default function SponsorsPage() {
  return (
    <Layout title="Sponsors">
      <PageHero eyebrow="Built With" heading="Our Sponsors" />

      <Box position="relative" pb={24}>
        <Flex flexDir="column" alignItems="center" px={{ base: 6, md: 8 }} maxW="1200px" mx="auto">
          
          <Box className="w-full h-[600px] md:h-[800px] flex items-center justify-center relative overflow-hidden bg-[rgba(255,255,255,0.02)] rounded-3xl border border-white/10 p-8 shadow-2xl">
            <MarqueeAlongSvgPath
              path={bconPath}
              viewBox="0 0 850 400"
              baseVelocity={4}
              slowdownOnHover={true}
              draggable={true}
              repeat={2} // Ensure enough items to fill the path
              dragSensitivity={0.1}
              className="w-full h-full scale-100"
              responsive
              grabCursor
              showPath={true} // Set to true initially so user can see the cursive bcon path!
            >
              {currentSponsors.map((sponsor, i) => (
                <Box
                  key={i}
                  className="w-32 h-20 md:w-40 md:h-24 hover:scale-110 duration-300 ease-in-out cursor-pointer flex items-center justify-center bg-[rgba(255,255,255,0.9)] rounded-xl border border-white/10 shadow-lg p-4"
                >
                  {sponsor.image ? (
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  ) : (
                    <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" color="black" fontSize="13px" textAlign="center" fontWeight="bold">
                      {sponsor.name}
                    </Text>
                  )}
                </Box>
              ))}
            </MarqueeAlongSvgPath>
          </Box>
          
        </Flex>
      </Box>
    </Layout>
  );
}
