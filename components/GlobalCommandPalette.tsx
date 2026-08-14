'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Code2, 
  Sparkles, 
  Layers, 
  FileText, 
  Presentation, 
  Globe, 
  Palette, 
  Timer, 
  Network, 
  X, 
  ArrowRight, 
  BrainCircuit, 
  BarChart3, 
  CheckCircle2, 
  Flame,
  ExternalLink,
  Loader2,
  Copy,
  Check,
  Compass,
  CornerDownLeft
} from 'lucide-react';
import { COURSES_DATA } from '@/lib/data/courses';
import { UNIVERSITIES_DATA, SCHOLARSHIPS_DATA } from '@/lib/data/universities';
import { Course, Lesson } from '@/lib/types';
import Markdown from 'react-markdown';

interface GlobalCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onSelectCourseAndLesson?: (course: Course, lesson: Lesson) => void;
  onOpenTimer?: () => void;
  onOpenNotes?: () => void;
  onOpenAITutor?: () => void;
  onOpenQuests?: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'course' | 'lesson' | 'tool' | 'university' | 'scholarship';
  categoryLabel: string;
  icon: any;
  action: () => void;
  badge?: string;
}

interface WebSearchResult {
  query: string;
  searchFocus: string;
  summary: string;
  sources: Array<{
    title: string;
    url: string;
    domain: string;
  }>;
  webSearchQueries?: string[];
}

const QUICK_SEARCH_PROMPTS = [
  { label: '🎓 Beasiswa LPDP 2026', query: 'Syarat dan jadwal pendaftaran Beasiswa LPDP 2026' },
  { label: '🔬 Quantum Error Correction', query: 'Perkembangan terbaru Quantum Error Correction dan QPU 2026' },
  { label: '🏛️ Admisi MIT & Stanford', query: 'Jadwal dan persyaratan admisi pascasarjana MIT dan Stanford University 2026' },
  { label: '⚡ Next.js & Distributed Systems', query: 'Best practices arsitektur distributed systems dan caching layer 2026' }
];

export function GlobalCommandPalette({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectCourseAndLesson,
  onOpenTimer,
  onOpenNotes,
  onOpenAITutor,
  onOpenQuests
}: GlobalCommandPaletteProps) {
  const [activeMode, setActiveMode] = useState<'catalog' | 'web'>('catalog');
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchFocus, setSearchFocus] = useState<'academic' | 'scholarship' | 'technical'>('academic');
  
  // Web search states
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [webResult, setWebResult] = useState<WebSearchResult | null>(null);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    setWebResult(null);
    onClose();
  };

  // Keyboard shortcut Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Execute Web Search
  const executeWebSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setActiveMode('web');
    setIsSearchingWeb(true);
    setWebResult(null);

    try {
      const res = await fetch('/api/gemini/web-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q.trim(),
          searchFocus
        })
      });
      const data = await res.json();
      if (data.success) {
        setWebResult(data);
      }
    } catch (err) {
      console.error('Web search error:', err);
    } finally {
      setIsSearchingWeb(false);
    }
  };

  // Build searchable items index
  const allItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // 1. Core Platform Tools
    const tools = [
      {
        id: 'tool-dashboard',
        title: 'Dashboard Utama',
        subtitle: 'Ikhtisar progres belajar, radar kesiapan, dan modul aktif',
        category: 'tool' as const,
        categoryLabel: 'Navigasi',
        icon: BrainCircuit,
        action: () => onNavigateTab('dashboard'),
        badge: 'Home'
      },
      {
        id: 'tool-knowledge-map',
        title: 'Peta Konsep & Knowledge Graph',
        subtitle: 'Visualisasi interaktif keterhubungan materi D3.js',
        category: 'tool' as const,
        categoryLabel: 'Akademik',
        icon: Network,
        action: () => onNavigateTab('knowledge-map'),
        badge: 'Visual'
      },
      {
        id: 'tool-courses',
        title: 'Katalog 11 Kurikulum Lengkap',
        subtitle: 'Jelajahi seluruh mata kuliah berstandar universitas dunia',
        category: 'tool' as const,
        categoryLabel: 'Akademik',
        icon: BookOpen,
        action: () => onNavigateTab('courses'),
        badge: '11 Kursus'
      },
      {
        id: 'tool-flashcards',
        title: 'Flashcard & Spaced Repetition Studio',
        subtitle: 'Latihan kartu memori aktif recall dengan kalkulasi mastery',
        category: 'tool' as const,
        categoryLabel: 'Akademik',
        icon: Layers,
        action: () => onNavigateTab('flashcards'),
        badge: 'Baru'
      },
      {
        id: 'tool-analytics',
        title: 'Mastery Analytics & Radar Kesiapan',
        subtitle: 'Analisis mendalam 6 dimensi kompetensi dan peluang admisi',
        category: 'tool' as const,
        categoryLabel: 'Akademik',
        icon: BarChart3,
        action: () => onNavigateTab('analytics'),
        badge: 'Radar'
      },
      {
        id: 'tool-ai-research-lab',
        title: 'Laboratorium Riset AI (Research Lab)',
        subtitle: 'Eksplorasi paper ilmiah & sintesis literatur terkini',
        category: 'tool' as const,
        categoryLabel: 'AI Studio',
        icon: Sparkles,
        action: () => onNavigateTab('ai-research-lab'),
        badge: 'AI Gemini'
      },
      {
        id: 'tool-system-design',
        title: 'Arsitektur Sistem & Distributed Arena',
        subtitle: 'Perancangan topologi cloud, microservices, dan high-throughput',
        category: 'tool' as const,
        categoryLabel: 'AI Studio',
        icon: Layers,
        action: () => onNavigateTab('system-design'),
        badge: 'Engineering'
      },
      {
        id: 'tool-prd-builder',
        title: 'AI PRD & Product Spec Builder',
        subtitle: 'Rancang dokumen kebutuhan produk berstandar FAANG / Silicon Valley',
        category: 'tool' as const,
        categoryLabel: 'AI Studio',
        icon: FileText,
        action: () => onNavigateTab('prd-builder'),
        badge: 'Product'
      },
      {
        id: 'tool-presentation',
        title: 'AI Presentation & Slide Deck Canvas',
        subtitle: 'Generator materi presentasi akademik profesional otomatis',
        category: 'tool' as const,
        categoryLabel: 'AI Studio',
        icon: Presentation,
        action: () => onNavigateTab('presentation'),
        badge: 'Slides'
      },
      {
        id: 'tool-web-builder',
        title: 'AI Web & Prototype Builder',
        subtitle: 'Bangun prototipe visual web interaktif dalam hitungan detik',
        category: 'tool' as const,
        categoryLabel: 'AI Studio',
        icon: Globe,
        action: () => onNavigateTab('web-builder'),
        badge: 'Frontend'
      },
      {
        id: 'tool-design-sf',
        title: 'Design SF Showcase & Figma Tokens',
        subtitle: 'Standar desain antarmuka modern San Francisco & Material Design',
        category: 'tool' as const,
        categoryLabel: 'AI Studio',
        icon: Palette,
        action: () => onNavigateTab('design-sf'),
        badge: 'Design'
      },
      {
        id: 'tool-universities',
        title: 'Admisi Universitas Dunia & Beasiswa',
        subtitle: 'Daftar kampus Ivy League, Oxford, Cambridge, dan panduan beasiswa',
        category: 'tool' as const,
        categoryLabel: 'Admisi',
        icon: GraduationCap,
        action: () => onNavigateTab('universities'),
        badge: 'Global'
      },
      {
        id: 'tool-certificates',
        title: 'Pusat Sertifikat Digital & Kredensial',
        subtitle: 'Klaim dan verifikasi sertifikat kelulusan kriptografis dengan QR',
        category: 'tool' as const,
        categoryLabel: 'Admisi',
        icon: Award,
        action: () => onNavigateTab('certificates'),
        badge: 'Kredensial'
      },
      {
        id: 'tool-playground',
        title: 'Sandbox Lab & Multi-Language Runner',
        subtitle: 'Lingkungan eksekusi kode TypeScript, Python, dan Logika',
        category: 'tool' as const,
        categoryLabel: 'Akademik',
        icon: Code2,
        action: () => onNavigateTab('playground'),
        badge: 'Code'
      }
    ];

    items.push(...tools);

    // Quick Actions
    if (onOpenTimer) {
      items.push({
        id: 'action-timer',
        title: 'Mulai Focus & Pomodoro Studio',
        subtitle: 'Timer fokus belajar dengan frekuensi audio 432Hz dan reward XP',
        category: 'tool',
        categoryLabel: 'Aksi Cepat',
        icon: Timer,
        action: onOpenTimer,
        badge: 'Fokus'
      });
    }

    if (onOpenNotes) {
      items.push({
        id: 'action-notes',
        title: 'Buka Buku Catatan Studi & AI Synthesis',
        subtitle: 'Tulis ringkasan dan sintesis otomatis dengan Gemini AI',
        category: 'tool',
        categoryLabel: 'Aksi Cepat',
        icon: FileText,
        action: onOpenNotes,
        badge: 'Catatan'
      });
    }

    if (onOpenAITutor) {
      items.push({
        id: 'action-tutor',
        title: 'Konsultasi 24/7 dengan AI Tutor',
        subtitle: 'Tanya jawab langsung konsep ilmiah, matematika, dan teknologi',
        category: 'tool',
        categoryLabel: 'Aksi Cepat',
        icon: Sparkles,
        action: onOpenAITutor,
        badge: 'Tutor AI'
      });
    }

    if (onOpenQuests) {
      items.push({
        id: 'action-quests',
        title: 'Tantangan Harian & Streak Quest',
        subtitle: 'Klaim bonus XP harian dan selesaikan target misi akademik',
        category: 'tool',
        categoryLabel: 'Aksi Cepat',
        icon: Flame,
        action: onOpenQuests,
        badge: 'Misi XP'
      });
    }

    // 2. Courses
    COURSES_DATA.forEach((course) => {
      items.push({
        id: `course-${course.id}`,
        title: course.title,
        subtitle: `${course.categoryLabel} • ${course.totalLessons} Pelajaran • ${course.level}`,
        category: 'course',
        categoryLabel: 'Mata Kuliah',
        icon: BookOpen,
        action: () => {
          if (onSelectCourseAndLesson && course.modules[0]?.lessons[0]) {
            onSelectCourseAndLesson(course, course.modules[0].lessons[0]);
          } else {
            onNavigateTab('courses');
          }
        },
        badge: course.categoryLabel
      });

      // Lessons in each course
      course.modules.forEach((mod) => {
        mod.lessons.forEach((lesson) => {
          items.push({
            id: `lesson-${lesson.id}`,
            title: lesson.title,
            subtitle: `${course.title} • Modul: ${mod.title} (${lesson.durationMinutes} min)`,
            category: 'lesson',
            categoryLabel: 'Materi Pelajaran',
            icon: CheckCircle2,
            action: () => {
              if (onSelectCourseAndLesson) {
                onSelectCourseAndLesson(course, lesson);
              } else {
                onNavigateTab('courses');
              }
            },
            badge: `${lesson.xpReward} XP`
          });
        });
      });
    });

    // 3. Universities
    UNIVERSITIES_DATA.forEach((uni) => {
      items.push({
        id: `uni-${uni.id}`,
        title: `${uni.name} ${uni.flag}`,
        subtitle: `${uni.city}, ${uni.country} • Peringkat Dunia #${uni.worldRank} • IPK Min: ${uni.admissionRequirements.minGPA}`,
        category: 'university',
        categoryLabel: 'Universitas Dunia',
        icon: GraduationCap,
        action: () => onNavigateTab('universities'),
        badge: `Rank #${uni.worldRank}`
      });
    });

    // 4. Scholarships
    SCHOLARSHIPS_DATA.forEach((sch) => {
      items.push({
        id: `sch-${sch.id}`,
        title: `${sch.name} ${sch.flagEmoji}`,
        subtitle: `Penyelenggara: ${sch.provider} • Cakupan: ${sch.coverage}`,
        category: 'scholarship',
        categoryLabel: 'Beasiswa Global',
        icon: Award,
        action: () => onNavigateTab('universities'),
        badge: sch.type
      });
    });

    return items;
  }, [onNavigateTab, onSelectCourseAndLesson, onOpenTimer, onOpenNotes, onOpenAITutor, onOpenQuests]);

  // Filter items by query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.filter((i) => i.category === 'tool').slice(0, 12);
    }

    const q = query.toLowerCase().trim();
    return allItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
        );
      })
      .slice(0, 20);
  }, [allItems, query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (activeMode === 'catalog') {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          handleClose();
        } else if (query.trim()) {
          executeWebSearch();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    } else {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeWebSearch();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    }
  };

  const copyWebSummary = () => {
    if (!webResult) return;
    const textToCopy = `${webResult.summary}\n\nSumber Terkait:\n${webResult.sources.map(s => `- ${s.title}: ${s.url}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-12 overflow-y-auto animate-in fade-in duration-150"
      onClick={handleClose}
      id="global-command-palette-backdrop"
    >
      <div
        className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mt-4 sm:mt-8 text-zinc-100 animate-in zoom-in-95 duration-150 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        id="global-command-palette-modal"
      >
        {/* Mode Selector Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3.5 pb-2 border-b border-zinc-800/60 bg-zinc-900/40">
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setActiveMode('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeMode === 'catalog'
                  ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Katalog & Modul
            </button>
            <button
              onClick={() => {
                setActiveMode('web');
                if (query.trim() && !webResult) {
                  executeWebSearch();
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeMode === 'web'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-blue-400'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Pencarian Web (Live Grounding)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700 rounded-md">
              ESC
            </kbd>
            <button
              onClick={handleClose}
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-900/70">
          {activeMode === 'web' ? (
            <Globe className="w-5 h-5 text-blue-400 shrink-0 animate-pulse" />
          ) : (
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              activeMode === 'web'
                ? 'Ketik topik apa saja untuk pencarian web real-time & riset ilmiah...'
                : 'Cari 11 kurikulum, universitas dunia, riset AI, atau tools...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none font-medium"
            id="command-palette-input"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setWebResult(null);
              }}
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {activeMode === 'web' && (
            <button
              onClick={() => executeWebSearch()}
              disabled={isSearchingWeb || !query.trim()}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {isSearchingWeb ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CornerDownLeft className="w-3.5 h-3.5" />
              )}
              <span>Cari</span>
            </button>
          )}
        </div>

        {/* Web Search Focus Filters */}
        {activeMode === 'web' && (
          <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 bg-zinc-950 border-b border-zinc-800/60 overflow-x-auto text-[11px]">
            <span className="text-zinc-500 shrink-0 mr-1">Fokus:</span>
            {[
              { id: 'academic', label: '🔬 Riset & Sains' },
              { id: 'scholarship', label: '🎓 Beasiswa Global' },
              { id: 'technical', label: '💻 Tech & Arsitektur' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSearchFocus(f.id as any)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  searchFocus === f.id
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Body Content */}
        <div className="overflow-y-auto p-2 sm:p-4 space-y-2 flex-1">
          {activeMode === 'catalog' ? (
            /* CATALOG LIST */
            <>
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center text-zinc-500 space-y-3">
                  <Search className="w-8 h-8 mx-auto text-zinc-600 stroke-1" />
                  <p className="text-sm">Tidak ditemukan hasil lokal untuk &quot;{query}&quot;</p>
                  <button
                    onClick={() => executeWebSearch()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-500/10"
                  >
                    <Globe className="w-4 h-4" />
                    Cari &quot;{query}&quot; di Seluruh Web Real-Time
                  </button>
                </div>
              ) : (
                <>
                  {filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          item.action();
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between p-3 rounded-xl sm:rounded-2xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-zinc-800/90 text-white shadow-sm border border-zinc-700/60 translate-x-0.5'
                            : 'text-zinc-300 hover:bg-zinc-900/60 border border-transparent'
                        }`}
                        id={`command-item-${item.id}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-zinc-100 text-zinc-950 border-zinc-200'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-semibold truncate text-zinc-100">
                                {item.title}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0 font-medium">
                                {item.categoryLabel}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono hidden xs:inline-block">
                              {item.badge}
                            </span>
                          )}
                          <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-zinc-100' : 'text-zinc-600'}`} />
                        </div>
                      </div>
                    );
                  })}

                  {/* Web search trigger banner at bottom of catalog */}
                  {query.trim() && (
                    <div
                      onClick={() => executeWebSearch()}
                      className="mt-3 p-3.5 bg-gradient-to-r from-blue-950/40 via-zinc-900 to-indigo-950/40 border border-blue-500/20 rounded-2xl cursor-pointer hover:border-blue-500/40 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-zinc-200 group-hover:text-blue-300 transition-colors">
                            Cari &quot;{query}&quot; di Web Real-Time (Google Grounding)
                          </div>
                          <div className="text-[10px] text-zinc-400">
                            Sintesiskan riset ilmiah, artikel terbaru, dan sumber web terpercaya
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            /* WEB SEARCH RESULTS & SUGGESTIONS */
            <div className="space-y-4">
              {isSearchingWeb && (
                <div className="py-14 text-center space-y-3">
                  <Loader2 className="w-8 h-8 mx-auto text-blue-400 animate-spin" />
                  <div className="text-sm font-semibold text-zinc-200">
                    Menjelajahi Web & Mensintesiskan Data Ilmiah...
                  </div>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Menghubungi Google Search Grounding untuk mengekstrak informasi akademik terkini dan sumber terverifikasi.
                  </p>
                </div>
              )}

              {!isSearchingWeb && !webResult && (
                <div className="space-y-4 py-2">
                  <div className="text-xs font-medium text-zinc-400 px-1">
                    Topik Riset & Pencarian Populer:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {QUICK_SEARCH_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQuery(prompt.query);
                          executeWebSearch(prompt.query);
                        }}
                        className="text-left p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-blue-500/30 transition-all group"
                      >
                        <div className="text-xs font-semibold text-zinc-200 group-hover:text-blue-300">
                          {prompt.label}
                        </div>
                        <div className="text-[10px] text-zinc-500 truncate mt-1">
                          {prompt.query}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isSearchingWeb && webResult && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Results Header */}
                  <div className="flex items-center justify-between bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
                        Hasil Riset Web Real-time
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-100 line-clamp-1">
                        {webResult.query}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={copyWebSummary}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 transition-colors"
                        title="Salin Rangkuman"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px] hidden sm:inline">{copied ? 'Tersalin' : 'Salin'}</span>
                      </button>
                      {onOpenAITutor && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenAITutor();
                          }}
                          className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs flex items-center gap-1 transition-colors"
                          title="Tanya AI Tutor"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">Diskusi AI</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Summary Markdown */}
                  <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-xs sm:text-sm leading-relaxed text-zinc-300 prose prose-invert max-w-none prose-p:my-2 prose-headings:text-zinc-100 prose-a:text-blue-400">
                    <Markdown>{webResult.summary}</Markdown>
                  </div>

                  {/* Web Sources & Citations */}
                  {webResult.sources.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5 px-1">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        Sumber Web & Referensi Terverifikasi ({webResult.sources.length}):
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {webResult.sources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="text-xs font-semibold text-zinc-200 truncate group-hover:text-blue-300">
                                {src.title}
                              </div>
                              <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                                {src.domain}
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-zinc-900/90 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 font-mono text-[9px]">↑↓</kbd> Navigasi
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 font-mono text-[9px]">↵</kbd> {activeMode === 'web' ? 'Cari Web' : 'Pilih'}
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-400">
            {activeMode === 'web' ? 'Bertenaga Google Search Grounding' : 'Pusat Pengetahuan Terpadu Akademia Global'}
          </span>
        </div>
      </div>
    </div>
  );
}
