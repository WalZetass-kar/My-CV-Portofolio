import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactInboxMessage } from '../../types';
import { Mail, Search, CheckCircle2, MessageSquare, Trash2, Clock, CheckCheck } from 'lucide-react';

export const InboxManager: React.FC = () => {
  const { data, updatePartial } = usePortfolio();
  const [inboxList, setInboxList] = useState<ContactInboxMessage[]>(data.inbox || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMsg, setSelectedMsg] = useState<ContactInboxMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredMessages = inboxList
    .filter((m) => statusFilter === 'all' || m.status === statusFilter)
    .filter((m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const markAsRead = async (msg: ContactInboxMessage) => {
    const updated = inboxList.map((m) => (m.id === msg.id ? { ...m, status: 'read' as const } : m));
    setInboxList(updated);
    setSelectedMsg({ ...msg, status: 'read' });
    await updatePartial('inbox', updated, `Pesan dari ${msg.name} ditandai dibaca.`);
  };

  const saveReplyNotes = async () => {
    if (!selectedMsg) return;
    const updated = inboxList.map((m) =>
      m.id === selectedMsg.id ? { ...m, status: 'replied' as const, replyNotes: replyText } : m
    );
    setInboxList(updated);
    setSelectedMsg({ ...selectedMsg, status: 'replied', replyNotes: replyText });
    await updatePartial('inbox', updated, `Catatan balasan untuk ${selectedMsg.name} disimpan.`);
  };

  const deleteMessage = async (id: string) => {
    const updated = inboxList.filter((m) => m.id !== id);
    setInboxList(updated);
    if (selectedMsg?.id === id) setSelectedMsg(null);
    await updatePartial('inbox', updated, 'Pesan kontak dihapus.');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-heading font-bold text-2xl text-white">Contact Inbox</h3>
          <p className="text-slate-400 text-xs">Pesan yang dikirim pengunjung melalui formulir kontak landing page.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Messages List Column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, email, pesan..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex gap-2 text-xs font-medium">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg ${statusFilter === 'all' ? 'bg-emerald-500 text-white font-semibold' : 'bg-slate-800 text-slate-400'}`}
            >
              Semua ({inboxList.length})
            </button>
            <button
              onClick={() => setStatusFilter('unread')}
              className={`px-3 py-1.5 rounded-lg ${statusFilter === 'unread' ? 'bg-emerald-500 text-white font-semibold' : 'bg-slate-800 text-slate-400'}`}
            >
              Belum Dibaca ({inboxList.filter((m) => m.status === 'unread').length})
            </button>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMsg(msg);
                  setReplyText(msg.replyNotes || '');
                  if (msg.status === 'unread') markAsRead(msg);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedMsg?.id === msg.id
                    ? 'bg-slate-800 border-emerald-500'
                    : msg.status === 'unread'
                    ? 'bg-slate-950 border-emerald-500/40'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs truncate">{msg.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono truncate mb-2">{msg.email}</div>
                <p className="text-slate-400 text-xs line-clamp-2">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Message Detail Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          {selectedMsg ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="font-heading font-bold text-xl text-white">{selectedMsg.name}</h4>
                  <a href={`mailto:${selectedMsg.email}`} className="text-xs text-emerald-400 underline font-mono">
                    {selectedMsg.email}
                  </a>
                </div>
                <button
                  onClick={() => deleteMessage(selectedMsg.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  title="Hapus Pesan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                {selectedMsg.message}
              </div>

              {/* Reply Section */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Catatan Balasan &amp; Status
                </h5>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tuliskan catatan respon internal Anda..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={saveReplyNotes}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold"
                  >
                    Simpan Catatan Balasan
                  </button>
                  <a
                    href={`mailto:${selectedMsg.email}?subject=Re: Kontak Portfolio`}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                  >
                    Buka Email Client &rarr;
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs text-center">
              <Mail className="w-10 h-10 mb-2 opacity-50" />
              <span>Pilih pesan di sebelah kiri untuk melihat detail lengkap.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
