import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface PhotoShowcase3DProps {
  photos: string[];
  badgeText?: string;
  frameStyle?: '3d-glass' | 'neon-ring' | 'cyber-card' | 'polaroid';
  name?: string;
}

export const PhotoShowcase3D: React.FC<PhotoShowcase3DProps> = ({
  photos = [],
  badgeText = 'Full Stack Developer',
  frameStyle = '3d-glass',
  name = 'M. Ihwal Maulana'
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const validPhotos = photos.filter((p) => p && p.trim().length > 0);
  const currentPhoto = validPhotos[activePhotoIdx] || validPhotos[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % validPhotos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + validPhotos.length) % validPhotos.length);
  };

  // Dynamic frame styling
  const getFrameClasses = () => {
    switch (frameStyle) {
      case 'neon-ring':
        return 'border-2 border-emerald-400 dark:border-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.35)]';
      case 'cyber-card':
        return 'border border-cyan-500/40 dark:border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.25)] bg-slate-950/90 backdrop-blur-md';
      case 'polaroid':
        return 'p-4 bg-white dark:bg-slate-900 border-8 border-white dark:border-slate-800 shadow-xl rounded-2xl';
      case '3d-glass':
      default:
        return 'border border-white/40 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-2xl';
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Main Interactive 3D Card */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="perspective-1000 w-full max-w-sm sm:max-w-md group cursor-pointer relative"
      >
        <motion.div
          animate={{
            rotateY: mousePos.x * 20,
            rotateX: -mousePos.y * 20,
            scale: mousePos.x !== 0 || mousePos.y !== 0 ? 1.02 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`relative rounded-3xl overflow-hidden transition-shadow duration-300 ${getFrameClasses()}`}
        >
          {/* Top Decorative Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Photo Display with Smooth Crossfade */}
          <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhoto}
                src={currentPhoto}
                alt={name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

            {/* Lightbox / Fullscreen Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
              title="Perbesar Foto"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Badge Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                <span>{badgeText}</span>
              </span>
            </div>

            {/* Bottom Card Caption */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-heading font-extrabold text-xl text-white tracking-tight drop-shadow-md">
                  {name}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              </div>
              <p className="text-xs text-slate-200/90 font-medium font-mono">
                Foto Profil &amp; Gallery Showcase
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Photo Selector Thumbnails (If more than 1 photo exists) */}
      {validPhotos.length > 1 && (
        <div className="mt-5 flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <button
            onClick={prevPhoto}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Foto Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {validPhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActivePhotoIdx(index)}
                className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                  activePhotoIdx === index
                    ? 'border-emerald-500 scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <button
            onClick={nextPhoto}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Foto Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Full Resolution Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              
              <img
                src={currentPhoto}
                alt={name}
                className="w-full max-h-[80vh] object-contain rounded-3xl border border-slate-800 shadow-2xl"
              />

              <div className="mt-4 text-center">
                <span className="text-white font-heading font-bold text-lg">{name}</span>
                <span className="text-slate-400 text-xs block font-mono">
                  {activePhotoIdx + 1} dari {validPhotos.length} foto
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
