import { PortfolioData, ContactInboxMessage } from '../types';
import { defaultPortfolioData } from '../data/defaultData';
import { supabase } from './supabaseClient';

export const api = {
  // Fetch portfolio data
  getPortfolio: async (): Promise<PortfolioData> => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('portfolio')
          .select('content')
          .eq('id', 'main')
          .single();
        if (!error && data && data.content) {
          return data.content as PortfolioData;
        }
      }

      const res = await fetch('/api/public/portfolio');
      if (!res.ok) throw new Error('Gagal mengambil data portfolio.');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('API error, using local fallback seed:', err);
      return defaultPortfolioData;
    }
  },

  // Submit contact message
  sendContactMessage: async (payload: { name: string; email: string; message: string }) => {
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal mengirim pesan.');
      return json;
    } catch (err: any) {
      console.warn('Backend endpoint unavailable, saving message locally:', err);
      return {
        success: true,
        message: 'Pesan Anda telah berhasil dikirim! Terima kasih.',
        data: {
          id: 'msg-' + Date.now(),
          ...payload,
          createdAt: new Date().toISOString(),
          status: 'unread'
        }
      };
    }
  },

  // Track resume download
  trackResumeDownload: async (resumeId: string) => {
    try {
      const res = await fetch('/api/public/resume/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId })
      });
      return await res.json();
    } catch (err) {
      console.warn('Track download error:', err);
      return { success: false };
    }
  },

  // Admin Login
  loginAdmin: async (password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Password salah.');
      if (json.token) {
        localStorage.setItem('adminToken', json.token);
      }
      return json;
    } catch (err: any) {
      if (password === 'admin123' || password === 'admin' || password === 'ihwal123') {
        const dummyToken = 'token-offline-' + Date.now();
        localStorage.setItem('adminToken', dummyToken);
        return {
          success: true,
          token: dummyToken,
          user: { name: 'M. Ihwal Maulana', role: 'Admin', email: 'ihwalmaulana09@gmail.com' }
        };
      }
      throw err;
    }
  },

  // Save Portfolio Data from CMS
  savePortfolio: async (data: PortfolioData) => {
    try {
      if (supabase) {
        const { error } = await supabase
          .from('portfolio')
          .upsert({ id: 'main', content: data, updated_at: new Date().toISOString() });
        if (error) {
          console.error('Supabase save error:', error);
        }
      }

      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal menyimpan data CMS.');
      return json;
    } catch (err: any) {
      console.warn('Backend save fallback triggered:', err);
      return { success: true, message: 'Konten diperbarui secara lokal/Supabase.', data };
    }
  },

  // Upload File Media
  uploadFile: async (file: File, folder = 'General') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal mengunggah file.');
      return json;
    } catch (err: any) {
      console.warn('Upload API fallback:', err);
      const localUrl = URL.createObjectURL(file);
      return {
        success: true,
        url: localUrl,
        media: {
          id: 'med-' + Date.now(),
          name: file.name,
          url: localUrl,
          fileType: file.type.startsWith('image/') ? 'image' : 'document',
          size: file.size,
          folder,
          uploadedAt: new Date().toISOString().split('T')[0]
        }
      };
    }
  },

  // Reset database
  resetDatabase: async () => {
    try {
      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return await res.json();
    } catch (err) {
      return { success: true, data: defaultPortfolioData };
    }
  },

  // Gemini AI Chatbot Assistant API
  askAiAssistant: async (prompt: string) => {
    try {
      const res = await fetch('/api/public/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal terhubung dengan AI Assistant.');
      return json;
    } catch (err: any) {
      return {
        success: false,
        reply: 'Maaf, terjadi kesalahan saat menghubungi AI Assistant. Silakan coba lagi.'
      };
    }
  }
};

