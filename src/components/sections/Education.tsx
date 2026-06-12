import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/EmptyState";
import { GraduationCap, Calendar } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export function Education({ items }: { items: EducationItem[] }) {
  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Pendidikan"
          subtitle="Perjalanan akademik dan latar belakang pendidikan saya"
        />

        {items.length === 0 ? (
          <EmptyState title="Belum ada data pendidikan" description="Riwayat pendidikan akan muncul di sini." />
        ) : (
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />

            {items.map((item, index) => (
              <ScrollReveal
                key={item.institution}
                delay={index * 0.2}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background z-10" />

                  <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                    <div className="p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg">
                      <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
                        <Calendar className="w-4 h-4" />
                        {item.period}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-accent" />
                        <h3 className="font-bold text-foreground text-lg">
                          {item.institution}
                        </h3>
                      </div>
                      <p className="text-accent font-medium text-sm mb-3">
                        {item.degree}
                      </p>
                      <p className="text-muted text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
