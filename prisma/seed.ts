import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Hapus semua data dulu untuk mencegah duplikat
  await prisma.certification.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.profile.deleteMany();

  console.log("Data lama dihapus, memulai seed...");

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: "M. Ihwal Maulana",
      title: "Mahasiswa Informatika | Full Stack Developer | AI Enthusiast",
      summary:
        "Saya adalah mahasiswa Manajemen Informatika di Politeknik LP3I Pekanbaru dengan minat kuat di bidang rekayasa perangkat lunak, pengembangan web, pengembangan aplikasi desktop, sistem basis data, dan kecerdasan buatan. Saya memiliki pengalaman kepemimpinan melalui berbagai peran organisasi dan terus meningkatkan keterampilan teknis serta profesional melalui proyek nyata dan solusi berbasis teknologi.",
      heroStatement:
        "Membangun solusi digital melalui pengembangan perangkat lunak, teknologi modern, dan pembelajaran berkelanjutan.",
      cvUrl: "/documents/CV.pdf",
      email: "ihwalmaulana@example.com",
      whatsapp: "+62 xxx-xxxx-xxxx",
      linkedin: "https://linkedin.com/in/ihwal-maulana",
      github: "https://github.com/walzetass",
      website: "https://www.portofoliobywal.my.id",
      profileImage: "/images/profile.png",
    },
    create: {
      id: 1,
      name: "M. Ihwal Maulana",
      title: "Mahasiswa Informatika | Full Stack Developer | AI Enthusiast",
      summary:
        "Saya adalah mahasiswa Manajemen Informatika di Politeknik LP3I Pekanbaru dengan minat kuat di bidang rekayasa perangkat lunak, pengembangan web, pengembangan aplikasi desktop, sistem basis data, dan kecerdasan buatan. Saya memiliki pengalaman kepemimpinan melalui berbagai peran organisasi dan terus meningkatkan keterampilan teknis serta profesional melalui proyek nyata dan solusi berbasis teknologi.",
      heroStatement:
        "Membangun solusi digital melalui pengembangan perangkat lunak, teknologi modern, dan pembelajaran berkelanjutan.",
      cvUrl: "/documents/CV.pdf",
      profileImage: "/images/profile.png",
      email: "ihwalmaulana@example.com",
      whatsapp: "+62 xxx-xxxx-xxxx",
      linkedin: "https://linkedin.com/in/ihwal-maulana",
      github: "https://github.com/walzetass",
      website: "https://www.portofoliobywal.my.id",
    },
  });

  const pendidikan = [
    {
      institution: "Politeknik LP3I Pekanbaru",
      degree: "Manajemen Informatika",
      period: "2025 - Sekarang",
      description: "Mempelajari pengembangan perangkat lunak, sistem basis data, analisis sistem, teknologi web, jaringan komputer, dan implementasi sistem informasi.",
      order: 0,
    },
    {
      institution: "SMA Negeri 2 Kubu Babussalam",
      degree: "SMA",
      period: "2022 - 2025",
      description: "Aktif dalam kegiatan akademik dan organisasi sekaligus mengembangkan keterampilan kepemimpinan, komunikasi, dan kerja sama tim.",
      order: 1,
    },
  ];
  for (const edu of pendidikan) {
    await prisma.education.create({ data: edu });
  }

  const pengalaman = [
    {
      role: "Ketua",
      organization: "Badan Eksekutif Mahasiswa (BEM)",
      location: "Politeknik LP3I Pekanbaru",
      responsibilities: JSON.stringify([
        "Memimpin kegiatan organisasi mahasiswa",
        "Mengkoordinasikan program kerja antar departemen",
        "Mengelola komunikasi internal dan kolaborasi tim",
        "Mendukung acara dan inisiatif kampus",
      ]),
      order: 0,
    },
    {
      role: "Ketua",
      organization: "LP3I Computer Club (LCC)",
      location: "Politeknik LP3I Pekanbaru",
      responsibilities: JSON.stringify([
        "Memimpin kegiatan komunitas teknologi",
        "Menyelenggarakan workshop dan pelatihan",
        "Membimbing mahasiswa dalam proyek teknologi",
        "Mendorong inovasi dan pengembangan digital",
      ]),
      order: 1,
    },
    {
      role: "Ketua",
      organization: "Organisasi Siswa Intra Sekolah (OSIS)",
      location: "SMA Negeri 2 Kubu Babussalam",
      responsibilities: JSON.stringify([
        "Mengelola kegiatan dan acara siswa",
        "Mengkoordinasikan program sekolah bersama pihak administrasi",
        "Membangun budaya kepemimpinan dan kerja sama tim",
        "Mewakili siswa dalam urusan sekolah",
      ]),
      order: 2,
    },
  ];
  for (const exp of pengalaman) {
    await prisma.experience.create({ data: exp });
  }

  const keahlian = [
    { name: "JavaScript", level: 85, category: "Bahasa Pemrograman", order: 0 },
    { name: "TypeScript", level: 80, category: "Bahasa Pemrograman", order: 1 },
    { name: "Java", level: 70, category: "Bahasa Pemrograman", order: 2 },
    { name: "SQL", level: 75, category: "Bahasa Pemrograman", order: 3 },
    { name: "HTML", level: 95, category: "Bahasa Pemrograman", order: 4 },
    { name: "CSS", level: 90, category: "Bahasa Pemrograman", order: 5 },
    { name: "React", level: 85, category: "Framework & Teknologi", order: 0 },
    { name: "Next.js", level: 80, category: "Framework & Teknologi", order: 1 },
    { name: "Node.js", level: 75, category: "Framework & Teknologi", order: 2 },
    { name: "Electron", level: 70, category: "Framework & Teknologi", order: 3 },
    { name: "Tailwind CSS", level: 90, category: "Framework & Teknologi", order: 4 },
    { name: "Supabase", level: 65, category: "Framework & Teknologi", order: 5 },
    { name: "SQLite", level: 70, category: "Framework & Teknologi", order: 6 },
    { name: "Git", level: 80, category: "Tools Pengembangan", order: 0 },
    { name: "GitHub", level: 85, category: "Tools Pengembangan", order: 1 },
    { name: "VS Code", level: 90, category: "Tools Pengembangan", order: 2 },
    { name: "Prompt Engineering", level: 85, category: "Kompetensi Tambahan", order: 0 },
    { name: "AI Tools", level: 80, category: "Kompetensi Tambahan", order: 1 },
    { name: "Dasar UI/UX", level: 70, category: "Kompetensi Tambahan", order: 2 },
    { name: "Analisis Sistem", level: 75, category: "Kompetensi Tambahan", order: 3 },
    { name: "Manajemen Proyek", level: 70, category: "Kompetensi Tambahan", order: 4 },
  ];
  for (const skill of keahlian) {
    await prisma.skill.create({ data: skill });
  }

  const proyek = [
    {
      title: "ZetassPOS",
      description: "Aplikasi Point of Sale desktop untuk mengelola transaksi penjualan, produk, dan pelaporan bisnis.",
      features: JSON.stringify(["Manajemen Produk", "Transaksi Penjualan", "Sistem Pelaporan", "Database SQLite", "Dukungan Multi-user"]),
      techStack: JSON.stringify(["Electron", "React", "TypeScript", "SQLite", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-cyan-500 to-blue-500",
      order: 0,
    },
    {
      title: "ZetassKost",
      description: "Sistem manajemen kos untuk mengelola kamar, penyewa, dan pelaporan keuangan.",
      features: JSON.stringify(["Manajemen Kamar", "Manajemen Penyewa", "Monitoring Pembayaran", "Pelaporan Keuangan"]),
      techStack: JSON.stringify(["Next.js", "React", "Supabase", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-purple-500 to-pink-500",
      order: 1,
    },
    {
      title: "Sistem Absensi LCC",
      description: "Sistem absensi berbasis QR dengan analitik, peringkat, dan pembuatan sertifikat untuk LP3I Computer Club.",
      features: JSON.stringify(["Absensi QR", "Analitik Kehadiran", "Sistem Peringkat", "Pembuatan Sertifikat"]),
      techStack: JSON.stringify(["Next.js", "React", "Supabase", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-green-500 to-emerald-500",
      order: 2,
    },
    {
      title: "Sistem Kartu Pelajar Digital",
      description: "Sistem identifikasi siswa digital dengan verifikasi QR dan dashboard administrasi.",
      features: JSON.stringify(["Pembuatan ID Digital", "Verifikasi QR", "Manajemen Data", "Dashboard Administrasi"]),
      techStack: JSON.stringify(["Next.js", "React", "Supabase", "Tailwind CSS"]),
      demoUrl: "#",
      repoUrl: "#",
      color: "from-orange-500 to-amber-500",
      order: 3,
    },
    {
      title: "Website Portfolio",
      description: "Website portfolio profesional dengan manajemen konten, showcase proyek, dan optimasi SEO.",
      features: JSON.stringify(["Manajemen Konten", "Showcase Proyek", "Desain Responsif", "Optimasi SEO"]),
      techStack: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS"]),
      demoUrl: "https://www.portofoliobywal.my.id",
      repoUrl: "#",
      color: "from-red-500 to-indigo-500",
      order: 4,
    },
  ];
  for (const proj of proyek) {
    await prisma.project.create({ data: proj });
  }

  const sertifikasi = [
    {
      title: "Dasar Pengembangan Web",
      issuer: "Platform Pembelajaran Online",
      date: "2025",
      category: "Pengembangan Web",
      description: "Kursus komprehensif mencakup HTML, CSS, JavaScript, dan prinsip desain web responsif.",
      color: "from-cyan-500 to-blue-500",
      order: 0,
    },
    {
      title: "Pengembangan React & Next.js",
      issuer: "Platform Pembelajaran Online",
      date: "2025",
      category: "Pengembangan Web",
      description: "Kursus lanjutan tentang membangun aplikasi web modern dengan React dan framework Next.js.",
      color: "from-blue-500 to-indigo-500",
      order: 1,
    },
    {
      title: "Desain Database & SQL",
      issuer: "Platform Pembelajaran Online",
      date: "2025",
      category: "Database",
      description: "Kursus mencakup desain database relasional, query SQL, normalisasi, dan optimasi.",
      color: "from-green-500 to-emerald-500",
      order: 2,
    },
    {
      title: "JavaScript & TypeScript Mastery",
      issuer: "Platform Pembelajaran Online",
      date: "2025",
      category: "Pemrograman",
      description: "Kursus mendalam tentang fitur JavaScript ES6+ dan TypeScript untuk membangun aplikasi type-safe.",
      color: "from-yellow-500 to-orange-500",
      order: 3,
    },
    {
      title: "AI & Prompt Engineering",
      issuer: "Platform Pembelajaran Online",
      date: "2025",
      category: "AI & Teknologi",
      description: "Kursus tentang memanfaatkan alat kecerdasan buatan dan teknik prompt engineering yang efektif.",
      color: "from-purple-500 to-pink-500",
      order: 4,
    },
    {
      title: "Dasar Manajemen Proyek",
      issuer: "Platform Pembelajaran Online",
      date: "2025",
      category: "Manajemen",
      description: "Fundamental manajemen proyek termasuk perencanaan, eksekusi, dan koordinasi tim.",
      color: "from-red-500 to-rose-500",
      order: 5,
    },
  ];
  for (const cert of sertifikasi) {
    await prisma.certification.create({ data: cert });
  }

  console.log("Database berhasil di-seed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
