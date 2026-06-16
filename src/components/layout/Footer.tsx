import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { VisitorCounter } from "../sections/VisitorCounter";

interface Profile {
  name: string;
  title: string;
  github: string;
  linkedin: string;
  email: string;
}

export function Footer({ profile }: { profile: Profile | null }) {
  const currentYear = new Date().getFullYear();
  const nameParts = (profile?.name || "M. Ihwal Maulana").split(" ").filter(Boolean);
  const brandName = nameParts.length > 1 ? nameParts[1] : nameParts[0] || "Ihwal";

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="#home" className="text-xl font-bold text-foreground">
              {brandName}<span className="text-accent">.</span>
            </a>
            <p className="mt-3 text-muted text-sm">
              {profile?.title || "Full Stack Developer & AI Enthusiast"} membangun solusi digital
              melalui teknologi modern.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Tautan Cepat
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["About", "Education", "Experience", "Skills", "Projects", "Certifications", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {profile?.github && profile.github !== "#" && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-accent hover:text-white hover:border-accent transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
              {profile?.linkedin && profile.linkedin !== "#" && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-accent hover:text-white hover:border-accent transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 rounded-lg border border-border hover:bg-accent hover:text-white hover:border-accent transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted flex items-center justify-center gap-1">
            &copy; {currentYear} {profile?.name || "M. Ihwal Maulana"}. Dibuat dengan{" "}
            <Heart className="w-4 h-4 text-red-500 inline" /> menggunakan Next.js &amp;
            Tailwind CSS
          </p>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}
