import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

type LeaderboardEntry = {
  user: { name: string } | null;
  userId: string;
  score: number;
};

const Game = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const initialSpeed = isMobile ? 4 : 8;

  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [ballDirection, setBallDirection] = useState({
    x: initialSpeed,
    y: initialSpeed,
  });
  const [paddlePosition, setPaddlePosition] = useState(50);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);

  const ballRef = useRef<HTMLDivElement>(null);
  const ballSize = 50;
  const paddleWidth = 100;
  const toast = useToast();

  // Session management to check if the user is logged in
  const { data: session, status } = useSession();
  const addScoreMutation = api.score.addScore.useMutation();
  const leaderboardQuery = api.score.getLeaderboard.useQuery();

  const moveBall = useCallback(() => {
    const newPosX = ballPosition.x + ballDirection.x;
    const newPosY = ballPosition.y + ballDirection.y;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (newPosX <= 0 || newPosX + ballSize >= screenWidth) {
      setBallDirection((dir) => ({ ...dir, x: -dir.x }));
    }

    if (newPosY <= 0) {
      setBallDirection((dir) => ({ ...dir, y: -dir.y }));
    }

    const paddleXStart = (paddlePosition / 100) * screenWidth - paddleWidth / 2;
    const paddleXEnd = paddleXStart + paddleWidth;

    if (
      newPosY + ballSize >= screenHeight - 30 &&
      ballPosition.y + ballSize < screenHeight - 30 &&
      newPosX + ballSize >= paddleXStart &&
      newPosX <= paddleXEnd
    ) {
      setBallDirection((dir) => ({ ...dir, y: -dir.y }));
      setScore((prevScore) => prevScore + 1);

      setBallDirection((dir) => ({
        x: dir.x * 1.05,
        y: dir.y * 1.05,
      }));
    }

    if (newPosY + ballSize >= screenHeight) {
      setIsGameOver(true);
      if (session?.user?.id) {
        const userId = session.user.id;
        addScoreMutation.mutate({ userId, score });
      }
    }

    setBallPosition({ x: newPosX, y: newPosY });
  }, [ballPosition, ballDirection, paddlePosition, score, session?.user?.id]);

  useEffect(() => {
    if (!isGameOver) {
      const gameLoop = setInterval(() => {
        moveBall();
      }, 16); // 60 FPS, smoother animation

      return () => clearInterval(gameLoop);
    }
  }, [moveBall, isGameOver]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const relativePosition = (event.clientX / window.innerWidth) * 100;
    setPaddlePosition(relativePosition);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    const relativePosition = (touch!.clientX / window.innerWidth) * 100;
    setPaddlePosition(relativePosition);
  };

  const startGame = () => {
    if (status !== "authenticated") {
      toast({
        title: "Authentication required",
        description: "Please log in or register to play the game.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Start the game if the user is logged in
      setIsGameOver(false);
      setScore(0);
      setBallPosition({ x: 50, y: 50 });
      setBallDirection({ x: initialSpeed, y: initialSpeed });
      setPaddlePosition(50);
    }
  };

  return (
    <Box
      bg="black"
      w="100vw"
      h="100vh"
      onMouseMove={!isGameOver ? handleMouseMove : undefined}
      onTouchMove={!isGameOver ? handleTouchMove : undefined}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Box>
        {isGameOver ? (
          <Image
            src="/business-conclave-logo.png"
            alt="Business Conclave"
            opacity={0.05}
            w="300px"
            h="300px"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            onClick={startGame}
          />
        ) : (
          <>
            <Box
              position="absolute"
              bottom="10px"
              left={`${paddlePosition}%`}
              w={`${paddleWidth}px`}
              h="20px"
              bg="white"
              borderRadius="10px"
              transform="translateX(-50%)"
            />

            <Box
              position="absolute"
              left={`${ballPosition.x}px`}
              top={`${ballPosition.y}px`}
              w={`${ballSize}px`}
              h={`${ballSize}px`}
              bg="transparent"
              borderRadius="50%"
              ref={ballRef}
            >
              <Image
                src="/business-conclave-logo.png"
                alt="Business Conclave"
                w="100%"
                h="100%"
                borderRadius="50%"
              />
            </Box>
          </>
        )}
      </Box>

      {isGameOver && (
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          direction="column"
          align="center"
        >
          <Text fontSize="4xl" color="red.400" mb={4}>
            Game Over!
          </Text>
          <Text fontSize="2xl" color="white" mb={4}>
            Final Score: {score}
          </Text>
          <Button colorScheme="orange" onClick={startGame}>
            Start Game
          </Button>
          {leaderboardQuery.isLoading ? (
            <Text color="white">Loading leaderboard...</Text>
          ) : (
            <Box mt={4}>
              <Text color="white" fontSize="2xl" mb={2}>
                Leaderboard
              </Text>
              {leaderboardQuery.data?.map(
                (entry: LeaderboardEntry, index: number) => (
                  <Text key={index} color="white">
                    {index + 1}. {entry.user?.name ?? entry.userId}:{" "}
                    {entry.score}
                  </Text>
                )
              )}
            </Box>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Game;
