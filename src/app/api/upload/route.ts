import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { verifyAuth } from "@/lib/auth";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_SIZE } from "@/lib/validation";
import { supabase } from "@/lib/supabase";

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"];
const BUCKET = "uploads";

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum 5 MB." }, { status: 400 });
    }

    if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed. Use PNG, JPG, WebP, GIF, or PDF." }, { status: 400 });
    }

    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: "File extension not allowed." }, { status: 400 });
    }

    const filename = `${randomBytes(8).toString("hex")}${ext}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
