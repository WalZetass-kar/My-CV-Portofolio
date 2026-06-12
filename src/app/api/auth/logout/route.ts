import { NextResponse } from "next/server";
import { COOKIE_NAME, destroySession } from "@/lib/auth";

export async function POST() {
  try {
    await destroySession();
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
