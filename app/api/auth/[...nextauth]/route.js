<<<<<<< HEAD
import bcrypt from "bcryptjs";
=======
// src/app/api/auth/[...nextauth]/route.js
import { prisma } from "@/lib/db";
import { compare } from "bcrypt";
>>>>>>> main
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@lib/prisma.js";

<<<<<<< HEAD
const handler = NextAuth({
=======
console.log(process.env.NEXTAUTH_SECRET)

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Remove PrismaAdapter when using JWT strategy
  // adapter: PrismaAdapter(prisma),
>>>>>>> main
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
<<<<<<< HEAD
          throw new Error("Please enter an email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log(
          "LOGIN ATTEMPT:",
          credentials.email,
          credentials.password,
          "FOUND USER:",
          user
        );
        console.log("HASH IN DB:", user?.password);
        console.log(
          "BCRYPT TEST (direct):",
          await bcrypt.compare("admin123", user?.password)
        );
        console.log(
          "BCRYPT TEST (input):",
          await bcrypt.compare(credentials.password, user?.password)
        );
        if (!user || !user?.password) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("PASSWORD VALID:", isPasswordValid);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
=======
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
>>>>>>> main
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      } else if (!token.role && token.email) {
        // Fetch role from DB if not present
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
<<<<<<< HEAD
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ user, account, profile, req }) {
      // Only for Google sign-in
      if (account?.provider === "google") {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!dbUser) {
          // Default all new Google Sign-ups to student role.
          // The previous method of reading a cookie was causing errors on Vercel.
          const role = "student";

          dbUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              role,
              emailVerified: true,
              status: "active",
              provider: "google",
            },
          });
        }

        // Set the user ID and role
        user.id = dbUser.id.toString();
        user.role = dbUser.role;
      }
      return true;
    },
  },
});

=======
      session.user.id = token.id;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

if (process.env.NODE_ENV === "development") {
  console.log("NextAuth handler initialized");
}

>>>>>>> main
export { handler as GET, handler as POST };
