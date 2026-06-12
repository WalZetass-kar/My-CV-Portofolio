import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {title}
        </h2>
        <div
          className={`h-1 w-20 bg-accent rounded-full mx-auto ${!centered ? "mx-0" : ""}`}
        />
        {subtitle && (
          <p className="mt-4 text-muted max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        )}
      </ScrollReveal>
    </div>
  );
}
