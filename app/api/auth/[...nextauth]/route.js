// src/app/api/auth/[...nextauth]/route.js
import { prisma } from "@/lib/db";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log(process.env.NEXTAUTH_SECRET)

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Remove PrismaAdapter when using JWT strategy
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials.");
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

if (process.env.NODE_ENV === "development") {
  console.log("NextAuth handler initialized");
}

export { handler as GET, handler as POST };
