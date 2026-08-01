import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Experience, Education } from '../../types';
import { Save, Plus, Trash2, Edit2, CheckCircle2, GraduationCap, Briefcase } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const ExperienceManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  // Work Experiences State
  const [experiences, setExperiences] = useState<Experience[]>(data.experiences || []);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  // Educations State
  const [educations, setEducations] = useState<Education[]>(data.educations || []);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [saved, setSaved] = useState(false);

  // Experience Form
  const [expForm, setExpForm] = useState<Partial<Experience>>({
    role: '',
    company: '',
    companyLogo: '',
    period: '2024 - Sekarang',
    location: 'Remote / Indonesia',
    description: '',
    isCurrent: true
  });

  // Education Form
  const [eduForm, setEduForm] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    logo: '',
    period: '2020 - 2024',
    location: 'Indonesia',
    grade: '',
    description: ''
  });

  const handleSaveAll = async () => {
    await updatePartial('experiences', experiences, 'Work Experiences updated.');
    await updatePartial('educations', educations, 'Educations updated.');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Add/Update Experience
  const handleAddOrUpdateExp = () => {
    if (!expForm.role?.trim() || !expForm.company?.trim()) return;

    if (editingExp) {
      setExperiences(
        experiences.map((e) => (e.id === editingExp.id ? ({ ...e, ...expForm } as Experience) : e))
      );
      setEditingExp(null);
    } else {
      const newExp: Experience = {
        id: 'exp-' + Date.now(),
        role: expForm.role.trim(),
        company: expForm.company.trim(),
        companyLogo: expForm.companyLogo || '',
        period: expForm.period || '2024 - Sekarang',
        location: expForm.location || 'Indonesia',
        description: expForm.description || '',
        highlights: expForm.highlights || [],
        isCurrent: expForm.isCurrent !== false,
        order: experiences.length + 1
      };
      setExperiences([...experiences, newExp]);
    }

    setExpForm({ role: '', company: '', companyLogo: '', period: '2024 - Sekarang', location: 'Remote / Indonesia', description: '', isCurrent: true });
  };

  // Add/Update Education
  const handleAddOrUpdateEdu = () => {
    if (!eduForm.institution?.trim() || !eduForm.degree?.trim()) return;

    if (editingEdu) {
      setEducations(
        educations.map((e) => (e.id === editingEdu.id ? ({ ...e, ...eduForm } as Education) : e))
      );
      setEditingEdu(null);
    } else {
      const newEdu: Education = {
        id: 'edu-' + Date.now(),
        institution: eduForm.institution.trim(),
        degree: eduForm.degree.trim(),
        logo: eduForm.logo || '',
        period: eduForm.period || '2020 - 2024',
        location: eduForm.location || 'Indonesia',
        grade: eduForm.grade || '',
        description: eduForm.description || '',
        activities: eduForm.activities || [],
        order: educations.length + 1
      };
      setEducations([...educations, newEdu]);
    }

    setEduForm({ institution: '', degree: '', logo: '', period: '2020 - 2024', location: 'Indonesia', grade: '', description: '' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Experience &amp; Education Manager</h3>
          <p className="text-slate-400 text-xs">Kelola riwayat karir profesional dan riwayat sekolah/pendidikan formal.</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Riwayat Kerja &amp; Pendidikan berhasil disimpan!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('work')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'work'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Pengalaman Kerja ({experiences.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('education')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'education'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Riwayat Sekolah &amp; Pendidikan ({educations.length})</span>
        </button>
      </div>

      {activeTab === 'work' ? (
        /* WORK EXPERIENCE CMS */
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h4 className="font-heading font-bold text-sm text-white">
              {editingExp ? 'Edit Pengalaman Kerja' : 'Tambah Pengalaman Kerja Baru'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Posisi / Role *</label>
                <input
                  type="text"
                  value={expForm.role || ''}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  placeholder="Full Stack Developer, Lead Engineer..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Nama Perusahaan *</label>
                <input
                  type="text"
                  value={expForm.company || ''}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  placeholder="PT Tech Innovation..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <ImageUploader
              label="Logo Perusahaan / Perusahaan (Opsional)"
              value={expForm.companyLogo || ''}
              onChange={(url) => setExpForm({ ...expForm, companyLogo: url })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Periode Kerja</label>
                <input
                  type="text"
                  value={expForm.period || ''}
                  onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                  placeholder="2024 - Sekarang"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Lokasi</label>
                <input
                  type="text"
                  value={expForm.location || ''}
                  onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                  placeholder="Jakarta / Remote"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Deskripsi Ringkas</label>
              <textarea
                rows={2}
                value={expForm.description || ''}
                onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddOrUpdateExp}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
              >
                {editingExp ? 'Perbarui Pengalaman' : 'Tambah Pengalaman'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-800/40">
                <div className="flex items-center gap-3">
                  {exp.companyLogo ? (
                    <img src={exp.companyLogo} alt={exp.company} className="w-8 h-8 rounded-lg object-contain bg-slate-950 p-1 border border-slate-800" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center">
                      {exp.company[0]}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-white text-sm">{exp.role} @ {exp.company}</div>
                    <div className="text-slate-400 text-xs">{exp.period} • {exp.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingExp(exp);
                      setExpForm(exp);
                    }}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      const updated = experiences.filter((e) => e.id !== exp.id);
                      setExperiences(updated);
                      await updatePartial('experiences', updated, 'Work Experience item deleted.');
                    }}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    title="Hapus Pengalaman"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* EDUCATION / SCHOOL HISTORY CMS */
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h4 className="font-heading font-bold text-sm text-white">
              {editingEdu ? 'Edit Riwayat Sekolah / Pendidikan' : 'Tambah Sekolah Lama / Perguruan Tinggi'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Nama Sekolah / Universitas *
                </label>
                <input
                  type="text"
                  value={eduForm.institution || ''}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  placeholder="SMK Negeri 1 / Universitas Indonesia..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Jurusan / Tingkat Pendidikan *
                </label>
                <input
                  type="text"
                  value={eduForm.degree || ''}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  placeholder="Rekayasa Perangkat Lunak (RPL) / S1 Teknik Informatika..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <ImageUploader
              label="Logo Sekolah / Universitas (Opsional)"
              value={eduForm.logo || ''}
              onChange={(url) => setEduForm({ ...eduForm, logo: url })}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Tahun / Periode</label>
                <input
                  type="text"
                  value={eduForm.period || ''}
                  onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                  placeholder="2017 - 2020"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">IPK / Nilai / Predikat</label>
                <input
                  type="text"
                  value={eduForm.grade || ''}
                  onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                  placeholder="IPK 3.88 / Cum Laude / Lulusan Terbaik"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Lokasi</label>
                <input
                  type="text"
                  value={eduForm.location || ''}
                  onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                  placeholder="Indonesia"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Deskripsi Ringkas Studi</label>
              <textarea
                rows={2}
                value={eduForm.description || ''}
                onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                placeholder="Fokus studi, materi pembelajaran utama..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddOrUpdateEdu}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
              >
                {editingEdu ? 'Perbarui Sekolah' : 'Tambah Sekolah'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800">
            {educations.map((edu) => (
              <div key={edu.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-800/40">
                <div className="flex items-center gap-3">
                  {edu.logo ? (
                    <img src={edu.logo} alt={edu.institution} className="w-8 h-8 rounded-lg object-contain bg-slate-950 p-1 border border-slate-800" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center">
                      {edu.institution[0]}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-white text-sm">{edu.institution} ({edu.degree})</div>
                    <div className="text-slate-400 text-xs">{edu.period} • {edu.grade || edu.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingEdu(edu);
                      setEduForm(edu);
                    }}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      const updated = educations.filter((e) => e.id !== edu.id);
                      setEducations(updated);
                      await updatePartial('educations', updated, 'Education item deleted.');
                    }}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    title="Hapus Sekolah/Pendidikan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

