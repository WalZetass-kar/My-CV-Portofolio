import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, education, experience, skills, projects, certifications] =
    await Promise.all([
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.certification.findMany({ orderBy: { order: "asc" } }),
    ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile?.name || "M. Ihwal Maulana",
        jobTitle: profile?.title || "Full Stack Developer",
        description: profile?.summary || "",
        url: "https://www.portofoliobywal.my.id",
        image: profile?.profileImage || "https://www.portofoliobywal.my.id/images/profile.png",
        email: profile?.email || undefined,
        sameAs: [
          profile?.github && profile.github !== "#" ? profile.github : null,
          profile?.linkedin && profile.linkedin !== "#" ? profile.linkedin : null,
          profile?.website && profile.website !== "#" ? profile.website : null,
        ].filter(Boolean),
      },
      {
        "@type": "WebSite",
        name: `${profile?.name || "M. Ihwal Maulana"} - Portfolio`,
        url: "https://www.portofoliobywal.my.id",
        description: profile?.heroStatement || "",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <Hero profile={profile} />
        <About profile={profile} />
        <Education items={education} />
        <Experience items={experience} />
        <Skills items={skills} />
        <Projects items={projects} />
        <Certifications items={certifications} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
