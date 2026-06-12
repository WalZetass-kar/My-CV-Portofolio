import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { educationSchema, idSchema, idWithUpdateSchema } from "@/lib/validation";

const updateSchema = idWithUpdateSchema(educationSchema);

export async function GET() {
  try {
    const items = await prisma.education.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    const parsed = educationSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    const item = await prisma.education.create({ data: parsed.data });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    const { id, ...data } = parsed.data;
    const item = await prisma.education.update({ where: { id }, data });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    const parsed = idSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    await prisma.education.delete({ where: { id: parsed.data.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
