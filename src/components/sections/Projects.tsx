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

export function Projects({ items }: { items: ProjectItem[] }) {
  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Proyek Unggulan"
          subtitle="Kumpulan proyek yang menunjukkan keahlian teknis dan kemampuan pemecahan masalah saya"
        />

        {items.length === 0 ? <EmptyState title="Belum ada proyek" description="Proyek unggulan akan muncul di sini." /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project, index) => {
            const features: string[] = (() => { try { return JSON.parse(project.features); } catch { return []; } })();
            const techStack: string[] = (() => { try { return JSON.parse(project.techStack); } catch { return []; } })();
            return (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <div className="h-full rounded-xl bg-card border border-border overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg group flex flex-col">
                  <div
                    className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    {project.image ? (
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-white/90">
                        {project.title}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Fitur Utama
                      </p>
                      <ul className="space-y-1">
                        {features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className="text-xs text-muted flex items-center gap-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border">
                      {project.demoUrl && project.demoUrl !== "#" && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo Langsung
                      </a>
                      )}
                      {project.repoUrl && project.repoUrl !== "#" && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        Kode Sumber
                      </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
