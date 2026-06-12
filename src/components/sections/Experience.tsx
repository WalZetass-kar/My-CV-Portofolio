import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/EmptyState";
import { Users, ChevronRight } from "lucide-react";

interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  responsibilities: string;
}

export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Organizational Experience"
          subtitle="Leadership roles and responsibilities in student organizations"
        />

        {items.length === 0 ? (
          <EmptyState title="No experience entries yet" description="Organizational experience will appear here." />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((exp, index) => {
            const responsibilities: string[] = (() => {
              try { return JSON.parse(exp.responsibilities); } catch { return []; }
            })();
            return (
              <ScrollReveal key={exp.organization} delay={index * 0.15}>
                <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Users className="w-6 h-6 text-accent" />
                  </div>

                  <p className="text-accent text-sm font-medium mb-1">
                    {exp.role}
                  </p>
                  <h3 className="font-bold text-foreground text-lg mb-1">
                    {exp.organization}
                  </h3>
                  <p className="text-muted text-sm mb-4">{exp.location}</p>

                  <ul className="space-y-2">
                    {responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
