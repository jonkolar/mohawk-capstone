import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      })
    // ...add more providers here
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, user }) {
      session.user.username = user.username
      return session
    }
  }
}
export default NextAuth(authOptions)