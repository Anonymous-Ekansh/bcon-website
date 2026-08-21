// src/server/trpc/router/auth.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure} from "../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";


export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      const exist = await prisma.user.findUnique({
        where: { email },
      });

      if (exist) {
        throw new Error("Email already exists");
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return user;
    }),
});
// function compare(password: string, password1: string | null) {
//     throw new Error("Function not implemented.");
// }

