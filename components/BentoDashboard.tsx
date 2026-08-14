'use client';

import React from 'react';
import { 
  Flame, 
  Zap, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  ShieldCheck, 
  Play,
  Terminal,
  MessageSquareCode,
  Layers,
  Compass,
  Network,
  Share2
} from 'lucide-react';
import { UserProgress, Course, Lesson } from '@/lib/types';
import { COURSES_DATA } from '@/lib/data/courses';
import { UNIVERSITIES_DATA } from '@/lib/data/universities';
import { RobotMascot } from './RobotMascot';
import { QRCodeSVG } from './QRCodeSVG';
import { 
  Timer,
  FileText,
  Settings,
  Target
} from 'lucide-react';

interface BentoDashboardProps {
  progress: UserProgress;
  onNavigateTab: (tab: string) => void;
  onSelectCourseAndLesson: (course: Course, lesson: Lesson) => void;
  onOpenAITutor: () => void;
  onOpenSettings?: () => void;
  onOpenTimer?: () => void;
  onOpenNotes?: () => void;
}

export function BentoDashboard({
  progress,
  onNavigateTab,
  onSelectCourseAndLesson,
  onOpenAITutor,
  onOpenSettings,
  onOpenTimer,
  onOpenNotes
}: BentoDashboardProps) {
  // Find current in-progress course and next uncompleted lesson
  const currentCourse = COURSES_DATA[0];
  let nextLesson = currentCourse.modules[0].lessons[0];
  for (const m of currentCourse.modules) {
    for (const l of m.lessons) {
      if (!progress.completedLessonIds.includes(l.id)) {
        nextLesson = l;
        break;
      }
    }
  }

  // Calculate overall stats
  const totalLessonsInAllCourses = COURSES_DATA.reduce((acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0), 0);
  const completedLessonsCount = progress.completedLessonIds.length;
  const overallProgressPercent = Math.min(100, Math.round((completedLessonsCount / totalLessonsInAllCourses) * 100));

  // Recent certificate
  const latestCert = progress.certificates[progress.certificates.length - 1];

  // Target universities (if empty, show top 3 recommendations)
  const targetUnis = progress.targetUniversityIds.length > 0
    ? UNIVERSITIES_DATA.filter((u) => progress.targetUniversityIds.includes(u.id)).slice(0, 3)
    : UNIVERSITIES_DATA.slice(0, 3);

  return (
    <div className="space-y-6" id="bento-dashboard-root">
      {/* Top Welcome & Summary Header */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            <span>Dasbor Pembelajaran</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-100 tracking-tight">
            Selamat Datang, <span className="text-zinc-100">{progress.studentName}</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed">
            Akses kurikulum terstruktur dari tingkat dasar hingga lanjut, evaluasi pemahaman melalui kuis interaktif, dan pantau pemenuhan syarat akademik universitas pilihan.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              11 Kurikulum
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              Evaluasi Pemahaman Mandiri
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              Sertifikat Digital Terverifikasi
            </span>

            {onOpenTimer && (
              <button
                type="button"
                onClick={onOpenTimer}
                className="px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 flex items-center gap-1.5 transition-all cursor-pointer"
                id="btn-bento-open-timer"
              >
                <Timer className="w-3.5 h-3.5 text-zinc-400" />
                <span>Timer Fokus</span>
              </button>
            )}

            {onOpenNotes && (
              <button
                type="button"
                onClick={onOpenNotes}
                className="px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 flex items-center gap-1.5 transition-all cursor-pointer"
                id="btn-bento-open-notes"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>Buku Catatan</span>
              </button>
            )}

            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 flex items-center gap-1.5 transition-all cursor-pointer"
                id="btn-bento-open-settings"
              >
                <Settings className="w-3.5 h-3.5 text-zinc-400" />
                <span>Pengaturan Profil</span>
              </button>
            )}
          </div>
        </div>

        {/* Companion Robot Mascot */}
        <div className="z-10 shrink-0">
          <RobotMascot
            mood="happy"
            tipMessage="Selesaikan kuis evaluasi pada setiap topik untuk memvalidasi pemahaman dan menjaga konsistensi belajar harian."
            onOpenTutor={onOpenAITutor}
          />
        </div>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* BENTO CARD 1: Hero Active Course Next Step (Span 8) */}
        <div className="md:col-span-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative group hover:border-zinc-700 transition-all">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">
                Topik Berjalan
              </span>
              <span className="text-xs text-zinc-300 font-mono flex items-center gap-1 font-medium">
                <Zap className="w-4 h-4 text-zinc-400" />
                <span>+{nextLesson.xpReward} XP</span>
              </span>
            </div>

            <span className="text-xs text-zinc-500 font-medium block mb-1">
              {currentCourse.categoryLabel} • {currentCourse.title}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
              {nextLesson.title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed max-w-2xl">
              {nextLesson.description}
            </p>

            {/* Course Progress Bar */}
            <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Kemajuan Kurikulum:</span>
                <span className="font-mono text-zinc-200 font-semibold">{overallProgressPercent}% Total</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-200 transition-all duration-500"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{nextLesson.durationMinutes} Menit</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>Standar Kuis: {nextLesson.quiz.minPassScorePercent}%</span>
              </span>
            </div>

            <button
              onClick={() => onSelectCourseAndLesson(currentCourse, nextLesson)}
              className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs sm:text-sm rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
              id="btn-bento-continue-lesson"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Lanjutkan Belajar</span>
            </button>
          </div>
        </div>

        {/* BENTO CARD 2: User Level & Streak Stats (Span 4) */}
        <div className="md:col-span-4 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm space-y-4 hover:border-zinc-700 transition-all">
          <div>
            <span className="text-xs font-semibold text-zinc-400 block mb-3">
              Ringkasan Aktivitas
            </span>

            {/* Level & XP Box */}
            <div className="p-4 bg-black/50 border border-zinc-800 rounded-2xl flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center text-zinc-100 shadow-sm shrink-0">
                <span className="text-[10px] font-medium uppercase text-zinc-400">Level</span>
                <span className="text-xl font-black">{progress.level}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-200 font-semibold font-mono">{progress.totalXp} XP</span>
                  <span className="text-zinc-500 text-[11px]">Target: {progress.level * 250} XP</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-300"
                    style={{ width: `${((progress.totalXp % 250) / 250) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Streak & Daily Minutes */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3.5 bg-black/50 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-medium mb-1">
                  <Flame className="w-4 h-4 text-zinc-400" />
                  <span>Konsistensi</span>
                </div>
                <span className="text-xl font-bold text-zinc-100">{progress.streakDays} Hari</span>
                <span className="text-[10px] text-zinc-500 block">Berturut-turut</span>
              </div>

              <div className="p-3.5 bg-black/50 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-medium mb-1">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>Durasi Studi</span>
                </div>
                <span className="text-xl font-bold text-zinc-100">{progress.dailyStudyMinutes} Mnt</span>
                <span className="text-[10px] text-zinc-500 block">Hari ini</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('courses')}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full transition-colors cursor-pointer text-center"
          >
            Lihat 11 Kurikulum Lengkap →
          </button>
        </div>

        {/* BENTO CARD 3: Target Universities Readiness Snapshot (Span 6) */}
        <div className="md:col-span-6 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm space-y-4 hover:border-zinc-700 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <GraduationCap className="w-4 h-4 text-zinc-300" />
                <span>Kesiapan Syarat Akademik</span>
              </div>
              <button
                onClick={() => onNavigateTab('universities')}
                className="text-xs text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
              >
                Rincian Gap
              </button>
            </div>

            <div className="space-y-2.5">
              {targetUnis.map((uni) => (
                <div
                  key={uni.id}
                  className="p-3.5 bg-black/50 border border-zinc-800 rounded-2xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{uni.flag}</span>
                    <div>
                      <h4 className="font-semibold text-zinc-200">{uni.name}</h4>
                      <span className="text-[10px] text-zinc-500">Peringkat #{uni.worldRank} • {uni.country}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-zinc-200 font-mono">60%</span>
                    <span className="text-[10px] text-zinc-500 block">Kualifikasi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('universities')}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Buka Pemetaan Prasyarat & Beasiswa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* BENTO CARD 4: Verified Certificate Preview (Span 6) */}
        <div className="md:col-span-6 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm space-y-4 hover:border-zinc-700 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Award className="w-4 h-4 text-zinc-300" />
                <span>Sertifikat Digital</span>
              </div>
              <button
                onClick={() => onNavigateTab('certificates')}
                className="text-xs text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
              >
                Pusat Sertifikat
              </button>
            </div>

            {latestCert ? (
              <div className="p-4 bg-black/50 border border-zinc-700/80 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700">
                    {latestCert.grade}
                  </span>
                  <h4 className="font-semibold text-zinc-100 text-xs sm:text-sm mt-1">{latestCert.courseTitle}</h4>
                  <span className="text-[10px] font-mono text-zinc-400 block">ID: {latestCert.serialNumber}</span>
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-zinc-400" />
                    <span>Kredensial Tervalidasi</span>
                  </span>
                </div>

                <div className="shrink-0 p-1.5 bg-white rounded-xl">
                  <QRCodeSVG
                    value={`https://akademia-global.edu/verify/${latestCert.serialNumber}`}
                    size={58}
                    fgColor="#09090b"
                    bgColor="#ffffff"
                  />
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-zinc-500 text-xs bg-black/50 rounded-2xl border border-zinc-800">
                Selesaikan kurikulum pertama untuk menerbitkan sertifikat digital resmi.
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigateTab('certificates')}
              className="py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full transition-colors cursor-pointer text-center"
            >
              Verifikasi Kredensial
            </button>
            <button
              onClick={() => onNavigateTab('playground')}
              className="py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Sandbox Koding</span>
            </button>
          </div>
        </div>

        {/* BENTO CARD 4.5: Visual Knowledge Map Interdependency Preview (Span 12) */}
        <div className="md:col-span-12 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-zinc-700 transition-all relative overflow-hidden" id="bento-card-knowledge-map">
          <div className="space-y-2 max-w-xl z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Network className="w-4 h-4 text-zinc-300" />
              <span>Peta Pengetahuan Interdisipliner (D3 Graph)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
              Eksplorasi Keterhubungan Antardisiplin Ilmu
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Lihat bagaimana konsep Kalkulus & Aljabar Linier menjadi pilar bagi Mekanika Kuantum & Optimasi AI, serta bagaimana Logika Formal menopang Keamanan Siber dan Penalaran Hukum Konstitusi.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/60 text-zinc-300 border border-zinc-800">
                Logika → Matematika → Fisika Kuantum
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/60 text-zinc-300 border border-zinc-800">
                Aljabar → Kriptografi → Hukum Siber
              </span>
            </div>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigateTab('knowledge-map')}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              id="btn-bento-open-knowledge-map"
            >
              <Network className="w-4 h-4" />
              <span>Buka Peta Pengetahuan Interaktif</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BENTO CARD 4.8: AI Studio & Builder Suite (Span 12) */}
        <div className="md:col-span-12 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 hover:border-zinc-700 transition-all" id="bento-ai-tools-suite">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Sparkles className="w-4 h-4 text-zinc-300" />
                <span>AI Engineering, Research & Creation Suite</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                Studio Riset Ilmiah, Arsitektur Terdistribusi, PRD, PPT & Web Sandbox
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              Powered by Google Gemini 2.5 / Flash SOTA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tool 1: AI Research Lab */}
            <div
              onClick={() => onNavigateTab('ai-research-lab')}
              className="p-5 bg-zinc-950/70 border border-zinc-800 hover:border-zinc-500 rounded-2xl space-y-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  🔬
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white">AI Research Lab & Papers</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Sintesis makalah ilmiah ArXiv peer-reviewed, formulasi LaTeX, kode PyTorch, dan analisis ablasi SOTA.
                </p>
              </div>
            </div>

            {/* Tool 2: System Design Arena */}
            <div
              onClick={() => onNavigateTab('system-design')}
              className="p-5 bg-zinc-950/70 border border-zinc-800 hover:border-zinc-500 rounded-2xl space-y-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  ⚡
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white">System Design Arena</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Desain arsitektur skala 100M+ DAU, simulasi Chaos Engineering fault-injection, dan evaluasi Staff Engineer.
                </p>
              </div>
            </div>

            {/* Tool 3: PRD Builder */}
            <div
              onClick={() => onNavigateTab('prd-builder')}
              className="p-5 bg-zinc-950/70 border border-zinc-800 hover:border-zinc-500 rounded-2xl space-y-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  📋
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white">PRD & Task Planner</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Generate PRD mendalam, breakdown subtask, sprint roadmap, dan diagram arsitektur Mermaid.
                </p>
              </div>
            </div>

            {/* Tool 4: Canvas PPT */}
            <div
              onClick={() => onNavigateTab('presentation')}
              className="p-5 bg-zinc-950/70 border border-zinc-800 hover:border-zinc-500 rounded-2xl space-y-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  📊
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white">Canvas AI PPT Deck</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Susun slide deck multi-layout bento, speaker notes, live editing, dan mode presentasi pro.
                </p>
              </div>
            </div>

            {/* Tool 5: AI Web Builder */}
            <div
              onClick={() => onNavigateTab('web-builder')}
              className="p-5 bg-zinc-950/70 border border-zinc-800 hover:border-zinc-500 rounded-2xl space-y-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  🌐
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white">AI Web Builder</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Buat website instan: pilih mode Cepat, Medium, atau Complex & Menyeluruh dalam sandbox.
                </p>
              </div>
            </div>

            {/* Tool 6: Design SF System */}
            <div
              onClick={() => onNavigateTab('design-sf')}
              className="p-5 bg-zinc-950/70 border border-zinc-800 hover:border-zinc-500 rounded-2xl space-y-3 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  🎨
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white">Design SF UI Tokens</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Autonomous AI DESIGN.md generator, token audit OKLCH/WCAG AAA, dan export konfigurasi Tailwind v4.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BENTO CARD 5: 1-Click AI Smart Launchpad (Span 12) */}
        <div className="md:col-span-12 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-zinc-700 transition-all">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <MessageSquareCode className="w-4 h-4 text-zinc-300" />
              <span>Bimbingan Belajar Interaktif</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
              Konsultasi Materi atau Persiapan Akademik
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Diskusikan pemahaman konsep, bedah rumus, atau tanyakan strategi persiapan studi lanjut:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAITutor}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Analogi Konsep</span>
            </button>
            <button
              onClick={onOpenAITutor}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full flex items-center gap-2 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Penjelasan Rumus & Kode</span>
            </button>
            <button
              onClick={onOpenAITutor}
              className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span>Buka Dialog Tutor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
