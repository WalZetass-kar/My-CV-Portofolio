import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../services/api';
import { Mail, MessageSquare, Linkedin, Github, Send, MapPin, CheckCircle2, AlertCircle, Loader2, Instagram, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { contact, hero } = data;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedback('Mohon isi seluruh bidang formulir secara lengkap.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const res = await api.sendContactMessage(formData);
      if (res.success) {
        setStatus('success');
        setFeedback(res.message || 'Pesan Anda berhasil terkirim!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setFeedback(res.error || 'Gagal mengirim pesan.');
      }
    } catch (err: any) {
      setStatus('error');
      setFeedback('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase mb-2">
            HUBUNGI SAYA
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Mari Berdiskusi &amp; Bekerjasama
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Apakah Anda memiliki proyek menarik, ide produk AI, atau peluang karir? Kirimkan pesan Anda secara langsung.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          
          {/* Contact Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-6">
              <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                Informasi Kontak
              </h4>

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xs group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Email</div>
                    <div className="text-sm font-bold">{contact.email}</div>
                  </div>
                </a>
              )}

              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xs group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">WhatsApp</div>
                    <div className="text-sm font-bold">{contact.whatsapp}</div>
                  </div>
                </a>
              )}

              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xs group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">LinkedIn</div>
                    <div className="text-sm font-bold truncate">
                      {contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, '').replace(/\/$/, '') || hero.name || 'LinkedIn Profile'}
                    </div>
                  </div>
                </a>
              )}

              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xs group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">GitHub</div>
                    <div className="text-sm font-bold truncate">
                      {contact.github.replace(/^https?:\/\/(www\.)?/, '') || 'github.com'}
                    </div>
                  </div>
                </a>
              )}

              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xs group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Instagram</div>
                    <div className="text-sm font-bold truncate">
                      {contact.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '') || 'Instagram'}
                    </div>
                  </div>
                </a>
              )}

              {contact.x && (
                <a
                  href={contact.x}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xs group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">X / Twitter</div>
                    <div className="text-sm font-bold truncate">
                      {contact.x.replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//, '@').replace(/\/$/, '') || 'X Profile'}
                    </div>
                  </div>
                </a>
              )}

              <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{contact.location || 'Indonesia (GMT+7)'}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">
                Kirim Pesan Langsung
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Pesan Anda *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan atau detail proyek Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                  ></textarea>
                </div>

                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{feedback}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    <span>{feedback}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim Pesan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
