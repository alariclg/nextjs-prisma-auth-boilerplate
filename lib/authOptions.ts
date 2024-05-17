import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import authService from "@/services/auth.service";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await authService.authorize(credentials);

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user = token;

      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
        },
      };

      return session;
    },

    jwt({ user, token }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }

      return token;
    },
  },
};
