import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/portfolio/HeroSection';
import { AboutSection } from '../components/portfolio/AboutSection';
import { SkillsSection } from '../components/portfolio/SkillsSection';
import { ProjectsSection } from '../components/portfolio/ProjectsSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { TechStackSection } from '../components/portfolio/TechStackSection';
import { GithubSection } from '../components/portfolio/GithubSection';
import { ContactSection } from '../components/portfolio/ContactSection';
import { FloatingParticles3D } from '../components/3d/FloatingParticles3D';
import { AiAssistantChatbot } from '../components/portfolio/AiAssistantChatbot';
import { CertificationsSection } from '../components/portfolio/CertificationsSection';
import { SectionKey } from '../types';
import { Wrench, Shield, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { data, isAuthenticated, isAdminOpen, setIsAdminOpen } = usePortfolio();

  // Maintenance mode screen check
  if (data.settings.maintenanceMode && !isAuthenticated && !isAdminOpen) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <FloatingParticles3D />
        <div className="relative z-10 max-w-lg mx-auto bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-8 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-8 h-8 animate-bounce" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl mb-3 text-white">
            Situs Sedang Dalam Pemeliharaan
          </h1>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Kami sedang melakukan pembaruan berkala pada sistem dan konten portfolio. Silakan kembali lagi nanti.
          </p>
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20"
          >
            <Shield className="w-4 h-4" />
            <span>Login Portal Admin</span>
          </button>
        </div>
      </div>
    );
  }

  // Section Mapping
  const sectionMap: Record<SectionKey, React.ReactNode> = {
    hero: <HeroSection key="hero" />,
    about: <AboutSection key="about" />,
    skills: <SkillsSection key="skills" />,
    projects: <ProjectsSection key="projects" />,
    certifications: <CertificationsSection key="certifications" />,
    experience: <ExperienceSection key="experience" />,
    blogs: null,
    techstack: <TechStackSection key="techstack" />,
    github: <GithubSection key="github" />,
    contact: <ContactSection key="contact" />
  };

  // Sections ordered by CMS configuration
  const orderedSections = (data.layoutSections || [])
    .filter((sec) => sec.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* 3D Floating Particle Field */}
      <FloatingParticles3D />

      {/* Main Header Navbar */}
      <Navbar />

      {/* Dynamic Ordered Portfolio Sections */}
      <main className="flex-1 relative z-10">
        {orderedSections.map((sec) => sectionMap[sec.sectionKey])}
      </main>

      {/* Interactive AI Floating Chatbot */}
      <AiAssistantChatbot />

      {/* Main Footer */}
      <Footer />
    </div>
  );
};

