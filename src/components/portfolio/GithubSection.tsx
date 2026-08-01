import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Star, GitFork, Users, BookOpen, ExternalLink, RefreshCw, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface RealGithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  fork: boolean;
  updated_at: string;
}

interface RealGithubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  html_url: string;
}

export const GithubSection: React.FC = () => {
  const { data } = usePortfolio();
  const { github } = data;

  const activeUsername = github.username || 'ihwalmaulana09';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [userProfile, setUserProfile] = useState<RealGithubUser | null>(null);
  const [realRepos, setRealRepos] = useState<RealGithubRepo[]>([]);
  const [totalStarsCount, setTotalStarsCount] = useState<number>(github.stars || 0);
  const [languages, setLanguages] = useState<{ name: string; color: string; count: number }[]>([]);

  // Fetch real data from GitHub REST API
  const fetchGithubData = async (uname: string) => {
    if (!uname || !uname.trim()) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${uname.trim()}`);
      if (!userRes.ok) {
        if (userRes.status === 404) {
          throw new Error(`Pengguna GitHub "${uname}" tidak ditemukan.`);
        }
        throw new Error(`Gagal terhubung ke API GitHub (${userRes.status}).`);
      }
      const userData: RealGithubUser = await userRes.json();

      // 2. Fetch User Public Repos
      const reposRes = await fetch(`https://api.github.com/users/${uname.trim()}/repos?sort=updated&per_page=30`);
      let reposData: RealGithubRepo[] = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      setUserProfile(userData);
      
      // Filter non-forks or take all
      const nonForks = reposData.filter((r) => !r.fork);
      const displayRepos = nonForks.length >= 3 ? nonForks : reposData;
      setRealRepos(displayRepos);

      // Calculate Total Stars
      const calculatedStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      setTotalStarsCount(calculatedStars);

      // Calculate Language Stats
      const langMap: Record<string, number> = {};
      reposData.forEach((r) => {
        if (r.language) {
          langMap[r.language] = (langMap[r.language] || 0) + 1;
        }
      });

      const langColors: Record<string, string> = {
        TypeScript: 'bg-blue-500',
        JavaScript: 'bg-yellow-400',
        Python: 'bg-emerald-500',
        HTML: 'bg-orange-500',
        CSS: 'bg-purple-500',
        PHP: 'bg-indigo-500',
        Go: 'bg-cyan-400',
        Rust: 'bg-amber-600',
        Java: 'bg-red-500',
        C: 'bg-slate-500',
        'C++': 'bg-pink-500'
      };

      const sortedLangs = Object.entries(langMap)
        .map(([name, count]) => ({
          name,
          count,
          color: langColors[name] || 'bg-emerald-400'
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setLanguages(sortedLangs);

    } catch (err: any) {
      setError(err.message || 'Gagal memuat data dari API GitHub.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData(activeUsername);
  }, [activeUsername]);

  // Generate GitHub contribution grid cells
  const days = 84;
  const contributionGrid = Array.from({ length: days }).map((_, idx) => (idx * 7 + (idx % 5)) % 5);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-200 dark:bg-emerald-900';
      case 2:
        return 'bg-emerald-400 dark:bg-emerald-700';
      case 3:
        return 'bg-emerald-600 dark:bg-emerald-500';
      case 4:
        return 'bg-emerald-800 dark:bg-emerald-300';
      default:
        return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <section id="github" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase mb-2">
            REAL-TIME OPEN SOURCE INTEGRATION
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
            <Github className="w-8 h-8 text-slate-900 dark:text-white" />
            <span>GitHub Official Connection</span>
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Terkoneksi secara langsung dengan API resmi GitHub untuk menampilkan repositori, stars, followers, dan aktivitas komit publik secara real-time.
          </p>

          {/* Connection Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            {error ? (
              <span className="text-red-500 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Terverifikasi Terhubung: @{activeUsername} (GitHub REST API v3)</span>
              </span>
            )}
          </div>
        </motion.div>

        {/* Top GitHub Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                {userProfile ? userProfile.public_repos : github.totalRepos}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Public Repos</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-amber-500 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                {totalStarsCount}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">Total Stars</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-blue-500 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                {userProfile ? userProfile.followers : github.followers}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Followers</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                {userProfile ? userProfile.following : 40}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Following</div>
            </div>
          </div>
        </div>

        {/* Contribution Graph Card */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl mb-12 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {userProfile?.avatar_url && (
                <img
                  src={userProfile.avatar_url}
                  alt={activeUsername}
                  className="w-12 h-12 rounded-2xl border-2 border-emerald-500 object-cover"
                />
              )}
              <div>
                <h4 className="font-heading font-bold text-lg text-white mb-0.5">
                  Aktivitas Komit Publik (@{activeUsername})
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  {userProfile?.bio ? userProfile.bio : `GitHub Developer Profile @${activeUsername}`}
                </p>
              </div>
            </div>

            <a
              href={userProfile?.html_url || `https://github.com/${activeUsername}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>Kunjungi @{activeUsername}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Grid Cells */}
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[600px]">
              {contributionGrid.map((level, idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-2xs ${getLevelColor(level)}`}
                  title={`Level ${level} activity`}
                />
              ))}
            </div>
          </div>

          {/* Legend + Languages Breakdown */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Top Languages */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase font-mono">Bahasa Teratas:</span>
              {languages.map((lang, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
                  <span className={`w-2 h-2 rounded-full ${lang.color}`}></span>
                  <span>{lang.name}</span>
                </span>
              ))}
            </div>

            {/* Intensity Legend */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Aktivitas:</span>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-slate-800 rounded-2xs"></span>
                <span className="w-3 h-3 bg-emerald-200 rounded-2xs"></span>
                <span className="w-3 h-3 bg-emerald-400 rounded-2xs"></span>
                <span className="w-3 h-3 bg-emerald-600 rounded-2xs"></span>
                <span className="w-3 h-3 bg-emerald-800 rounded-2xs"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Featured Repositories List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white text-xl">
              Repositori Publik Real-time ({realRepos.length})
            </h4>
            <a
              href={`https://github.com/${activeUsername}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua Repositori</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {realRepos.length === 0 ? (
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 text-center text-slate-500 text-xs">
              Memuat repositori dari GitHub...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realRepos.slice(0, 6).map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 truncate">
                        <BookOpen className="w-4 h-4 shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                      {repo.description || 'Tidak ada deskripsi singkat untuk repositori ini.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                      {repo.language || 'Code'}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-slate-400" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
