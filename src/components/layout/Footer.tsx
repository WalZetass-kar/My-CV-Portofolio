import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUp, Github, Linkedin, Mail, MessageSquare, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { contact, settings, theme } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-600 py-12 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60">
          {/* Left Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#hero" className="font-heading font-bold text-slate-900 text-xl tracking-tight mb-1 hover:text-emerald-600 transition-colors">
              {theme.logoText || 'M. Ihwal Maulana'}
            </a>
            <p className="text-xs text-slate-500 max-w-md">
              Full Stack Developer &amp; AI Application Builder. Membangun produk perangkat lunak modern, intuitif, dan terpercaya.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            )}
            {contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {contact.x && (
              <a
                href={contact.x}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            {settings.footerText || `© ${new Date().getFullYear()} M. Ihwal Maulana. All rights reserved.`}
          </div>

          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live CMS Active
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
