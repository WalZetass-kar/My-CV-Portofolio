"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Award, X, FileText } from "lucide-react";
import Image from "next/image";
import { EmptyState } from "../ui/EmptyState";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  color: string;
  image: string;
  fileUrl: string;
}

function CertCard3D({ cert, index, onClick }: { cert: Certificate; index: number; onClick: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsFlipped(false);
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="h-80 cursor-pointer group"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped
              ? "rotateY(180deg)"
              : `rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg)`,
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl bg-card border border-border p-6 flex flex-col items-center justify-center text-center backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
              {cert.title}
            </h3>
            <p className="text-sm text-accent font-medium mb-1">{cert.issuer}</p>
            <p className="text-xs text-muted mb-3">{cert.date}</p>
            <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-md">
              {cert.category}
            </span>
            <p className="text-xs text-muted mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              Klik untuk detail
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/10 to-orange-500/10 border border-accent/30 p-6 flex flex-col items-center justify-center text-center backface-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {cert.image ? (
              <div className="relative w-20 h-20 rounded-xl overflow-hidden mb-3 border border-border">
                <Image src={cert.image} alt={cert.title} fill className="object-cover" />
              </div>
            ) : (
              <Award className="w-10 h-10 text-accent mb-3" />
            )}
            <h3 className="font-bold text-foreground text-sm mb-1">{cert.title}</h3>
            <p className="text-xs text-accent font-medium mb-2">{cert.issuer}</p>
            <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-3">
              {cert.description || "Klik untuk melihat detail sertifikasi."}
            </p>
            <span className="px-3 py-1 text-xs font-medium bg-accent text-white rounded-lg">
              Lihat Detail
            </span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Certifications3D({ items }: { items: Certificate[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories = ["All", ...Array.from(new Set(items.map((c) => c.category)))];
  const filtered = activeCategory === "All" ? items : items.filter((c) => c.category === activeCategory);

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Sertifikasi"
          subtitle="Sertifikasi profesional dan kursus yang telah diselesaikan"
        />

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeCategory === cat
                    ? "bg-accent text-white"
                    : "bg-card border border-border text-muted hover:text-foreground hover:border-accent/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {filtered.length === 0 ? (
          <EmptyState title="Belum ada sertifikasi" description="Sertifikasi akan muncul di sini." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert, index) => (
              <CertCard3D
                key={cert.title}
                cert={cert}
                index={index}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -20 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-card rounded-2xl border border-border max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5 text-muted" />
              </button>

              {selectedCert.image ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 border border-border">
                  <Image src={selectedCert.image} alt={selectedCert.title} fill className="object-cover" />
                </div>
              ) : (
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedCert.color} flex items-center justify-center mb-6`}>
                  <Award className="w-8 h-8 text-white" />
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground mb-2">{selectedCert.title}</h3>
              <p className="text-accent font-medium mb-1">{selectedCert.issuer}</p>
              <p className="text-sm text-muted mb-4">{selectedCert.date}</p>
              <p className="text-muted leading-relaxed mb-4">{selectedCert.description}</p>
              {selectedCert.fileUrl && (
                <a
                  href={selectedCert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Lihat Sertifikat
                </a>
              )}
              {selectedCert.fileUrl && selectedCert.fileUrl.endsWith(".pdf") && (
                <div className="mb-4 rounded-xl overflow-hidden border border-border">
                  <iframe src={selectedCert.fileUrl} className="w-full h-64" title={`Certificate: ${selectedCert.title}`} />
                </div>
              )}
              <span className="inline-block px-3 py-1 text-sm font-medium bg-accent/10 text-accent rounded-lg">
                {selectedCert.category}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
