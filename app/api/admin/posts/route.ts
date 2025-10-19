import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// 📥 GET — get only pending posts
export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "PENDING")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pending posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ✅ PATCH — approve or reject post
export async function PATCH(req: Request) {
  const { postId, action, adminName } = await req.json();

  if (!postId || !action || !adminName) {
    return NextResponse.json(
      { error: "postId, action and adminName are required" },
      { status: 400 }
    );
  }

  const newStatus = action === "approve" ? "APPROVED" : "REJECTED";

  const { data, error } = await supabase
    .from("posts")
    .update({ status: newStatus, approved_by: adminName })
    .eq("id", postId)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
