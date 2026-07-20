import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientSections } from "@/components/ClientSections";

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
        image: profile?.profileImage || "https://www.portofoliobywal.my.id/images/profile.jpg",
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
      <ClientSections
        profile={profile}
        education={education}
        experience={experience}
        skills={skills}
        projects={projects}
        certifications={certifications}
      />
      <Footer profile={profile} />
    </>
  );
}
