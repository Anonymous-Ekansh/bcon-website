import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
// import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { prisma } from "~/server/db";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { Prisma } from "@prisma/client";
import { error } from "console";

console.log({ env });

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        if (credentials.password !== user.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback - Input:", { session, token });
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
      console.log("Session Callback - Output:", updatedSession);
      return updatedSession;
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback - Input:", { token, user });
      if (user) {
        token.id = user.id;
      }
      console.log("JWT Callback - Output:", token);
      return token;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
    signOut: "/signout",
  },
  session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: env.NEXTAUTH_SECRET,
  // Add the following options for sign-out
  events: {
    signOut: async ({ session, token }) => {
      // You can perform any cleanup or logging here
      console.log("User signed out:", token.sub);
    },
  },
  // // Custom sign-out configuration
  // signOut: {
  //   // Redirect to home page after sign out
  //   redirect: true,
  //   // Custom path to redirect to after sign out (optional)
  //   redirectTo: "/",
  //   // Extend the default sign-out behavior
  //   extend: async ({ token }) => {
  //     // Perform any additional actions here, like invalidating sessions on the server
  //     await prisma.session.deleteMany({
  //       where: { userId: token.sub },
  //     });
  //   },
  // },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
