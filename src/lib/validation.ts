import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  summary: z.string().max(5000).default(""),
  heroStatement: z.string().max(500).default(""),
  cvUrl: z.string().max(500).default(""),
  email: z.string().email().or(z.literal("")).default(""),
  whatsapp: z.string().max(50).default(""),
  linkedin: z.string().max(500).default(""),
  github: z.string().max(500).default(""),
  website: z.string().max(500).default(""),
  profileImage: z.string().max(500).default(""),
});

export const educationSchema = z.object({
  institution: z.string().min(1).max(200),
  degree: z.string().min(1).max(200),
  period: z.string().min(1).max(50),
  description: z.string().max(2000).default(""),
  order: z.number().int().min(0).max(1000).default(0),
});

export const experienceSchema = z.object({
  role: z.string().min(1).max(200),
  organization: z.string().min(1).max(200),
  location: z.string().min(1).max(200),
  responsibilities: z.string().max(5000).default("[]"),
  order: z.number().int().min(0).max(1000).default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1).max(100),
  level: z.number().int().min(0).max(100),
  category: z.string().min(1).max(100),
  order: z.number().int().min(0).max(1000).default(0),
});

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).default(""),
  features: z.string().max(5000).default("[]"),
  techStack: z.string().max(2000).default("[]"),
  demoUrl: z.string().max(500).default("#"),
  repoUrl: z.string().max(500).default("#"),
  color: z.string().max(200).default("from-red-500 to-orange-500"),
  image: z.string().max(500).default(""),
  order: z.number().int().min(0).max(1000).default(0),
});

export const certificationSchema = z.object({
  title: z.string().min(1).max(200),
  issuer: z.string().min(1).max(200),
  date: z.string().min(1).max(50),
  category: z.string().min(1).max(100),
  description: z.string().max(2000).default(""),
  color: z.string().max(200).default("from-red-500 to-orange-500"),
  image: z.string().max(500).default(""),
  fileUrl: z.string().max(500).default(""),
  order: z.number().int().min(0).max(1000).default(0),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export const idSchema = z.object({
  id: z.number().int().positive(),
});

export const idWithUpdateSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  schema.extend({ id: z.number().int().positive() });

export const ALLOWED_UPLOAD_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "application/pdf",
];

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || now > attempt.resetAt) {
    loginAttempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (attempt.count >= maxAttempts) return false;
  attempt.count++;
  return true;
}
