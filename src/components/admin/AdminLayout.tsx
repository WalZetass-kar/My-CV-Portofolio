import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard, User, Code2, FolderKanban, Briefcase, Cpu,
  Mail, FileText, Palette, Menu, LayoutTemplate, MessageSquare,
  Image as ImageIcon, History, Settings, LogOut, X, ExternalLink, ShieldAlert
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'techstack'
  | 'contact'
  | 'resume'
  | 'theme'
  | 'navigation'
  | 'layout'
  | 'inbox'
  | 'media'
  | 'activity'
  | 'settings';

interface AdminLayoutProps {
  children: (activeTab: AdminTab, onNavigateTab: (tab: AdminTab) => void) => React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { setIsAdminOpen, logout, data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const unreadCount = (data.inbox || []).filter((m) => m.status === 'unread').length;

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero Manager', icon: <User className="w-4 h-4" /> },
    { id: 'about', label: 'About Manager', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Skill Manager', icon: <Code2 className="w-4 h-4" /> },
    { id: 'projects', label: 'Project Manager', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience Manager', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'techstack', label: 'Tech Stack Manager', icon: <Cpu className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Manager', icon: <Mail className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume Manager', icon: <FileText className="w-4 h-4" /> },
    { id: 'theme', label: 'Theme Manager', icon: <Palette className="w-4 h-4" /> },
    { id: 'navigation', label: 'Navigation Manager', icon: <Menu className="w-4 h-4" /> },
    { id: 'layout', label: 'Layout Builder', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'inbox', label: 'Contact Inbox', icon: <MessageSquare className="w-4 h-4" />, badge: unreadCount },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity Log', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col overflow-hidden">
      {/* Topbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-bold flex items-center justify-center font-heading">
              A
            </div>
            <div>
              <span className="font-heading font-bold text-sm tracking-tight text-white block">
                CMS Admin Dashboard
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                M. Ihwal Maulana Portfolio
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lihat Website Live</span>
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
            title="Keluar Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Left */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Admin Info */}
          <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/50">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold flex items-center justify-center text-xs">
              M
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-slate-200 block truncate">
                M. Ihwal Maulana
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                Super Admin
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-emerald-500 text-white font-semibold shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        active ? 'bg-white text-emerald-800' : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
            Vercel/Linear Style CMS v2.4
          </div>
        </aside>

        {/* Main Content View Container */}
        <main className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children(activeTab, (tab) => setActiveTab(tab))}
          </div>
        </main>
      </div>
    </div>
  );
};
