import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
// GET — fetch all posts
export async function GET() {
  // console.log("➡️ GET /api/posts route hit. Attempting to query database...");

  // Let's log the prisma object itself to see if it's what we expect
  //console.log("🔬 Inspecting Prisma client object:", prisma);
  try {
    //console.log("⏳ Calling prisma.post.findMany()...");
    // Use Prisma to get the posts
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    //console.log("✅ Successfully fetched posts from database."); // This line will NOT be reached
    return NextResponse.json(posts);
  } catch (error) {
    //console.error("❌ DATABASE QUERY FAILED. Error details:", error); // The full error will appear here
    //console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST — create a new post
export async function POST(req: Request) {
  // 1. Get the user session using NextAuth, not Supabase
  console.log("➡️ POST /api/posts route hit");
  const session = await getServerSession(authOptions);
  console.log("🟢 Session object:", session);

  // 2. Check if the session is valid and contains the user ID
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: "You must be logged in to create a post." },
      { status: 401 } // Correctly return Unauthorized
    );
  }

  // 3. Get the request body
  const body = await req.json();
  const { title, content, coverImage } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 400 }
    );
  }

  // 4. Use Prisma to create the post, connecting it to the logged-in user
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        status: "PENDING",
        authorId: session.user.id,
        coverImage,
      },
    });
    //console.log(session.user.id);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    //console.error("Error inserting post:", error);
    return NextResponse.json(
      { error: "Failed to create post in the database." },
      { status: 500 }
    );
  }
}
