import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";
import { verifyAuth } from "@/lib/auth";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_SIZE } from "@/lib/validation";

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"];

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try local storage first (development)
    if (process.env.NODE_ENV !== "production") {
      try {
        const filename = `${randomBytes(8).toString("hex")}${ext}`;
        const filepath = path.join(process.cwd(), "public", "uploads", filename);
        await writeFile(filepath, buffer);
        return NextResponse.json({ url: `/uploads/${filename}` });
      } catch {
        // Fall through to base64
      }
    }

    // Serverless: store as base64 data URL
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;
    return NextResponse.json({ url: dataUrl });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
