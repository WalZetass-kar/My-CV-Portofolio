import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SiteSettings, ContactInfo, GithubProfileData } from '../../types';
import { Save, CheckCircle2, Globe, Mail, Github, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const SettingsManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'github'>('general');
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(data.settings);
  const [contactForm, setContactForm] = useState<ContactInfo>(data.contact);
  const [githubForm, setGithubForm] = useState<GithubProfileData>(data.github);

  const [syncingGithub, setSyncingGithub] = useState(false);
  const [githubMsg, setGithubMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePartial('settings', settingsForm, 'Settings updated.');
    await updatePartial('contact', contactForm, 'Contact information updated.');
    await updatePartial('github', githubForm, 'GitHub configuration updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAdminGithubSync = async () => {
    const uname = githubForm.username.trim();
    if (!uname) return;

    setSyncingGithub(true);
    setGithubMsg(null);

    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${uname}`);
      if (!userRes.ok) {
        throw new Error(`Username GitHub "${uname}" tidak ditemukan di API resmi.`);
      }
      const userData = await userRes.json();

      // 2. Fetch User Repositories
      const reposRes = await fetch(`https://api.github.com/users/${uname}/repos?sort=updated&per_page=30`);
      let reposData: any[] = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      // Calculate Stars
      const calculatedStars = reposData.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);

      const updatedGithubData: GithubProfileData = {
        ...githubForm,
        username: uname,
        totalRepos: userData.public_repos || 0,
        followers: userData.followers || 0,
        stars: calculatedStars,
        featuredRepos: reposData.slice(0, 6).map((r: any) => ({
          name: r.name,
          description: r.description || '',
          language: r.language || 'Code',
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          url: r.html_url
        }))
      };

      setGithubForm(updatedGithubData);
      await updatePartial('github', updatedGithubData, `Synced GitHub @${uname}`);

      // Also update contact GitHub link if matching
      const updatedContact = {
        ...contactForm,
        github: `https://github.com/${uname}`
      };
      setContactForm(updatedContact);
      await updatePartial('contact', updatedContact, 'Updated contact GitHub link');

      setGithubMsg({
        type: 'success',
        text: `Berhasil sinkronisasi data dari GitHub resmi @${uname}! (${userData.public_repos} repositori, ${calculatedStars} stars).`
      });

    } catch (err: any) {
      setGithubMsg({
        type: 'error',
        text: err.message || 'Gagal terhubung dengan GitHub REST API.'
      });
    } finally {
      setSyncingGithub(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Title & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">System Settings &amp; Configuration</h3>
          <p className="text-slate-400 text-xs">Atur preferensi nama website, footer, kontak resmi, dan sinkronisasi GitHub terpusat.</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Semua Pengaturan</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Seluruh pengaturan website, kontak, dan footer berhasil disimpan!</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'general' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Umum &amp; Footer</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'contact' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Informasi Kontak</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('github')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'github' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Github className="w-4 h-4" />
          <span>Admin GitHub Sync</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        
        {/* Tab 1: General & Footer */}
        {activeTab === 'general' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Nama Website / Portfolio</label>
              <input
                type="text"
                value={settingsForm.websiteName}
                onChange={(e) => setSettingsForm({ ...settingsForm, websiteName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUploader
                label="Logo Website / Brand Icon"
                value={settingsForm.logo || ''}
                onChange={(url) => setSettingsForm({ ...settingsForm, logo: url })}
              />
              <ImageUploader
                label="Favicon Browser Icon"
                value={settingsForm.favicon || ''}
                onChange={(url) => setSettingsForm({ ...settingsForm, favicon: url })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Teks Hak Cipta Footer (Copyright)</label>
              <input
                type="text"
                value={settingsForm.footerText}
                onChange={(e) => setSettingsForm({ ...settingsForm, footerText: e.target.value })}
                placeholder="© 2026 M. Ihwal Maulana. All rights reserved."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">Maintenance Mode</span>
                  <span className="text-[11px] text-slate-400">Tampilkan halaman pemeliharaan sementara.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.maintenanceMode}
                  onChange={(e) => setSettingsForm({ ...settingsForm, maintenanceMode: e.target.checked })}
                  className="rounded-md border-slate-800 text-emerald-500 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">Analytics Tracker</span>
                  <span className="text-[11px] text-slate-400">Aktifkan penghitung statistik statistik publik.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.analyticsEnabled}
                  onChange={(e) => setSettingsForm({ ...settingsForm, analyticsEnabled: e.target.checked })}
                  className="rounded-md border-slate-800 text-emerald-500 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Contact Info */}
        {activeTab === 'contact' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Resmi *</label>
                <input
                  type="email"
                  value={contactForm.email || ''}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="contoh@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">WhatsApp (+62...)</label>
                <input
                  type="text"
                  value={contactForm.whatsapp || ''}
                  onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                  placeholder="+62 812 3456 7890"
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
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={contactForm.github || ''}
                  onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
                  placeholder="https://github.com/username"
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
                  placeholder="https://instagram.com/username"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">X (Twitter) URL</label>
                <input
                  type="text"
                  value={contactForm.x || ''}
                  onChange={(e) => setContactForm({ ...contactForm, x: e.target.value })}
                  placeholder="https://x.com/username"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Lokasi / Kota Dominan</label>
              <input
                type="text"
                value={contactForm.location || ''}
                onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                placeholder="Indonesia (GMT+7)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Admin GitHub Sync */}
        {activeTab === 'github' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Akses Terproteksi Admin (Khusus Pengelola)
              </span>
              <p className="text-slate-300">
                Fitur ini memindahkan akses sinkronisasi GitHub sepenuhnya ke area Admin agar pengunjung publik tidak dapat mengubah username atau merusak tautan repositori.
              </p>
            </div>

            {githubMsg && (
              <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
                githubMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {githubMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{githubMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Username GitHub Resmi</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={githubForm.username}
                  onChange={(e) => setGithubForm({ ...githubForm, username: e.target.value })}
                  placeholder="ihwalmaulana09"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
                <button
                  type="button"
                  onClick={handleAdminGithubSync}
                  disabled={syncingGithub}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncingGithub ? 'animate-spin' : ''}`} />
                  <span>{syncingGithub ? 'Proses Sync...' : 'Sync GitHub Sekarang'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 font-mono text-center">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xl font-extrabold text-emerald-400">{githubForm.totalRepos || 0}</div>
                <div className="text-[11px] text-slate-400">Total Public Repos</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xl font-extrabold text-amber-400">{githubForm.stars || 0}</div>
                <div className="text-[11px] text-slate-400">Total Stars</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xl font-extrabold text-blue-400">{githubForm.followers || 0}</div>
                <div className="text-[11px] text-slate-400">Followers</div>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};

