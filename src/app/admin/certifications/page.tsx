"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Plus, Pencil, Trash2, Save, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { FileUpload } from "@/components/ui/FileUpload";

interface Item { id?: number; title: string; issuer: string; date: string; category: string; description: string; color: string; image: string; fileUrl: string; order: number; }
const empty: Item = { title: "", issuer: "", date: "", category: "", description: "", color: "from-red-500 to-orange-500", image: "", fileUrl: "", order: 0 };
const API = "/api/certifications";

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" });

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ visible: true, message, type });
  const load = useCallback(() => { fetch(API).then((r) => r.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => { setError("Failed to load"); setLoading(false); }); }, []);
  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const res = await fetch(API, { method: editing.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
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
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} message={`Are you sure you want to delete "${deleting?.title}"?`} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{items.length} certifications</p>
        <button onClick={() => setEditing({ ...empty, order: items.length })} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"><Plus className="w-4 h-4" /> Add Certification</button>
      </div>

      {items.length === 0 ? <EmptyState title="No certifications" description="Add your certifications to display on your portfolio." /> : (
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {item.image ? <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover shrink-0" /> : <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.color} shrink-0`} />}
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{item.title}</p>
                  <p className="text-sm text-muted">{item.issuer} &middot; {item.category} &middot; {item.date}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(item)} className="p-2 rounded-lg border border-border hover:bg-surface" aria-label={`Edit ${item.title}`}><Pencil className="w-4 h-4 text-muted" /></button>
                <button onClick={() => setDeleting(item)} className="p-2 rounded-lg border border-border hover:bg-red-500/10" aria-label={`Delete ${item.title}`}><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit Certification" : "Add Certification"}>
        {editing && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label htmlFor="f-title" className="block text-sm font-medium text-foreground mb-1">Title</label><input id="f-title" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label htmlFor="f-issuer" className="block text-sm font-medium text-foreground mb-1">Issuer</label><input id="f-issuer" required value={editing.issuer} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
              <div><label htmlFor="f-date" className="block text-sm font-medium text-foreground mb-1">Date</label><input id="f-date" required value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            </div>
            <div><label htmlFor="f-cat" className="block text-sm font-medium text-foreground mb-1">Category</label><input id="f-cat" required value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <div><label htmlFor="f-desc" className="block text-sm font-medium text-foreground mb-1">Description</label><textarea id="f-desc" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors resize-none" /></div>
            <FileUpload value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} label="Certificate Image (from photo or PDF screenshot)" accept="image/*" />
            <FileUpload value={editing.fileUrl} onChange={(url) => setEditing({ ...editing, fileUrl: url })} label="Certificate PDF File" accept="application/pdf,image/*" />
            {editing.fileUrl && editing.fileUrl.endsWith(".pdf") && (
              <div className="p-3 rounded-lg bg-surface border border-border">
                <p className="text-xs text-muted mb-2">PDF Preview</p>
                <iframe src={editing.fileUrl} className="w-full h-40 rounded border border-border" title="PDF Preview" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><label htmlFor="f-color" className="block text-sm font-medium text-foreground mb-1">Color Gradient</label><div className="flex gap-2"><input id="f-color" value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })} className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /><div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${editing.color} shrink-0`} /></div></div>
              <div><label htmlFor="f-order" className="block text-sm font-medium text-foreground mb-1">Order</label><input id="f-order" type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"><Save className="w-4 h-4" /> Save</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
