import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { PostStatus } from "@prisma/client";
import type { NextRequest } from "next/server";

// Define the context type explicitly
interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET — fetch post by ID
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { approvedBy: true, author: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PATCH — approve post
export async function PATCH(req: NextRequest, context: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    type AuthUser = { id?: string };
    const user = session.user as AuthUser;
    if (!user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        status: PostStatus.APPROVED,
        approvedById: user.id,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error approving post:", error);
    return NextResponse.json(
      { error: "Failed to approve post" },
      { status: 500 }
    );
  }
}

// DELETE — delete post
export async function DELETE(req: NextRequest, context: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
