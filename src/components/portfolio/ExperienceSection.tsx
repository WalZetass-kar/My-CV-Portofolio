import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard3D } from '../3d/TiltCard3D';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const { experiences, educations } = data;
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  const sortedExperiences = (experiences || []).sort((a, b) => a.order - b.order);
  const sortedEducations = (educations || []).sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-24 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-2">
            REKAM JEJAK &amp; AKADEMIK
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Pengalaman &amp; Riwayat Pendidikan
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Perjalanan profesional dan latar belakang pendidikan formal/non-formal yang melandasi keahlian rekayasa perangkat lunak.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200/80">
            <button
              onClick={() => setActiveTab('work')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'work'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Pengalaman Kerja ({sortedExperiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Riwayat Pendidikan ({sortedEducations.length})</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'work' ? (
            <motion.div
              key="work-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10"
            >
              {sortedExperiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Bullet Point */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-0 w-8 h-8 rounded-full bg-white border-2 border-emerald-500 shadow-2xs flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-200">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {/* Experience Card */}
                  <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/90 hover:border-emerald-500 shadow-xs transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div className="flex items-start gap-3">
                        {exp.companyLogo ? (
                          <img src={exp.companyLogo} alt={exp.company} className="w-10 h-10 rounded-xl object-contain bg-slate-50 p-1.5 border border-slate-200 shadow-2xs mt-0.5" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {exp.company[0]}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-heading font-bold text-slate-900 text-xl">
                              {exp.role}
                            </h4>
                            {exp.isCurrent && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                Aktif
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
                            <Building2 className="w-4 h-4 text-emerald-600" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-mono bg-slate-50 px-3 py-1 rounded-full border border-slate-200/80">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="pt-4 border-t border-slate-100">
                        <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Pencapaian Utama:
                        </h5>
                        <ul className="space-y-1.5">
                          {exp.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10"
            >
              {sortedEducations.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Bullet Point */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-0 w-8 h-8 rounded-full bg-white border-2 border-emerald-500 shadow-2xs flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-200">
                    <GraduationCap className="w-4 h-4" />
                  </div>

                  {/* Education Card */}
                  <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/90 hover:border-emerald-500 shadow-xs transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div className="flex items-start gap-3">
                        {edu.logo ? (
                          <img src={edu.logo} alt={edu.institution} className="w-10 h-10 rounded-xl object-contain bg-slate-50 p-1.5 border border-slate-200 shadow-2xs mt-0.5" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {edu.institution[0]}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-heading font-bold text-slate-900 text-xl">
                              {edu.institution}
                            </h4>
                            {edu.grade && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {edu.grade}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                            <BookOpen className="w-4 h-4" />
                            <span>{edu.degree}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-mono bg-slate-50 px-3 py-1 rounded-full border border-slate-200/80">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {edu.description && (
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {edu.description}
                      </p>
                    )}

                    {/* Activities / Achievements */}
                    {edu.activities && edu.activities.length > 0 && (
                      <div className="pt-4 border-t border-slate-100">
                        <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Kegiatan &amp; Prestasi Akademik:
                        </h5>
                        <ul className="space-y-1.5">
                          {edu.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

