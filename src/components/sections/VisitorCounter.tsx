"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = "pv_tracked";
    const alreadyTracked = sessionStorage.getItem(sessionKey);

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referer: document.referrer,
        skipTrack: !!alreadyTracked,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.total !== undefined) setCount(data.total);
        if (!alreadyTracked) sessionStorage.setItem(sessionKey, "1");
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1.5 text-muted text-sm">
      <Eye className="w-4 h-4" />
      <span>{count.toLocaleString("id-ID")} pengunjung</span>
    </div>
  );
}
