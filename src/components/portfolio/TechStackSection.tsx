import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExternalLink, Atom, Code, Palette, Server, Sparkles, Database, Cpu, Activity, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard3D } from '../3d/TiltCard3D';

const iconMap: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-6 h-6 text-cyan-500" />,
  Code: <Code className="w-6 h-6 text-blue-500" />,
  Palette: <Palette className="w-6 h-6 text-emerald-500" />,
  Server: <Server className="w-6 h-6 text-green-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
  Database: <Database className="w-6 h-6 text-blue-600" />,
  Cpu: <Cpu className="w-6 h-6 text-slate-700 dark:text-slate-200" />,
  Activity: <Activity className="w-6 h-6 text-purple-500" />
};

export const TechStackSection: React.FC = () => {
  const { data } = usePortfolio();
  const { techStack } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set((techStack || []).map((t) => t.category)))];

  const filteredTech = (techStack || [])
    .filter((t) => selectedCategory === 'All' || t.category === selectedCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="techstack" className="py-24 lg:py-28 bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-2">
            STACK UTAMA &amp; ALAT PENGEMBANGAN
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Official Tech Stack &amp; Ekosistem
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Perkakas resmi, AI model, dan kerangka kerja modern yang mendukung stabilitas serta performa tinggi aplikasi.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Tech Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTech.map((item) => (
            <motion.a
              key={item.id}
              href={item.officialDocUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-5 rounded-[20px] border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-500 transition-all duration-200 flex items-center justify-between group h-full"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 group-hover:scale-105 transition-all shrink-0">
                  {iconMap[item.iconName] || <Layers className="w-5 h-5 text-slate-600" />}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {item.category}
                  </span>
                </div>
              </div>

              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 ml-2" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};


