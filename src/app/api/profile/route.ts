import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { profileSchema } from "@/lib/validation";

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } });
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const parsed = profileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const profile = await prisma.profile.upsert({
      where: { id: 1 },
      update: parsed.data,
      create: { id: 1, ...parsed.data },
    });
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
