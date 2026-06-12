import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "M. Ihwal Maulana",
      title: "Informatics Student | Full Stack Developer | AI Enthusiast",
      summary:
        "I am an Informatics Management student at Politeknik LP3I Pekanbaru with a strong interest in software engineering, web development, desktop application development, database systems, and artificial intelligence. I have leadership experience through various organizational roles and continuously improve my technical and professional skills through real-world projects and technology-based solutions.",
      heroStatement:
        "Building digital solutions through software development, modern technology, and continuous learning.",
      cvUrl: "/documents/CV.pdf",
      email: "ihwalmaulana@example.com",
      whatsapp: "+62 xxx-xxxx-xxxx",
      linkedin: "https://linkedin.com/in/ihwal-maulana",
      github: "https://github.com/walzetass",
      website: "https://www.portofoliobywal.my.id",
    },
  });

  const educationData = [
    {
      institution: "Politeknik LP3I Pekanbaru",
      degree: "Management Informatics",
      period: "2025 - Present",
      description:
        "Studying software development, database systems, system analysis, web technologies, computer networking, and information systems implementation.",
      order: 0,
    },
    {
      institution: "SMA Negeri 2 Kubu Babussalam",
      degree: "High School Diploma",
      period: "2022 - 2025",
      description:
        "Actively involved in academic and organizational activities while developing leadership, communication, and teamwork skills.",
      order: 1,
    },
  ];

  for (const edu of educationData) {
    await prisma.education.create({ data: edu });
  }

  const experienceData = [
    {
      role: "Chairman",
      organization: "Student Executive Board (BEM)",
      location: "Politeknik LP3I Pekanbaru",
      responsibilities: JSON.stringify([
        "Leading student organizational activities",
        "Coordinating work programs across departments",
        "Managing internal communication and team collaboration",
        "Supporting campus events and initiatives",
      ]),
      order: 0,
    },
    {
      role: "Chairman",
      organization: "LP3I Computer Club (LCC)",
      location: "Politeknik LP3I Pekanbaru",
      responsibilities: JSON.stringify([
        "Leading technology community activities",
        "Organizing workshops and training sessions",
        "Mentoring students in technology projects",
        "Encouraging innovation and digital development",
      ]),
      order: 1,
    },
    {
      role: "Chairman",
      organization: "Student Council (OSIS)",
      location: "SMA Negeri 2 Kubu Babussalam",
      responsibilities: JSON.stringify([
        "Managing student activities and events",
        "Coordinating school programs with administration",
        "Developing leadership and teamwork culture",
        "Representing student body in school affairs",
      ]),
      order: 2,
    },
  ];

  for (const exp of experienceData) {
    await prisma.experience.create({ data: exp });
  }

  const skillsData = [
    { name: "JavaScript", level: 85, category: "Programming Languages", order: 0 },
    { name: "TypeScript", level: 80, category: "Programming Languages", order: 1 },
    { name: "Java", level: 70, category: "Programming Languages", order: 2 },
    { name: "SQL", level: 75, category: "Programming Languages", order: 3 },
    { name: "HTML", level: 95, category: "Programming Languages", order: 4 },
    { name: "CSS", level: 90, category: "Programming Languages", order: 5 },
    { name: "React", level: 85, category: "Frameworks & Technologies", order: 0 },
    { name: "Next.js", level: 80, category: "Frameworks & Technologies", order: 1 },
    { name: "Node.js", level: 75, category: "Frameworks & Technologies", order: 2 },
    { name: "Electron", level: 70, category: "Frameworks & Technologies", order: 3 },
    { name: "Tailwind CSS", level: 90, category: "Frameworks & Technologies", order: 4 },
    { name: "Supabase", level: 65, category: "Frameworks & Technologies", order: 5 },
    { name: "SQLite", level: 70, category: "Frameworks & Technologies", order: 6 },
    { name: "Git", level: 80, category: "Development Tools", order: 0 },
    { name: "GitHub", level: 85, category: "Development Tools", order: 1 },
    { name: "VS Code", level: 90, category: "Development Tools", order: 2 },
    { name: "Prompt Engineering", level: 85, category: "Additional Competencies", order: 0 },
    { name: "AI Tools", level: 80, category: "Additional Competencies", order: 1 },
    { name: "UI/UX Fundamentals", level: 70, category: "Additional Competencies", order: 2 },
    { name: "System Analysis", level: 75, category: "Additional Competencies", order: 3 },
    { name: "Project Management", level: 70, category: "Additional Competencies", order: 4 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }

  const projectsData = [
    {
      title: "ZetassPOS",
      description: "Desktop Point of Sale application for managing sales transactions, products, and business reporting.",
      features: JSON.stringify(["Product Management", "Sales Transactions", "Reporting System", "SQLite Database", "Multi-user Support"]),
      techStack: JSON.stringify(["Electron", "React", "TypeScript", "SQLite", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-cyan-500 to-blue-500",
      order: 0,
    },
    {
      title: "ZetassKost",
      description: "Boarding house management system for handling room management, tenant tracking, and financial reporting.",
      features: JSON.stringify(["Room Management", "Tenant Management", "Payment Monitoring", "Financial Reporting"]),
      techStack: JSON.stringify(["Next.js", "React", "Supabase", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-purple-500 to-pink-500",
      order: 1,
    },
    {
      title: "LCC Attendance System",
      description: "QR-based attendance system with analytics, ranking, and certificate generation for the LP3I Computer Club.",
      features: JSON.stringify(["QR Attendance", "Attendance Analytics", "Ranking System", "Certificate Generation"]),
      techStack: JSON.stringify(["Next.js", "React", "Supabase", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-green-500 to-emerald-500",
      order: 2,
    },
    {
      title: "Digital Student ID System",
      description: "Digital student identification system with QR verification and administrative dashboard.",
      features: JSON.stringify(["Digital ID Generation", "QR Verification", "Data Management", "Administrative Dashboard"]),
      techStack: JSON.stringify(["Next.js", "React", "Supabase", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-orange-500 to-amber-500",
      order: 3,
    },
    {
      title: "Portfolio Website",
      description: "Professional portfolio website with content management, project showcase, and SEO optimization.",
      features: JSON.stringify(["Content Management", "Project Showcase", "Responsive Design", "SEO Optimization"]),
      techStack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS"]),
      demoUrl: "https://www.portofoliobywal.my.id",
      repoUrl: "#",
      color: "from-cyan-500 to-indigo-500",
      order: 4,
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }

  const certsData = [
    {
      title: "Web Development Fundamentals",
      issuer: "Online Learning Platform",
      date: "2025",
      category: "Web Development",
      description: "Comprehensive course covering HTML, CSS, JavaScript, and responsive web design principles.",
      color: "from-cyan-500 to-blue-500",
      order: 0,
    },
    {
      title: "React & Next.js Development",
      issuer: "Online Learning Platform",
      date: "2025",
      category: "Web Development",
      description: "Advanced course on building modern web applications with React and Next.js framework.",
      color: "from-blue-500 to-indigo-500",
      order: 1,
    },
    {
      title: "Database Design & SQL",
      issuer: "Online Learning Platform",
      date: "2025",
      category: "Database",
      description: "Course covering relational database design, SQL queries, normalization, and optimization.",
      color: "from-green-500 to-emerald-500",
      order: 2,
    },
    {
      title: "JavaScript & TypeScript Mastery",
      issuer: "Online Learning Platform",
      date: "2025",
      category: "Programming",
      description: "In-depth course on JavaScript ES6+ features and TypeScript for building type-safe applications.",
      color: "from-yellow-500 to-orange-500",
      order: 3,
    },
    {
      title: "AI & Prompt Engineering",
      issuer: "Online Learning Platform",
      date: "2025",
      category: "AI & Technology",
      description: "Course on leveraging artificial intelligence tools and effective prompt engineering techniques.",
      color: "from-purple-500 to-pink-500",
      order: 4,
    },
    {
      title: "Project Management Essentials",
      issuer: "Online Learning Platform",
      date: "2025",
      category: "Management",
      description: "Fundamentals of project management including planning, execution, and team coordination.",
      color: "from-red-500 to-rose-500",
      order: 5,
    },
  ];

  for (const cert of certsData) {
    await prisma.certification.create({ data: cert });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
