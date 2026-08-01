import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { NavigationItem } from '../../types';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export const NavigationManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [navList, setNavList] = useState<NavigationItem[]>(data.navigation || []);
  const [saved, setSaved] = useState(false);

  const [labelInput, setLabelInput] = useState('');
  const [hrefInput, setHrefInput] = useState('#');

  const handleSave = async () => {
    await updatePartial('navigation', navList, 'Navigation Manager updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addNavItem = () => {
    if (!labelInput.trim() || !hrefInput.trim()) return;
    const newItem: NavigationItem = {
      id: 'nav-' + Date.now(),
      label: labelInput.trim(),
      href: hrefInput.trim(),
      order: navList.length + 1,
      isVisible: true
    };
    setNavList([...navList, newItem]);
    setLabelInput('');
    setHrefInput('#');
  };

  const toggleVisibility = (id: string) => {
    setNavList(navList.map((item) => (item.id === id ? { ...item, isVisible: !item.isVisible } : item)));
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === navList.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...navList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reindexed = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setNavList(reindexed);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Navigation Manager</h3>
          <p className="text-slate-400 text-xs">Atur menu navigasi navbar, urutan posisi, dan status tampil/sembunyi.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Navigasi</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Menu navigasi berhasil diperbarui!</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-heading font-bold text-sm text-white">Tambah Menu Navigasi</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
            placeholder="Label Menu (contoh: Blog, Certificate)"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
          />
          <input
            type="text"
            value={hrefInput}
            onChange={(e) => setHrefInput(e.target.value)}
            placeholder="Target Anchor (contoh: #projects)"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
          />
        </div>
        <button onClick={addNavItem} className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold">
          Tambah Menu
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800">
        {navList.map((item, index) => (
          <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveOrder(index, 'up')} className="text-slate-500 hover:text-white">
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => moveOrder(index, 'down')} className="text-slate-500 hover:text-white">
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="font-bold text-white">{item.label}</span>
                <span className="text-slate-400 font-mono text-[11px] ml-2">{item.href}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleVisibility(item.id)}
                className={`p-2 rounded-lg ${item.isVisible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}
              >
                {item.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setNavList(navList.filter((n) => n.id !== item.id))}
                className="p-2 rounded-lg bg-red-500/10 text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
