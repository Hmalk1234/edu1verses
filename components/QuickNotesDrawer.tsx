'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Plus,
  Trash2,
  Sparkles,
  Download,
  X,
  BookOpen,
  CheckCircle2,
  Calendar,
  Tag,
  AlertCircle
} from 'lucide-react';

interface NoteItem {
  id: string;
  title: string;
  content: string;
  tag: string;
  updatedAt: string;
  aiSummary?: {
    summary: string;
    keyTakeaways: string[];
    actionItems: string[];
    mentalModelOrRule?: string;
  };
}

interface QuickNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
}

const STORAGE_NOTES_KEY = 'akademia_student_notes_v1';

const DEFAULT_SAMPLE_NOTES: NoteItem[] = [
  {
    id: 'note-welcome-1',
    title: 'Catatan Riset & Kerangka Belajar Mandiri',
    content: `# Panduan Belajar Akademia
1. Selalu dekomposisi masalah kompleks menjadi unit-unit terkecil.
2. Gunakan diagram sistem & uji skenario ekstrem (chaos engineering).
3. Lakukan pengulangan berkala (Spaced Repetition) pada kartu memori.`,
    tag: 'Metodologi',
    updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }
];

export function QuickNotesDrawer({
  isOpen,
  onClose,
  studentName
}: QuickNotesDrawerProps) {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_NOTES_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_SAMPLE_NOTES;
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(() => notes[0]?.id || '');
  const [isSynthesizingAI, setIsSynthesizingAI] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
      } catch (e) {
        console.error(e);
      }
    }
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'Catatan Baru',
      content: '',
      tag: 'Umum',
      updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateActiveNote = (fields: Partial<NoteItem>) => {
    if (!activeNote) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? {
              ...n,
              ...fields,
              updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
            }
          : n
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id && filtered.length > 0) {
      setActiveNoteId(filtered[0].id);
    }
  };

  const handleSummarizeWithAI = async () => {
    if (!activeNote || !activeNote.content.trim()) {
      setErrorMessage('Isi catatan terlebih dahulu sebelum meminta ringkasan AI.');
      return;
    }

    setIsSynthesizingAI(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notesContent: activeNote.content,
          title: activeNote.title,
          studentName: studentName || 'Pelajar'
        })
      });

      if (!res.ok) throw new Error('Gagal menghubungi layanan AI');

      const data = await res.json();
      if (data && data.summary) {
        handleUpdateActiveNote({ aiSummary: data });
      } else {
        setErrorMessage('Format ringkasan AI tidak sesuai.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Terjadi kendala saat menyintesis catatan dengan AI.');
    } finally {
      setIsSynthesizingAI(false);
    }
  };

  const handleExportMarkdown = () => {
    if (!activeNote) return;
    let md = `# ${activeNote.title}\n*Kategori: ${activeNote.tag} | Diperbarui: ${activeNote.updatedAt}*\n\n${activeNote.content}\n`;
    if (activeNote.aiSummary) {
      md += `\n\n---\n## 🧠 Ringkasan AI\n${activeNote.aiSummary.summary}\n\n### Poin Kunci:\n${activeNote.aiSummary.keyTakeaways.map((k) => `- ${k}`).join('\n')}\n\n### Rencana Aksi:\n${activeNote.aiSummary.actionItems.map((a) => `1. ${a}`).join('\n')}\n`;
      if (activeNote.aiSummary.mentalModelOrRule) {
        md += `\n**Kaidah Prinsip:** ${activeNote.aiSummary.mentalModelOrRule}\n`;
      }
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeNote.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl h-full bg-zinc-900 border-l border-zinc-800 p-5 sm:p-7 shadow-2xl flex flex-col justify-between overflow-y-auto text-zinc-200"
        id="quick-notes-drawer"
      >
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-zinc-100">Buku Catatan Studi & Riset</h2>
                <p className="text-xs text-zinc-400">Pencatatan materi interaktif dengan AI Executive Synthesis</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCreateNote}
                className="px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                id="btn-add-new-note"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Catatan Baru</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Tutup Catatan"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notes Horizontal / Chip Selector */}
          <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-zinc-800/80">
            {notes.map((n) => {
              const isSelected = n.id === activeNote?.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setActiveNoteId(n.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 flex items-center gap-2 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100 font-semibold'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Tag className="w-3 h-3 text-zinc-500" />
                  <span className="max-w-[120px] truncate">{n.title || 'Tanpa Judul'}</span>
                </button>
              );
            })}
          </div>

          {errorMessage && (
            <div className="mt-3 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Active Note Editor */}
          {activeNote ? (
            <div className="mt-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <input
                  type="text"
                  value={activeNote.title}
                  onChange={(e) => handleUpdateActiveNote({ title: e.target.value })}
                  placeholder="Judul Catatan..."
                  className="w-full text-lg sm:text-xl font-bold bg-transparent border-none text-zinc-100 focus:outline-none placeholder:text-zinc-600"
                />

                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    value={activeNote.tag}
                    onChange={(e) => handleUpdateActiveNote({ tag: e.target.value })}
                    placeholder="Tag / Topik"
                    className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 w-28 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleExportMarkdown}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
                    title="Ekspor Markdown (.md)"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  {notes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(activeNote.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950/80 text-zinc-400 hover:text-red-400 text-xs transition-colors"
                      title="Hapus Catatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={activeNote.content}
                onChange={(e) => handleUpdateActiveNote({ content: e.target.value })}
                placeholder="Tulis ringkasan materi, pertanyaan, rumus, atau ide riset Anda di sini..."
                rows={10}
                className="w-full p-4 rounded-2xl bg-black/60 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-600 font-mono leading-relaxed resize-y"
              />

              {/* AI Synthesizer Action */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleSummarizeWithAI}
                  disabled={isSynthesizingAI}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  id="btn-ai-synthesize-note"
                >
                  <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{isSynthesizingAI ? 'Menyintesis Catatan...' : 'Sintesis AI (Ringkasan & Action Items)'}</span>
                </button>

                <span className="text-[11px] text-zinc-500 font-mono">
                  Diperbarui: {activeNote.updatedAt}
                </span>
              </div>

              {/* AI Structured Synthesis Box */}
              {activeNote.aiSummary && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-3 mt-4"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-200 border-b border-zinc-800 pb-2">
                    <Sparkles className="w-4 h-4 text-zinc-300" />
                    <span>Ringkasan Eksekutif AI</span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeNote.aiSummary.summary}
                  </p>

                  {activeNote.aiSummary.keyTakeaways?.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-zinc-400 block">Poin Kunci:</span>
                      <ul className="list-disc list-inside text-xs text-zinc-300 space-y-0.5 pl-1">
                        {activeNote.aiSummary.keyTakeaways.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeNote.aiSummary.actionItems?.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-semibold text-zinc-400 block">Rencana Aksi & Latihan:</span>
                      <div className="space-y-1 text-xs text-zinc-300">
                        {activeNote.aiSummary.actionItems.map((action, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeNote.aiSummary.mentalModelOrRule && (
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                      <strong className="text-zinc-200 font-semibold block mb-0.5">Kaidah Mental Model:</strong>
                      {activeNote.aiSummary.mentalModelOrRule}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500 text-xs">
              Belum ada catatan. Klik tombol &ldquo;Catatan Baru&rdquo; untuk memulai.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>{notes.length} Catatan Tersimpan</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
}
