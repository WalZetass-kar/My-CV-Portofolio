"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Plus, Pencil, Trash2, Save, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";

interface Item { id?: number; name: string; level: number; category: string; order: number; }
const empty: Item = { name: "", level: 75, category: "", order: 0 };
const API = "/api/skills";

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

  const grouped = items.reduce<Record<string, Item[]>>((acc, item) => { (acc[item.category] = acc[item.category] || []).push(item); return acc; }, {});
  const categories = Object.keys(grouped);

  return (
    <div>
      <Toast {...toast} onClose={() => setToast({ ...toast, visible: false })} />
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} message={`Are you sure you want to delete skill "${deleting?.name}"?`} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{items.length} skills</p>
        <button onClick={() => setEditing({ ...empty, order: items.length })} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"><Plus className="w-4 h-4" /> Add Skill</button>
      </div>

      {items.length === 0 ? <EmptyState title="No skills added" description="Add your technical skills to showcase on your portfolio." /> : (
        <div className="space-y-6 mb-6">
          {Object.entries(grouped).map(([cat, skills]) => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">{cat}</h3>
              <div className="space-y-2">
                {skills.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-card border border-border flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-24 h-2 bg-border rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full" style={{ width: `${item.level}%` }} /></div>
                      <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
                      <span className="text-xs text-muted">{item.level}%</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg border border-border hover:bg-surface" aria-label={`Edit ${item.name}`}><Pencil className="w-3.5 h-3.5 text-muted" /></button>
                      <button onClick={() => setDeleting(item)} className="p-1.5 rounded-lg border border-border hover:bg-red-500/10" aria-label={`Delete ${item.name}`}><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit Skill" : "Add Skill"}>
        {editing && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label htmlFor="f-name" className="block text-sm font-medium text-foreground mb-1">Skill Name</label><input id="f-name" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <div><label htmlFor="f-level" className="block text-sm font-medium text-foreground mb-1">Proficiency ({editing.level}%)</label><input id="f-level" type="range" min={0} max={100} value={editing.level} onChange={(e) => setEditing({ ...editing, level: parseInt(e.target.value) })} className="w-full accent-accent" /></div>
            <div><label htmlFor="f-cat" className="block text-sm font-medium text-foreground mb-1">Category</label><input id="f-cat" required value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} list="cats" className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /><datalist id="cats">{categories.map((c) => <option key={c} value={c} />)}</datalist></div>
            <div><label htmlFor="f-order" className="block text-sm font-medium text-foreground mb-1">Order</label><input id="f-order" type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" /></div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"><Save className="w-4 h-4" /> Save</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
