import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../lib/auth-config.js";
import prisma from "../../../../lib/prisma.js";

export async function GET(request, { params }) {
  try {
    // Await params to handle Next.js 13+ App Router behavior
    const resolvedParams = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching result with ID:", resolvedParams.id);

    const result = await prisma.quizResult.findFirst({
      where: {
        id: resolvedParams.id,
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

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    // Check if the result belongs to the requesting user
    if (result.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching saved result:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for deleting a saved quiz result
 * Allows users to delete their own saved results
 */
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Deleting result with ID:", resolvedParams.id);

    // First, check if the result exists and belongs to the user
    const result = await prisma.quizResult.findFirst({
      where: {
        id: resolvedParams.id,
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    // Check if the result belongs to the requesting user
    if (result.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden - You can only delete your own results" }, { status: 403 });
    }

    // Delete the result
    await prisma.quizResult.delete({
      where: {
        id: resolvedParams.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Result deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting saved result:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
