import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  FolderKanban, Code2, Briefcase, Eye, Mail, Clock,
  Sparkles, CheckCircle2, History, RotateCcw
} from 'lucide-react';
import { AdminTab } from './AdminLayout';

interface DashboardOverviewProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { data, resetToDefault } = usePortfolio();
  const { projects, skills, experiences, stats, inbox, activityLogs, settings } = data;

  const totalProjects = (projects || []).length;
  const totalSkills = (skills || []).length;
  const totalExperience = (experiences || []).length;
  const unreadMessages = (inbox || []).filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-8">
      {/* Welcome Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistem CMS Aktif</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
            Selamat Datang, Admin!
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Kelola seluruh konten landing page M. Ihwal Maulana secara real-time dari panel kontrol CMS ini.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('hero')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            Edit Hero Section
          </button>
          <button
            onClick={resetToDefault}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            title="Reset Database ke Seed Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Database</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Total Project</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-white mb-1 group-hover:text-emerald-400 transition-colors">
            {totalProjects}
          </div>
          <div className="text-[11px] text-slate-500">{(projects || []).filter((p) => p.isFeatured).length} Featured</div>
        </div>

        <div
          onClick={() => onNavigateTab('skills')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Total Skill</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-white mb-1 group-hover:text-emerald-400 transition-colors">
            {totalSkills}
          </div>
          <div className="text-[11px] text-slate-500">Active Technical Skills</div>
        </div>

        <div
          onClick={() => onNavigateTab('experience')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Pengalaman Kerja</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-white mb-1 group-hover:text-emerald-400 transition-colors">
            {totalExperience}
          </div>
          <div className="text-[11px] text-slate-500">Timeline Karir</div>
        </div>

        <div
          onClick={() => onNavigateTab('inbox')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Contact Masuk</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 relative">
              <Mail className="w-4 h-4" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              )}
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-white mb-1 group-hover:text-emerald-400 transition-colors">
            {(inbox || []).length}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold">{unreadMessages} Belum Dibaca</div>
        </div>
      </div>

      {/* Analytics & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visitors Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading font-bold text-lg text-white">Metriks Pengunjung</h4>
              <Eye className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Total Pengunjung</span>
                <span className="font-heading font-extrabold text-3xl text-white">
                  {(stats.visitors || 3480).toLocaleString()}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Pageviews</span>
                <span className="font-heading font-extrabold text-2xl text-slate-300">
                  {(stats.pageviews || 8920).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between mt-4">
            <span>Terakhir diperbarui:</span>
            <span className="font-mono text-slate-400">{new Date(settings.lastUpdate).toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-400" />
              <span>Aktivitas Terakhir Admin</span>
            </h4>
            <button
              onClick={() => onNavigateTab('activity')}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              Lihat Semua &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {(activityLogs || []).slice(0, 5).map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">{log.action}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs truncate">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
