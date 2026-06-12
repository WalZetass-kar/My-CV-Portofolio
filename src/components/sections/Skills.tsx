"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/EmptyState";

interface SkillItem {
  name: string;
  level: number;
  category: string;
}

function SkillBar({ name, level, inView }: { name: string; level: number; inView: boolean }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted">{level}%</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full"
        />
      </div>
    </div>
  );
}

export function Skills({ items }: { items: SkillItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const categories = items.reduce<Record<string, SkillItem[]>>((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  const categoryEntries = Object.entries(categories);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Keahlian Teknis"
          subtitle="Teknologi dan tools yang saya kuasai"
        />

        {items.length === 0 ? <EmptyState title="Belum ada keahlian" description="Keahlian teknis akan muncul di sini." /> : (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryEntries.map(([title, skills], catIndex) => (
            <ScrollReveal key={title} delay={catIndex * 0.1}>
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {title}
                </h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
