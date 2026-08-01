import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ShieldCheck, KeyRound, Lock, AlertCircle, X, Terminal } from 'lucide-react';

export const AdminGatekeeperAuth: React.FC = () => {
  const { login, setIsAdminOpen } = usePortfolio();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey) return;
    setLoading(true);
    setError('');

    const res = await login(passkey);
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Kredensial keamanan tidak valid.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-slate-100">
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
          <Terminal className="w-6 h-6" />
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-white mb-1">
          Otorisasi Akses Sistem
        </h3>
        <p className="text-slate-400 text-xs mb-6">
          Masukkan Kunci Keamanan Khusus (Security Passkey) untuk melanjutkan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Passkey Akses Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Masukkan Passkey Pengelola"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
              Kunci Keamanan Default: <span className="text-emerald-400">admin123</span>
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Memverifikasi Passkey...' : 'Otorisasi Akses'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
