import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, ProjectStatus } from '../../types';
import { Save, Plus, Trash2, Edit2, CheckCircle2, Sparkles, ExternalLink, Github, ArrowUp, ArrowDown } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const ProjectManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [projectsList, setProjectsList] = useState<Project[]>(data.projects || []);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: '',
    liveDemoUrl: '',
    status: 'Completed',
    isFeatured: true,
    category: 'Full Stack & AI',
    year: '2026'
  });

  const [techInput, setTechInput] = useState('');

  const handleSave = async () => {
    await updatePartial('projects', projectsList, 'Project Manager updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddOrUpdate = () => {
    if (!form.title?.trim()) return;

    const slug = form.title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingProject) {
      setProjectsList(
        projectsList.map((p) => (p.id === editingProject.id ? ({ ...p, ...form, slug } as Project) : p))
      );
      setEditingProject(null);
    } else {
      const newProj: Project = {
        id: 'proj-' + Date.now(),
        title: form.title.trim(),
        slug,
        description: form.description || '',
        longDescription: form.longDescription || form.description,
        thumbnail: form.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        gallery: [form.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'],
        techStack: form.techStack || ['React', 'TypeScript'],
        githubUrl: form.githubUrl || '',
        liveDemoUrl: form.liveDemoUrl || '',
        status: (form.status || 'Completed') as ProjectStatus,
        isFeatured: form.isFeatured !== false,
        category: form.category || 'Web App',
        year: form.year || '2026',
        order: projectsList.length + 1
      };
      setProjectsList([...projectsList, newProj]);
    }

    setForm({
      title: '',
      slug: '',
      description: '',
      longDescription: '',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: '',
      liveDemoUrl: '',
      status: 'Completed',
      isFeatured: true,
      category: 'Full Stack & AI',
      year: '2026'
    });
  };

  const startEdit = (proj: Project) => {
    setEditingProject(proj);
    setForm(proj);
  };

  const deleteProject = (id: string) => {
    setProjectsList(projectsList.filter((p) => p.id !== id));
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === projectsList.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...projectsList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reindexed = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setProjectsList(reindexed);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Project Manager</h3>
          <p className="text-slate-400 text-xs">Tambah, ubah, dan susun daftar proyek portfolio di landing page.</p>
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
          <span>Daftar proyek berhasil disimpan!</span>
        </div>
      )}

      {/* Form Project */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-heading font-bold text-sm text-white">
          {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Nama Proyek *</label>
            <input
              type="text"
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Nama proyek..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Kategori Proyek</label>
            <input
              type="text"
              value={form.category || ''}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Web App, Full Stack & AI, Mobile App..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Deskripsi Ringkas</label>
          <textarea
            rows={2}
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Deskripsi singkat yang tampil di card..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
          />
        </div>

        <div>
          <ImageUploader
            label="Thumbnail Proyek (Upload Foto / URL)"
            value={form.thumbnail || ''}
            onChange={(url) => setForm({ ...form, thumbnail: url })}
            aspectRatio="video"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">GitHub Repository URL</label>
            <input
              type="text"
              value={form.githubUrl || ''}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Live Demo URL</label>
            <input
              type="text"
              value={form.liveDemoUrl || ''}
              onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })}
              placeholder="https://demo.example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFeatured || false}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="rounded-md border-slate-800 text-emerald-500"
            />
            <span>Tampilkan Badge Featured</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-3">
          <button
            type="button"
            onClick={handleAddOrUpdate}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold"
          >
            {editingProject ? 'Perbarui Proyek' : 'Tambah Proyek'}
          </button>
          {editingProject && (
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-300">
          Daftar Proyek ({projectsList.length})
        </div>
        <div className="divide-y divide-slate-800">
          {projectsList.map((proj, index) => (
            <div key={proj.id} className="p-4 flex items-center justify-between text-xs gap-4 hover:bg-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveOrder(index, 'up')} className="text-slate-500 hover:text-white">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => moveOrder(index, 'down')} className="text-slate-500 hover:text-white">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden shrink-0">
                  <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover" />
                </div>

                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{proj.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-emerald-400 font-mono">
                      {proj.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 max-w-md">
                    {proj.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(proj)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
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
