import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
} from "@chakra-ui/react";
import { type FC } from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "Where is BCon ’26 happening?",
    answer: "G Block Auditorium, SNIoE Campus, Greater Noida.",
  },
  {
    question: "How do I register?",
    answer: "Registration is open via the official registration link. Spots are limited, so early registration is recommended.",
  },
  {
    question: "What do attendees get?",
    answer: "Every delegate receives lunch, refreshments, and a delegate kit.",
  },
  {
    question: "Who can attend?",
    answer: "Open to ALL.",
  },
  {
    question: "Who can I contact with questions?",
    answer: (
      <>
        For any queries, email{" "}
        <Link href="mailto:inspiria@snu.edu.in" color="#CFAF89" _hover={{ color: "white" }}>
          inspiria@snu.edu.in
        </Link>{" "}
        or DM Inspiria on Instagram{" "}
        <Link href="https://www.instagram.com/snioebusinessconclave/" isExternal color="#CFAF89" _hover={{ color: "white" }}>
          @snioebusinessconclave
        </Link>
        .
      </>
    ),
  },
];

const FAQSection: FC = () => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } as unknown as string}
      viewport={{ once: true }}
      bg="rgba(255, 255, 255, 0.03)"
      p={6}
      borderRadius="20px"
      border="1px solid rgba(255, 255, 255, 0.05)"
      boxShadow="0px 10px 30px rgba(0,0,0,0.2)"
      backdropFilter="blur(10px)"
      w="100%"
    >
      <Text
        fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
        fontSize={{ base: "24px", md: "32px" }}
        fontWeight="300"
        color="#FFFFFF"
        mb={6}
        textAlign="center"
      >
        Frequently Asked <span style={{ color: "#CFAF89" }}>Questions</span>
      </Text>

      <Accordion allowToggle>
        {faqData.map((item, index) => (
          <AccordionItem key={index} border="none" borderBottom="1px solid rgba(255,255,255,0.1)">
            <AccordionButton _hover={{ bg: "transparent" }} px={0} py={4}>
              <Box as="span" flex="1" textAlign="left" fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="16px" color="rgba(255,255,255,0.9)" fontWeight="500">
                {item.question}
              </Box>
              <AccordionIcon color="#CFAF89" />
            </AccordionButton>
            <AccordionPanel pb={4} px={0} fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="15px" color="rgba(255,255,255,0.7)">
              {item.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQSection;
