import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (typeof name !== "string" || name.length > 200) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    if (typeof subject !== "string" || subject.length > 500) return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
    if (typeof message !== "string" || message.length > 5000) return NextResponse.json({ error: "Message too long" }, { status: 400 });

    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentCount = await prisma.message.count({
      where: { email, createdAt: { gte: fiveMinAgo } },
    });
    if (recentCount >= 3) {
      return NextResponse.json({ error: "Too many messages. Please wait a few minutes." }, { status: 429 });
    }

    const msg = await prisma.message.create({
      data: { name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() },
    });

    return NextResponse.json({ success: true, id: msg.id });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => null);
    if (!body?.id || typeof body.id !== "number") return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const msg = await prisma.message.update({ where: { id: body.id }, data: { isRead: true } });
    return NextResponse.json(msg);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json().catch(() => null);
    if (!body?.id || typeof body.id !== "number") return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await prisma.message.delete({ where: { id: body.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
