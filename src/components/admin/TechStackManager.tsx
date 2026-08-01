import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { TechStackItem } from '../../types';
import { Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const TechStackManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [techList, setTechList] = useState<TechStackItem[]>(data.techStack || []);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState<Partial<TechStackItem>>({
    name: '',
    category: 'Frontend',
    iconName: 'Atom',
    officialDocUrl: 'https://react.dev',
    isFeatured: true
  });

  const handleSave = async () => {
    await updatePartial('techStack', techList, 'Tech Stack Manager updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAdd = () => {
    if (!form.name?.trim()) return;
    const newItem: TechStackItem = {
      id: 'ts-' + Date.now(),
      name: form.name.trim(),
      category: form.category || 'Frontend',
      iconName: form.iconName || 'Atom',
      officialDocUrl: form.officialDocUrl || 'https://react.dev',
      isFeatured: form.isFeatured !== false,
      order: techList.length + 1
    };
    setTechList([...techList, newItem]);
    setForm({ name: '', category: 'Frontend', iconName: 'Atom', officialDocUrl: 'https://react.dev', isFeatured: true });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Tech Stack Manager</h3>
          <p className="text-slate-400 text-xs">Kelola daftar teknologi dan link dokumentasi resmi.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Daftar Tech Stack berhasil disimpan!</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-heading font-bold text-sm text-white">Tambah Tech Item Baru</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={form.name || ''}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nama teknologi (React, Node.js...)"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
          />
          <input
            type="text"
            value={form.category || ''}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Kategori (Frontend, Backend...)"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
          />
          <input
            type="text"
            value={form.officialDocUrl || ''}
            onChange={(e) => setForm({ ...form, officialDocUrl: e.target.value })}
            placeholder="Official Doc URL..."
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
          />
        </div>
        <button
          onClick={handleAdd}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-semibold"
        >
          Tambah Tech Item
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800">
        {techList.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-800/40">
            <div>
              <span className="font-bold text-white">{item.name}</span>
              <span className="text-slate-400 text-xs ml-2">({item.category})</span>
            </div>
            <button
              onClick={() => setTechList(techList.filter((t) => t.id !== item.id))}
              className="p-2 rounded-lg bg-red-500/10 text-red-400"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
