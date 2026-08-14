'use client';

import React, { useState } from 'react';
import { 
  LayoutGrid, 
  BookOpen, 
  Sparkles, 
  Menu, 
  Plus, 
  X, 
  Timer, 
  FileText, 
  Layers, 
  Search, 
  Flame, 
  Bot, 
  GraduationCap, 
  Award, 
  Code2, 
  Network,
  BarChart3,
  Globe,
  Palette
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenTimer?: () => void;
  onOpenNotes?: () => void;
  onOpenSearch?: () => void;
  onOpenQuests?: () => void;
  onOpenAITutor?: () => void;
}

export function MobileBottomNav({
  activeTab,
  onSelectTab,
  onOpenTimer,
  onOpenNotes,
  onOpenSearch,
  onOpenQuests,
  onOpenAITutor
}: MobileBottomNavProps) {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isExploreSheetOpen, setIsExploreSheetOpen] = useState(false);

  const isAiStudioTab = ['ai-research-lab', 'system-design', 'prd-builder', 'presentation', 'web-builder', 'design-sf'].includes(activeTab);

  return (
    <>
      {/* Quick Action Sheet Modal */}
      {isActionSheetOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-150"
          onClick={() => setIsActionSheetOpen(false)}
          id="mobile-action-sheet-backdrop"
        >
          <div
            className="w-full max-w-lg bg-zinc-950 border-t border-zinc-800 rounded-t-3xl p-5 pb-8 space-y-4 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
            id="mobile-action-sheet"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <h3 className="text-sm font-bold text-zinc-100">Pusat Aksi Cepat Akademia</h3>
              </div>
              <button
                onClick={() => setIsActionSheetOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {onOpenAITutor && (
                <button
                  onClick={() => {
                    setIsActionSheetOpen(false);
                    onOpenAITutor();
                  }}
                  className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex flex-col items-center gap-1.5 text-center transition-all active:scale-95 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-200">
                    <Bot className="w-5 h-5 text-zinc-200" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-100">AI Tutor</span>
                  <span className="text-[10px] text-zinc-500">Tanya Jawab</span>
                </button>
              )}

              {onOpenTimer && (
                <button
                  onClick={() => {
                    setIsActionSheetOpen(false);
                    onOpenTimer();
                  }}
                  className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex flex-col items-center gap-1.5 text-center transition-all active:scale-95 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-200">
                    <Timer className="w-5 h-5 text-zinc-200" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-100">Timer Fokus</span>
                  <span className="text-[10px] text-zinc-500">Pomodoro 25m</span>
                </button>
              )}

              {onOpenNotes && (
                <button
                  onClick={() => {
                    setIsActionSheetOpen(false);
                    onOpenNotes();
                  }}
                  className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex flex-col items-center gap-1.5 text-center transition-all active:scale-95 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-200">
                    <FileText className="w-5 h-5 text-zinc-200" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-100">Catatan Studi</span>
                  <span className="text-[10px] text-zinc-500">AI Synthesis</span>
                </button>
              )}

              {onOpenQuests && (
                <button
                  onClick={() => {
                    setIsActionSheetOpen(false);
                    onOpenQuests();
                  }}
                  className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex flex-col items-center gap-1.5 text-center transition-all active:scale-95 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-200">
                    <Flame className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-100">Misi Harian</span>
                  <span className="text-[10px] text-zinc-500">Streak & XP</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsActionSheetOpen(false);
                  onSelectTab('flashcards');
                }}
                className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex flex-col items-center gap-1.5 text-center transition-all active:scale-95 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-200">
                  <Layers className="w-5 h-5 text-zinc-200" />
                </div>
                <span className="text-xs font-semibold text-zinc-100">Flashcards</span>
                <span className="text-[10px] text-zinc-500">Active Recall</span>
              </button>

              {onOpenSearch && (
                <button
                  onClick={() => {
                    setIsActionSheetOpen(false);
                    onOpenSearch();
                  }}
                  className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex flex-col items-center gap-1.5 text-center transition-all active:scale-95 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-200">
                    <Search className="w-5 h-5 text-zinc-200" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-100">Pencarian</span>
                  <span className="text-[10px] text-zinc-500">Spotlight ⌘K</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Explore All Features Sheet Modal */}
      {isExploreSheetOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-150"
          onClick={() => setIsExploreSheetOpen(false)}
          id="mobile-explore-sheet-backdrop"
        >
          <div
            className="w-full max-w-lg bg-zinc-950 border-t border-zinc-800 rounded-t-3xl p-5 pb-8 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
            id="mobile-explore-sheet"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-100">Semua Modul & Ekosistem</h3>
              <button
                onClick={() => setIsExploreSheetOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Academic */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Akademik & Riset
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'courses', label: '11 Kurikulum', icon: BookOpen },
                  { id: 'knowledge-map', label: 'Peta Konsep D3', icon: Network },
                  { id: 'flashcards', label: 'Flashcard Studio', icon: Layers },
                  { id: 'playground', label: 'Code Sandbox', icon: Code2 },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setIsExploreSheetOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-medium cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-200'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Studio */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Studio AI & Engineering
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'ai-research-lab', label: 'Riset AI Lab', icon: Sparkles },
                  { id: 'system-design', label: 'Arsitektur Cloud', icon: Layers },
                  { id: 'prd-builder', label: 'PRD Builder', icon: FileText },
                  { id: 'presentation', label: 'Slide Deck PPT', icon: FileText },
                  { id: 'web-builder', label: 'Web Prototype', icon: Globe },
                  { id: 'design-sf', label: 'Design SF Tokens', icon: Palette },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setIsExploreSheetOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-medium cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-200'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Career & Certs */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Admisi & Kredensial
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'universities', label: 'Admisi & Beasiswa', icon: GraduationCap },
                  { id: 'certificates', label: 'Sertifikat Digital', icon: Award },
                  { id: 'analytics', label: 'Mastery Analytics', icon: BarChart3 }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setIsExploreSheetOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-medium cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-200'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Navigasi Bawah Seluler"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/90 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl"
        id="mobile-bottom-navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* 1. Dashboard Tab */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] py-1 rounded-2xl transition-all cursor-pointer select-none active:scale-95 ${
              activeTab === 'dashboard' ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            id="mobile-nav-dashboard"
          >
            <div
              className={`w-10 h-7 rounded-full flex items-center justify-center transition-all ${
                activeTab === 'dashboard' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'text-zinc-400'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight truncate ${activeTab === 'dashboard' ? 'font-bold text-zinc-100' : 'text-zinc-400'}`}>
              Beranda
            </span>
          </button>

          {/* 2. Kurikulum Tab */}
          <button
            onClick={() => onSelectTab('courses')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] py-1 rounded-2xl transition-all cursor-pointer select-none active:scale-95 ${
              activeTab === 'courses' || activeTab === 'lesson' ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            id="mobile-nav-courses"
          >
            <div
              className={`w-10 h-7 rounded-full flex items-center justify-center transition-all ${
                activeTab === 'courses' || activeTab === 'lesson' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'text-zinc-400'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight truncate ${activeTab === 'courses' || activeTab === 'lesson' ? 'font-bold text-zinc-100' : 'text-zinc-400'}`}>
              Kurikulum
            </span>
          </button>

          {/* 3. Center Elevated Action Button */}
          <button
            onClick={() => setIsActionSheetOpen(true)}
            className="flex flex-col items-center justify-center -mt-4 cursor-pointer select-none active:scale-90 transition-transform"
            id="mobile-nav-center-action"
            title="Pusat Aksi Cepat"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center shadow-lg border-2 border-zinc-950">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-zinc-200 mt-1">Aksi</span>
          </button>

          {/* 4. AI Studio Tab */}
          <button
            onClick={() => onSelectTab('ai-research-lab')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] py-1 rounded-2xl transition-all cursor-pointer select-none active:scale-95 ${
              isAiStudioTab ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            id="mobile-nav-ai-studio"
          >
            <div
              className={`w-10 h-7 rounded-full flex items-center justify-center transition-all ${
                isAiStudioTab ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'text-zinc-400'
              }`}
            >
              <Sparkles className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100" />
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight truncate ${isAiStudioTab ? 'font-bold text-zinc-100' : 'text-zinc-400'}`}>
              Studio AI
            </span>
          </button>

          {/* 5. Jelajah Menu Tab */}
          <button
            onClick={() => setIsExploreSheetOpen(true)}
            className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] py-1 rounded-2xl transition-all cursor-pointer select-none active:scale-95 text-zinc-400 hover:text-zinc-200"
            id="mobile-nav-explore"
          >
            <div className="w-10 h-7 rounded-full flex items-center justify-center text-zinc-400">
              <Menu className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate text-zinc-400 font-medium">
              Jelajah
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
