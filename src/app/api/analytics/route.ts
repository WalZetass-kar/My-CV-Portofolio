import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const ua = request.headers.get("user-agent") || "";
    const referer = body.referer || request.headers.get("referer") || "";

    const botPatterns = /bot|crawl|spider|slurp|facebookexternalhit|twitterbot|linkedinbot/i;
    if (botPatterns.test(ua)) {
      const total = await prisma.pageView.count();
      return NextResponse.json({ ok: true, total });
    }

    if (!body.skipTrack) {
      await prisma.pageView.create({
        data: {
          path: body.path || "/",
          userAgent: ua.slice(0, 500),
          referer: String(referer).slice(0, 500),
        },
      });
    }

    const total = await prisma.pageView.count();
    return NextResponse.json({ ok: true, total });
  } catch {
    return NextResponse.json({ ok: true, total: 0 });
  }
}

export async function GET() {
  try {
    if (!(await verifyAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [total, todayCount, last7Days] = await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: today } } }),
      prisma.pageView.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
        select: { createdAt: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    const dailyMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      dailyMap[d.toISOString().slice(0, 10)] = 0;
    }
    for (const pv of last7Days) {
      const key = pv.createdAt.toISOString().slice(0, 10);
      if (key in dailyMap) dailyMap[key]++;
    }

    return NextResponse.json({
      total,
      today: todayCount,
      daily: Object.entries(dailyMap).map(([date, count]) => ({ date, count })),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
