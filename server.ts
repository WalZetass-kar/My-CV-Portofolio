import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { defaultPortfolioData } from './src/data/defaultData.ts';
import { PortfolioData } from './src/types.ts';

dotenv.config();

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production';
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio_db.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Initialize Gemini AI Client
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const aiClient = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Atomic Safe Database Reader
function getDatabase(): PortfolioData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content) as PortfolioData;
    }
  } catch (err) {
    console.error('Error reading DB, using default seed:', err);
  }
  saveDatabase(defaultPortfolioData);
  return defaultPortfolioData;
}

// Atomic Safe Database Writer
function saveDatabase(data: PortfolioData): void {
  try {
    data.settings.lastUpdate = new Date().toISOString();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error atomically saving DB:', err);
  }
}

// Helper for activity logs
function logActivity(db: PortfolioData, action: string, details: string) {
  const newLog = {
    id: 'log-' + Date.now(),
    action,
    details,
    timestamp: new Date().toISOString(),
    user: 'Admin'
  };
  db.activityLogs = [newLog, ...(db.activityLogs || [])].slice(0, 100);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).toLowerCase().replace(/[^a-z0-9]/g, '-');
    cb(null, `${basename}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

// Middleware JWT Verification for Admin
function authenticateAdminToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Akses ditolak. Token autentikasi tidak ditemukan.' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Token tidak valid atau telah kedaluwarsa.' });
    }
    (req as any).user = user;
    next();
  });
}

// Rate Limiter
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 submissions per 15 min
  message: { success: false, error: 'Terlalu banyak permintaan pesan. Silakan coba lagi nanti.' }
});

const aiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Terlalu banyak pertanyaan AI. Mohon tunggu sejenak.' }
});

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Serve static uploads
  app.use('/uploads', express.static(UPLOADS_DIR));

  // Dynamic / real Resume PDF serving fallback
  app.get('/sample-resume.pdf', (_req, res) => {
    const db = getDatabase();
    const activeResume = db.resumes.find((r) => r.isActive);
    if (activeResume && activeResume.pdfUrl && activeResume.pdfUrl.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', activeResume.pdfUrl);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.send('%PDF-1.4 ... Resume M. Ihwal Maulana ...');
  });

  // --- PUBLIC API ROUTES ---

  // Get full portfolio data
  app.get('/api/public/portfolio', (_req, res) => {
    const db = getDatabase();
    res.json({ success: true, data: db });
  });

  // Submit contact message (with Rate Limiting)
  app.post('/api/public/contact', contactRateLimiter, (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Nama, email, dan pesan wajib diisi.' });
    }

    const db = getDatabase();
    const newMessage = {
      id: 'msg-' + Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      status: 'unread' as const
    };

    db.inbox = [newMessage, ...(db.inbox || [])];
    db.stats.totalContactCount = (db.stats.totalContactCount || 0) + 1;
    logActivity(db, 'Pesan Baru Diterima', `Pesan dari ${name} (${email}) diterima.`);
    saveDatabase(db);

    res.json({ success: true, message: 'Pesan Anda telah berhasil dikirim! Terima kasih.', data: newMessage });
  });

  // Increment resume download count
  app.post('/api/public/resume/download', (req, res) => {
    const { resumeId } = req.body;
    const db = getDatabase();
    const resume = db.resumes.find((r) => r.id === resumeId) || db.resumes.find((r) => r.isActive);
    if (resume) {
      resume.downloadCount += 1;
      logActivity(db, 'Resume Diunduh', `Resume (${resume.version}) telah diunduh oleh pengunjung.`);
      saveDatabase(db);
    }
    res.json({ success: true, downloadCount: resume ? resume.downloadCount : 0 });
  });

  // --- GEMINI AI ASSISTANT ROUTE ---
  app.post('/api/public/ai-chat', aiRateLimiter, async (req: Request, res: Response) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Pertanyaan tidak boleh kosong.' });
    }

    const db = getDatabase();
    const contextPrompt = `
Anda adalah Antigravity AI Assistant resmi untuk Portofolio dan CV M. Ihwal Maulana.
Gunakan data resmi berikut untuk menjawab pertanyaan pengunjung dengan sopan, ramah, dan profesional dalam bahasa Indonesia:

Profil: ${db.hero.name || 'M. Ihwal Maulana'} (${db.hero.title})
Deskripsi: ${db.hero.description}
Ringkasan Tentang: ${db.about.bioParagraphs.join(' ')}
Keahlian Utama: ${db.skills.map((s) => `${s.name} (${s.level})`).join(', ')}
Proyek Utama: ${db.projects.map((p) => `${p.title} (${p.category}): ${p.description}`).join('; ')}
Pengalaman: ${db.experiences.map((e) => `${e.role} di ${e.company} (${e.period})`).join('; ')}
Kontak: Email ${db.contact.email}, WhatsApp ${db.contact.whatsapp}

Pertanyaan Pengunjung: "${prompt}"
Jawab secara ringkas, jelas, dan fokus pada keahlian serta portfolio Ihwal:
`;

    try {
      if (aiClient) {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: contextPrompt
        });
        const reply = response.text || 'Maaf, saya tidak dapat merumuskan jawaban saat ini.';
        return res.json({ success: true, reply });
      } else {
        // Fallback cerdas tanpa API Key
        const lowerPrompt = prompt.toLowerCase();
        let reply = `Terima kasih telah bertanya! M. Ihwal Maulana adalah seorang Full Stack Developer & AI Application Builder berpengalaman.`;
        if (lowerPrompt.includes('skill') || lowerPrompt.includes('keahlian') || lowerPrompt.includes('stack')) {
          reply = `Ihwal menguasai teknologi modern seperti ${db.skills.slice(0, 5).map(s => s.name).join(', ')}, dan banyak lagi.`;
        } else if (lowerPrompt.includes('proyek') || lowerPrompt.includes('project') || lowerPrompt.includes('portofolio')) {
          reply = `Beberapa proyek unggulan Ihwal antara lain: ${db.projects.slice(0, 3).map(p => p.title).join(', ')}.`;
        } else if (lowerPrompt.includes('kontak') || lowerPrompt.includes('email') || lowerPrompt.includes('wa')) {
          reply = `Anda dapat menghubungi Ihwal via email: ${db.contact.email} atau WhatsApp: ${db.contact.whatsapp}.`;
        }
        return res.json({ success: true, reply });
      }
    } catch (err: any) {
      console.error('Gemini AI API Error:', err);
      res.status(500).json({ success: false, error: 'Terjadi masalah pada pemrosesan AI.' });
    }
  });

  // --- ADMIN AUTH & CMS ROUTES ---

  // Admin Login (JWT Authenticated)
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      const db = getDatabase();
      logActivity(db, 'Admin Login', 'Berhasil masuk ke Dashboard Admin.');
      saveDatabase(db);

      const token = jwt.sign({ role: 'Admin', email: db.contact.email }, JWT_SECRET, { expiresIn: '24h' });

      return res.json({
        success: true,
        token,
        user: { name: db.hero.name || 'M. Ihwal Maulana', role: 'Admin', email: db.contact.email }
      });
    }
    return res.status(401).json({ success: false, error: 'Password Admin tidak valid.' });
  });

  // Save complete portfolio state (Protected with JWT)
  app.put('/api/admin/portfolio', authenticateAdminToken, (req, res) => {
    const newPortfolioData: PortfolioData = req.body;
    if (!newPortfolioData || !newPortfolioData.hero) {
      return res.status(400).json({ success: false, error: 'Data portfolio tidak valid.' });
    }

    const currentDb = getDatabase();
    newPortfolioData.activityLogs = currentDb.activityLogs;
    newPortfolioData.stats = currentDb.stats;

    logActivity(newPortfolioData, 'Konten Diperbarui', 'Pembaruan data landing page CMS berhasil disimpan.');
    saveDatabase(newPortfolioData);

    res.json({ success: true, message: 'Data CMS berhasil diperbarui!', data: newPortfolioData });
  });

  // Upload Media (Protected with JWT)
  app.post('/api/admin/upload', authenticateAdminToken, upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Tidak ada file yang diunggah.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const db = getDatabase();

    const mediaItem = {
      id: 'med-' + Date.now(),
      name: req.file.originalname,
      url: fileUrl,
      fileType: (req.file.mimetype.startsWith('image/') ? 'image' : 'document') as 'image' | 'document',
      size: req.file.size,
      folder: req.body.folder || 'General',
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    db.media = [mediaItem, ...(db.media || [])];
    logActivity(db, 'Media Diunggah', `File "${req.file.originalname}" diunggah ke folder ${mediaItem.folder}.`);
    saveDatabase(db);

    res.json({ success: true, url: fileUrl, media: mediaItem });
  });

  // Reset database to default seed (Protected with JWT)
  app.post('/api/admin/reset', authenticateAdminToken, (_req, res) => {
    saveDatabase(defaultPortfolioData);
    res.json({ success: true, message: 'Database telah direset ke default seed!', data: defaultPortfolioData });
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server Portfolio & CMS running on http://localhost:${PORT}`);
  });
}

startServer();
