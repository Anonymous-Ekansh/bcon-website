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
    name: "Vineet Nayar",
    designation: "Former CEO, HCL",
    description:
      "Vineet Nayar is the former CEO of HCL Technologies, where he pioneered the groundbreaking 'Employees First, Customers Second' management philosophy. His visionary leadership transformed HCL into one of the fastest-growing IT services companies globally, and his ideas on inverting the organizational pyramid have been widely studied in business schools worldwide.",
    image: "/images/landing/speakers/vineet_nayar.jpeg",
    lineImg: "/images/landing/speakers/lines/atal_to_dharam.svg",
    lineTransform: "translateX(0px) translateY(75px)",
  },
  {
    name: "Atul Ujagar",
    designation: "Former MD, Nike Sourcing India",
    description:
      "With a rich legacy of leadership at one of the world's most recognized sports brands, Atul Ujagar brings a wealth of insights into strategic brand building, market expansion, and consumer engagement. His tenure at Nike saw the brand navigating challenging markets and setting new benchmarks in sports retail. Atul's deep understanding of global markets and his ability to steer through economic challenges make him a visionary in the realm of business management and brand strategy.",
    image: "/images/landing/speakers/atal_ujagar.png",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Rohit Kapoor",
    designation: "CEO, Swiggy's Food Marketplace",
    description:
      "As the CEO of Swiggy's Food Marketplace, Rohit Kapoor has been at the forefront of revolutionizing the food delivery landscape in India. Under his leadership, Swiggy has expanded its footprint, introducing innovative services like Instamart and cloud kitchens. Rohit's keen eye for scaling operations and his strategic focus on customer experience have helped Swiggy become a household name, setting new standards in convenience and delivery services in the Indian market.",
    image: "/images/landing/speakers/rohit_kapoor.png",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Azhar Iqbal",
    designation: "CEO, Inshorts",
    description:
      "Azhar Iqbal is the CEO and co-founder of Inshorts, the popular news app that delivers bite-sized news in 60 words or less. Under his leadership, Inshorts has become one of India's most downloaded news apps, redefining how millions consume news in the digital age through innovative content curation and technology-driven journalism.",
    image: "/images/landing/speakers/azhar_iqbal.jpeg",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Dr. Ritesh Malik",
    designation: "Vice President, Paytm",
    description:
      "Dr. Ritesh Malik serves as Vice President at Paytm, one of India's largest digital payment platforms. A serial entrepreneur and angel investor, he has been instrumental in shaping India's startup ecosystem and is known for his contributions to building entrepreneurial communities and supporting early-stage ventures.",
    image: "/images/landing/speakers/ritesh_malik.jpeg",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Chayan Chopra",
    designation: "Netflix Actor, Class",
    description:
      "Chayan Chopra is a talented actor known for his role in the Netflix series 'Class'. His compelling performances and authentic portrayal of complex characters have earned him recognition in the Indian entertainment industry, making him a rising star in the world of digital content and streaming.",
    image: "/images/landing/speakers/chayan_chopra.jpeg",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Aryaan Misra & Aishwarya Singh",
    designation: "Founders, Desi Studios & Desi Crime",
    description:
      "Aryaan Misra and Aishwarya Singh are the founders of Desi Studios and Desi Crime, popular platforms known for their compelling storytelling and engaging content around true crime and Indian culture. Their ability to dissect complex stories and present them with narrative flair has earned them a dedicated global following.",
    image: "/images/landing/speakers/aryaan_misra.png",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Mira Kulkarni",
    designation: "Founder, Forest Essentials",
    description:
      "Mira Kulkarni is the founder of Forest Essentials, India's premier luxury Ayurvedic beauty brand. She pioneered the concept of bringing ancient Ayurvedic wisdom to modern skincare, building a globally recognized brand that blends traditional Indian knowledge with contemporary luxury standards.",
    image: "/images/landing/speakers/mira_kulkarni.jpeg",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Dola Halder",
    designation: "Brand Head, PepsiCo India",
    description:
      "Dola Halder is the Brand Head at PepsiCo India, where she leads brand strategy and marketing for one of the world's largest food and beverage companies. With deep expertise in consumer insights, brand positioning, and integrated marketing communications, she has driven impactful campaigns that resonate with India's diverse consumer base.",
    image: "/images/landing/speakers/dola_halder.jpeg",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Kishore Jayaraman",
    designation: "President, Rolls-Royce India & South Asia",
    description:
      "Kishore Jayaraman serves as President of Rolls-Royce India and South Asia, where he oversees the company's strategic operations across defense, civil aerospace, and power systems. With decades of experience in engineering and business leadership, he has been instrumental in expanding Rolls-Royce's footprint in the region.",
    image: "/images/landing/speakers/kishore_jayaraman.jpeg",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Sumit Vashishth",
    designation: "Creative Director, Ogilvy",
    description:
      "Sumit Vashishth is a Creative Director at Ogilvy, one of the world's most celebrated advertising agencies. With a keen eye for compelling narratives and visual storytelling, he has crafted award-winning campaigns that push creative boundaries and deliver measurable impact for global brands.",
    image: "/images/landing/speakers/sumit_vashishth.jpeg",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Indranil Chakraborty",
    designation: "Senior VP, Bank of America",
    description:
      "Indranil Chakraborty is a Senior Vice President at Bank of America, bringing extensive experience in financial services, risk management, and strategic operations. His leadership in one of the world's largest financial institutions has driven innovation in banking processes and enterprise-level decision making.",
    image: "/images/landing/speakers/indranil_chakraborty.jpeg",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Amin Jazayeri",
    designation: "DJ & Host, Untriggered Podcast",
    description:
      "Amin Jazayeri is a renowned DJ and the host of the Untriggered Podcast, where he brings together diverse voices for candid, unfiltered conversations. Known for his energetic performances and thought-provoking discussions, Amin bridges the worlds of entertainment and insightful dialogue.",
    image: "/images/landing/speakers/amin_jazayeri.jpeg",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Mallika Motiramani",
    designation: "YouTuber",
    description:
      "Mallika Motiramani is a popular YouTuber known for her engaging content that spans lifestyle, entertainment, and digital culture. With a strong following across social media platforms, she has built a personal brand that resonates with young audiences and reflects the evolving landscape of digital content creation.",
    image: "/images/landing/speakers/malika_motiramani.jpeg",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Sejal Kumar",
    designation: "YouTuber",
    description:
      "Sejal Kumar is one of India's most prominent YouTubers, known for her content on fashion, lifestyle, and social issues. With millions of subscribers, she has established herself as a leading digital creator and influencer, using her platform to inspire young audiences and drive meaningful conversations.",
    image: "/images/landing/speakers/sejal_kumar.jpg",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Dharam Mentor",
    designation: "Brand Consultant, Strategist & Designer",
    description:
      "Dharam Mentor is a leading brand consultant known for his expertise in crafting compelling brand stories and building strategic frameworks for businesses. With a deep understanding of consumer behavior and market dynamics, Dharam has guided several companies through rebranding efforts, product launches, and market repositioning. His creative approach and strategic mindset have made him a sought-after advisor for organizations looking to elevate their brand presence.",
    image: "/images/landing/speakers/dharam_mentor.png",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Ritesh Arora",
    designation: "HR Head, RACL Gear Tech Limited",
    description:
      "Ritesh Arora, as the HR Head of RACL Gear Tech Limited, has played a pivotal role in shaping the company’s talent strategy and fostering a culture of growth and innovation. With a focus on employee engagement and organizational development, Ritesh has implemented initiatives that enhance productivity and build a resilient workforce. His ability to align human resources with business goals has been instrumental in driving the company’s success in the competitive manufacturing sector.",
    image: "/images/landing/speakers/ritesh_arora.png",
    lineImg: "/images/landing/speakers/lines/rohit_to_ritesh.svg",
    lineTransform: "translateX(50px) translateY(5px)",
  },
  {
    name: "Aakriti Bansal",
    designation: "Co-Founder, TBC | Ex-Noise, Ex-Loreal",
    description:
      "Aakriti Bansal co-founded The Business Company (TBC) and has an extensive background in leading product and marketing strategies at top firms like Noise and L’Oréal. With her in-depth understanding of brand positioning and consumer needs, she’s successfully launched and scaled businesses in highly competitive markets. Aakriti’s expertise in both traditional and digital platforms has helped establish strong customer bases across industries.",
    image: "/images/landing/speakers/aakriti_bansal.png",
    lineImg: "/images/landing/speakers/lines/dharam_to_rohit.svg",
    lineTransform: "translateX(-40px) translateY(15px)",
  },
  {
    name: "Shalabh Chaturvedi",
    designation: "Managing Director, CNH Industrial",
    description:
      "As Managing Director at CNH Industrial, Shalabh Chaturvedi leads the strategic direction of the company, focusing on delivering growth and operational excellence. His leadership spans across various business functions, including sales, product innovation, and business development. Shalabh’s experience in leading large teams and his ability to adapt to dynamic business environments have been key to driving CNH Industrial's market leadership.",
    image: "/images/landing/speakers/shalabh_chaturvedi.png",
  },
];

export default speakers;
