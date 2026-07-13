import { createTRPCRouter } from "~/server/api/trpc"; // Correct import path for trpc
import { z } from "zod";
import { prisma } from "~/server/db"; // Correct import for db.ts
import { publicProcedure } from "~/server/api/trpc";

export const scoreRouter = createTRPCRouter({
  addScore: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        score: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, score } = input;

      // Explicitly type the return for TypeScript to understand the structure
      const result = await prisma.pingPongScore.create({
        data: {
          userId,
          score,
        },
      });

      return result; // Return the created score entry
    }),

  getLeaderboard: publicProcedure.query(async () => {
    // Explicitly type the result to match the expected schema
    const leaderboard = await prisma.pingPongScore.findMany({
      orderBy: {
        score: "desc",
      },
      take: 10,
      include: {
        user: true,
      },
    });

    return leaderboard; // Return the leaderboard data
  }),
});
