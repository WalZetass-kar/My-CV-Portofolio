import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HeroData } from '../../types';
import { Save, Sparkles, Eye, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const HeroManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [heroForm, setHeroForm] = useState<HeroData>(data.hero);
  const [badgeInput, setBadgeInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setHeroForm(data.hero);
  }, [data.hero]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePartial('hero', heroForm, 'Hero Section updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addBadge = () => {
    if (!badgeInput.trim()) return;
    setHeroForm({
      ...heroForm,
      badges: [...(heroForm.badges || []), badgeInput.trim()]
    });
    setBadgeInput('');
  };

  const removeBadge = (idx: number) => {
    setHeroForm({
      ...heroForm,
      badges: heroForm.badges.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Hero Manager</h3>
          <p className="text-slate-400 text-xs">Atur konten utama landing page Hero Section secara real-time.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Perubahan Hero Section berhasil disimpan dan langsung diperbarui di landing page!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Greeting</label>
              <input
                type="text"
                value={heroForm.greeting}
                onChange={(e) => setHeroForm({ ...heroForm, greeting: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={heroForm.name}
                onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Job Title Utama</label>
              <input
                type="text"
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Subtitle</label>
              <input
                type="text"
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Deskripsi Singkat</label>
            <textarea
              rows={3}
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white resize-none"
            />
          </div>

          {/* Badges Editor */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Badges / Highlights</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                placeholder="Tambah badge baru (contoh: ✨ AI Enthusiast)"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={addBadge}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {heroForm.badges && heroForm.badges.map((badge, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs flex items-center gap-2">
                  <span>{badge}</span>
                  <button type="button" onClick={() => removeBadge(i)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tombol Utama</label>
              <input
                type="text"
                value={heroForm.primaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tombol Kedua</label>
              <input
                type="text"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <input
              type="checkbox"
              id="hireStatus"
              checked={heroForm.isAvailableForHire}
              onChange={(e) => setHeroForm({ ...heroForm, isAvailableForHire: e.target.checked })}
              className="rounded-md border-slate-800 text-emerald-500 focus:ring-0"
            />
            <label htmlFor="hireStatus" className="text-xs text-slate-300 font-semibold cursor-pointer">
              Tampilkan status "Available for new opportunities"
            </label>
          </div>
        </form>

        {/* Realtime Preview Box */}
        <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                Realtime Preview
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Hero Section</span>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold">{heroForm.greeting}</div>
              <h1 className="font-heading font-extrabold text-2xl text-slate-900">{heroForm.name}</h1>
              <div className="font-heading font-bold text-sm text-slate-700">
                <span className="text-emerald-600">{heroForm.title}</span> &amp; {heroForm.subtitle}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{heroForm.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {heroForm.badges && heroForm.badges.map((b, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-medium">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold">
              {heroForm.primaryCtaText}
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold">
              {heroForm.secondaryCtaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
