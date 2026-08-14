'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  Zap, 
  Sparkles, 
  Bot, 
  Menu, 
  X, 
  LayoutGrid, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Code2,
  Network,
  FileText,
  Presentation,
  Globe,
  Palette,
  Layers,
  Timer,
  Settings,
  Search,
  ChevronDown,
  BarChart3,
  BrainCircuit,
  Compass
} from 'lucide-react';
import { UserProgress } from '@/lib/types';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  progress: UserProgress;
  onOpenAITutor: () => void;
  onOpenSettings?: () => void;
  onOpenTimer?: () => void;
  onOpenNotes?: () => void;
  onOpenSearch?: () => void;
  onOpenQuests?: () => void;
}

export function Navbar({
  activeTab,
  onSelectTab,
  progress,
  onOpenAITutor,
  onOpenSettings,
  onOpenTimer,
  onOpenNotes,
  onOpenSearch,
  onOpenQuests
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const academicItems = [
    { id: 'courses', label: 'Kurikulum & Silabus (11 Kursus)', icon: BookOpen, desc: 'Materi lengkap berstandar universitas global' },
    { id: 'knowledge-map', label: 'Peta Konsep (Knowledge Graph)', icon: Network, desc: 'Visualisasi keterhubungan materi interaktif D3' },
    { id: 'flashcards', label: 'Flashcard & Spaced Repetition', icon: Layers, desc: 'Latihan active recall dengan scoring mastery' },
    { id: 'playground', label: 'Sandbox Lab & Multi-Runner', icon: Code2, desc: 'Eksekusi kode TypeScript, Python, dan logika' }
  ];

  const aiStudioItems = [
    { id: 'ai-research-lab', label: 'Laboratorium Riset AI', icon: Sparkles, desc: 'Analisis paper mutakhir & sintesis literatur' },
    { id: 'system-design', label: 'Arsitektur Sistem Terdistribusi', icon: Layers, desc: 'Perancangan topologi cloud & skala tinggi' },
    { id: 'prd-builder', label: 'AI PRD & Product Spec Builder', icon: FileText, desc: 'Dokumen kebutuhan produk standar Silicon Valley' },
    { id: 'presentation', label: 'AI Presentation Canvas', icon: Presentation, desc: 'Slide generator & deck visual interaktif' },
    { id: 'web-builder', label: 'AI Web & Prototype Builder', icon: Globe, desc: 'Prototipe visual instan siap ekspor' },
    { id: 'design-sf', label: 'Design SF & Figma Showcase', icon: Palette, desc: 'Design tokens & standar estetika San Francisco' }
  ];

  const careerItems = [
    { id: 'universities', label: 'Admisi Kampus Dunia & Beasiswa', icon: GraduationCap, desc: '12 Universitas Ivy League & 8 Beasiswa' },
    { id: 'certificates', label: 'Pusat Sertifikat Digital', icon: Award, desc: 'Kredensial kelulusan kriptografis dengan QR' },
    { id: 'analytics', label: 'Mastery Analytics & Radar Kesiapan', icon: BarChart3, desc: 'Evaluasi 6 pilar kompetensi akademik' }
  ];

  const isAcademicActive = academicItems.some((i) => i.id === activeTab);
  const isAiStudioActive = aiStudioItems.some((i) => i.id === activeTab);
  const isCareerActive = careerItems.some((i) => i.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80" id="main-navigation-bar">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section: Brand Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
            id="brand-logo-btn"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-100 font-black text-base sm:text-lg shadow-sm group-hover:border-zinc-500 group-hover:bg-zinc-800 transition-all">
              Ω
            </div>
            <div>
              <div className="flex items-center gap-1 font-bold text-zinc-100 tracking-tight text-sm sm:text-base">
                <span>Akademia</span>
                <span className="text-zinc-400 font-medium">Global</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 tracking-wider font-mono block -mt-0.5">
                Pusat Studi Terpadu
              </span>
            </div>
          </div>

          {/* Quick Spotlight Search Trigger Pill (Desktop) */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer shadow-inner"
              title="Cari Materi, Riset, Universitas (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[11px]">Cari Materi...</span>
              <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        {/* Desktop Categorized Navigation (Pill Menu with Dropdowns) */}
        <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1 bg-zinc-900/80 p-1 rounded-full border border-zinc-800 shadow-inner">
          {/* 1. Dashboard Tab */}
          <button
            onClick={() => {
              onSelectTab('dashboard');
              setOpenDropdown(null);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-zinc-100 text-zinc-900 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70'
            }`}
            id="nav-link-dashboard"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          {/* 2. Akademik Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'academic' ? null : 'academic')}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isAcademicActive
                  ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Akademik</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'academic' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'academic' && (
              <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                {academicItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setOpenDropdown(null);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-zinc-800 text-zinc-100'
                          : 'text-zinc-300 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-300 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-100">{item.label}</div>
                        <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. AI & Desain Studio Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'aistudio' ? null : 'aistudio')}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isAiStudioActive
                  ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>AI Studio</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'aistudio' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'aistudio' && (
              <div className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                {aiStudioItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setOpenDropdown(null);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-zinc-800 text-zinc-100'
                          : 'text-zinc-300 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-300 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-100">{item.label}</div>
                        <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Admisi & Karir Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'career' ? null : 'career')}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isCareerActive
                  ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Admisi & Karir</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'career' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'career' && (
              <div className="absolute top-full right-0 mt-2 w-72 p-2 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                {careerItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setOpenDropdown(null);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-zinc-800 text-zinc-100'
                          : 'text-zinc-300 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-300 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-100">{item.label}</div>
                        <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Stats & Utility Action Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Search Icon Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="md:hidden p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Cari"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Daily Quests Trigger Button */}
          {onOpenQuests && (
            <button
              onClick={onOpenQuests}
              className="p-1.5 sm:px-2.5 sm:py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/50 rounded-full text-[11px] font-medium text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Tantangan Harian & Streak"
              id="btn-nav-quests"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline font-bold">{progress.streakDays}d Streak</span>
            </button>
          )}

          {/* Focus Timer Button */}
          {onOpenTimer && (
            <button
              onClick={onOpenTimer}
              className="p-1.5 sm:px-2.5 sm:py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-full text-[11px] font-medium text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Buka Focus & Pomodoro Timer"
              id="btn-nav-timer"
            >
              <Timer className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden md:inline">Fokus</span>
            </button>
          )}

          {/* Quick Notes Button */}
          {onOpenNotes && (
            <button
              onClick={onOpenNotes}
              className="p-1.5 sm:px-2.5 sm:py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-full text-[11px] font-medium text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Buka Buku Catatan Studi"
              id="btn-nav-notes"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden md:inline">Catatan</span>
            </button>
          )}

          {/* Level Chip */}
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] font-medium text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-zinc-500">Lvl</span>
            <span className="text-zinc-200 font-mono font-semibold">{progress.level}</span>
          </div>

          {/* XP Chip */}
          <div className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] font-semibold text-zinc-200 font-mono">
            <Zap className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{progress.totalXp} XP</span>
          </div>

          {/* AI Tutor Assistant Trigger */}
          <button
            onClick={onOpenAITutor}
            className="min-h-[36px] px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 hover:border-zinc-500 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
            id="btn-nav-open-ai"
            aria-label="Buka AI Tutor"
          >
            <Bot className="w-3.5 h-3.5 text-zinc-300" />
            <span className="hidden sm:inline">Tutor AI</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300"></span>
            </span>
          </button>

          {/* Profile & Settings Trigger */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-1 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900 transition-all cursor-pointer shrink-0"
              title="Pengaturan Profil & Reset Data"
              id="btn-nav-profile-settings"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={progress.avatar}
                alt={progress.studentName}
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            id="btn-mobile-menu"
            aria-label="Buka Menu Navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Full Categorized View) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {/* User Profile Card */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={progress.avatar}
                alt={progress.studentName}
                className="w-9 h-9 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <span className="text-xs font-bold text-zinc-100 block">{progress.studentName}</span>
                <span className="text-[10px] text-zinc-400 font-mono">Level {progress.level} • {progress.totalXp} XP</span>
              </div>
            </div>

            {onOpenSettings && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Pengaturan</span>
              </button>
            )}
          </div>

          {/* Quick Utility Grid */}
          <div className="grid grid-cols-3 gap-2">
            {onOpenSearch && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium flex flex-col items-center gap-1 text-center"
              >
                <Search className="w-4 h-4 text-zinc-400" />
                <span>Cari ⌘K</span>
              </button>
            )}

            {onOpenTimer && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTimer();
                }}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium flex flex-col items-center gap-1 text-center"
              >
                <Timer className="w-4 h-4 text-zinc-400" />
                <span>Timer Fokus</span>
              </button>
            )}

            {onOpenNotes && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNotes();
                }}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium flex flex-col items-center gap-1 text-center"
              >
                <FileText className="w-4 h-4 text-zinc-400" />
                <span>Catatan</span>
              </button>
            )}
          </div>

          {/* Section 1: Dashboard */}
          <div>
            <button
              onClick={() => {
                onSelectTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'text-zinc-200 bg-zinc-900/70 border border-zinc-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Dashboard Utama</span>
            </button>
          </div>

          {/* Section 2: Kurikulum & Akademik */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">
              Akademik & Studi
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {academicItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors text-left min-h-[42px] cursor-pointer ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-950 font-bold'
                        : 'text-zinc-300 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: AI & Desain Studio */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">
              AI & Inovasi Studio
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {aiStudioItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors text-left min-h-[42px] cursor-pointer ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-950 font-bold'
                        : 'text-zinc-300 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Admisi, Sertifikat & Analytics */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">
              Admisi & Kredensial
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {careerItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors text-left min-h-[42px] cursor-pointer ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-950 font-bold'
                        : 'text-zinc-300 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
