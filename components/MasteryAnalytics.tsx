'use client';

import React from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Award, 
  GraduationCap, 
  Zap, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Target, 
  BrainCircuit, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Compass, 
  ArrowRight 
} from 'lucide-react';
import { UserProgress } from '@/lib/types';
import { COURSES_DATA } from '@/lib/data/courses';
import { UNIVERSITIES_DATA } from '@/lib/data/universities';

interface MasteryAnalyticsProps {
  progress: UserProgress;
  onNavigateTab: (tab: string) => void;
  onOpenAITutor: () => void;
}

export function MasteryAnalytics({ progress, onNavigateTab, onOpenAITutor }: MasteryAnalyticsProps) {
  const completedCount = progress.completedLessonIds.length;
  const totalCourses = COURSES_DATA.length;
  const completedCoursesCount = progress.completedCourseIds.length;

  // Calculate scores per category
  const categories = [
    {
      id: 'cs',
      name: 'Computer Science & Software',
      icon: BrainCircuit,
      categoryKey: 'coding',
      weight: 85
    },
    {
      id: 'ai',
      name: 'AI Engineering & Deep Learning',
      icon: Sparkles,
      categoryKey: 'specialized',
      weight: 90
    },
    {
      id: 'math',
      name: 'Applied Mathematics & Calculus',
      icon: TrendingUp,
      categoryKey: 'science',
      weight: 80
    },
    {
      id: 'physics',
      name: 'Quantum Physics & Mechanics',
      icon: Layers,
      categoryKey: 'science',
      weight: 75
    },
    {
      id: 'systems',
      name: 'Distributed Systems & Cloud',
      icon: Target,
      categoryKey: 'engineering',
      weight: 85
    },
    {
      id: 'admission',
      name: 'Global Admission & Rigor',
      icon: GraduationCap,
      categoryKey: 'humanities',
      weight: 95
    }
  ];

  // Dynamic calculation
  const categoryScores = categories.map((cat) => {
    const relevantCourses = COURSES_DATA.filter((c) => c.category === cat.categoryKey);
    const allLessonIds = relevantCourses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.id)));
    const finishedCount = allLessonIds.filter((id) => progress.completedLessonIds.includes(id)).length;
    
    // Base readiness calculation
    const progressRatio = allLessonIds.length > 0 ? finishedCount / allLessonIds.length : 0;
    const baseScore = Math.min(100, Math.round(20 + progressRatio * 75 + Math.min(10, progress.level * 2)));

    return {
      ...cat,
      score: baseScore,
      finishedCount,
      totalCount: allLessonIds.length
    };
  });

  // Calculate Average Quiz Score
  const quizScores = Object.values(progress.passedQuizScores || {});
  const avgQuizScore = quizScores.length > 0 
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 100;

  // Estimated hours
  const totalStudyMinutes = (completedCount * 30) + (progress.dailyStudyMinutes || 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // Top university readiness check
  const topUniReadiness = UNIVERSITIES_DATA.slice(0, 4).map((uni) => {
    const minGPA = parseFloat(uni.admissionRequirements.minGPA) || 3.8;
    const scoreFactor = Math.min(100, Math.round((progress.totalXp / 1500) * 100));
    const estimatedReadiness = Math.min(98, Math.max(35, Math.round(35 + (progress.completedLessonIds.length * 5) + (progress.certificates.length * 15))));

    return {
      uni,
      readiness: estimatedReadiness
    };
  });

  return (
    <div className="space-y-6 sm:space-y-8" id="mastery-analytics-tab">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 text-xl shadow-md">
            <BarChart3 className="w-6 h-6 text-zinc-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-zinc-100">
                Mastery Analytics & Radar Kesiapan Global
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                Data Intelijen
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Evaluasi komprehensif 6 pilar kompetensi akademik dan proyeksi kelolosan admisi universitas dunia.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAITutor}
          className="px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>Konsultasi AI Tutor</span>
        </button>
      </div>

      {/* Top 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Total Waktu Studi</span>
            <Clock className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-100 font-mono">
            {totalStudyHours} <span className="text-xs font-normal text-zinc-400">Jam</span>
          </div>
          <p className="text-[10px] text-zinc-500">Akumulasi sesi kuliah & Pomodoro</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Akurasi Kuis Modul</span>
            <CheckCircle2 className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-100 font-mono">
            {avgQuizScore}%
          </div>
          <p className="text-[10px] text-zinc-500">Rata-rata skor kelulusan tes</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Materi Dikuasai</span>
            <BookOpen className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-100 font-mono">
            {completedCount} <span className="text-xs font-normal text-zinc-400">Modul</span>
          </div>
          <p className="text-[10px] text-zinc-500">{completedCoursesCount} dari {totalCourses} mata kuliah tuntas</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Sertifikat & Gelar</span>
            <Award className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-zinc-100 font-mono">
            {progress.certificates.length} <span className="text-xs font-normal text-zinc-400">Kredensial</span>
          </div>
          <p className="text-[10px] text-zinc-500">Tervalidasi secara kriptografis</p>
        </div>
      </div>

      {/* Main Section: 6 Competency Pillars (Left) & Admission Readiness (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 6 Competency Pillars Radar Bars */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-zinc-300" />
              <h2 className="text-sm sm:text-base font-bold text-zinc-100">
                Peta Kompetensi 6 Pilar Akademik
              </h2>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              Indeks Kesiapan
            </span>
          </div>

          <div className="space-y-4">
            {categoryScores.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div key={pillar.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-zinc-200 font-medium">
                      <Icon className="w-4 h-4 text-zinc-400" />
                      <span>{pillar.name}</span>
                    </div>
                    <span className="font-mono font-bold text-zinc-100">
                      {pillar.score}/100
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="w-full h-2.5 rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-gradient-to-r from-zinc-500 via-zinc-300 to-white transition-all duration-500"
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs text-zinc-400">
            <span>Ingin meningkatkan indeks kompetensi di pilar tertentu?</span>
            <button
              onClick={() => onNavigateTab('courses')}
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-full flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Pelajari Modul</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global Admission Readiness Radar */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-zinc-300" />
              <h2 className="text-sm sm:text-base font-bold text-zinc-100">
                Proyeksi Admisi Kampus Dunia
              </h2>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              Top World
            </span>
          </div>

          <div className="space-y-3.5">
            {topUniReadiness.map(({ uni, readiness }) => (
              <div
                key={uni.id}
                className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{uni.flag}</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-100">
                        {uni.name}
                      </h4>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        Peringkat #{uni.worldRank} • {uni.city}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-zinc-100 font-mono">
                      {readiness}%
                    </span>
                    <span className="text-[9px] text-zinc-500 block">Kesiapan</span>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-zinc-300 transition-all duration-500"
                    style={{ width: `${readiness}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('universities')}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Buka Pelacak Admisi & 8 Beasiswa Penuh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
