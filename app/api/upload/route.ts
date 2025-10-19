import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { params } = await req.json();
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: params.timestamp },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Upload signature error" },
      { status: 500 }
    );
  }
}
