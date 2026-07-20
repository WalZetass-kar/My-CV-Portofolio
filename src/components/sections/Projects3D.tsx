"use client";

import { useState } from "react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/EmptyState";
import { ExternalLink } from "lucide-react";
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

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const features: string[] = (() => { try { return JSON.parse(project.features); } catch { return []; } })();
  const techStack: string[] = (() => { try { return JSON.parse(project.techStack); } catch { return []; } })();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="h-full rounded-xl bg-card border border-border overflow-hidden hover:border-accent/50 transition-all duration-500 group flex flex-col"
        style={{
          transform: isHovered
            ? `perspective(800px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) translateY(-8px)`
            : "perspective(800px) rotateY(0deg) rotateX(0deg)",
          transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease",
          boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.15)" : "none",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          ) : (
            <span className="text-3xl font-bold text-white/90">{project.title}</span>
          )}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted text-sm mb-4 leading-relaxed">{project.description}</p>

          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Fitur Utama</p>
            <ul className="space-y-1">
              {features.slice(0, 3).map((feature) => (
                <li key={feature} className="text-xs text-muted flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
            {techStack.map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-md">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                <ExternalLink className="w-4 h-4" />Demo
              </a>
            )}
            {project.repoUrl && project.repoUrl !== "#" && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors">
                <GithubIcon className="w-4 h-4" />Kode Sumber
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Projects3D({ items }: { items: ProjectItem[] }) {
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
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
