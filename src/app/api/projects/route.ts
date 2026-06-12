import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { projectSchema, idSchema, idWithUpdateSchema } from "@/lib/validation";

const updateSchema = idWithUpdateSchema(projectSchema);

export async function GET() {
  try {
    return NextResponse.json(await prisma.project.findMany({ orderBy: { order: "asc" } }));
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    return NextResponse.json(await prisma.project.create({ data: parsed.data }));
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
    return NextResponse.json(await prisma.project.update({ where: { id }, data }));
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
    await prisma.project.delete({ where: { id: parsed.data.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
