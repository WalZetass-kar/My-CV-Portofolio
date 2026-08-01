import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AdminGatekeeperAuth } from '../components/admin/AdminGatekeeperAuth';
import { AdminLayout, AdminTab } from '../components/admin/AdminLayout';
import { DashboardOverview } from '../components/admin/DashboardOverview';
import { HeroManager } from '../components/admin/HeroManager';
import { AboutManager } from '../components/admin/AboutManager';
import { SkillManager } from '../components/admin/SkillManager';
import { ProjectManager } from '../components/admin/ProjectManager';
import { ExperienceManager } from '../components/admin/ExperienceManager';
import { TechStackManager } from '../components/admin/TechStackManager';
import { ContactManager } from '../components/admin/ContactManager';
import { ResumeManager } from '../components/admin/ResumeManager';
import { ThemeManager } from '../components/admin/ThemeManager';
import { NavigationManager } from '../components/admin/NavigationManager';
import { LayoutBuilder } from '../components/admin/LayoutBuilder';
import { InboxManager } from '../components/admin/InboxManager';
import { MediaLibrary } from '../components/admin/MediaLibrary';
import { ActivityLogManager } from '../components/admin/ActivityLogManager';
import { SettingsManager } from '../components/admin/SettingsManager';
import { ArrowLeft, ExternalLink, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { isAuthenticated, setIsAdminOpen, data } = usePortfolio();

  if (!isAuthenticated) {
    return <AdminGatekeeperAuth />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Bar Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.location.hash === '#admin' || window.location.pathname === '/4dminLogin') {
                window.history.pushState('', document.title, window.location.pathname === '/4dminLogin' ? '/' : window.location.pathname + window.location.search);
              }
              setIsAdminOpen(false);
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Kembali ke Website</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Portal Admin Authenticated</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Buka Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Full Dedicated Admin Dashboard Content */}
      <main className="flex-1 flex flex-col">
        <AdminLayout>
          {(activeTab: AdminTab, onNavigateTab) => {
            switch (activeTab) {
              case 'overview':
                return <DashboardOverview onNavigateTab={onNavigateTab} />;
              case 'hero':
                return <HeroManager />;
              case 'about':
                return <AboutManager />;
              case 'skills':
                return <SkillManager />;
              case 'projects':
                return <ProjectManager />;
              case 'experience':
                return <ExperienceManager />;
              case 'techstack':
                return <TechStackManager />;
              case 'contact':
                return <ContactManager />;
              case 'resume':
                return <ResumeManager />;
              case 'theme':
                return <ThemeManager />;
              case 'navigation':
                return <NavigationManager />;
              case 'layout':
                return <LayoutBuilder />;
              case 'inbox':
                return <InboxManager />;
              case 'media':
                return <MediaLibrary />;
              case 'activity':
                return <ActivityLogManager />;
              case 'settings':
                return <SettingsManager />;
              default:
                return <DashboardOverview onNavigateTab={() => {}} />;
            }
          }}
        </AdminLayout>
      </main>
    </div>
  );
};
