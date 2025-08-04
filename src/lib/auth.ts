import { NextAuthOptions, getServerSession } from "next-auth";
import { supabaseAdmin } from "./supabase-admin";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists in Supabase
          const { data: existingUser } = await supabaseAdmin 
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single();

          // Create user if doesn't exist
          if (!existingUser) {
            const { error } = await supabaseAdmin 
              .from('users')
              .insert({
                email: user.email,
                name: user.name,
                image: user.image,
              });
            
            if (error) {
              console.error('Error creating user:', error);
              return false;
            }
          }
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session }: any) {
      if (session.user?.email) {
        try {
          // Get user ID from Supabase
          const { data: userData } = await supabaseAdmin 
            .from('users')
            .select('id')
            .eq('email', session.user.email)
            .single();

          if (userData) {
            session.user.id = userData.id;
          }
        } catch (error) {
          console.error('Error in session callback:', error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

export function auth() {
  return getServerSession(authOptions);
}

