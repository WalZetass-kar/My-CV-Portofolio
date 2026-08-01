import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ThemeConfig } from '../../types';
import { Save, Palette, CheckCircle2 } from 'lucide-react';

export const ThemeManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [themeForm, setThemeForm] = useState<ThemeConfig>(data.theme);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePartial('theme', themeForm, 'Theme Manager updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Theme &amp; SEO Manager</h3>
          <p className="text-slate-400 text-xs">Atur identitas merek, meta title SEO, meta description, dan Google Analytics.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Konfigurasi</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Pengaturan tema &amp; SEO berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Primary Color Palette</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeForm.primaryColor}
                onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <span className="font-mono text-xs text-slate-300">{themeForm.primaryColor} (Emerald System)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Logo Text Navbar</label>
            <input
              type="text"
              value={themeForm.logoText}
              onChange={(e) => setThemeForm({ ...themeForm, logoText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Pengaturan SEO Website</h4>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">SEO Meta Title</label>
            <input
              type="text"
              value={themeForm.seoTitle}
              onChange={(e) => setThemeForm({ ...themeForm, seoTitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">SEO Meta Description</label>
            <textarea
              rows={3}
              value={themeForm.seoDescription}
              onChange={(e) => setThemeForm({ ...themeForm, seoDescription: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Google Analytics ID</label>
              <input
                type="text"
                value={themeForm.googleAnalyticsId || ''}
                onChange={(e) => setThemeForm({ ...themeForm, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Search Console Token</label>
              <input
                type="text"
                value={themeForm.searchConsoleVerification || ''}
                onChange={(e) => setThemeForm({ ...themeForm, searchConsoleVerification: e.target.value })}
                placeholder="google-site-verification..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
