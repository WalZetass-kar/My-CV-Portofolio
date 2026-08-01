export type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'AI' | 'DevOps' | 'Tools';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface HeroData {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  badges: string[];
  primaryCtaText: string;
  secondaryCtaText: string;
  resumeUrl: string;
  mockupImage?: string;
  isAvailableForHire: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  description?: string;
  grade?: string;
  activities?: string[];
  logo?: string;
  order: number;
}

export interface AboutData {
  title: string;
  subtitle: string;
  bioParagraphs: string[];
  focus: string[];
  passion: string;
  goals: string[];
  stats: {
    totalProjects: number;
    yearsExperience: number;
    technologiesCount: number;
    githubContributions: number;
  };
  profileImage?: string;
  profileImageSecondary?: string;
  photoGallery?: string[];
  avatarFrameStyle?: '3d-glass' | 'neon-ring' | 'cyber-card' | 'polaroid';
  avatarBadgeText?: string;
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  iconName: string;
  level: SkillLevel;
  percentage: number;
  order: number;
  isActive: boolean;
}

export type ProjectStatus = 'Completed' | 'In Progress' | 'Archived';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  gallery: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl: string;
  status: ProjectStatus;
  isFeatured: boolean;
  category: string;
  year: string;
  order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  isCurrent: boolean;
  order: number;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  officialDocUrl: string;
  isFeatured: boolean;
  order: number;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  instagram: string;
  facebook: string;
  x: string;
  discord: string;
  location: string;
}

export interface ResumeVersion {
  id: string;
  version: string;
  title: string;
  uploadDate: string;
  downloadCount: number;
  pdfUrl: string;
  isActive: boolean;
}

export interface ThemeConfig {
  primaryColor: string;
  primaryHoverColor: string;
  logoText: string;
  favicon?: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  googleAnalyticsId?: string;
  searchConsoleVerification?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  isPublished: boolean;
}

export type SectionKey = 'hero' | 'about' | 'skills' | 'projects' | 'certifications' | 'experience' | 'blogs' | 'techstack' | 'github' | 'contact';


export interface LayoutSection {
  id: string;
  sectionKey: SectionKey;
  title: string;
  order: number;
  isVisible: boolean;
}

export type InboxStatus = 'unread' | 'read' | 'replied';

export interface ContactInboxMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: InboxStatus;
  replyNotes?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  fileType: 'image' | 'document';
  size: number;
  folder: string;
  uploadedAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  user: string;
}

export interface SiteSettings {
  websiteName: string;
  logo: string;
  favicon: string;
  footerText: string;
  maintenanceMode: boolean;
  analyticsEnabled: boolean;
  lastUpdate: string;
}

export interface GithubProfileData {
  username: string;
  totalRepos: number;
  followers: number;
  stars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  featuredRepos: {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    url: string;
  }[];
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: Skill[];
  projects: Project[];
  certifications?: Certification[];
  experiences: Experience[];
  blogs?: BlogPost[];
  educations: Education[];
  techStack: TechStackItem[];
  contact: ContactInfo;
  resumes: ResumeVersion[];
  theme: ThemeConfig;
  navigation: NavigationItem[];
  layoutSections: LayoutSection[];
  inbox: ContactInboxMessage[];
  media: MediaItem[];
  activityLogs: ActivityLog[];
  settings: SiteSettings;
  github: GithubProfileData;
  stats: {
    visitors: number;
    pageviews: number;
    totalContactCount: number;
  };
}
