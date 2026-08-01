import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaItem } from '../../types';
import { api } from '../../services/api';
import { Upload, Search, Copy, Check, Trash2, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [mediaList, setMediaList] = useState<MediaItem[]>(data.media || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const folders = ['All', ...Array.from(new Set(mediaList.map((m) => m.folder)))];

  const filteredMedia = mediaList
    .filter((m) => selectedFolder === 'All' || m.folder === selectedFolder)
    .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadFile(file, selectedFolder === 'All' ? 'General' : selectedFolder);
      if (res.success && res.media) {
        const updated = [res.media, ...mediaList];
        setMediaList(updated);
        await updatePartial('media', updated, `Media ${file.name} diunggah.`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteMedia = async (id: string) => {
    const updated = mediaList.filter((m) => m.id !== id);
    setMediaList(updated);
    await updatePartial('media', updated, 'Media item dihapus.');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Media Library</h3>
          <p className="text-slate-400 text-xs">Kelola aset gambar, logo, ikon, dan dokumen PDF.</p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer shadow-sm self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Mengunggah...' : 'Upload Media Baru'}</span>
          <input type="file" onChange={handleFileUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berkas media..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white"
          />
        </div>

        <div className="flex gap-2">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                selectedFolder === f ? 'bg-emerald-500 text-white font-semibold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredMedia.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group p-3 flex flex-col justify-between">
            <div className="aspect-square bg-slate-950 rounded-xl overflow-hidden mb-3 flex items-center justify-center relative">
              {m.fileType === 'image' ? (
                <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
              ) : (
                <FileText className="w-10 h-10 text-emerald-400" />
              )}
            </div>

            <div>
              <div className="font-bold text-white text-xs truncate mb-1" title={m.name}>
                {m.name}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-3">
                <span>{(m.size / 1024).toFixed(0)} KB</span>
                <span>{m.uploadedAt}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => copyUrl(m.id, m.url)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 text-[10px] flex items-center gap-1 font-mono"
              >
                {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>URL</span>
              </button>

              <button
                onClick={() => deleteMedia(m.id)}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
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
