import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, KeyRound, ShieldCheck, AlertCircle, X, CheckCircle2 } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { login, setIsAdminOpen } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');

    const res = await login(password);
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Password Admin tidak valid.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-slate-100">
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h3 className="font-heading font-bold text-2xl text-white mb-1">
          Akses CMS Admin
        </h3>
        <p className="text-slate-400 text-xs mb-6">
          Masukkan kata sandi Admin untuk mengelola seluruh konten website portfolio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Kata Sandi Admin
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi (default: admin123)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
              Petunjuk Sandi: <span className="text-emerald-400">admin123</span>
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
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Verifikasi...' : 'Masuk ke Dashboard'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
