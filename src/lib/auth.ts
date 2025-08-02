import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Demo",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For demo purposes, accept any login
        if (credentials?.username && credentials?.password) {
          return {
            id: "demo-user",
            name: "Demo User",
            email: "demo@example.com",
          }
        }
        return null
      }
    }),
  ],
  callbacks: {
    session: ({ session, token }: any) => ({
      ...session,
      user: {
        ...session.user,
        id: token?.sub || "demo-user",
      },
    }),
    jwt: ({ token, user }: any) => {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
} 