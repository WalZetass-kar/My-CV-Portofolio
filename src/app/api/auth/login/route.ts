import { NextResponse } from "next/server";
import { createSession, COOKIE_NAME, getPassword } from "@/lib/auth";
import { checkRateLimit } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ error: "Too many attempts. Try again in 1 minute." }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body.password !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const correctPassword = getPassword();
    if (body.password !== correctPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = createSession();
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
