import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AboutData } from '../../types';
import { Save, Plus, Trash2, CheckCircle2, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const AboutManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [aboutForm, setAboutForm] = useState<AboutData>(data.about);
  const [bioInput, setBioInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAboutForm(data.about);
  }, [data.about]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePartial('about', aboutForm, 'About section & 3D Photo Showcase updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addPhotoFromUploader = (url: string) => {
    if (!url) return;
    const currentList = aboutForm.photoGallery || [];
    const updatedGallery = [...currentList, url];
    const updatedForm = { ...aboutForm, photoGallery: updatedGallery };
    setAboutForm(updatedForm);
    updatePartial('about', updatedForm, 'Added photo to gallery.');
  };

  const removePhoto = (index: number) => {
    const currentList = aboutForm.photoGallery || [];
    const updatedGallery = currentList.filter((_, i) => i !== index);
    const updatedForm = { ...aboutForm, photoGallery: updatedGallery };
    setAboutForm(updatedForm);
    updatePartial('about', updatedForm, 'Removed photo from gallery.');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">3D Photo Showcase &amp; About Manager</h3>
          <p className="text-slate-400 text-xs">Kelola foto profile 3D, galeri interaktif, bingkai style, dan detail biografi.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>3D Photo Showcase &amp; About Section berhasil disimpan!</span>
        </div>
      )}

      {/* 3D Photo Showcase Manager Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-white">Pengaturan 3D Photo Showcase &amp; Frame</h4>
            <p className="text-slate-400 text-xs">Atur koleksi foto yang dapat diganti-ganti pengunjung dengan efek parallax 3D.</p>
          </div>
        </div>

        {/* Primary Profile Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Foto Profil Utama (Avatar Showcase)"
            value={aboutForm.profileImage || ''}
            onChange={(url) => setAboutForm({ ...aboutForm, profileImage: url })}
            aspectRatio="square"
          />
          <ImageUploader
            label="Foto Profil Sekunder / Alternatif"
            value={aboutForm.profileImageSecondary || ''}
            onChange={(url) => setAboutForm({ ...aboutForm, profileImageSecondary: url })}
            aspectRatio="square"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Badge Status Text
            </label>
            <input
              type="text"
              value={aboutForm.avatarBadgeText || ''}
              onChange={(e) => setAboutForm({ ...aboutForm, avatarBadgeText: e.target.value })}
              placeholder="Contoh: Full Stack & AI Builder"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Gaya Bingkai 3D (Frame Style)
            </label>
            <select
              value={aboutForm.avatarFrameStyle || '3d-glass'}
              onChange={(e) => setAboutForm({ ...aboutForm, avatarFrameStyle: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            >
              <option value="3d-glass">3D Glassmorphism (Default)</option>
              <option value="neon-ring">Neon Glow Ring (Glow Emerald)</option>
              <option value="cyber-card">Cyber Card (Futuristic Border)</option>
              <option value="polaroid">Polaroid Classic (Clean Frame)</option>
            </select>
          </div>
        </div>

        {/* Photo Gallery List with ImageUploader */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Koleksi Galeri Foto 3D ({aboutForm.photoGallery?.length || 0} Foto)
            </label>
          </div>

          <ImageUploader
            label="Upload Foto Baru Ke Galeri 3D"
            value=""
            onChange={addPhotoFromUploader}
          />

          {/* Photo Preview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {(aboutForm.photoGallery || []).map((photo, index) => (
              <div key={index} className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                    title="Hapus foto ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 text-[10px] font-mono">
                  #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main About Form */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Judul Section</label>
            <input
              type="text"
              value={aboutForm.title}
              onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Subtitle</label>
            <input
              type="text"
              value={aboutForm.subtitle}
              onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Stats Editor */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Statistik Angka Counter</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Total Project</label>
              <input
                type="number"
                value={aboutForm.stats?.totalProjects || 0}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    stats: { ...aboutForm.stats, totalProjects: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Pengalaman (Tahun)</label>
              <input
                type="number"
                value={aboutForm.stats?.yearsExperience || 0}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    stats: { ...aboutForm.stats, yearsExperience: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Jumlah Teknologi</label>
              <input
                type="number"
                value={aboutForm.stats?.technologiesCount || 0}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    stats: { ...aboutForm.stats, technologiesCount: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">GitHub Contribution</label>
              <input
                type="number"
                value={aboutForm.stats?.githubContributions || 0}
                onChange={(e) =>
                  setAboutForm({
                    ...aboutForm,
                    stats: { ...aboutForm.stats, githubContributions: parseInt(e.target.value) || 0 }
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Bio Paragraphs */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Paragraf Biografi</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              placeholder="Tambah paragraf biografi..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
            <button
              type="button"
              onClick={() => {
                if (bioInput.trim()) {
                  setAboutForm({ ...aboutForm, bioParagraphs: [...(aboutForm.bioParagraphs || []), bioInput.trim()] });
                  setBioInput('');
                }
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {aboutForm.bioParagraphs && aboutForm.bioParagraphs.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span>{p}</span>
                <button
                  type="button"
                  onClick={() => setAboutForm({ ...aboutForm, bioParagraphs: aboutForm.bioParagraphs.filter((_, idx) => idx !== i) })}
                  className="text-red-400 hover:text-red-300 ml-2 shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Passion Statement */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Pesan Passion Utama</label>
          <textarea
            rows={2}
            value={aboutForm.passion}
            onChange={(e) => setAboutForm({ ...aboutForm, passion: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white resize-none"
          />
        </div>
      </form>
    </div>
  );
};
