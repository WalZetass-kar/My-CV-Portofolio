"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/EmptyState";
import { ExternalLink, X, FolderOpen } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons";
import Image from "next/image";

interface ProjectItem {
  title: string;
  description: string;
  features: string;
  techStack: string;
  demoUrl: string;
  repoUrl: string;
  color: string;
  image: string;
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: ProjectItem;
  index: number;
  onClick: () => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const techStack: string[] = (() => { try { return JSON.parse(project.techStack); } catch { return []; } })();

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="h-full rounded-xl bg-card border border-border overflow-hidden cursor-pointer group flex flex-col"
        style={{ perspective: "1000px" }}
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
          });
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setMousePos({ x: 0, y: 0 }); setIsHovered(false); }}
        onClick={onClick}
        animate={{
          rotateY: mousePos.x,
          rotateX: -mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Image / Gradient Header */}
        <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="text-center">
              <FolderOpen className="w-12 h-12 text-white/80 mx-auto mb-2" />
              <span className="text-xl font-bold text-white/90">{project.title}</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
              Klik untuk detail
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-muted text-sm mb-3 leading-relaxed line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-md">
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-surface text-muted rounded-md">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const features: string[] = (() => { try { return JSON.parse(project.features); } catch { return []; } })();
  const techStack: string[] = (() => { try { return JSON.parse(project.techStack); } catch { return []; } })();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-card rounded-2xl border border-border max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className={`relative h-56 bg-gradient-to-br ${project.color} overflow-hidden`}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <FolderOpen className="w-16 h-16 text-white/70" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-foreground mb-1">{project.title}</h3>
          <p className="text-muted mb-4 leading-relaxed">{project.description}</p>

          {features.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">Fitur Utama</h4>
              <ul className="space-y-1.5">
                {features.map((f) => (
                  <li key={f} className="text-sm text-muted flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors">
                <ExternalLink className="w-4 h-4" />Demo
              </a>
            )}
            {project.repoUrl && project.repoUrl !== "#" && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted hover:text-foreground hover:border-accent/50 transition-colors">
                <GithubIcon className="w-4 h-4" />Kode Sumber
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects3D({ items }: { items: ProjectItem[] }) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Proyek Unggulan"
          subtitle="Kumpulan proyek yang menunjukkan keahlian teknis dan kemampuan pemecahan masalah saya"
        />

        {items.length === 0 ? (
          <EmptyState title="Belum ada proyek" description="Proyek unggulan akan muncul di sini." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
