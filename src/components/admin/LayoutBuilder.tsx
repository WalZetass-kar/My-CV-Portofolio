import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LayoutSection } from '../../types';
import { Save, ArrowUp, ArrowDown, Eye, EyeOff, CheckCircle2, LayoutTemplate } from 'lucide-react';

export const LayoutBuilder: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [sections, setSections] = useState<LayoutSection[]>(data.layoutSections || []);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await updatePartial('layoutSections', sections, 'Homepage Layout Sections updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleVisibility = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s)));
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reindexed = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setSections(reindexed);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Homepage Layout Builder</h3>
          <p className="text-slate-400 text-xs">Atur urutan alur section landing page tanpa menyentuh source code.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Urutan Layout</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Urutan section landing page berhasil diperbarui!</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-emerald-400" />
          <span>Urutan Section Halaman Utama</span>
        </h4>

        <div className="divide-y divide-slate-800">
          {sections.map((sec, index) => (
            <div key={sec.id} className="p-4 flex items-center justify-between text-xs bg-slate-950/60 rounded-2xl border border-slate-800/80 mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveOrder(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveOrder(index, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center">
                  #{sec.order}
                </div>

                <div>
                  <span className="font-bold text-white text-sm block">{sec.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Key: {sec.sectionKey}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleVisibility(sec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                    sec.isVisible ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {sec.isVisible ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tampil</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Disembunyikan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
