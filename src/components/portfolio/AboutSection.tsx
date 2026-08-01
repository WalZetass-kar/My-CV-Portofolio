import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Target, Compass, Heart, FolderCheck, Clock, Cpu, GitCommit } from 'lucide-react';
import { motion } from 'motion/react';
import { PhotoShowcase3D } from '../3d/PhotoShowcase3D';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about, hero } = data;

  const photosList = about.photoGallery && about.photoGallery.length > 0
    ? about.photoGallery
    : [
        about.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        about.profileImageSecondary || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
      ];

  const [counter, setCounter] = useState({
    projects: 0,
    experience: 0,
    tech: 0,
    github: 0
  });

  // Animated counter
  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      setCounter({
        projects: Math.floor(progress * (about.stats?.totalProjects || 18)),
        experience: Math.floor(progress * (about.stats?.yearsExperience || 4)),
        tech: Math.floor(progress * (about.stats?.technologiesCount || 24)),
        github: Math.floor(progress * (about.stats?.githubContributions || 1420))
      });

      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [about.stats]);

  return (
    <section id="about" className="py-24 lg:py-28 bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-2">
            PROFIL &amp; RINGKASAN
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {about.title || 'Tentang Saya'}
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {about.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Main Layout: Left = Biography & Photo, Right = 4 Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Biography & Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="bg-white p-8 rounded-[20px] border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl text-slate-900">
                    Latar Belakang &amp; Visi
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">Software Engineer &amp; AI Builder</span>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {about.bioParagraphs && about.bioParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-100 text-slate-800 text-xs sm:text-sm">
                <span className="font-bold text-emerald-900 block mb-1">Passion Utama:</span>
                <p className="text-slate-700 italic">"{about.passion}"</p>
              </div>
            </div>

            {/* Focus & Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[20px] border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <Target className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h5 className="font-heading font-bold text-slate-900 text-base">Fokus Utama</h5>
                </div>
                <ul className="space-y-2">
                  {about.focus && about.focus.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-[20px] border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <Compass className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h5 className="font-heading font-bold text-slate-900 text-base">Aspirasi Karir</h5>
                </div>
                <ul className="space-y-2">
                  {about.goals && about.goals.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column - 4 White Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-[20px] border border-slate-200/80 shadow-xs flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <FolderCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-3xl text-slate-900 block">
                  {counter.projects}+
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Project Selesai
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-[20px] border border-slate-200/80 shadow-xs flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-3xl text-slate-900 block">
                  {counter.experience}+ Tahun
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Pengalaman
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-[20px] border border-slate-200/80 shadow-xs flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-3xl text-slate-900 block">
                  {counter.tech}+
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Teknologi &amp; Tools
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-[20px] border border-slate-200/80 shadow-xs flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <GitCommit className="w-7 h-7" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-3xl text-slate-900 block">
                  {counter.github}+
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  GitHub Contributions
                </span>
              </div>
            </motion.div>

            {/* Photo Preview Mini Box */}
            <div className="pt-2 flex justify-center">
              <PhotoShowcase3D
                photos={photosList}
                badgeText={about.avatarBadgeText || 'Full Stack Builder'}
                frameStyle="3d-glass"
                name={hero.name || 'M. Ihwal Maulana'}
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

