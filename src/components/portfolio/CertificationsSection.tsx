import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const CertificationsSection: React.FC = () => {
  const { data } = usePortfolio();
  const certifications = data.certifications || [
    {
      id: 'cert-1',
      title: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud',
      issueDate: '2025',
      credentialUrl: 'https://cloud.google.com/certification',
      logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=200&q=80',
      order: 1
    },
    {
      id: 'cert-2',
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      issueDate: '2024',
      credentialUrl: 'https://coursera.org',
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=200&q=80',
      order: 2
    },
    {
      id: 'cert-3',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2024',
      credentialUrl: 'https://aws.amazon.com/certification',
      logo: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=200&q=80',
      order: 3
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-2">
            SERTIFIKASI LISENSI
          </h2>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Sertifikasi Profesional
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Pengakuan kompetensi dan standar kualitas industri dari penyedia teknologi terkemuka dunia.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Verified
                  </span>
                </div>

                <h4 className="font-heading font-bold text-slate-900 text-lg mb-2 leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs font-semibold text-emerald-600 mb-1">
                  Penerbit: {cert.issuer}
                </p>
                <p className="text-[11px] text-slate-500 mb-6 font-mono">
                  Tahun Terbit: {cert.issueDate}
                </p>
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold text-xs transition-colors border border-slate-200/80"
                >
                  <span>Lihat Kredensial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
