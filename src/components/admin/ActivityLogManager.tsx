import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ActivityLog } from '../../types';
import { History, Search, CheckCircle2, UserCheck } from 'lucide-react';

export const ActivityLogManager: React.FC = () => {
  const { data } = usePortfolio();
  const logs = data.activityLogs || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Activity Log Audit</h3>
          <p className="text-slate-400 text-xs">Catatan audit riwayat seluruh aktivitas dan pembaruan konten CMS Admin.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter catatan aktivitas..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white"
          />
        </div>

        <div className="divide-y divide-slate-800 border-t border-slate-800 pt-2">
          {filteredLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex items-start justify-between text-xs gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5">{log.action}</div>
                  <div className="text-slate-400 text-xs">{log.details}</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-emerald-400 font-mono block mb-1">
                  {log.user}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
