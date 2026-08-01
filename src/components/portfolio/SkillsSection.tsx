import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillCategory } from '../../types';
import {
  Code, Layout, Palette, Server, Cpu, Sparkles, Bot,
  Database, Flame, Smartphone, Box, GitBranch, Zap, Figma, Layers
} from 'lucide-react';
import { motion } from 'motion/react';

// Icon Map helper
const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Figma: <Figma className="w-5 h-5" />
};

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  const categories: ('All' | SkillCategory)[] = [
    'All',
    'Frontend',
    'Backend',
    'AI',
    'Database',
    'Mobile',
    'DevOps',
    'Tools'
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const activeSkills = (skills || [])
    .filter((s) => s.isActive)
    .filter((s) => selectedCategory === 'All' || s.category === selectedCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="skills" className="py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-2">
            KEAHLIAN TEKNIS
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Keahlian &amp; Perkakas
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Stack teknologi unggulan yang digunakan dalam merancang dan mengembangkan aplikasi berarsitektur modern.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {activeSkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-[20px] border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-200">
                    {iconMap[skill.iconName] || <Layers className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-100">
                    {skill.category}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                  {skill.name}
                </h4>
                <p className="text-xs font-medium text-emerald-600 mb-4">
                  Level: {skill.level}
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1.5">
                  <span>Kemahiran</span>
                  <span className="font-bold text-slate-700">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
