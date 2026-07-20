"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/sections/Hero").then(m => ({ default: m.Hero })), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin" /></div>
});
const About = dynamic(() => import("@/components/sections/About").then(m => ({ default: m.About })), { ssr: false });
const Education = dynamic(() => import("@/components/sections/Education").then(m => ({ default: m.Education })), { ssr: false });
const Experience = dynamic(() => import("@/components/sections/Experience").then(m => ({ default: m.Experience })), { ssr: false });
const Skills3D = dynamic(() => import("@/components/sections/Skills3D").then(m => ({ default: m.Skills3D })), { ssr: false });
const Projects3D = dynamic(() => import("@/components/sections/Projects3D").then(m => ({ default: m.Projects3D })), { ssr: false });
const Certifications3D = dynamic(() => import("@/components/sections/Certifications3D").then(m => ({ default: m.Certifications3D })), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen").then(m => ({ default: m.LoadingScreen })), { ssr: false });
const MagneticCursor = dynamic(() => import("@/components/ui/MagneticCursor").then(m => ({ default: m.MagneticCursor })), { ssr: false });
const SoundEffects = dynamic(() => import("@/components/ui/SoundEffects").then(m => ({ default: m.SoundEffects })), { ssr: false });
const ParticleBackground = dynamic(() => import("@/components/three/ParticleBackground").then(m => ({ default: m.ParticleBackground })), { ssr: false });

export interface Profile {
  name: string;
  title: string;
  heroStatement: string;
  cvUrl: string;
  profileImage: string;
  summary: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  website: string;
}

interface EducationItem { id: number; institution: string; degree: string; period: string; description: string; order: number; }
interface ExperienceItem { id: number; role: string; organization: string; location: string; responsibilities: string; order: number; }
interface SkillItem { name: string; level: number; category: string; }
interface ProjectItem { title: string; description: string; features: string; techStack: string; demoUrl: string; repoUrl: string; color: string; image: string; }
interface CertItem { title: string; issuer: string; date: string; category: string; description: string; color: string; image: string; fileUrl: string; }

export function ClientSections({
  profile, education, experience, skills, projects, certifications
}: {
  profile: Profile | null;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertItem[];
}) {
  return (
    <>
      <LoadingScreen />
      <MagneticCursor />
      <SoundEffects />
      <ParticleBackground />
      <main id="main-content">
        <Hero profile={profile} />
        <About profile={profile} />
        <Education items={education} />
        <Experience items={experience} />
        <Skills3D items={skills} />
        <Projects3D items={projects} />
        <Certifications3D items={certifications} />
        <Contact profile={profile} />
      </main>
    </>
  );
}
