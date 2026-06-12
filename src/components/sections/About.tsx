import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Code, Lightbulb, Users, Target } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Technical Focus",
    description:
      "Software engineering, web development, desktop applications, database systems, and artificial intelligence.",
  },
  {
    icon: Users,
    title: "Leadership",
    description:
      "Experienced in leading student organizations including BEM, LCC, and OSIS with proven team management.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Passionate about creating technology-based solutions that solve real-world problems efficiently.",
  },
  {
    icon: Target,
    title: "Career Goals",
    description:
      "Aspiring to become a professional software engineer contributing to impactful technology products.",
  },
];

interface Profile {
  summary: string;
}

export function About({ profile }: { profile: Profile | null }) {
  const summary = profile?.summary || "I am an Informatics Management student at Politeknik LP3I Pekanbaru with a strong interest in software engineering, web development, desktop application development, database systems, and artificial intelligence.";
  return (
    <section id="about" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Get to know my background, interests, and professional journey"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal direction="left">
            <div className="space-y-4 text-muted leading-relaxed">
              <p>{summary}</p>
              <p>
                I believe in the power of continuous learning, collaborative
                teamwork, and clean code practices. I am committed to delivering
                high-quality solutions that make a meaningful difference.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
