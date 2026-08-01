import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ResumeVersion } from '../../types';
import { api } from '../../services/api';
import { Save, Upload, FileText, Download, CheckCircle2, Trash2 } from 'lucide-react';

export const ResumeManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [resumesList, setResumesList] = useState<ResumeVersion[]>(data.resumes || []);
  const [versionInput, setVersionInput] = useState('v2.5');
  const [titleInput, setTitleInput] = useState('M_Ihwal_Maulana_Resume.pdf');
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadFile(file, 'Documents');
      if (res.success) {
        const newResume: ResumeVersion = {
          id: 'res-' + Date.now(),
          version: versionInput || 'v2.5',
          title: file.name,
          uploadDate: new Date().toISOString().split('T')[0],
          downloadCount: 0,
          pdfUrl: res.url,
          isActive: true
        };

        // Set others to inactive
        const updated = [newResume, ...resumesList.map((r) => ({ ...r, isActive: false }))];
        setResumesList(updated);
        await updatePartial('resumes', updated, `Resume versi ${newResume.version} berhasil diunggah.`);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const setActiveResume = async (id: string) => {
    const updated = resumesList.map((r) => ({ ...r, isActive: r.id === id }));
    setResumesList(updated);
    await updatePartial('resumes', updated, 'Versi Resume aktif diubah.');
  };

  const deleteResume = async (id: string) => {
    const updated = resumesList.filter((r) => r.id !== id);
    setResumesList(updated);
    await updatePartial('resumes', updated, 'Versi Resume dihapus.');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Resume Manager</h3>
          <p className="text-slate-400 text-xs">Unggah berkas CV/Resume PDF terbaru, versi dokumen, dan pantau statistik unduhan.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Versi Resume terbaru berhasil disimpan!</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>Unggah Resume Baru (PDF)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Tag Versi Dokumen</label>
            <input
              type="text"
              value={versionInput}
              onChange={(e) => setVersionInput(e.target.value)}
              placeholder="v2.5 (Terbaru)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Pilih File PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:text-white file:font-semibold hover:file:bg-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Resume Versions History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-300">
          Riwayat Versi Resume ({resumesList.length})
        </div>
        <div className="divide-y divide-slate-800">
          {resumesList.map((res) => (
            <div key={res.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-800/40">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${res.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{res.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-emerald-400 font-mono">
                      {res.version}
                    </span>
                    {res.isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">
                        AKTIF DI WEBSITE
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Diunggah: {res.uploadDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-300 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{res.downloadCount} kali diunduh</span>
                </div>

                {!res.isActive && (
                  <button
                    onClick={() => setActiveResume(res.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Aktifkan Versi Ini
                  </button>
                )}

                <button
                  onClick={() => deleteResume(res.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400"
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
