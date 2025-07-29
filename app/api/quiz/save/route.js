import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth-config.js";
import prisma from "../../../lib/prisma.js";

/**
 * GET /api/quiz/save - Fetch all saved quiz results for the authenticated user
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching all saved results for user:", session.user.id);

    const results = await prisma.quizResult.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        savedAt: "desc", // Most recent first
      },
    });

    console.log(
      `Found ${results.length} saved results for user ${session.user.id}`
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching saved results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/quiz/save - Save a new quiz result for the authenticated user
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { results } = body;

    if (!results) {
      return NextResponse.json(
        { error: "Results data is required" },
        { status: 400 }
      );
    }

    console.log("Saving quiz results for user:", session.user.id);

    const savedResult = await prisma.quizResult.create({
      data: {
        userId: session.user.id,
        results: results,
        savedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log("Quiz result saved with ID:", savedResult.id);

    return NextResponse.json(savedResult);
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
