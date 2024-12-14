import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { getTeamById } from "@/lib/utils";
import { IPLTeam } from "./lib/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        const team = getTeamById(user.teamId);

        if (!team) {
          throw new Error("Team not found");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          teamId: user.teamId,
          team,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.teamId = token.teamId as string;
        session.user.team = token.team as unknown as IPLTeam;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.teamId = user.teamId;
        token.team = user.team;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
