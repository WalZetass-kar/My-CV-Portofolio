"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, MailOpen, Trash2, Loader2, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Toast } from "@/components/ui/Toast";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<Message | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" });

  const load = useCallback(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => { setMessages(data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleExpand = async (msg: Message) => {
    setExpanded(expanded === msg.id ? null : msg.id);
    if (!msg.isRead) {
      try {
        await fetch("/api/messages", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: msg.id }),
        });
        setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, isRead: true } : m));
      } catch {}
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      const res = await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleting.id }),
      });
      if (!res.ok) { setToast({ visible: true, message: "Delete failed", type: "error" }); return; }
      setMessages((prev) => prev.filter((m) => m.id !== deleting.id));
      if (expanded === deleting.id) setExpanded(null);
      setToast({ visible: true, message: "Message deleted!", type: "success" });
    } catch {
      setToast({ visible: true, message: "Network error", type: "error" });
    }
    setDeleting(null);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>;

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <Toast {...toast} onClose={() => setToast({ ...toast, visible: false })} />
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} message={`Delete message from "${deleting?.name}"? This cannot be undone.`} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{messages.length} messages{unread > 0 && <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-accent text-white rounded-full">{unread} unread</span>}</p>
      </div>

      {messages.length === 0 ? (
        <EmptyState title="No messages" description="Messages from the contact form will appear here." />
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`rounded-xl bg-card border transition-all ${msg.isRead ? "border-border" : "border-accent/50 bg-accent/[0.02]"}`}>
              <button
                onClick={() => toggleExpand(msg)}
                className="w-full text-left p-4 flex items-center gap-3"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.isRead ? "bg-surface" : "bg-accent/10"}`}>
                  {msg.isRead ? <MailOpen className="w-4 h-4 text-muted" /> : <Mail className="w-4 h-4 text-accent" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`truncate ${msg.isRead ? "font-medium" : "font-bold"} text-foreground`}>{msg.name}</p>
                    <span className="text-xs text-muted shrink-0">{new Date(msg.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <p className="text-sm text-muted truncate">{msg.subject}</p>
                </div>
                {expanded === msg.id ? <ChevronUp className="w-4 h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
              </button>

              {expanded === msg.id && (
                <div className="px-4 pb-4 pt-1 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-muted">{msg.email}</span>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed mb-4">{msg.message}</p>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Reply via Email
                    </a>
                    <button
                      onClick={() => setDeleting(msg)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
