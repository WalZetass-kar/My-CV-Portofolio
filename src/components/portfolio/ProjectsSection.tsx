import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { ExternalLink, Github, FolderGit2, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard3D } from '../3d/TiltCard3D';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set((projects || []).map((p) => p.category)))];

  const filteredProjects = (projects || [])
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-24 lg:py-28 bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-2">
            PORTFOLIO PROYEK
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Proyek Pilihan &amp; Karya Terbaik
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Kumpulan aplikasi web modern, platform AI generatif, dan sistem enterprise yang dikembangkan dengan standar rekayasa teruji.
          </p>
        </motion.div>

        {/* Categories */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white rounded-[20px] overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-full"
            >
              <div>
                {/* Thumbnail Image Header */}
                <div
                  className="relative aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category & Status Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 border border-slate-200/80 shadow-2xs">
                      {project.category}
                    </span>
                    {project.isFeatured && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-2xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-mono">{project.year}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {project.status}
                    </span>
                  </div>

                  <h4
                    onClick={() => setSelectedProject(project)}
                    className="font-heading font-bold text-slate-900 text-xl mb-2 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h4>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  Detail Proyek &rarr;
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Lihat Kode Source GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title="Buka Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 p-6 sm:p-8 relative text-slate-900"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">{selectedProject.year}</span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mb-4">
                {selectedProject.title}
              </h3>

              <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Deskripsi Lengkap</h4>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3">Teknologi Digunakan</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100">
                {selectedProject.liveDemoUrl && (
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors"
                  >
                    <span>Kunjungi Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Lihat Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
