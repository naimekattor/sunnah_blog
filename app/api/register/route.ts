import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    console.log("API received:", { name, email, role }); // DEBUG

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: role || "USER" },
    });

    console.log("User created:", newUser); // DEBUG

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
