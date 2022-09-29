import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "signup",
      async authorize(credentials, _) {
        try {
          const user = await prisma.user.create({
            data: {
              name: credentials.name,
              password: credentials.password,
              role: credentials.role,
            },
          });

          // console.log("onCreate prisma response -> ", user);

          if (!user) throw "UNABLE TO CREATE USER";
          return user;
        } catch (error) {
          console.error("error -> ", JSON.stringify(error, null, 2));
          throw new Error("unable to create user due to an error");
        }
      },
    }),
    CredentialsProvider({
      id: "login",
      async authorize(credentials, _) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              name: credentials.name,
            },
          });

          // console.log("onLogin prisma response -> ", { user });

          if (!user || user?.password !== credentials?.password) {
            throw "USER NOT FOUND";
          }
          return user;
        } catch {
          throw new Error("unable to login due to an error");
        }
      },
    }),
  ],
  session: {
    // strategy: "jwt", // alternative -> database
    maxAge: 1 * 60 * 60, // 1 hour // maxAge: 30 * 24 * 60 * 60, // 30 days <- default
    // updateAge: 24 * 60 * 60, // 24 hours // updateAge: 24 * 60 * 60, <- ignored by if strategy is jwt
  },
  // pages: { error: "/auth/error" },
  callbacks: {
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      if (token?.sub) session.user.sub = token.sub;
      return session;
    },

    async jwt({ token, user }) {
      // console.log({ token });
      if (user?.role) token.role = user.role;
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
