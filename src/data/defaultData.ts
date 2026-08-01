import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  hero: {
    greeting: 'Halo, Saya',
    name: 'M. Ihwal Maulana',
    title: 'Full Stack Developer',
    subtitle: 'AI Application Builder',
    description: 'Pengembang perangkat lunak berpengalaman yang berfokus membangun aplikasi web modern, sistem berskala besar, serta solusi AI cerdas yang intuitif dan berdampak tinggi.',
    badges: [
      '✨ AI Enthusiast',
      '💻 Full Stack Developer',
      '🚀 Building Useful Products'
    ],
    primaryCtaText: 'View Projects',
    secondaryCtaText: 'Contact Me',
    resumeUrl: '/sample-resume.pdf',
    mockupImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    isAvailableForHire: true
  },
  about: {
    title: 'Tentang Saya',
    subtitle: 'Passionate in building scalable web apps & intelligent AI agents',
    bioParagraphs: [
      'Saya adalah seorang Full Stack Developer dan AI Application Builder yang memiliki passion mendalam terhadap pembuatan perangkat lunak berarsitektur bersih, responsif, dan kaya fitur.',
      'Dengan pengalaman menangani berbagai proyek dari ide awal hingga deployment ke cloud, saya mengombinasikan keahlian teknik modern dengan prinsip UI/UX minimalis bergaya Apple & Linear.'
    ],
    focus: [
      'Membangun Aplikasi Full Stack Modern (React, Node.js, Next.js, Express)',
      'Integrasi Model Generative AI (Gemini API, LLMs, Function Calling)',
      'Desain UI/UX Minimalis, Aksesibel, dan Berkecepatan Tinggi',
      'Arsitektur Backend Cloud, Database Relasional & NoSQL Scalable'
    ],
    passion: 'Menggabungkan keindahan estetika antarmuka dengan performa kode backend yang solid untuk memberikan pengalaman pengguna terbaik.',
    goals: [
      'Mengembangkan solusi perangkat lunak bernilai tinggi untuk klien & bisnis global.',
      'Terus mengeksplorasi batas kemampuan teknologi Generative AI & Autonomous Agents.',
      'Membangun produk SaaS mandiri yang mempermudah workflow harian pengembang.'
    ],
    stats: {
      totalProjects: 18,
      yearsExperience: 4,
      technologiesCount: 24,
      githubContributions: 1420
    },
    highlights: [
      'Berhasil menyelesaikan 18+ proyek web & AI kelas enterprise.',
      'Mendesain CMS Admin kustom dengan arsitektur modular & performa >95 Lighthouse.',
      'Aktif berkontribusi pada ekosistem open-source dan komunitas developer.'
    ],
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    profileImageSecondary: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photoGallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    ],
    avatarFrameStyle: '3d-glass',
    avatarBadgeText: 'Full Stack & AI Builder'
  },
  skills: [
    {
      id: 'sk-1',
      name: 'TypeScript & JavaScript',
      category: 'Frontend',
      iconName: 'Code',
      level: 'Expert',
      percentage: 95,
      order: 1,
      isActive: true
    },
    {
      id: 'sk-2',
      name: 'React 19 & Next.js',
      category: 'Frontend',
      iconName: 'Layout',
      level: 'Expert',
      percentage: 92,
      order: 2,
      isActive: true
    },
    {
      id: 'sk-3',
      name: 'Tailwind CSS v4',
      category: 'Frontend',
      iconName: 'Palette',
      level: 'Expert',
      percentage: 95,
      order: 3,
      isActive: true
    },
    {
      id: 'sk-4',
      name: 'Node.js & Express',
      category: 'Backend',
      iconName: 'Server',
      level: 'Expert',
      percentage: 90,
      order: 4,
      isActive: true
    },
    {
      id: 'sk-5',
      name: 'RESTful API & GraphQL',
      category: 'Backend',
      iconName: 'Cpu',
      level: 'Advanced',
      percentage: 88,
      order: 5,
      isActive: true
    },
    {
      id: 'sk-6',
      name: 'Google Gemini API & GenAI',
      category: 'AI',
      iconName: 'Sparkles',
      level: 'Expert',
      percentage: 92,
      order: 6,
      isActive: true
    },
    {
      id: 'sk-7',
      name: 'LLM Agents & Function Calling',
      category: 'AI',
      iconName: 'Bot',
      level: 'Advanced',
      percentage: 86,
      order: 7,
      isActive: true
    },
    {
      id: 'sk-8',
      name: 'PostgreSQL & Drizzle ORM',
      category: 'Database',
      iconName: 'Database',
      level: 'Advanced',
      percentage: 85,
      order: 8,
      isActive: true
    },
    {
      id: 'sk-9',
      name: 'Firestore & Firebase Auth',
      category: 'Database',
      iconName: 'Flame',
      level: 'Expert',
      percentage: 90,
      order: 9,
      isActive: true
    },
    {
      id: 'sk-10',
      name: 'React Native / Expo',
      category: 'Mobile',
      iconName: 'Smartphone',
      level: 'Intermediate',
      percentage: 78,
      order: 10,
      isActive: true
    },
    {
      id: 'sk-11',
      name: 'Docker & Containerization',
      category: 'DevOps',
      iconName: 'Box',
      level: 'Intermediate',
      percentage: 80,
      order: 11,
      isActive: true
    },
    {
      id: 'sk-12',
      name: 'Git, GitHub Actions & CI/CD',
      category: 'DevOps',
      iconName: 'GitBranch',
      level: 'Advanced',
      percentage: 88,
      order: 12,
      isActive: true
    },
    {
      id: 'sk-13',
      name: 'Vite, Esbuild & Webpack',
      category: 'Tools',
      iconName: 'Zap',
      level: 'Expert',
      percentage: 92,
      order: 13,
      isActive: true
    },
    {
      id: 'sk-14',
      name: 'Figma & UI Prototyping',
      category: 'Tools',
      iconName: 'Figma',
      level: 'Advanced',
      percentage: 85,
      order: 14,
      isActive: true
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'AI Studio SaaS Platform',
      slug: 'ai-studio-saas',
      description: 'Platform AI generatif untuk pembuatan konten multi-modal otomatis dengan fitur visual workflow builder dan analitik realtime.',
      longDescription: 'SaaS AI lengkap yang memungkinkan enterprise mengotomatiskan alur kerja pemrosesan dokumen, pembuatan gambar, dan analisis teks berkecepatan tinggi dengan integrasi Google Gemini API.',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Gemini API', 'PostgreSQL'],
      githubUrl: 'https://github.com/ihwalmaulana/ai-studio-saas',
      liveDemoUrl: 'https://demo-aistudio.example.com',
      status: 'Completed',
      isFeatured: true,
      category: 'Full Stack & AI',
      year: '2026',
      order: 1
    },
    {
      id: 'proj-2',
      title: 'Nexus Workflow Engine',
      slug: 'nexus-workflow',
      description: 'Sistem manajemen tugas berskala besar dengan canvas interaktif, drag & drop nodes, dan sinkronisasi real-time.',
      longDescription: 'Visual canvas workflow builder bergaya Linear yang mendukung integrasi webhook, automasi tugas berantai, dan kolaborasi multi-user.',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
      ],
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebSockets'],
      githubUrl: 'https://github.com/ihwalmaulana/nexus-workflow',
      liveDemoUrl: 'https://nexus-demo.example.com',
      status: 'Completed',
      isFeatured: true,
      category: 'Web App',
      year: '2025',
      order: 2
    },
    {
      id: 'proj-3',
      title: 'Smart Document Analyzer AI',
      slug: 'smart-doc-analyzer',
      description: 'Aplikasi ekstraksi data dokumen finansial dan riset hukum menggunakan multimodal Gemini Flash & OCR.',
      longDescription: 'Menganalisis file PDF, spreadsheet, dan gambar struk belanjaan dalam waktu kurang dari 2 detik untuk mengekstrak entitas kunci ke bentuk JSON terstruktur.',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
      ],
      techStack: ['React', 'Express', 'Gemini API', 'Tailwind CSS', 'PDF.js'],
      githubUrl: 'https://github.com/ihwalmaulana/smart-doc-analyzer',
      liveDemoUrl: 'https://doc-ai.example.com',
      status: 'Completed',
      isFeatured: true,
      category: 'AI Application',
      year: '2025',
      order: 3
    },
    {
      id: 'proj-4',
      title: 'DevConnect Developer Hub',
      slug: 'devconnect-hub',
      description: 'Komunitas platform sosial developer tempat berbagi snippet kode, mencari rekan tim proyek, dan kolaborasi open-source.',
      longDescription: 'Platform komunitas interaktif dengan sistem feed real-time, Markdown code viewer dengan syntax highlighting, serta OAuth GitHub.',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
      ],
      techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Socket.io'],
      githubUrl: 'https://github.com/ihwalmaulana/devconnect-hub',
      liveDemoUrl: 'https://devconnect.example.com',
      status: 'Completed',
      isFeatured: true,
      category: 'Web App',
      year: '2025',
      order: 4
    },
    {
      id: 'proj-5',
      title: 'Pulse Analytics Dashboard',
      slug: 'pulse-analytics',
      description: 'Dashboard pemantauan performa server dan metriks trafik situs web berkecepatan ultra tinggi dengan chart interaktif.',
      longDescription: 'Sistem dasbor analitik real-time yang memvisualisasikan data log server, latency, throughput, serta perilaku pengunjung secara mendalam.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
      ],
      techStack: ['React', 'Recharts', 'Tailwind CSS', 'Express', 'Redis'],
      githubUrl: 'https://github.com/ihwalmaulana/pulse-analytics',
      liveDemoUrl: 'https://pulse.example.com',
      status: 'Completed',
      isFeatured: true,
      category: 'Dashboard',
      year: '2024',
      order: 5
    },
    {
      id: 'proj-6',
      title: 'GenAI Chatbot Suite',
      slug: 'genai-chatbot-suite',
      description: 'Widget obrolan AI tingkat lanjut yang dapat disematkan di berbagai website dengan basis pengetahuan kustom.',
      longDescription: 'Widget interaktif yang mendukung RAG (Retrieval-Augmented Generation) untuk menjawab pertanyaan pelanggan dari basis data produk secara instan.',
      thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80'
      ],
      techStack: ['TypeScript', 'Gemini API', 'Vector DB', 'Express', 'Tailwind CSS'],
      githubUrl: 'https://github.com/ihwalmaulana/genai-chatbot-suite',
      liveDemoUrl: 'https://genai-bot.example.com',
      status: 'Completed',
      isFeatured: true,
      category: 'AI Application',
      year: '2024',
      order: 6
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Lead Full Stack & AI Developer',
      company: 'Tech Solutions Global',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      period: '2024 - Sekarang',
      location: 'Jakarta / Remote',
      description: 'Memimpin tim pengembang dalam merancang aplikasi SaaS berbasis AI generatif, mengarsitekturi backend microservice, dan mengoptimalkan respon sistem.',
      highlights: [
        'Memimpin pengembangan platform AI SaaS dengan 50k+ pengguna aktif harian.',
        'Mengintegrasikan pipeline LLM Gemini untuk automasi klasifikasi dokumen perusahaan.',
        'Meningkatkan kecepatan load awal aplikasi hingga 45% menggunakan arsitektur modular.'
      ],
      isCurrent: true,
      order: 1
    },
    {
      id: 'exp-2',
      role: 'Senior Frontend Engineer',
      company: 'Inovasi Digital Nusantara',
      companyLogo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
      period: '2022 - 2024',
      location: 'Bandung / Hybrid',
      description: 'Mengembangkan antarmuka pengguna berefisiensi tinggi untuk dashboard analitik dan platform e-commerce enterprise.',
      highlights: [
        'Membangun design system internal berbahan dasar Tailwind CSS & Radix UI.',
        'Mengimplementasikan state management global berlatensi rendah untuk visualisasi data real-time.'
      ],
      isCurrent: false,
      order: 2
    },
    {
      id: 'exp-3',
      role: 'Full Stack Web Developer',
      company: 'Creative Studio Software',
      companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
      period: '2021 - 2022',
      location: 'Surakarta / On-site',
      description: 'Mengembangkan aplikasi web klien dari konseptualisasi UI/UX hingga deployment server.',
      highlights: [
        'Selesai mengirimkan 12+ proyek kustom sesuai deadline klien dengan skor kepuasan 98%.'
      ],
      isCurrent: false,
      order: 3
    }
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'Universitas Indonesia (UI) / ITB',
      degree: 'S1 Teknik Informatika / Sistem Informasi',
      period: '2020 - 2024',
      location: 'Indonesia',
      grade: 'IPK 3.88 (Cum Laude)',
      description: 'Fokus studi pada Rekayasa Perangkat Lunak, Arsitektur Sistem Terdistribusi, Cloud Computing, dan Implementasi Model Generative AI.',
      activities: [
        'Ketua Unit Kegiatan Mahasiswa (UKM) Software Engineering Club',
        'Juara 1 National Hackathon Developer Competition 2023',
        'Asisten Dosen Pemrograman Web & Struktur Data'
      ],
      order: 1
    },
    {
      id: 'edu-2',
      institution: 'SMK Negeri 1 / SMA Negeri (Jurusan RPL & MIPA)',
      degree: 'Rekayasa Perangkat Lunak (RPL)',
      period: '2017 - 2020',
      location: 'Indonesia',
      grade: 'Lulusan Terbaik Jurusan',
      description: 'Mempelajari dasar-dasar algoritma, logika pemrograman, rekayasa web (HTML, CSS, JavaScript, PHP, MySQL), dan pengelolaan basis data.',
      activities: [
        'Ketua Ekstrakurikuler Programming & Cyber Security',
        'Wakil Sekolah Olimpiade Sains Nasional (OSN) Komputer'
      ],
      order: 2
    }
  ],
  techStack: [
    {
      id: 'ts-1',
      name: 'React',
      category: 'Frontend',
      iconName: 'Atom',
      officialDocUrl: 'https://react.dev',
      isFeatured: true,
      order: 1
    },
    {
      id: 'ts-2',
      name: 'TypeScript',
      category: 'Language',
      iconName: 'Code',
      officialDocUrl: 'https://www.typescriptlang.org',
      isFeatured: true,
      order: 2
    },
    {
      id: 'ts-3',
      name: 'Tailwind CSS',
      category: 'Styling',
      iconName: 'Palette',
      officialDocUrl: 'https://tailwindcss.com',
      isFeatured: true,
      order: 3
    },
    {
      id: 'ts-4',
      name: 'Node.js',
      category: 'Backend',
      iconName: 'Server',
      officialDocUrl: 'https://nodejs.org',
      isFeatured: true,
      order: 4
    },
    {
      id: 'ts-5',
      name: 'Google Gemini AI',
      category: 'AI Model',
      iconName: 'Sparkles',
      officialDocUrl: 'https://ai.google.dev',
      isFeatured: true,
      order: 5
    },
    {
      id: 'ts-6',
      name: 'PostgreSQL',
      category: 'Database',
      iconName: 'Database',
      officialDocUrl: 'https://www.postgresql.org',
      isFeatured: true,
      order: 6
    },
    {
      id: 'ts-7',
      name: 'Express.js',
      category: 'Backend',
      iconName: 'Cpu',
      officialDocUrl: 'https://expressjs.com',
      isFeatured: true,
      order: 7
    },
    {
      id: 'ts-8',
      name: 'Framer Motion',
      category: 'Animation',
      iconName: 'Activity',
      officialDocUrl: 'https://www.framer.com/motion/',
      isFeatured: true,
      order: 8
    }
  ],
  contact: {
    email: 'ihwalmaulana09@gmail.com',
    whatsapp: '+6281234567890',
    linkedin: 'https://linkedin.com/in/m-ihwal-maulana',
    github: 'https://github.com/ihwalmaulana',
    instagram: 'https://instagram.com/ihwalmaulana',
    facebook: 'https://facebook.com/ihwalmaulana',
    x: 'https://x.com/ihwalmaulana',
    discord: 'ihwalmaulana#1234',
    location: 'Indonesia (GMT+7)'
  },
  resumes: [
    {
      id: 'res-1',
      version: 'v2.4 (Terbaru)',
      title: 'M_Ihwal_Maulana_Resume_2026.pdf',
      uploadDate: '2026-06-15',
      downloadCount: 142,
      pdfUrl: '/sample-resume.pdf',
      isActive: true
    },
    {
      id: 'res-2',
      version: 'v2.0',
      title: 'M_Ihwal_Maulana_Resume_2025.pdf',
      uploadDate: '2025-01-10',
      downloadCount: 89,
      pdfUrl: '/sample-resume-old.pdf',
      isActive: false
    }
  ],
  theme: {
    primaryColor: '#10B981',
    primaryHoverColor: '#059669',
    logoText: 'M. Ihwal Maulana',
    favicon: '/favicon.ico',
    seoTitle: 'M. Ihwal Maulana | Full Stack Developer & AI Application Builder',
    seoDescription: 'Personal Portfolio & Showcase M. Ihwal Maulana - Pengembang aplikasi web modern, Full Stack Developer, dan AI Application Builder.',
    ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    googleAnalyticsId: 'G-MEASUREMENT_ID',
    searchConsoleVerification: 'google-site-verification-token'
  },
  navigation: [
    { id: 'nav-1', label: 'Home', href: '#hero', order: 1, isVisible: true },
    { id: 'nav-2', label: 'About', href: '#about', order: 2, isVisible: true },
    { id: 'nav-3', label: 'Skills', href: '#skills', order: 3, isVisible: true },
    { id: 'nav-4', label: 'Projects', href: '#projects', order: 4, isVisible: true },
    { id: 'nav-5', label: 'Experience', href: '#experience', order: 5, isVisible: true },
    { id: 'nav-6', label: 'Contact', href: '#contact', order: 6, isVisible: true }
  ],
  layoutSections: [
    { id: 'sec-1', sectionKey: 'hero', title: 'Hero Section', order: 1, isVisible: true },
    { id: 'sec-2', sectionKey: 'about', title: 'About Section', order: 2, isVisible: true },
    { id: 'sec-3', sectionKey: 'skills', title: 'Skills Grid', order: 3, isVisible: true },
    { id: 'sec-4', sectionKey: 'projects', title: 'Featured Projects', order: 4, isVisible: true },
    { id: 'sec-5', sectionKey: 'experience', title: 'Work Experience', order: 5, isVisible: true },
    { id: 'sec-6', sectionKey: 'techstack', title: 'Official Tech Stack', order: 6, isVisible: true },
    { id: 'sec-7', sectionKey: 'github', title: 'GitHub Contributions', order: 7, isVisible: true },
    { id: 'sec-8', sectionKey: 'contact', title: 'Contact & Form', order: 8, isVisible: true }
  ],
  inbox: [
    {
      id: 'msg-1',
      name: 'Rian Hidayat',
      email: 'rian@techcorp.co.id',
      message: 'Halo Mas Ihwal, kami sangat terkesan dengan portfolio Anda. Apakah Anda bersedia mendiskusikan peluang proyek AI SaaS enterprise?',
      createdAt: '2026-07-28T10:15:00.000Z',
      status: 'unread'
    },
    {
      id: 'msg-2',
      name: 'Sarah Amalia',
      email: 'sarah.design@agency.com',
      message: 'Hi Ihwal, mau bertanya terkait availabilitas freelance untuk pembangunan MVP aplikasi berbasis Next.js dan Gemini AI. Terima kasih!',
      createdAt: '2026-07-25T14:30:00.000Z',
      status: 'read',
      replyNotes: 'Direspon via WhatsApp tanggal 26 Juli'
    }
  ],
  media: [
    {
      id: 'med-1',
      name: 'hero-mockup.webp',
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      fileType: 'image',
      size: 342000,
      folder: 'Hero',
      uploadedAt: '2026-07-20'
    },
    {
      id: 'med-2',
      name: 'project-ai-studio.webp',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      fileType: 'image',
      size: 215000,
      folder: 'Projects',
      uploadedAt: '2026-07-18'
    },
    {
      id: 'med-3',
      name: 'M_Ihwal_Maulana_Resume.pdf',
      url: '/sample-resume.pdf',
      fileType: 'document',
      size: 840000,
      folder: 'Documents',
      uploadedAt: '2026-06-15'
    }
  ],
  activityLogs: [
    {
      id: 'log-1',
      action: 'Project Ditambahkan',
      details: 'Project "AI Studio SaaS Platform" telah ditambahkan ke Featured Projects.',
      timestamp: '2026-07-29T18:20:00.000Z',
      user: 'Admin'
    },
    {
      id: 'log-2',
      action: 'SEO Updated',
      details: 'Meta title & description diperbarui untuk performa SEO optimal.',
      timestamp: '2026-07-28T09:10:00.000Z',
      user: 'Admin'
    },
    {
      id: 'log-3',
      action: 'Skill Manager Updated',
      details: 'Level kemahiran "Google Gemini API & GenAI" diubah ke Expert.',
      timestamp: '2026-07-26T15:45:00.000Z',
      user: 'Admin'
    },
    {
      id: 'log-4',
      action: 'Admin Login',
      details: 'Berhasil masuk ke Dashboard Admin CMS.',
      timestamp: '2026-07-30T05:00:00.000Z',
      user: 'Admin'
    }
  ],
  settings: {
    websiteName: 'M. Ihwal Maulana Portfolio',
    logo: 'M. Ihwal Maulana',
    favicon: '/favicon.ico',
    footerText: '© 2026 M. Ihwal Maulana. All rights reserved.',
    maintenanceMode: false,
    analyticsEnabled: true,
    lastUpdate: '2026-07-30T05:20:00.000Z'
  },
  github: {
    username: 'ihwalmaulana',
    totalRepos: 34,
    followers: 188,
    stars: 420,
    topLanguages: [
      { name: 'TypeScript', percentage: 54, color: '#3178c6' },
      { name: 'JavaScript', percentage: 22, color: '#f1e05a' },
      { name: 'HTML / CSS', percentage: 14, color: '#e34c26' },
      { name: 'Python', percentage: 10, color: '#3572A5' }
    ],
    featuredRepos: [
      {
        name: 'ai-studio-saas-platform',
        description: 'Multi-modal AI generative application built with React 19, Gemini API, Express & TypeScript.',
        language: 'TypeScript',
        stars: 128,
        forks: 34,
        url: 'https://github.com/ihwalmaulana/ai-studio-saas-platform'
      },
      {
        name: 'nexus-linear-workflow',
        description: 'Interactive canvas node workflow builder with drag & drop mechanics.',
        language: 'TypeScript',
        stars: 96,
        forks: 19,
        url: 'https://github.com/ihwalmaulana/nexus-linear-workflow'
      },
      {
        name: 'gemini-agent-toolkit',
        description: 'TypeScript helpers & function calling agent utilities for Gemini LLMs.',
        language: 'TypeScript',
        stars: 154,
        forks: 42,
        url: 'https://github.com/ihwalmaulana/gemini-agent-toolkit'
      }
    ]
  },
  stats: {
    visitors: 3480,
    pageviews: 8920,
    totalContactCount: 24
  }
};
