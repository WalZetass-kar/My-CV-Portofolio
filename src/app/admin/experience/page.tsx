"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Plus, Pencil, Trash2, Save, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";

interface Item { id?: number; role: string; organization: string; location: string; responsibilities: string; order: number; }
const empty: Item = { role: "", organization: "", location: "", responsibilities: "[]", order: 0 };
const API = "/api/experience";
const LABEL = "experience entry";

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [respText, setRespText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" });

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ visible: true, message, type });

  const load = useCallback(() => { fetch(API).then((r) => r.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError("Failed to load"); setLoading(false); }); }, []);
  useEffect(() => { load(); }, [load]);

  const openEdit = (item: Item) => { setEditing(item); try { setRespText(JSON.parse(item.responsibilities).join("\n")); } catch { setRespText(item.responsibilities); } };
  const openNew = () => { setEditing({ ...empty, order: items.length }); setRespText(""); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const data = { ...editing, responsibilities: JSON.stringify(respText.split("\n").filter(Boolean)) };
      const res = await fetch(API, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) { const err = await res.json(); showToast(err.error || "Save failed", "error"); return; }
      setEditing(null); showToast("Saved!"); load();
    } catch { showToast("Network error", "error"); }
  };

  const handleDelete = async () => {
    if (!deleting?.id) return;
    try {
      const res = await fetch(API, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: deleting.id }) });
      if (!res.ok) { showToast("Delete failed", "error"); return; }
      showToast("Deleted!"); load();
    } catch { showToast("Network error", "error"); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>;
  if (error) return <div className="text-center py-20"><p className="text-red-500">{error}</p><button onClick={load} className="mt-2 text-accent underline">Retry</button></div>;

  return (
    <div>
      <Toast {...toast} onClose={() => setToast({ ...toast, visible: false })} />
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} message={`Are you sure you want to delete "${deleting?.role} - ${deleting?.organization}"? This action cannot be undone.`} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{items.length} entries</p>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"><Plus className="w-4 h-4" /> Add Experience</button>
      </div>

      {items.length === 0 ? <EmptyState title="No experience entries" description="Add your organizational experience to display on your portfolio." /> : (
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{item.role} — {item.organization}</p>
                <p className="text-sm text-muted">{item.location}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg border border-border hover:bg-surface transition-colors" aria-label={`Edit ${item.organization}`}><Pencil className="w-4 h-4 text-muted" /></button>
                <button onClick={() => setDeleting(item)} className="p-2 rounded-lg border border-border hover:bg-red-500/10 transition-colors" aria-label={`Delete ${item.organization}`}><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? `Edit ${LABEL}` : `Add ${LABEL}`}>
        {editing && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label htmlFor="f-role" className="block text-sm font-medium text-foreground mb-1">Role</label><input id="f-role" required value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <div><label htmlFor="f-org" className="block text-sm font-medium text-foreground mb-1">Organization</label><input id="f-org" required value={editing.organization} onChange={(e) => setEditing({ ...editing, organization: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <div><label htmlFor="f-loc" className="block text-sm font-medium text-foreground mb-1">Location</label><input id="f-loc" required value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <div><label htmlFor="f-resp" className="block text-sm font-medium text-foreground mb-1">Responsibilities (one per line)</label><textarea id="f-resp" rows={5} value={respText} onChange={(e) => setRespText(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors resize-none" /></div>
            <div><label htmlFor="f-order" className="block text-sm font-medium text-foreground mb-1">Order</label><input id="f-order" type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"><Save className="w-4 h-4" /> Save</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
