import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { ConnectDragSource, DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "~/components/layout";

// Define the type for the props in DraggableFinger component
interface DraggableFingerProps {
  setIsLocked: Dispatch<SetStateAction<boolean>>;
}

const DraggableFinger = ({ setIsLocked }: DraggableFingerProps) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "FINGER",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragRef = useRef<HTMLDivElement>(null);

  // Attach the drag ref to the div manually using useEffect
  useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current);
    }
  }, [drag]);

  return (
    <Box
      ref={dragRef}
      p={2} // Reduced padding for smaller size
      ml={4}
      borderRadius="md"
      w="100px" // Smaller width
      h="100px" // Smaller height
      textAlign="center"
      cursor="pointer"
      opacity={isDragging ? 0.5 : 1}
      bgColor="black"
      color="white"
      position="relative"
    >
      <Image
        src="/little_finger.png"
        alt="Draggable Little Finger"
        style={{ position: "absolute", bottom: "0", left: "0", right: "0" }}
      />
    </Box>
  );
};

// Define the type for the props in DropArea component
interface DropAreaProps {
  isLocked: boolean;
  setIsLocked: Dispatch<SetStateAction<boolean>>;
}

const DropArea = ({ isLocked, setIsLocked }: DropAreaProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FINGER",
    drop: () => setIsLocked(true),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropRef = useRef<HTMLDivElement>(null);

  // Attach the drop ref manually using useEffect
  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <Box
      ref={dropRef}
      p={2} // Reduced padding for smaller size
      borderRadius="md"
      w="100px" // Smaller width
      h="100px" // Smaller height
      textAlign="center"
      bg={isLocked ? "green.400" : isOver ? "pink.200" : "pink.100"}
      backgroundColor="black"
      color="white"
      position="relative"
    >
      <Image
        src={isLocked ? "/locked_pinky.png" : "/static_pinky_hand.png"}
        alt={isLocked ? "Pinky Promise Locked" : "Static Pinky Hand"}
        style={{ position: "absolute", bottom: "0", left: "0", right: "0" }}
      />
    </Box>
  );
};

const PinkiePromiseCaptcha = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false); // Explicitly define the state as boolean

  return (
    <Layout title="Pinky Promise Captcha">
      <DndProvider backend={HTML5Backend}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height="100vh"
          p={4}
          bg="black"
          color="white"
        >
          <Text fontSize="2xl" mb={4} color="white">
            Pinkie promise you will buy the bcon ticket 🧡
          </Text>

          <Flex align="center" justify="center" gap={40}>
            <DropArea isLocked={isLocked} setIsLocked={setIsLocked} />
            {!isLocked && <DraggableFinger setIsLocked={setIsLocked} />}
          </Flex>

          {isLocked && (
            <Text fontSize="lg" color="green.500" mt={4}>
              Pinky Promise Locked!
            </Text>
          )}
        </Flex>
      </DndProvider>
    </Layout>
  );
};

export default PinkiePromiseCaptcha;
