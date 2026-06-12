"use client";

import { useState, useEffect, FormEvent } from "react";
import { Save, Loader2 } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { FileUpload } from "@/components/ui/FileUpload";

interface ProfileData {
  name: string; title: string; summary: string; heroStatement: string;
  cvUrl: string; profileImage: string;
  email: string; whatsapp: string; linkedin: string; github: string; website: string;
}

const emptyProfile: ProfileData = {
  name: "", title: "", summary: "", heroStatement: "",
  cvUrl: "", profileImage: "",
  email: "", whatsapp: "", linkedin: "", github: "", website: "",
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" });

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then((data) => { if (data) setForm(data); setLoading(false); }).catch(() => { setError("Failed to load"); setLoading(false); });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { setToast({ visible: true, message: "Save failed", type: "error" }); return; }
      setToast({ visible: true, message: "Profile saved!", type: "success" });
    } catch { setToast({ visible: true, message: "Network error", type: "error" }); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>;
  if (error) return <p className="text-red-500">{error}</p>;

  const fields: { key: keyof ProfileData; label: string; type?: string; textarea?: boolean }[] = [
    { key: "name", label: "Full Name" },
    { key: "title", label: "Professional Title" },
    { key: "summary", label: "Professional Summary", textarea: true },
    { key: "heroStatement", label: "Hero Statement", textarea: true },
    { key: "email", label: "Email", type: "email" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "linkedin", label: "LinkedIn URL", type: "url" },
    { key: "github", label: "GitHub URL", type: "url" },
    { key: "website", label: "Website URL", type: "url" },
    { key: "cvUrl", label: "CV Download URL" },
  ];

  return (
    <div className="max-w-2xl">
      <Toast {...toast} onClose={() => setToast({ ...toast, visible: false })} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <FileUpload value={form.profileImage} onChange={(url) => setForm({ ...form, profileImage: url })} label="Profile Photo" accept="image/*" />
        <FileUpload value={form.cvUrl} onChange={(url) => setForm({ ...form, cvUrl: url })} label="CV File (PDF)" accept="application/pdf" />

        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`profile-${field.key}`} className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
            {field.textarea ? (
              <textarea id={`profile-${field.key}`} rows={3} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors resize-none" />
            ) : (
              <input id={`profile-${field.key}`} type={field.type || "text"} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus-visible:ring-2 focus-visible:ring-accent/30 transition-colors" />
            )}
          </div>
        ))}

        <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors">
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </form>
    </div>
  );
}
