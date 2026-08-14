'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  Lightbulb, 
  Code2, 
  Calculator, 
  BookOpen, 
  CheckCircle2,
  Copy,
  Globe,
  ExternalLink
} from 'lucide-react';
import { Lesson } from '@/lib/types';
import Markdown from 'react-markdown';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeLesson?: Lesson | null;
  activeCourseTitle?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  webSources?: Array<{ title: string; url: string }>;
}

export function AITutorDrawer({ isOpen, onClose, activeLesson, activeCourseTitle }: AITutorDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Selamat datang di **RoboAkademia**, asisten belajar akademik Anda. ${
        activeLesson 
          ? `Saat ini Anda sedang mempelajari topik **"${activeLesson.title}"** pada program **${activeCourseTitle}**.` 
          : 'Silakan ajukan pertanyaan seputar pemahaman konsep teori, penurunan rumus, pemecahan kode pemrograman, maupun panduan persyaratan admisi universitas.'
      }\n\nAda topik atau bagian materi tertentu yang ingin kita bahas bersama secara mendalam?`,
      timestamp: 'Baru saja'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sendMessage = async (promptToSend?: string, mode: string = 'chat') => {
    const text = promptToSend || inputText.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          userPrompt: text,
          lessonContext: activeLesson,
          courseTitle: activeCourseTitle,
          enableWebSearch,
        })
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Mohon maaf, sistem sedang memproses jawaban. Silakan ajukan kembali pertanyaan Anda.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        webSources: data.webSources || []
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Mohon maaf, terjadi kendala saat menghubungi server AI. Silakan coba kembali dalam beberapa saat.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:bg-transparent lg:pointer-events-none"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col pointer-events-auto"
            id="ai-tutor-drawer"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-100 text-sm">RoboAkademia Tutor</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Aktif
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate max-w-[260px]">
                    {activeLesson ? activeLesson.title : 'Konsultasi Belajar & Akademik'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Web Search Toggle */}
                <button
                  onClick={() => setEnableWebSearch(!enableWebSearch)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium flex items-center gap-1.5 border transition-all ${
                    enableWebSearch
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                  title="Aktifkan Pencarian Web Real-Time (Google Grounding)"
                >
                  <Globe className={`w-3.5 h-3.5 ${enableWebSearch ? 'text-blue-400 animate-pulse' : ''}`} />
                  <span className="hidden xs:inline">Web Search:</span>
                  <span>{enableWebSearch ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Tutup Tutor"
                  id="btn-close-tutor"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2.5 bg-black/40 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
              <button
                onClick={() => sendMessage('Mohon jelaskan konsep materi ini menggunakan analogi yang mudah dipahami dalam kehidupan sehari-hari.', 'explain_simple')}
                disabled={isLoading}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                id="btn-quick-analogi"
              >
                <Lightbulb className="w-3.5 h-3.5 text-zinc-400" />
                <span>Analogi Konsep</span>
              </button>
              <button
                onClick={() => sendMessage('Mohon berikan penjelasan mendalam (in-depth analysis) mengenai prinsip dasar dan fondasi topik ini.', 'deep_dive')}
                disabled={isLoading}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                id="btn-quick-deepdive"
              >
                <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                <span>Pembahasan Lengkap</span>
              </button>
              <button
                onClick={() => sendMessage('Mohon jelaskan cara menurunkan atau membuktikan rumus utama pada materi ini secara terstruktur.', 'math_solve')}
                disabled={isLoading}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                id="btn-quick-math"
              >
                <Calculator className="w-3.5 h-3.5 text-zinc-400" />
                <span>Penurunan Rumus</span>
              </button>
              <button
                onClick={() => sendMessage('Mohon berikan contoh studi kasus terapan atau latihan pemecahan masalah untuk materi ini.', 'chat')}
                disabled={isLoading}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                id="btn-quick-code"
              >
                <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Studi Kasus & Terapan</span>
              </button>
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      msg.sender === 'user'
                        ? 'bg-zinc-200 text-zinc-950 font-medium rounded-tr-xs shadow-sm'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-xs shadow-sm'
                    }`}
                  >
                    <div className="prose prose-invert prose-xs max-w-none space-y-2 leading-relaxed">
                      <Markdown>{msg.text}</Markdown>
                    </div>

                    {/* Web sources chips if available */}
                    {msg.webSources && msg.webSources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-zinc-800/80 space-y-1">
                        <div className="text-[10px] font-semibold text-zinc-400 flex items-center gap-1">
                          <Globe className="w-3 h-3 text-blue-400" />
                          <span>Sumber Web Ditemukan:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {msg.webSources.slice(0, 4).map((src, i) => (
                            <a
                              key={i}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-blue-400 text-[10px] border border-zinc-700/60 transition-colors"
                            >
                              <span className="truncate max-w-[140px]">{src.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-2 pt-1.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'ai' && (
                        <button
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="hover:text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-zinc-300" />
                              <span className="text-zinc-300">Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 text-zinc-400 text-xs py-2">
                  <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-2xl">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-zinc-300 ml-1">
                      {enableWebSearch ? 'Mencari di web & menganalisis...' : 'RoboAkademia sedang menganalisis...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] bg-zinc-900 border-t border-zinc-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
                id="ai-tutor-form"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    enableWebSearch
                      ? 'Tanyakan apa saja (Pencarian Web Aktif)...'
                      : 'Tuliskan pertanyaan, materi, atau kode program...'
                  }
                  disabled={isLoading}
                  className="flex-1 bg-black border border-zinc-700 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 text-zinc-200 text-xs sm:text-sm rounded-full px-4 py-2.5 min-h-[44px] outline-none transition-all placeholder:text-zinc-500"
                  id="input-ai-tutor"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="min-h-[44px] px-4 py-2.5 bg-zinc-100 hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed active:scale-95"
                  id="btn-send-ai-tutor"
                  aria-label="Kirim pesan"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
