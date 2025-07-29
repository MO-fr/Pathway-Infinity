/**
 * API Route: User Login
 * Handles user authentication and session management
 */

import { createAuthToken, setAuthToken, verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma.js";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    } // Generate auth token
    const token = createAuthToken(user.id);
    setAuthToken(token);

    // Return user data (excluding password field)
    const userData = { ...user };
    delete userData.password;

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
