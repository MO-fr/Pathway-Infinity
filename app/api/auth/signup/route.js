/**
 * API Route: User Registration
 * Handles new user creation with secure password hashing
 */

import { hashPassword } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    console.log("[@app/api/auth/signup/route] Signup request received");
    const { name, email, password } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new user
    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return NextResponse.json({
      user,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
