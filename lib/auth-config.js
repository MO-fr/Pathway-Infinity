// lib/auth-config.js
import { compare } from "bcryptjs";
import prisma from "../app/lib/prisma.js";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        {
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials.");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Invalid credentials.");
                }

                const isValid = await compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid credentials.");
                }

                return { id: user.id, email: user.email, name: user.name };
            },
        },
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
        verifyRequest: "/login",
        newUser: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("JWT Callback:", { token, user });

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
            session.user.id = token.id;
            return session;
        },
    },
};
