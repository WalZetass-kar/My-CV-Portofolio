import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X, FileText, Settings, ShieldCheck, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, setIsAdminOpen, isAuthenticated, activeSection, setActiveSection } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, navigation, resumes } = data;
  const activeResume = resumes.find((r) => r.isActive) || resumes[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const visibleNav = (navigation || [])
    .filter((nav) => nav.isVisible)
    .sort((a, b) => a.order - b.order);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    if (activeResume) {
      window.open(activeResume.pdfUrl, '_blank');
      fetch('/api/public/resume/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: activeResume.id })
      }).catch(() => {});
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border border-slate-200/90 py-2.5 px-4 sm:px-6'
          : 'bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-2xs py-3 px-4 sm:px-6'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-heading font-bold text-sm flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
              {(theme.logoText || 'M')[0]}
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-emerald-600 transition-colors">
                {theme.logoText || 'M. Ihwal Maulana'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/60 p-1 rounded-full border border-slate-200/50">
            {visibleNav.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-emerald-600 font-medium'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Resume Button */}
            {activeResume && (
              <button
                onClick={handleResumeDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-800 text-xs font-semibold border border-slate-200/90 hover:bg-slate-50 transition-all duration-200 shadow-2xs group active:scale-95 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600 group-hover:rotate-6 transition-transform" />
                <span>Resume</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden max-w-6xl mx-auto mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {visibleNav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {activeResume && (
                <button
                  onClick={handleResumeDownload}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600"
                >
                  <FileText className="w-4 h-4" />
                  <span>Unduh Resume (PDF)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
