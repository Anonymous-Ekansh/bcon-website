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

    login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "No user found with this email",
        });
      }
     
      if (password != user.password) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: "Invalid password",
        });
      }
      // Don't return the password hash
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }),
});
// function compare(password: string, password1: string | null) {
//     throw new Error("Function not implemented.");
// }

