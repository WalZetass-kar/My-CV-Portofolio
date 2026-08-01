import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactInfo } from '../../types';
import { Save, CheckCircle2 } from 'lucide-react';

export const ContactManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [contactForm, setContactForm] = useState<ContactInfo>(data.contact);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data.contact) {
      setContactForm(data.contact);
    }
  }, [data.contact]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePartial('contact', contactForm, 'Contact links updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Contact Manager</h3>
          <p className="text-slate-400 text-xs">Atur tautan media sosial, email, WhatsApp, dan lokasi publik.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Tautan Kontak</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Tautan kontak berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Resmi *</label>
            <input
              type="email"
              value={contactForm.email || ''}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">WhatsApp (+62...)</label>
            <input
              type="text"
              value={contactForm.whatsapp || ''}
              onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={contactForm.linkedin || ''}
              onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">GitHub URL</label>
            <input
              type="text"
              value={contactForm.github || ''}
              onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Instagram URL</label>
            <input
              type="text"
              value={contactForm.instagram || ''}
              onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">X (Twitter) URL</label>
            <input
              type="text"
              value={contactForm.x || ''}
              onChange={(e) => setContactForm({ ...contactForm, x: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Lokasi / Timezone</label>
          <input
            type="text"
            value={contactForm.location || ''}
            onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
          />
        </div>
      </form>
    </div>
  );
};
