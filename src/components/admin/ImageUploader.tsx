import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Link, Check, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Upload / Pilih Foto',
  placeholder = 'Atau tempel URL gambar (https://...)',
  aspectRatio = 'auto',
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  const [isDragging, setIsDragging] = useState(false);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar yang valid (PNG, JPG, WEBP, SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            {label}
          </label>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeTab === 'upload' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'hover:text-white'
              }`}
            >
              Berkas Lokal
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeTab === 'url' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'hover:text-white'
              }`}
            >
              URL Link
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Preview or Dropzone */}
      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2">
          <div className={`relative w-full rounded-xl overflow-hidden bg-slate-900 ${
            aspectRatio === 'square' ? 'aspect-square' : aspectRatio === 'video' ? 'aspect-video' : 'max-h-64'
          }`}>
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-full object-contain mx-auto"
            />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Ganti Gambar</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white cursor-pointer"
                title="Hapus Gambar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 px-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="truncate max-w-[220px]">
              {value.startsWith('data:') ? '📁 Local Upload (Data URL)' : value}
            </span>
            <span className="text-emerald-400 flex items-center gap-1 shrink-0">
              <Check className="w-3 h-3" /> Ready
            </span>
          </div>
        </div>
      ) : activeTab === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900/60'
          }`}
        >
          <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shadow-inner">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">
              Klik atau tarik foto ke sini untuk upload
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Mendukung PNG, JPG, WEBP, SVG (Maks 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-emerald-500 font-mono"
            />
          </div>
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Terapkan URL
          </button>
        </div>
      )}
    </div>
  );
};
