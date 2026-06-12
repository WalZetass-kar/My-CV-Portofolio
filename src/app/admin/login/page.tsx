"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted mt-1">Enter your password to access the admin panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-xl bg-card border border-border"
        >
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-500/10 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-muted mt-4">
          <a href="/" className="hover:text-accent transition-colors">
            &larr; Back to Portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
