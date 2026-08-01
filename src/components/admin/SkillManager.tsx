import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skill, SkillCategory, SkillLevel } from '../../types';
import { Plus, Trash2, Edit2, CheckCircle2, ArrowUp, ArrowDown, Power, Save } from 'lucide-react';

export const SkillManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [skillsList, setSkillsList] = useState<Skill[]>(data.skills || []);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [saved, setSaved] = useState(false);

  const categories: SkillCategory[] = ['Frontend', 'Backend', 'AI', 'Database', 'Mobile', 'DevOps', 'Tools'];
  const levels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const [form, setForm] = useState<Partial<Skill>>({
    name: '',
    category: 'Frontend',
    iconName: 'Code',
    level: 'Advanced',
    percentage: 85,
    isActive: true
  });

  const handleSave = async () => {
    await updatePartial('skills', skillsList, 'Skill Manager updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddOrUpdate = () => {
    if (!form.name?.trim()) return;

    if (editingSkill) {
      setSkillsList(
        skillsList.map((s) => (s.id === editingSkill.id ? ({ ...s, ...form } as Skill) : s))
      );
      setEditingSkill(null);
    } else {
      const newSkill: Skill = {
        id: 'sk-' + Date.now(),
        name: form.name.trim(),
        category: (form.category || 'Frontend') as SkillCategory,
        iconName: form.iconName || 'Code',
        level: (form.level || 'Advanced') as SkillLevel,
        percentage: form.percentage || 85,
        order: skillsList.length + 1,
        isActive: form.isActive !== false
      };
      setSkillsList([...skillsList, newSkill]);
    }

    setForm({
      name: '',
      category: 'Frontend',
      iconName: 'Code',
      level: 'Advanced',
      percentage: 85,
      isActive: true
    });
  };

  const startEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setForm(skill);
  };

  const deleteSkill = (id: string) => {
    setSkillsList(skillsList.filter((s) => s.id !== id));
  };

  const toggleActive = (id: string) => {
    setSkillsList(
      skillsList.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === skillsList.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...skillsList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-index order
    const reindexed = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setSkillsList(reindexed);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Skill Manager</h3>
          <p className="text-slate-400 text-xs">Kelola daftar keahlian, tingkat kemahiran, kategori, dan urutan tampilan.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Simpan ke Website</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Daftar keahlian berhasil disimpan!</span>
        </div>
      )}

      {/* Form Input */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-heading font-bold text-sm text-white">
          {editingSkill ? 'Edit Skill' : 'Tambah Skill Baru'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Nama Skill *</label>
            <input
              type="text"
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="misal: React 19, Gemini AI"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as SkillCategory })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Level Kemahiran</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value as SkillLevel })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Persentase ({form.percentage}%)</label>
            <input
              type="range"
              min="10"
              max="100"
              value={form.percentage || 85}
              onChange={(e) => setForm({ ...form, percentage: parseInt(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Icon Identifier</label>
            <input
              type="text"
              value={form.iconName || 'Code'}
              onChange={(e) => setForm({ ...form, iconName: e.target.value })}
              placeholder="Code, Layout, Server, Sparkles, Database..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleAddOrUpdate}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold"
          >
            {editingSkill ? 'Perbarui Skill' : 'Tambah Ke Daftar'}
          </button>
          {editingSkill && (
            <button
              type="button"
              onClick={() => {
                setEditingSkill(null);
                setForm({ name: '', category: 'Frontend', iconName: 'Code', level: 'Advanced', percentage: 85, isActive: true });
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* Skills Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-300">
          Daftar Skill ({skillsList.length})
        </div>
        <div className="divide-y divide-slate-800">
          {skillsList.map((skill, index) => (
            <div key={skill.id} className="p-4 flex items-center justify-between text-xs gap-4 hover:bg-slate-800/40">
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
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{skill.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-emerald-400 font-mono">
                      {skill.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Level: {skill.level} ({skill.percentage}%)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(skill.id)}
                  className={`p-2 rounded-lg ${skill.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}
                  title="Toggle Status Aktif"
                >
                  <Power className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => startEdit(skill)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
