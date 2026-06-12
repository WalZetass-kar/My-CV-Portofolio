"use client";

import { useState } from "react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Award, X, ExternalLink, FileText } from "lucide-react";
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

export function Certifications({ items }: { items: Certificate[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((c) => c.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((c) => c.category === activeCategory);

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

        {filtered.length === 0 ? <EmptyState title="Belum ada sertifikasi" description="Sertifikasi akan muncul di sini." /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert, index) => (
            <ScrollReveal key={cert.title} delay={index * 0.1}>
              <button
                onClick={() => setSelectedCert(cert)}
                className="w-full text-left p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}
                >
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-accent font-medium mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs text-muted">{cert.date}</p>
                <span className="inline-block mt-3 px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-md">
                  {cert.category}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>
        )}
      </div>

      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-card rounded-2xl border border-border max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted" />
            </button>

            {selectedCert.image ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 border border-border">
                <Image src={selectedCert.image} alt={selectedCert.title} fill className="object-cover" />
              </div>
            ) : (
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedCert.color} flex items-center justify-center mb-6`}
              >
                <Award className="w-8 h-8 text-white" />
              </div>
            )}

            <h3 className="text-xl font-bold text-foreground mb-2">
              {selectedCert.title}
            </h3>
            <p className="text-accent font-medium mb-1">
              {selectedCert.issuer}
            </p>
            <p className="text-sm text-muted mb-4">{selectedCert.date}</p>
            <p className="text-muted leading-relaxed mb-4">
              {selectedCert.description}
            </p>
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
          </div>
        </div>
      )}
    </section>
  );
}
