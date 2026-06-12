import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { certificationSchema, idSchema, idWithUpdateSchema } from "@/lib/validation";

const updateSchema = idWithUpdateSchema(certificationSchema);

export async function GET() {
  try {
    return NextResponse.json(await prisma.certification.findMany({ orderBy: { order: "asc" } }));
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    const parsed = certificationSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    return NextResponse.json(await prisma.certification.create({ data: parsed.data }));
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
    return NextResponse.json(await prisma.certification.update({ where: { id }, data }));
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
    await prisma.certification.delete({ where: { id: parsed.data.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
