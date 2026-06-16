"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Briefcase, Wrench, FolderOpen, Award, Mail, Eye, Loader2 } from "lucide-react";

interface Counts { education: number; experience: number; skills: number; projects: number; certifications: number; messages: number; unread: number; }
interface Analytics { total: number; today: number; daily: { date: string; count: number }[]; }

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [profile, setProfile] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/education").then((r) => r.json()),
      fetch("/api/experience").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/certifications").then((r) => r.json()),
      fetch("/api/profile").then((r) => r.json()),
      fetch("/api/messages").then((r) => r.json()).catch(() => []),
      fetch("/api/analytics").then((r) => r.json()).catch(() => null),
    ]).then(([edu, exp, sk, pr, cert, prof, msgs, stats]) => {
      const messages = Array.isArray(msgs) ? msgs : [];
      setCounts({
        education: edu.length,
        experience: exp.length,
        skills: sk.length,
        projects: pr.length,
        certifications: cert.length,
        messages: messages.length,
        unread: messages.filter((m: { isRead: boolean }) => !m.isRead).length,
      });
      if (stats?.total !== undefined) setAnalytics(stats);
      setProfile(prof);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>;

  const firstName = profile?.name?.split(" ")[0] || "Admin";

  const stats = [
    { label: "Education", count: counts?.education ?? 0, icon: GraduationCap, href: "/admin/education", color: "from-cyan-500 to-blue-500" },
    { label: "Experience", count: counts?.experience ?? 0, icon: Briefcase, href: "/admin/experience", color: "from-purple-500 to-pink-500" },
    { label: "Skills", count: counts?.skills ?? 0, icon: Wrench, href: "/admin/skills", color: "from-green-500 to-emerald-500" },
    { label: "Projects", count: counts?.projects ?? 0, icon: FolderOpen, href: "/admin/projects", color: "from-orange-500 to-amber-500" },
    { label: "Certifications", count: counts?.certifications ?? 0, icon: Award, href: "/admin/certifications", color: "from-red-500 to-rose-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Welcome back, {firstName}!</h2>
        <p className="text-muted mt-1">Manage your portfolio content from this dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}

        <Link href="/admin/messages" className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center relative">
              <Mail className="w-6 h-6 text-white" />
              {(counts?.unread ?? 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">{counts!.unread}</span>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{counts?.messages ?? 0}</p>
              <p className="text-sm text-muted">Messages</p>
            </div>
          </div>
        </Link>

        {analytics && (
          <div className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{analytics.total.toLocaleString("id-ID")}</p>
                <p className="text-sm text-muted">Total Views</p>
              </div>
            </div>
            <div className="flex items-end gap-1 h-12">
              {analytics.daily.map((d) => {
                const max = Math.max(...analytics.daily.map((x) => x.count), 1);
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-accent/20 rounded-t" style={{ height: `${Math.max((d.count / max) * 100, 4)}%` }} />
                    <span className="text-[9px] text-muted">{d.date.slice(8)}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted mt-2">Today: {analytics.today} views</p>
          </div>
        )}

        <Link href="/admin/profile" className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Profile Settings</p>
              <p className="text-xs text-muted">Edit personal info & contact</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
