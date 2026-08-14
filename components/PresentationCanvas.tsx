'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Presentation, 
  Sparkles, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Clock, 
  FileText, 
  Palette, 
  RefreshCw,
  Quote,
  Activity,
  CheckCircle2,
  Sliders,
  Share2,
  ExternalLink,
  Edit3,
  AlertCircle
} from 'lucide-react';

interface SlideContent {
  bullets?: string[];
  metrics?: { value: string; label: string }[];
  leftColumn?: { title: string; points: string[] };
  rightColumn?: { title: string; points: string[] };
  quote?: { text: string; author: string };
}

interface Slide {
  id: string;
  layoutType: 'title' | 'two-column' | 'bento-metrics' | 'timeline-process' | 'key-takeaway' | 'feature-grid';
  badge: string;
  title: string;
  subtitle: string;
  content: SlideContent;
  speakerNotes: string;
  visualRecommendation?: string;
}

interface PresentationDeck {
  deckTitle: string;
  deckSubtitle: string;
  theme: string;
  slides: Slide[];
}

const INITIAL_DECK: PresentationDeck = {
  deckTitle: "Arsitektur Pembelajaran Adaptif Berbasis AI & Graf Ontologi",
  deckSubtitle: "Transformasi Kurikulum Interdisipliner Masa Depan dengan Pemetaan Aksiomatik Real-Time",
  theme: "dark",
  slides: [
    {
      id: "slide-1",
      layoutType: "title",
      badge: "Keynote Presentation 2026",
      title: "Arsitektur Pembelajaran Adaptif Berbasis AI & Graf Ontologi",
      subtitle: "Transformasi Kurikulum Interdisipliner Masa Depan dengan Pemetaan Aksiomatik Real-Time",
      content: {
        bullets: [
          "Dipresentasikan oleh: Tim Riset Akademia Global",
          "Fokus: Pemetaan Jalur Prasyarat & Evaluasi Kognitif Mandiri",
          "Standar Kurikulum: MIT, Oxford, & ITB Informatics"
        ]
      },
      speakerNotes: "Selamat pagi rekan-rekan civitas akademika dan developer. Hari ini kami memaparkan bagaimana model penalaran logis digabungkan dengan graf ontologis untuk menyelesaikan fragmentasi kurikulum teknis modern."
    },
    {
      id: "slide-2",
      layoutType: "two-column",
      badge: "Analisis Masalah vs Solusi",
      title: "Disrupsi Kurva Belajar: Dari Kebingungan Menuju Kejelasan",
      subtitle: "Membandingkan pendekatan pedagogi konvensional dengan sistem navigasi graf adaptif",
      content: {
        leftColumn: {
          "title": "Pedagogi Konvensional",
          "points": [
            "Materi terisolasi dalam silabus linear kaku",
            "Prasyarat konsep implisit tidak terdeteksi sejak awal",
            "Tingkat retensi pemula turun hingga 65% pada materi lanjutan"
          ]
        },
        rightColumn: {
          "title": "Akademia Knowledge Graph",
          "points": [
            "Pemetaan topologi multi-cabang secara interaktif",
            "Kalkulasi rute terpendek (BFS Trajectory) otomatis",
            "Verifikasi kuis real-time dengan umpan balik terstruktur"
          ]
        }
      },
      speakerNotes: "Slide ini menyoroti kontras mendasar antara kurikulum linier konvensional yang kerap membuat siswa tersesat dengan pendekatan topologi graf yang memberikan navigasi presisi."
    },
    {
      id: "slide-3",
      layoutType: "bento-metrics",
      badge: "Dampak Kuantitatif",
      title: "Metrik Efisiensi & Retensi Pemahaman",
      subtitle: "Hasil evaluasi empiris pada 500+ mahasiswa teknik & komputasi",
      content: {
        metrics: [
          { value: "3.4x", label: "Percepatan Pemahaman Materi Lanjutan" },
          { value: "92.6%", label: "Tingkat Kelulusan Kuis Pembuktian Formal" },
          { value: "< 4.5ms", label: "Latensi Traversal Graf Topologi" },
          { value: "100%", label: "Transparansi Jalur Prasyarat Keilmuan" }
        ],
        bullets: [
          "Pengurangan waktu pencarian materi hingga 45%",
          "Peningkatan signifikan pada skor tes logika matematika dan komputasi"
        ]
      },
      speakerNotes: "Angka-angka ini membuktikan efektivitas nyata: siswa mampu menguasai topik lanjutan 3.4 kali lebih cepat karena fondasi aksiomatiknya telah diverifikasi secara sistematis."
    },
    {
      id: "slide-4",
      layoutType: "timeline-process",
      badge: "Siklus Pembelajaran",
      title: "4 Tahap Penguasaan Disiplin Terpadu",
      subtitle: "Metodologi terstruktur dari pembentukan fondasi hingga inovasi independen",
      content: {
        bullets: [
          "1. Pemetaan Fondasi Aksiomatik: Verifikasi logika formal dan prasyarat dasar.",
          "2. Eksplorasi Graf Topologi: Simulasi visual dan koneksi lintas disiplin.",
          "3. Penerapan Sandbox Interaktif: Uji coba kode langsung dan evaluasi kasus riil.",
          "4. Sertifikasi Digital Kriptografis: Validasi penguasaan dengan hash terverifikasi."
        ]
      },
      speakerNotes: "Inilah alur 4 tahap yang dilalui setiap pembelajar di platform Akademia untuk menjamin pemahaman holistik dari teori hingga eksekusi."
    },
    {
      id: "slide-5",
      layoutType: "key-takeaway",
      badge: "Kesimpulan Eksekutif",
      title: "Visi Pendidikan Abad 21: Tanpa Batas & Terarah",
      subtitle: "Mempersiapkan talenta global menghadapi kompleksitas teknologi masa depan",
      content: {
        quote: {
          text: "Pendidikan sejati bukan sekadar menumpuk informasi, melainkan memahami bagaimana setiap simpul pengetahuan terhubung membentuk peta peradaban.",
          author: "Manifesto Akademia Global"
        },
        bullets: [
          "Integrasi AI sebagai tutor pendamping penalaran kritis",
          "Akses kurikulum berstandar universitas top dunia untuk semua orang"
        ]
      },
      speakerNotes: "Sebagai penutup, kami mengajak seluruh pendidik dan developer untuk bersama membangun ekosistem pembelajaran terbuka yang terstruktur, inklusif, dan berdaya saing global."
    }
  ]
};

const TOPIC_PRESETS = [
  "Pitch Deck: Platform AI Developer Tool Generasi Baru",
  "Tesis Pertahanan: Keamanan Sistem Siber & Kriptografi Quantum",
  "Strategi FinTech: Skalabilitas Transaksi Mikro Terdesentralisasi",
  "Materi Kuliah: Pemrograman Fungsional & Teori Kategori"
];

export function PresentationCanvas() {
  const [deck, setDeck] = useState<PresentationDeck>(INITIAL_DECK);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [genTopic, setGenTopic] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [themeMode, setThemeMode] = useState<'dark' | 'cyber' | 'minimal' | 'academic'>('dark');
  const [copied, setCopied] = useState(false);
  const [isEditingSlide, setIsEditingSlide] = useState(false);
  const [editTitle, setEditTitle] = useState(INITIAL_DECK.slides[0].title);
  const [editSubtitle, setEditSubtitle] = useState(INITIAL_DECK.slides[0].subtitle);
  const [editNotes, setEditNotes] = useState(INITIAL_DECK.slides[0].speakerNotes);

  const currentSlide = deck.slides[currentSlideIndex] || deck.slides[0];

  const handleSelectSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    const target = deck.slides[idx];
    if (target) {
      setEditTitle(target.title);
      setEditSubtitle(target.subtitle);
      setEditNotes(target.speakerNotes);
    }
  };

  const handleToggleEdit = () => {
    if (!isEditingSlide && currentSlide) {
      setEditTitle(currentSlide.title);
      setEditSubtitle(currentSlide.subtitle);
      setEditNotes(currentSlide.speakerNotes);
    }
    setIsEditingSlide(!isEditingSlide);
  };

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          e.preventDefault();
          setCurrentSlideIndex((prev) => Math.min(prev + 1, deck.slides.length - 1));
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Escape') {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, deck.slides.length]);

  const handleGenerateDeck = async () => {
    if (!genTopic.trim()) return;
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/presentation-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: genTopic,
          slideCount,
          theme: themeMode,
          audience: "Profesional, Mahasiswa, & Penguji Akademik"
        })
      });

      if (!res.ok) throw new Error('Gagal membuat presentasi');
      const data = await res.json();
      if (data && data.slides && data.slides.length > 0) {
        setDeck(data);
        setCurrentSlideIndex(0);
      } else {
        setErrorMessage('Mohon maaf, susunan slide presentasi belum berhasil dihasilkan. Silakan coba kembali.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Mohon maaf, terjadi kendala saat memproses pembuatan slide presentasi. Silakan coba sesaat lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveSlideEdits = () => {
    setDeck(prev => ({
      ...prev,
      slides: prev.slides.map((s, idx) => {
        if (idx === currentSlideIndex) {
          return {
            ...s,
            title: editTitle,
            subtitle: editSubtitle,
            speakerNotes: editNotes
          };
        }
        return s;
      })
    }));
    setIsEditingSlide(false);
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      layoutType: 'feature-grid',
      badge: 'Slide Baru',
      title: 'Judul Slide Tambahan',
      subtitle: 'Tambahkan poin-poin penjelasan penting di sini',
      content: {
        bullets: [
          'Poin analisis pertama yang esensial',
          'Poin pertimbangan teknis kedua',
          'Rekomendasi implementasi'
        ]
      },
      speakerNotes: 'Catatan pembicara untuk slide baru ini.'
    };

    setDeck(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));
    setCurrentSlideIndex(deck.slides.length);
  };

  const handleDeleteSlide = (indexToDelete: number) => {
    if (deck.slides.length <= 1) return;
    setDeck(prev => ({
      ...prev,
      slides: prev.slides.filter((_, idx) => idx !== indexToDelete)
    }));
    setCurrentSlideIndex(prev => Math.max(0, prev - 1));
  };

  const getThemeCanvasStyles = () => {
    switch (themeMode) {
      case 'cyber':
        return 'bg-gradient-to-br from-indigo-950 via-slate-950 to-zinc-950 text-slate-100 border-indigo-900/50';
      case 'academic':
        return 'bg-slate-900 text-slate-100 border-slate-700';
      case 'minimal':
        return 'bg-zinc-900 text-zinc-100 border-zinc-700';
      case 'dark':
      default:
        return 'bg-zinc-950 text-zinc-100 border-zinc-800';
    }
  };

  const exportHTMLDeck = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${deck.deckTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; background: #09090b; color: #f4f4f5; }</style>
</head>
<body class="p-8 max-w-5xl mx-auto space-y-12">
  <header class="border-b border-zinc-800 pb-6 text-center space-y-2">
    <h1 class="text-3xl font-extrabold">${deck.deckTitle}</h1>
    <p class="text-zinc-400">${deck.deckSubtitle}</p>
  </header>
  ${deck.slides.map((s, idx) => `
    <article class="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-4 shadow-xl">
      <div class="flex items-center justify-between text-xs font-mono text-zinc-500">
        <span>SLIDE ${idx + 1} / ${deck.slides.length}</span>
        <span class="px-3 py-1 bg-zinc-800 rounded-full text-zinc-300">${s.badge}</span>
      </div>
      <h2 class="text-2xl font-bold text-zinc-100">${s.title}</h2>
      <p class="text-sm text-zinc-400">${s.subtitle}</p>
      <div class="pt-4 border-t border-zinc-800/80">
        ${s.content.bullets ? `<ul class="space-y-2 text-sm text-zinc-300 list-disc list-inside">${s.content.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
        ${s.content.metrics ? `<div class="grid grid-cols-2 gap-4 my-4">${s.content.metrics.map(m => `<div class="p-4 bg-zinc-950 rounded-xl border border-zinc-800"><div class="text-2xl font-bold font-mono text-zinc-100">${m.value}</div><div class="text-xs text-zinc-400">${m.label}</div></div>`).join('')}</div>` : ''}
      </div>
      <div class="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-400 italic">
        <strong>Speaker Notes:</strong> ${s.speakerNotes}
      </div>
    </article>
  `).join('')}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deck.deckTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-slides.html`;
    a.click();
  };

  return (
    <div className="space-y-8" id="ai-presentation-studio">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/70 text-zinc-300 text-xs font-mono">
              <Presentation className="w-3.5 h-3.5 text-zinc-300" />
              <span>AI Deck & Canvas Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Canvas AI • Presentation & PPT Deck Generator
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Buat presentasi pitch deck, materi kuliah, dan proposal teknis berkelas tinggi dengan layout bento, catatan pembicara otomatis, serta mode presentasi layar penuh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
              id="start-presentation-mode-btn"
            >
              <Play className="w-4 h-4 fill-zinc-950" />
              <span>Mode Presentasi (F5)</span>
            </button>
            <button
              onClick={exportHTMLDeck}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-xl border border-zinc-700 flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              id="export-html-slides-btn"
            >
              <Download className="w-4 h-4" />
              <span>Unduh HTML Deck</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Slide Generator Input Bar */}
      <div className="p-5 bg-zinc-900/70 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-sm text-zinc-200">
            <Sparkles className="w-4 h-4 text-zinc-300" />
            <span>Generate Slide Deck dengan AI</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline">Theme:</span>
            <select
              value={themeMode}
              onChange={(e) => setThemeMode(e.target.value as any)}
              className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300"
            >
              <option value="dark">Onyx Dark</option>
              <option value="cyber">Cyber Gradient</option>
              <option value="academic">Academic Slate</option>
              <option value="minimal">Minimalist Warm</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <input
              type="text"
              value={genTopic}
              onChange={(e) => setGenTopic(e.target.value)}
              placeholder="Masukkan topik presentasi (contoh: Arsitektur Microservices & Event-Driven Systems)..."
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>
          <div className="sm:col-span-2">
            <select
              value={slideCount}
              onChange={(e) => setSlideCount(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-zinc-200"
            >
              <option value={4}>4 Slide Ringkas</option>
              <option value={5}>5 Slide Standar</option>
              <option value={7}>7 Slide Lengkap</option>
              <option value={9}>9 Slide Komprehensif</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              onClick={handleGenerateDeck}
              disabled={isGenerating || !genTopic.trim()}
              className="w-full h-full py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isGenerating ? 'Menyusun...' : 'Generate Deck'}</span>
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-zinc-500 font-mono">Inspirasi:</span>
          {TOPIC_PRESETS.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setGenTopic(t)}
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-[11px] text-zinc-300 transition-all cursor-pointer truncate max-w-xs"
            >
              {t}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Slide Studio Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Thumbnails Sidebar (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Slides ({deck.slides.length})
            </span>
            <button
              onClick={handleAddSlide}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Slide</span>
            </button>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {deck.slides.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                  currentSlideIndex === idx
                    ? 'bg-zinc-900 border-zinc-400 shadow-md ring-1 ring-zinc-400'
                    : 'bg-zinc-950/70 border-zinc-800/80 hover:bg-zinc-900/60'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-400 shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block truncate">
                    {slide.badge}
                  </span>
                  <h4 className="text-xs font-semibold text-zinc-200 truncate">
                    {slide.title}
                  </h4>
                </div>
                {deck.slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSlide(idx);
                    }}
                    className="text-zinc-600 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center Main Slide Canvas (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Main 16:9 Slide Canvas */}
          <div className={`relative aspect-video w-full rounded-3xl border p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden transition-all ${getThemeCanvasStyles()}`} id="presentation-main-canvas">
            {/* Top Bar inside slide */}
            <div className="flex items-center justify-between gap-4">
              <span className="px-3 py-1 bg-zinc-900/80 border border-zinc-700/80 rounded-full text-xs font-mono text-zinc-300">
                {currentSlide.badge}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Akademia Global • Slide {currentSlideIndex + 1} of {deck.slides.length}
              </span>
            </div>

            {/* Slide Body Content */}
            <div className="my-auto py-4 space-y-4">
              {currentSlide.layoutType === 'title' && (
                <div className="space-y-4 text-center max-w-3xl mx-auto">
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {currentSlide.subtitle}
                  </p>
                  {currentSlide.content.bullets && (
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                      {currentSlide.content.bullets.map((b, i) => (
                        <span key={i} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentSlide.layoutType === 'two-column' && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">{currentSlide.title}</h2>
                    <p className="text-xs sm:text-sm text-zinc-400">{currentSlide.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {currentSlide.content.leftColumn && (
                      <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-2">
                        <span className="text-xs font-bold text-rose-400 font-mono block">
                          {currentSlide.content.leftColumn.title}
                        </span>
                        <ul className="space-y-1.5">
                          {currentSlide.content.leftColumn.points.map((pt, i) => (
                            <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                              <span className="text-rose-400">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {currentSlide.content.rightColumn && (
                      <div className="p-4 bg-zinc-900/60 rounded-2xl border border-emerald-900/40 space-y-2">
                        <span className="text-xs font-bold text-emerald-400 font-mono block">
                          {currentSlide.content.rightColumn.title}
                        </span>
                        <ul className="space-y-1.5">
                          {currentSlide.content.rightColumn.points.map((pt, i) => (
                            <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentSlide.layoutType === 'bento-metrics' && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">{currentSlide.title}</h2>
                    <p className="text-xs sm:text-sm text-zinc-400">{currentSlide.subtitle}</p>
                  </div>
                  {currentSlide.content.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {currentSlide.content.metrics.map((m, i) => (
                        <div key={i} className="p-3.5 bg-zinc-900/70 rounded-2xl border border-zinc-800 space-y-1 text-center">
                          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-100">{m.value}</div>
                          <div className="text-[11px] text-zinc-400 font-medium">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {(currentSlide.layoutType === 'timeline-process' || currentSlide.layoutType === 'feature-grid') && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">{currentSlide.title}</h2>
                    <p className="text-xs sm:text-sm text-zinc-400">{currentSlide.subtitle}</p>
                  </div>
                  {currentSlide.content.bullets && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {currentSlide.content.bullets.map((b, i) => (
                        <div key={i} className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentSlide.layoutType === 'key-takeaway' && (
                <div className="space-y-6 text-center max-w-2xl mx-auto py-2">
                  {currentSlide.content.quote && (
                    <div className="space-y-3">
                      <Quote className="w-8 h-8 text-zinc-600 mx-auto" />
                      <p className="text-lg sm:text-xl font-medium text-zinc-200 italic leading-relaxed">
                        &ldquo;{currentSlide.content.quote.text}&rdquo;
                      </p>
                      <span className="text-xs font-mono text-zinc-400 block">
                        — {currentSlide.content.quote.author}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Controls Bar inside slide canvas */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleEdit}
                  className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingSlide ? 'Tutup Edit' : 'Edit Slide'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSelectSlide(Math.max(0, currentSlideIndex - 1))}
                  disabled={currentSlideIndex === 0}
                  className="p-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 rounded-lg border border-zinc-800 text-zinc-300 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-zinc-400">
                  {currentSlideIndex + 1} / {deck.slides.length}
                </span>
                <button
                  onClick={() => handleSelectSlide(Math.min(deck.slides.length - 1, currentSlideIndex + 1))}
                  disabled={currentSlideIndex === deck.slides.length - 1}
                  className="p-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 rounded-lg border border-zinc-800 text-zinc-300 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Inline Slide Editor (if toggled) */}
          {isEditingSlide && (
            <div className="p-4 bg-zinc-900/90 border border-zinc-700 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-zinc-200">Editor Konten Slide #{currentSlideIndex + 1}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Judul Slide</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400">Subjudul Slide</label>
                  <input
                    type="text"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-400">Speaker Notes</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none resize-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingSlide(false)}
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveSlideEdits}
                  className="px-4 py-1 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* Speaker Notes Box */}
          <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>Speaker Notes (Panduan Narasi Pembicara)</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Auto-generated</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/60">
              &ldquo;{currentSlide.speakerNotes}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Presentation Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-12 text-white selection:bg-zinc-800"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full font-mono text-zinc-300">
                  {currentSlide.badge}
                </span>
                <span className="font-mono text-zinc-500">Gunakan tombol Panah Kiri / Kanan atau Spasi</span>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Tutup (Esc)</span>
              </button>
            </div>

            {/* Slide Stage Body */}
            <div className="max-w-5xl mx-auto w-full my-auto space-y-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
                {currentSlide.title}
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl">
                {currentSlide.subtitle}
              </p>

              {currentSlide.content.bullets && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {currentSlide.content.bullets.map((b, i) => (
                    <div key={i} className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-base text-zinc-200 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-zinc-400 mt-2 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentSlide.content.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {currentSlide.content.metrics.map((m, i) => (
                    <div key={i} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
                      <div className="text-4xl font-extrabold font-mono text-zinc-100">{m.value}</div>
                      <div className="text-xs text-zinc-400 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Progress Bar in Fullscreen */}
            <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900 pt-4">
              <span>Slide {currentSlideIndex + 1} dari {deck.slides.length}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl cursor-pointer"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(prev => Math.min(deck.slides.length - 1, prev + 1))}
                  className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl cursor-pointer"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
