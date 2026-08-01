import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Mail, CheckCircle2, Star, Layers, Cpu, Code2, Globe, Terminal, ExternalLink, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const { hero, about, projects, contact } = data;

  const [laptopView, setLaptopView] = useState<'about' | 'preview' | 'code' | 'tech'>('about');
  const [rotate, setRotate] = useState({ x: 18, y: -8 });

  const featuredProject = projects.find((p) => p.isFeatured) || projects[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt angles
    const rotateX = 18 - ((y - centerY) / centerY) * 10;
    const rotateY = -8 + ((x - centerX) / centerX) * 14;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 18, y: -8 });
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Intro & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Status Pill */}
            {hero.isAvailableForHire && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 mb-6 shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-800">Available for new projects &amp; roles</span>
              </div>
            )}

            {/* Greeting */}
            <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase mb-2">
              {hero.greeting || 'Halo, Saya'}
            </span>

            {/* Name */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-4">
              {hero.name || 'M. Ihwal Maulana'}
            </h1>

            {/* Job Title & Subtitle */}
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700 mb-5">
              <span className="text-emerald-600">{hero.title || 'Full Stack Developer'}</span>
              <span className="text-slate-400 font-light mx-2">&amp;</span>
              <span className="text-slate-900">{hero.subtitle || 'AI Application Builder'}</span>
            </h2>

            {/* Short Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              {hero.description}
            </p>

            {/* Badges */}
            {hero.badges && hero.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {hero.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('#projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 group active:scale-95 cursor-pointer"
              >
                <span>{hero.primaryCtaText || 'Lihat Portfolio'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>{hero.secondaryCtaText || 'Hubungi Saya'}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column - Prominent Realistic 3D Laptop Mockup & Interactive Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col items-center justify-center w-full relative pt-4 pb-8"
            style={{ perspective: '1000px' }}
          >
            {/* Soft Ambient Desktop Glow behind Laptop */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-slate-200/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* Laptop Stand / Whole Body Container with Interactive 3D Tilt & Gentle Idle Floating Animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-xl mx-auto group transition-transform duration-200 ease-out transform-gpu"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              
              {/* LAPTOP DISPLAY TOP LID FRAME (3D Space Gray Metallic Aluminum Bezel with Chamfered Edges) */}
              <div className="relative rounded-t-[24px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 p-3.5 sm:p-4 shadow-[0_30px_70px_rgba(0,0,0,0.7)] border-t-2 border-x-2 border-slate-500/80 ring-1 ring-white/20">
                {/* Physical Metallic Highlight / Gloss Bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-[24px] pointer-events-none z-30"></div>
                
                {/* Camera Notch & Sensor Light */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-b-xl flex items-center justify-center gap-2 z-40 border-b border-x border-slate-800 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <span className="w-0.5 h-0.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-800"></div>
                </div>

                {/* LAPTOP SCREEN BEZEL & DISPLAY (With Inner Display Depth Shadow) */}
                <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800/90 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] relative flex flex-col aspect-[16/10]">
                  
                  {/* Subtle Inner Glass Screen Depth Shadow Overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_8px_20px_rgba(0,0,0,0.85)] z-30 pointer-events-none rounded-xl border border-black/40"></div>

                  {/* Browser / OS Window Header Bar */}
                  <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
                    {/* Window Controls */}
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block shadow-xs"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/90 inline-block shadow-xs"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/90 inline-block shadow-xs"></span>
                    </div>

                    {/* Interactive Tab Controls on Screen */}
                    <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800/80 text-[10px] sm:text-[11px] overflow-x-auto">
                      <button
                        onClick={() => setLaptopView('about')}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                          laptopView === 'about'
                            ? 'bg-emerald-500 text-white font-bold shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <User className="w-3 h-3" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => setLaptopView('preview')}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                          laptopView === 'preview'
                            ? 'bg-emerald-500 text-white font-bold shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Globe className="w-3 h-3" />
                        <span>Project</span>
                      </button>

                      <button
                        onClick={() => setLaptopView('code')}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                          laptopView === 'code'
                            ? 'bg-emerald-500 text-white font-bold shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Code2 className="w-3 h-3" />
                        <span>Source</span>
                      </button>

                      <button
                        onClick={() => setLaptopView('tech')}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                          laptopView === 'tech'
                            ? 'bg-emerald-500 text-white font-bold shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Terminal className="w-3 h-3" />
                        <span>Stack</span>
                      </button>
                    </div>

                    {/* Live Badge */}
                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Admin Live</span>
                    </div>
                  </div>

                  {/* SCREEN INNER CONTENT AREA */}
                  <div className="relative flex-1 bg-slate-950 overflow-hidden text-slate-100">
                    
                    {/* View 0: Dynamic Profile & Explanation View (Synced directly with Admin Panel) */}
                    {laptopView === 'about' && (
                      <div className="p-3.5 sm:p-4 bg-slate-950 h-full flex flex-col justify-between overflow-y-auto custom-scrollbar">
                        {/* Profile Header */}
                        <div className="flex items-center gap-3 pb-2.5 border-b border-slate-800/80 shrink-0">
                          <div className="relative shrink-0">
                            <img
                              src={about.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
                              alt={hero.name}
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-emerald-500/40 shadow-sm"
                            />
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-heading font-bold text-xs sm:text-sm text-white truncate">
                                {hero.name || 'M. Ihwal Maulana'}
                              </h3>
                              <span className="text-[9px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800/80 font-mono shrink-0">
                                {hero.isAvailableForHire ? 'Available' : 'Busy'}
                              </span>
                            </div>
                            <p className="text-[11px] text-emerald-400 font-medium truncate">
                              {hero.title || 'Full Stack Developer'} {hero.subtitle ? `• ${hero.subtitle}` : ''}
                            </p>
                          </div>
                        </div>

                        {/* Dynamic Description & Explanation from Admin */}
                        <div className="my-2 space-y-1.5 flex-1 min-h-0 flex flex-col justify-center">
                          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[9px] text-emerald-400">
                              <Sparkles className="w-3 h-3 text-emerald-400" />
                              <span>Profil &amp; Penjelasan Info</span>
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400/80">Terhubung Admin</span>
                          </div>

                          <div className="bg-slate-900/90 p-2.5 sm:p-3 rounded-lg border border-slate-800/90 shadow-inner">
                            <p className="text-[11px] text-slate-200 leading-relaxed line-clamp-3">
                              {hero.description || (about.bioParagraphs && about.bioParagraphs[0]) || 'Deskripsi profil pengguna dari layar Admin.'}
                            </p>
                          </div>

                          {/* Focus, Badges & Contact Info from Admin */}
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {contact.email && (
                              <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80 truncate max-w-[150px]">
                                ✉️ {contact.email}
                              </span>
                            )}
                            {contact.location && (
                              <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80 truncate max-w-[130px]">
                                📍 {contact.location}
                              </span>
                            )}
                            {(about.focus || hero.badges || []).slice(0, 2).map((badge, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[120px]"
                              >
                                #{badge}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Admin Stats Counter Row */}
                        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80 text-center shrink-0">
                          <div className="bg-slate-900/70 p-1 rounded-md border border-slate-800/80">
                            <div className="text-xs font-bold text-emerald-400">{about.stats?.totalProjects || projects.length}</div>
                            <div className="text-[8px] text-slate-400 uppercase tracking-tight">Proyek</div>
                          </div>
                          <div className="bg-slate-900/70 p-1 rounded-md border border-slate-800/80">
                            <div className="text-xs font-bold text-teal-300">{about.stats?.yearsExperience || 3}+ Thn</div>
                            <div className="text-[8px] text-slate-400 uppercase tracking-tight">Pengalaman</div>
                          </div>
                          <div className="bg-slate-900/70 p-1 rounded-md border border-slate-800/80">
                            <div className="text-xs font-bold text-emerald-300">{about.stats?.technologiesCount || 15}+</div>
                            <div className="text-[8px] text-slate-400 uppercase tracking-tight">Tech Stack</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View 1: Featured Project Live Preview */}
                    {laptopView === 'preview' && (
                      <div className="relative w-full h-full group/screen overflow-hidden">
                        {featuredProject ? (
                          <>
                            <img
                              src={featuredProject.thumbnail}
                              alt={featuredProject.title}
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/screen:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-4 sm:p-5 z-10">
                              <div className="w-full flex items-end justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500 text-white">
                                      Featured Project
                                    </span>
                                    <span className="text-[11px] font-mono text-emerald-300">
                                      {featuredProject.year || '2025'}
                                    </span>
                                  </div>
                                  <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                                    {featuredProject.title}
                                  </h4>
                                  <p className="text-xs text-slate-300 line-clamp-1 max-w-sm">
                                    {featuredProject.description}
                                  </p>
                                </div>

                                {featuredProject.liveDemoUrl && (
                                  <a
                                    href={featuredProject.liveDemoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors"
                                  >
                                    <span>Demo</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="p-6 bg-slate-900 h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                              <div className="font-heading font-bold text-white text-sm">Enterprise Web Platform</div>
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30">Active v2.4</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 my-2">
                              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                                <div className="text-[11px] text-slate-400">System Performance</div>
                                <div className="text-base font-bold text-emerald-400">99.9% Uptime</div>
                              </div>
                              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                                <div className="text-[11px] text-emerald-400 font-medium">AI Intelligence</div>
                                <div className="text-base font-bold text-emerald-300">Gemini Powered</div>
                              </div>
                            </div>
                            <div className="text-[11px] text-slate-400 text-center font-mono">React 18 • TypeScript • Tailwind CSS • Vite</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* View 2: Live VS Code Snippet View with Typing Animation */}
                    {laptopView === 'code' && (
                      <div className="p-3.5 sm:p-4 bg-[#0d1117] h-full font-mono text-[11px] sm:text-xs overflow-hidden flex flex-col justify-between text-slate-200">
                        {/* VSCode Tab Header */}
                        <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/90 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                            <span className="text-emerald-400 font-semibold font-mono">App.tsx — PortfolioEngine</span>
                          </div>
                          <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">TypeScript React</span>
                        </div>

                        {/* Editor Code View with Line Numbers */}
                        <div className="space-y-1 py-2 font-mono leading-relaxed overflow-hidden text-[10px] sm:text-[11px]">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">1</span>
                            <p><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">'react'</span>;</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">2</span>
                            <p><span className="text-purple-400">import</span> &#123; GoogleGenAI &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@google/genai'</span>;</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">3</span>
                            <p><span className="text-blue-400">export const</span> <span className="text-yellow-300">DeveloperProfile</span> = () =&gt; &#123;</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">4</span>
                            <p className="pl-4"><span className="text-blue-300">const</span> developer = <span className="text-emerald-300">"{hero.name || 'M. Ihwal Maulana'}"</span>;</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">5</span>
                            <p className="pl-4"><span className="text-blue-300">const</span> status = <span className="text-emerald-300">"Available for Hire"</span>;</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">6</span>
                            <p className="pl-4"><span className="text-purple-400">return</span> &lt;<span className="text-blue-400">FullStackAIApp</span> role=<span className="text-emerald-300">"{hero.title || 'Full Stack Developer'}"</span> /&gt;;</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 select-none w-4 text-right">7</span>
                            <p>&#125;; <span className="animate-pulse text-emerald-400">▍</span></p>
                          </div>
                        </div>

                        {/* Terminal Footer Status Bar */}
                        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 pt-2 border-t border-slate-800/90 font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">● TypeScript v5.8</span>
                            <span>✔ 0 Errors</span>
                          </div>
                          <span className="text-emerald-400 font-semibold">100% Code Quality</span>
                        </div>
                      </div>
                    )}

                    {/* View 3: Tech Ecosystem View */}
                    {laptopView === 'tech' && (
                      <div className="p-4 bg-slate-900 h-full flex flex-col justify-between">
                        <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 flex justify-between items-center">
                          <span>Developer Tooling Ecosystem</span>
                          <span className="text-[10px] text-emerald-400 font-mono">Modern Stack</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 my-1 text-center">
                          <div className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/80">
                            <div className="text-xs font-bold text-emerald-400">React 18</div>
                            <div className="text-[10px] text-slate-400">Frontend UI</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/80">
                            <div className="text-xs font-bold text-blue-400">TypeScript</div>
                            <div className="text-[10px] text-slate-400">Type Safe</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/80">
                            <div className="text-xs font-bold text-teal-300">Tailwind</div>
                            <div className="text-[10px] text-slate-400">Styling</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/80">
                            <div className="text-xs font-bold text-emerald-300">Node.js</div>
                            <div className="text-[10px] text-slate-400">Backend API</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/80">
                            <div className="text-xs font-bold text-amber-300">Gemini AI</div>
                            <div className="text-[10px] text-slate-400">LLM Logic</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/80">
                            <div className="text-xs font-bold text-purple-300">Vite</div>
                            <div className="text-[10px] text-slate-400">Bundler</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 text-center">Optimized for high responsiveness &amp; clean execution</div>
                      </div>
                    )}

                    {/* Glossy Diagonal Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10"></div>

                  </div>
                </div>

                {/* LAPTOP DISPLAY HINGE CONNECTORS */}
                <div className="relative h-2.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 mx-10 border-x border-slate-700 shadow-md rounded-b-xs"></div>
              </div>

              {/* LAPTOP LOWER BASE & TACTILE KEYBOARD DECK (3D Space Gray Brushed Aluminum Body with 3D Perspective Tilt) */}
              <div 
                className="relative bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 rounded-b-[28px] p-3 sm:p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border-t-2 border-slate-200 ring-1 ring-slate-500/80 -mt-1 origin-top transform-gpu"
                style={{
                  transform: 'rotateX(42deg) translateZ(12px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                
                {/* Side Port Cuts (MagSafe 3, 2x Thunderbolt 4 / USB-C slots, 3.5mm Headphone Jack) */}
                <div className="absolute top-2 -left-1.5 flex flex-col gap-1.5 z-10">
                  <div className="w-1.5 h-3 bg-slate-800 rounded-r-xs border-r border-slate-600 shadow-inner"></div>
                  <div className="w-1.5 h-2 bg-slate-800 rounded-r-xs border-r border-slate-600 shadow-inner"></div>
                  <div className="w-1.5 h-2 bg-slate-800 rounded-r-xs border-r border-slate-600 shadow-inner"></div>
                </div>
                <div className="absolute top-2 -right-1.5 flex flex-col gap-1.5 items-end z-10">
                  <div className="w-1.5 h-2 bg-slate-800 rounded-l-xs border-l border-slate-600 shadow-inner"></div>
                  <div className="w-1.5 h-2.5 bg-slate-800 rounded-l-xs border-l border-slate-600 shadow-inner"></div>
                </div>

                {/* Center Thumb Notch for Lid Opening */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-b from-slate-600 to-slate-700 rounded-b-md shadow-inner border-x border-b border-slate-400 z-10"></div>

                {/* Recessed Backlit Tactile Chiclet Keyboard Well Surface */}
                <div className="w-full bg-slate-950 rounded-xl p-2 sm:p-2.5 shadow-[inset_0_6px_16px_rgba(0,0,0,0.95)] border border-slate-800/90 mb-3 space-y-1 sm:space-y-1.5">
                  
                  {/* Function Keys Row (14 keys) with Tactile Keycap Shadows & Backlight */}
                  <div className="grid grid-cols-14 gap-0.5 sm:gap-1">
                    {['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '⚡'].map((k, i) => (
                      <div
                        key={i}
                        className="h-2.5 sm:h-3.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[2.5px] shadow-[0_2.5px_0_#020617,0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-semibold text-slate-300 hover:text-emerald-400 transition-colors shadow-[0_0_8px_rgba(52,211,153,0.18)]"
                      >
                        {k}
                      </div>
                    ))}
                  </div>

                  {/* Row 1: Numbers & Symbols (14 keys) */}
                  <div className="grid grid-cols-14 gap-0.5 sm:gap-1">
                    {['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'del'].map((k, i) => (
                      <div
                        key={i}
                        className="h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-bold text-slate-200 shadow-[0_0_8px_rgba(52,211,153,0.22)] hover:translate-y-[1px]"
                      >
                        {k}
                      </div>
                    ))}
                  </div>

                  {/* Row 2: Tab + QWERTY */}
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-8 sm:w-10 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold text-slate-400">tab</div>
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k, i) => (
                      <div
                        key={i}
                        className="flex-1 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-bold text-slate-200 shadow-[0_0_8px_rgba(52,211,153,0.22)] hover:translate-y-[1px]"
                      >
                        {k}
                      </div>
                    ))}
                  </div>

                  {/* Row 3: Caps + ASDF + Return */}
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-10 sm:w-12 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold text-slate-400">caps</div>
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"].map((k, i) => (
                      <div
                        key={i}
                        className="flex-1 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-bold text-slate-200 shadow-[0_0_8px_rgba(52,211,153,0.22)] hover:translate-y-[1px]"
                      >
                        {k}
                      </div>
                    ))}
                    <div className="w-11 sm:w-14 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]">return</div>
                  </div>

                  {/* Row 4: Shift + ZXCV + Shift */}
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-12 sm:w-16 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold text-slate-400">shift</div>
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map((k, i) => (
                      <div
                        key={i}
                        className="flex-1 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-bold text-slate-200 shadow-[0_0_8px_rgba(52,211,153,0.22)] hover:translate-y-[1px]"
                      >
                        {k}
                      </div>
                    ))}
                    <div className="w-12 sm:w-16 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold text-slate-400">shift</div>
                  </div>

                  {/* Bottom Row: Control, Option, Command, Spacebar, Command, Option, Arrows */}
                  <div className="flex gap-0.5 sm:gap-1 items-center pt-0.5">
                    <div className="w-7 sm:w-9 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[7px] font-mono text-slate-400">ctrl</div>
                    <div className="w-7 sm:w-9 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[7px] font-mono text-slate-400">opt</div>
                    <div className="w-9 sm:w-11 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[7px] font-mono text-slate-300">cmd</div>
                    
                    {/* Tactile Spacebar with Backlight Beam */}
                    <div className="flex-1 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617,0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                      <span className="w-16 sm:w-24 h-0.5 rounded-full bg-emerald-400/70 shadow-[0_0_6px_#34d399]"></span>
                    </div>

                    <div className="w-9 sm:w-11 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[7px] font-mono text-slate-300">cmd</div>
                    <div className="w-7 sm:w-9 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[7px] font-mono text-slate-400">opt</div>
                    
                    {/* Arrow Keys */}
                    <div className="flex gap-0.5 items-center pl-1">
                      <div className="w-5 sm:w-6 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[8px] text-slate-400">◀</div>
                      <div className="w-5 sm:w-6 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[8px] text-slate-400">▼</div>
                      <div className="w-5 sm:w-6 h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/90 rounded-[3.5px] shadow-[0_3px_0_#020617] flex items-center justify-center text-[8px] text-slate-400">▶</div>
                    </div>
                  </div>

                </div>

                {/* Precision Glass Matte Trackpad */}
                <div className="w-36 sm:w-44 h-8 sm:h-10 mx-auto rounded-xl bg-gradient-to-b from-slate-300/90 via-slate-400/90 to-slate-400/80 border border-slate-400/90 shadow-inner flex items-center justify-center relative">
                  <div className="w-12 h-0.5 bg-slate-400/80 rounded-full"></div>
                  <div className="absolute top-0.5 inset-x-2 h-1 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg pointer-events-none"></div>
                </div>

                {/* 3D Aluminum Base Front/Bottom Thickness Rim */}
                <div className="absolute -bottom-3 left-2 right-2 h-3.5 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-b-[22px] shadow-lg border-t border-slate-500/80 -z-10 flex items-center justify-center">
                  <div className="w-20 h-1 bg-slate-900/60 rounded-full"></div>
                </div>

                {/* Realistic Desk Shadow beneath entire Laptop Base */}
                <div className="w-full h-8 mx-auto bg-slate-950/60 rounded-full blur-2xl mt-2 -z-20"></div>
              </div>

              {/* FLOATING STAT CARD 1: Total Projects (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -25, y: -10 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.3 },
                  y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
                }}
                className="absolute -top-6 -left-4 sm:-left-10 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-[22px] border border-slate-200/90 shadow-xl flex items-center gap-3 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {about.stats?.totalProjects || 12}+ Project Selesai
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Standard Industrial</div>
                </div>
              </motion.div>

              {/* FLOATING STAT CARD 2: Experience (Top Right) */}
              <motion.div
                initial={{ opacity: 0, x: 25, y: -10 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.4 },
                  y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }
                }}
                className="absolute -top-4 -right-4 sm:-right-10 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-[22px] border border-slate-200/90 shadow-xl flex items-center gap-3 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {about.stats?.yearsExperience || 3}+ Tahun Exp
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Full Stack &amp; Web</div>
                </div>
              </motion.div>

              {/* FLOATING STAT CARD 3: Modern Tech Stack (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 },
                  y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.2 }
                }}
                className="absolute -bottom-8 -left-2 sm:-left-8 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-[22px] border border-slate-200/90 shadow-xl flex items-center gap-3 z-30"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    Modern Stack
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">React • TS • Tailwind</div>
                </div>
              </motion.div>

              {/* FLOATING STAT CARD 4: AI Builder (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.6 },
                  y: { repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 0.7 }
                }}
                className="absolute -bottom-8 -right-2 sm:-right-8 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-[22px] border border-slate-200/90 shadow-xl flex items-center gap-3 z-30"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    AI Application
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Gemini &amp; LLM Integration</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


