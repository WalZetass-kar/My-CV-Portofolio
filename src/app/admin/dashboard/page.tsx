"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, GraduationCap, Briefcase, Wrench, FolderOpen, Award, Loader2 } from "lucide-react";

interface Counts { education: number; experience: number; skills: number; projects: number; certifications: number; }

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);
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
    ]).then(([edu, exp, sk, pr, cert, prof]) => {
      setCounts({ education: edu.length, experience: exp.length, skills: sk.length, projects: pr.length, certifications: cert.length });
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

        <Link href="/admin/profile" className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
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
