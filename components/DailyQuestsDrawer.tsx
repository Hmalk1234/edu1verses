'use client';

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Trophy, 
  X, 
  ArrowRight, 
  Calendar, 
  Award, 
  Zap, 
  BookOpen, 
  Timer, 
  BrainCircuit, 
  Layers 
} from 'lucide-react';
import { UserProgress } from '@/lib/types';

interface DailyQuestsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onAwardXP: (xp: number) => void;
  onNavigateTab: (tab: string) => void;
  onOpenTimer: () => void;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: any;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  claimed: boolean;
  actionTab?: string;
  actionText: string;
  actionType?: 'tab' | 'timer';
}

const STORAGE_KEY_QUESTS = 'akademia_daily_quests_v1';

export function DailyQuestsDrawer({
  isOpen,
  onClose,
  progress,
  onAwardXP,
  onNavigateTab,
  onOpenTimer
}: DailyQuestsDrawerProps) {
  const todayDate = new Date().toISOString().split('T')[0];

  // Daily quests claimed state loaded lazily
  const [claimedMap, setClaimedMap] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY_QUESTS}_${new Date().toISOString().split('T')[0]}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const quests: Quest[] = useMemo(() => {
    const hasLesson = progress.completedLessonIds.length > 0;
    const studyMins = progress.dailyStudyMinutes || 0;

    return [
      {
        id: 'quest-lesson',
        title: 'Kuasai 1 Materi Kuliah Baru',
        description: 'Pelajari konsep dan luluskan kuis pemahaman modul',
        xpReward: 50,
        icon: BookOpen,
        targetCount: 1,
        currentCount: Math.min(1, progress.completedLessonIds.length),
        completed: hasLesson,
        claimed: !!claimedMap['quest-lesson'],
        actionTab: 'courses',
        actionText: 'Buka Kurikulum',
        actionType: 'tab'
      },
      {
        id: 'quest-timer',
        title: 'Sesi Fokus Pomodoro (25 Menit)',
        description: 'Lakukan deep work tanpa distraksi dengan audio 432Hz',
        xpReward: 60,
        icon: Timer,
        targetCount: 25,
        currentCount: Math.min(25, studyMins),
        completed: studyMins >= 25,
        claimed: !!claimedMap['quest-timer'],
        actionText: 'Mulai Timer',
        actionType: 'timer'
      },
      {
        id: 'quest-flashcard',
        title: 'Latihan 5 Flashcard Active Recall',
        description: 'Pertajam memori jangka panjang dengan spaced repetition',
        xpReward: 40,
        icon: Layers,
        targetCount: 5,
        currentCount: 5,
        completed: true,
        claimed: !!claimedMap['quest-flashcard'],
        actionTab: 'flashcards',
        actionText: 'Buka Flashcard',
        actionType: 'tab'
      },
      {
        id: 'quest-research',
        title: 'Eksplorasi Laboratorium Riset AI',
        description: 'Analisis paper mutakhir atau uji hipotesis ilmiah',
        xpReward: 75,
        icon: Sparkles,
        targetCount: 1,
        currentCount: 1,
        completed: true,
        claimed: !!claimedMap['quest-research'],
        actionTab: 'ai-research-lab',
        actionText: 'Riset AI',
        actionType: 'tab'
      }
    ];
  }, [progress.completedLessonIds, progress.dailyStudyMinutes, claimedMap]);

  const handleClaimReward = (questId: string, xp: number) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    onAwardXP(xp);

    setClaimedMap((prev) => {
      const updated = { ...prev, [questId]: true };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`${STORAGE_KEY_QUESTS}_${todayDate}`, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });
  };

  if (!isOpen) return null;

  const totalQuests = quests.length;
  const completedQuests = quests.filter((q) => q.completed).length;
  const completionPercent = Math.round((completedQuests / totalQuests) * 100);

  // 7-day streak mock calendar
  const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const currentDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
      id="daily-quests-backdrop"
    >
      <div
        className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col text-zinc-100 shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
        id="daily-quests-drawer"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-100 shadow-sm">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-zinc-100">
                Tantangan Harian & Streak
              </h2>
              <p className="text-[11px] text-zinc-400">
                Disiplin akademik berkelanjutan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            id="close-quests-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Streak & Daily Progress Card */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-zinc-100">
                  {progress.streakDays} Hari Streak Aktif
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {completedQuests}/{totalQuests} Selesai
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-zinc-200 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            {/* 7-Day Streak Row */}
            <div className="grid grid-cols-7 gap-1 pt-1">
              {daysOfWeek.map((day, idx) => {
                const isPassed = idx <= currentDayIndex;
                const isToday = idx === currentDayIndex;

                return (
                  <div
                    key={day}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-xl border text-center ${
                      isToday
                        ? 'bg-zinc-800 border-amber-500/50 text-amber-300 font-bold'
                        : isPassed
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-600'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider">{day}</span>
                    <div className="mt-1">
                      {isPassed ? (
                        <Flame className={`w-3.5 h-3.5 mx-auto ${isToday ? 'text-amber-400 fill-amber-400' : 'text-zinc-400'}`} />
                      ) : (
                        <Circle className="w-3.5 h-3.5 mx-auto text-zinc-700" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quests List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">
              Misi Hari Ini
            </h3>

            {quests.map((quest) => {
              const Icon = quest.icon;

              return (
                <div
                  key={quest.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    quest.claimed
                      ? 'bg-zinc-900/30 border-zinc-800/50 opacity-75'
                      : quest.completed
                      ? 'bg-zinc-900 border-zinc-700 shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800/80'
                  }`}
                  id={`quest-card-${quest.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                          quest.completed
                            ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-400'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                          {quest.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                          {quest.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 shrink-0">
                      +{quest.xpReward} XP
                    </span>
                  </div>

                  {/* Quest Action / Claim Button */}
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/70 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Progres: {quest.currentCount}/{quest.targetCount}
                    </span>

                    {quest.claimed ? (
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Diklaim
                      </span>
                    ) : quest.completed ? (
                      <button
                        onClick={() => handleClaimReward(quest.id, quest.xpReward)}
                        className="px-3 py-1 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                        id={`btn-claim-${quest.id}`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                        <span>Klaim +{quest.xpReward} XP</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onClose();
                          if (quest.actionType === 'timer') {
                            onOpenTimer();
                          } else if (quest.actionTab) {
                            onNavigateTab(quest.actionTab);
                          }
                        }}
                        className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{quest.actionText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Academic Wisdom Quote */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-zinc-400 space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
              Prinsip Ketekunan Akademik
            </span>
            <p className="text-xs italic text-zinc-300">
              &quot;Kita adalah apa yang kita lakukan berulang-ulang. Oleh karena itu, keunggulan bukanlah tindakan, melainkan kebiasaan.&quot;
            </p>
            <span className="text-[10px] text-zinc-500 text-right block">— Aristoteles</span>
          </div>
        </div>
      </div>
    </div>
  );
}
