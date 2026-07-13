interface Speaker {
  name: string;
  designation: string;
  description: string;
  image: string;
  lineImg?: string; // Optional field for the line SVG between speakers
  lineTransform?: string; // Optional field for fine-tuning the SVG line positioning
}

const speakers: Speaker[] = [
  {
    name: "Rohit Kapoor",
    designation: "CEO, Swiggy",
    description:
      "As the CEO of Swiggy, Rohit Kapoor has been at the forefront of revolutionizing the food delivery landscape in India. Under his leadership, Swiggy has expanded its footprint, introducing innovative services like Instamart and cloud kitchens. Rohit’s keen eye for scaling operations and his strategic focus on customer experience have helped Swiggy become a household name, setting new standards in convenience and delivery services in the Indian market.",
    image: "/images/landing/speakers/rohit_kapoor.png",
    lineImg: "/images/landing/speakers/lines/atal_to_dharam.svg",
    lineTransform: "translateX(0px) translateY(75px)",
  },
  {
    name: "Atul Ujagar",
    designation: "Former MD, Nike",
    description:
      "With a rich legacy of leadership at one of the world's most recognized sports brands, Atul Ujagar brings a wealth of insights into strategic brand building, market expansion, and consumer engagement. His tenure at Nike saw the brand navigating challenging markets and setting new benchmarks in sports retail. Atul’s deep understanding of global markets and his ability to steer through economic challenges make him a visionary in the realm of business management and brand strategy.",
    image: "/images/landing/speakers/atal_ujagar.png",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Dharam Mentor",
    designation: "Brand Consultant, Strategist & Designer",
    description:
      "Dharam Mentor is a leading brand consultant known for his expertise in crafting compelling brand stories and building strategic frameworks for businesses. With a deep understanding of consumer behavior and market dynamics, Dharam has guided several companies through rebranding efforts, product launches, and market repositioning. His creative approach and strategic mindset have made him a sought-after advisor for organizations looking to elevate their brand presence.",
    image: "/images/landing/speakers/dharam_mentor.png",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Ritesh Arora",
    designation: "HR Head, RACL Gear Tech Limited",
    description:
      "Ritesh Arora, as the HR Head of RACL Gear Tech Limited, has played a pivotal role in shaping the company’s talent strategy and fostering a culture of growth and innovation. With a focus on employee engagement and organizational development, Ritesh has implemented initiatives that enhance productivity and build a resilient workforce. His ability to align human resources with business goals has been instrumental in driving the company’s success in the competitive manufacturing sector.",
    image: "/images/landing/speakers/ritesh_arora.png",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Aakriti Bansal",
    designation: "Co-Founder, TBC | Ex-Noise, Ex-Loreal",
    description:
      "Aakriti Bansal co-founded The Business Company (TBC) and has an extensive background in leading product and marketing strategies at top firms like Noise and L’Oréal. With her in-depth understanding of brand positioning and consumer needs, she’s successfully launched and scaled businesses in highly competitive markets. Aakriti’s expertise in both traditional and digital platforms has helped establish strong customer bases across industries.",
    image: "/images/landing/speakers/aakriti_bansal.png",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Shalabh Chaturvedi",
    designation: "Managing Director, CNH Industrial",
    description:
      "As Managing Director at CNH Industrial, Shalabh Chaturvedi leads the strategic direction of the company, focusing on delivering growth and operational excellence. His leadership spans across various business functions, including sales, product innovation, and business development. Shalabh’s experience in leading large teams and his ability to adapt to dynamic business environments have been key to driving CNH Industrial's market leadership.",
    image: "/images/landing/speakers/shalabh_chaturvedi.png",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Aishwarya Singh",
    designation: "Co-Host, The Desi Crime Podcast",
    description:
      "Aishwarya Singh co-hosts 'The Desi Crime Podcast', a popular show that explores some of the most compelling and dark criminal cases from India and beyond. Aishwarya brings in-depth research and storytelling expertise to each episode, keeping listeners captivated with each case. Her passion for true crime and justice drives the content of her podcast, which has garnered a global following.",
    image: "/images/landing/speakers/aishwarya_singh.png",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Aryaan Misra",
    designation: "Co-Host, The Desi Crime Podcast",
    description:
      "Aryaan Misra, co-host of 'The Desi Crime Podcast', is known for his dynamic storytelling and engaging presentations of true crime cases. His ability to dissect complex criminal investigations and present them in a clear, compelling format has made the podcast a go-to source for true crime enthusiasts. Aryaan’s dedication to uncovering hidden details and delivering them with narrative flair has earned him a loyal following.",
    image: "/images/landing/speakers/aryaan_misra.png",
    // lineImg: "/images/landing/speakers/lines/aryaan_to_button.svg",
    // lineTransform: "translateX(-30px) translateY(-10px)",
  },
];

export default speakers;
