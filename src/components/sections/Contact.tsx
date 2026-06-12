"use client";

import { useState, FormEvent } from "react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Mail, Phone, Globe, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

type IconComponent = React.ComponentType<{ className?: string }>;
const LinkedinWrap: IconComponent = ({ className }) => <LinkedinIcon className={className} />;
const GithubWrap: IconComponent = ({ className }) => <GithubIcon className={className} />;

interface Profile { email: string; whatsapp: string; linkedin: string; github: string; website: string; }

export function Contact({ profile }: { profile: Profile | null }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const waNumber = profile?.whatsapp?.replace(/\D/g, "") || "";

  const contactLinks = [
    profile?.email ? { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false } : null,
    waNumber ? { icon: Phone, label: "WhatsApp", value: profile?.whatsapp || "", href: `https://wa.me/${waNumber}`, external: true } : null,
    profile?.linkedin && profile.linkedin !== "#" ? { icon: LinkedinWrap, label: "LinkedIn", value: profile.linkedin.replace("https://", ""), href: profile.linkedin, external: true } : null,
    profile?.github && profile.github !== "#" ? { icon: GithubWrap, label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, external: true } : null,
    profile?.website && profile.website !== "#" ? { icon: Globe, label: "Portfolio", value: profile.website.replace("https://", ""), href: profile.website, external: true } : null,
  ].filter(Boolean) as { icon: IconComponent; label: string; value: string; href: string; external: boolean }[];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = profile?.email || "";
    if (email) {
      const mailto = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailto;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get In Touch" subtitle="Feel free to reach out for collaborations, opportunities, or just a friendly chat" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              {contactLinks.length === 0 ? (
                <p className="text-muted">Contact information will appear here once configured.</p>
              ) : (
                <div className="space-y-4">
                  {contactLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
              <div aria-live="polite" className="sr-only">{submitted ? "Message prepared! Check your email client." : ""}</div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <input type="text" id="c-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input type="email" id="c-email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="c-subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                  <input type="text" id="c-subject" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent transition-colors" placeholder="What is this about?" />
                </div>
                <div>
                  <label htmlFor="c-message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <textarea id="c-message" required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent transition-colors resize-none" placeholder="Your message..." />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25">
                  {submitted ? (<><CheckCircle className="w-4 h-4" /> Opening Email Client...</>) : (<><Send className="w-4 h-4" /> Send Message</>)}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
