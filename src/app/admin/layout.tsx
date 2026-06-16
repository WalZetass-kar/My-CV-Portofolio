"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderOpen,
  Award,
  Mail,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authState, setAuthState] = useState<"loading" | "authed" | "unauthed">("loading");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (pathname === "/admin/login") { setAuthState("authed"); return; }
    fetch("/api/profile")
      .then((res) => {
        if (res.ok) {
          setAuthState("authed");
          return fetch("/api/messages").then((r) => r.json()).then((msgs) => {
            if (Array.isArray(msgs)) setUnreadCount(msgs.filter((m: { isRead: boolean }) => !m.isRead).length);
          }).catch(() => {});
        } else { setAuthState("unauthed"); router.push("/admin/login"); }
      })
      .catch(() => { setAuthState("unauthed"); router.push("/admin/login"); });
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-lg font-bold text-foreground">
            Admin<span className="text-accent">.</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-surface" aria-label="Close sidebar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground hover:bg-surface"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1">{item.label}</span>
              {item.href === "/admin/messages" && unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-white rounded-full min-w-[18px] text-center">{unreadCount}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Portfolio
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center gap-3 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg border border-border hover:bg-surface" aria-label="Open sidebar">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">
            {navItems.find((n) => n.href === pathname)?.label || "Admin Panel"}
          </h1>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {authState === "loading" ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          ) : authState === "authed" ? children : null}
        </main>
      </div>
    </div>
  );
}
