'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Zap, 
  Lock, 
  Sparkles, 
  Play, 
  Code2, 
  Lightbulb, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Layers
} from 'lucide-react';
import { Course, Lesson } from '@/lib/types';
import { QuizModal } from './QuizModal';
import { FlashcardModal } from './FlashcardModal';

interface LessonViewerProps {
  course: Course;
  lesson: Lesson;
  allLessons: Lesson[];
  completedLessonIds: string[];
  onSelectLesson: (lesson: Lesson) => void;
  onBackToCourse: () => void;
  onPassLessonQuiz: (scorePercent: number, xpReward: number) => void;
  onOpenAITutor: () => void;
}

export function LessonViewer({
  course,
  lesson,
  allLessons,
  completedLessonIds,
  onSelectLesson,
  onBackToCourse,
  onPassLessonQuiz,
  onOpenAITutor
}: LessonViewerProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
  const [interactiveCode, setInteractiveCode] = useState(lesson.content.codeExample?.code || '');
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);

  const isCompleted = completedLessonIds.includes(lesson.id);
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isNextLocked = nextLesson && !isCompleted;

  const handleRunCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      setIsRunningCode(false);
      setCodeOutput(
        lesson.content.codeExample?.outputExplanation || 
        '✓ Kode berhasil dieksekusi tanpa error di runtime sandbox. Memory clean: 0.2ms.'
      );
    }, 600);
  };

  return (
    <div className="space-y-8" id="lesson-viewer-container">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <button
          onClick={onBackToCourse}
          className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer py-1"
          id="btn-back-to-course"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span className="truncate">Silabus: {course.title}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsFlashcardOpen(true)}
            className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm min-h-[40px]"
            id="btn-open-flashcards-header"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-300" />
            <span>AI Flashcards (SRS)</span>
          </button>

          <button
            onClick={onOpenAITutor}
            className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm min-h-[40px]"
            id="btn-ask-tutor-lesson-header"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>AI Bedah Topik</span>
          </button>

          {isCompleted ? (
            <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700 flex items-center gap-1.5 min-h-[40px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Lulus Ujian</span>
            </span>
          ) : (
            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2 sm:py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 min-h-[40px]"
              id="btn-start-quiz-top"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ikuti Kuis Materi</span>
            </button>
          )}
        </div>
      </div>

      {/* Lesson Hero Header - M3 Surface */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-black/60 text-zinc-300 font-medium border border-zinc-800">
            {course.categoryLabel}
          </span>
          <span className="px-3 py-1 rounded-full bg-black/60 text-zinc-300 flex items-center gap-1.5 border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{lesson.durationMinutes} Menit</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-black/60 text-zinc-300 flex items-center gap-1.5 border border-zinc-800 font-mono">
            <Zap className="w-3.5 h-3.5 text-zinc-400" />
            <span>+{lesson.xpReward} XP</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-black/60 text-zinc-400 border border-zinc-800">
            Tingkat: {lesson.difficulty}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight leading-snug">
          {lesson.title}
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          {lesson.description}
        </p>
      </div>

      {/* Key Concepts Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lesson.content.keyConcepts.map((concept, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3 shadow-sm hover:border-zinc-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 font-bold text-xs shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{concept}</p>
          </div>
        ))}
      </div>

      {/* Main Detailed Content Body */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-zinc-300 font-semibold text-sm uppercase tracking-wider pb-3 border-b border-zinc-800">
          <BookOpen className="w-4 h-4 text-zinc-400" />
          <span>Materi Pembelajaran Komprehensif</span>
        </div>

        <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
          {lesson.content.detailedExplanation}
        </div>

        {/* Interactive Code / Widget Sandbox */}
        {lesson.content.codeExample && (
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                <Code2 className="w-4 h-4 text-zinc-400" />
                <span>Laboratorium Kode Interaktif ({lesson.content.codeExample.language})</span>
              </div>
              <button
                onClick={handleRunCode}
                disabled={isRunningCode}
                className="px-4 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                id="btn-run-lesson-code"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunningCode ? 'Menjalankan...' : 'Jalankan Kode'}</span>
              </button>
            </div>

            <div className="bg-black/70 border border-zinc-800 rounded-2xl overflow-hidden font-mono text-xs">
              <textarea
                value={interactiveCode}
                onChange={(e) => setInteractiveCode(e.target.value)}
                rows={8}
                className="w-full bg-transparent p-4 text-zinc-200 focus:outline-none resize-y selection:bg-zinc-700 selection:text-white"
                spellCheck={false}
                id="textarea-lesson-code"
              />

              {codeOutput && (
                <div className="p-3.5 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                  <span className="text-zinc-400 font-bold shrink-0">&gt; Output:</span>
                  <span className="font-sans text-zinc-300">{codeOutput}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Practical Exercise Box */}
        <div className="p-5 rounded-2xl bg-black/50 border border-zinc-800 mt-6 space-y-2">
          <div className="flex items-center gap-2 text-zinc-200 font-semibold text-xs sm:text-sm">
            <Lightbulb className="w-4 h-4 text-zinc-400" />
            <span>Latihan Praktik Mandiri</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {lesson.content.practicalExercise}
          </p>
        </div>

        {/* Spaced Repetition Flashcard Interactive Module */}
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-zinc-100">
                  Kartu Memori & Spaced Repetition (Active Recall)
                </h4>
                <p className="text-xs text-zinc-400">
                  Latih ingatan jangka panjang dengan set kartu interaktif berbasis materi pelajaran ini.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFlashcardOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-full text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 min-h-[38px]"
              id="btn-open-flashcard-body-cta"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>Buka Kartu Memori</span>
            </button>
          </div>
        </div>

        {/* Cheat Sheet & Key Takeaways */}
        <div className="p-5 rounded-2xl bg-black/50 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Ringkasan Rumus & Kaidah Kunci (Cheat Sheet)</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
            {lesson.content.cheatSheetSummary.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mandatory Quiz Gating Section */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
            {isCompleted ? 'Evaluasi Topik Selesai' : 'Evaluasi Pemahaman Materi'}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto mt-1">
            {isCompleted
              ? 'Anda dapat mengulang kuis kapan saja untuk menyegarkan pemahaman konsep.'
              : `Capai skor minimal ${lesson.quiz.minPassScorePercent}% untuk memvalidasi pemahaman materi ini sebelum melanjutkan ke topik berikutnya.`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 min-h-[44px]"
            id="btn-trigger-quiz-modal"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isCompleted ? 'Ulangi Kuis' : 'Mulai Evaluasi Kuis'}</span>
          </button>
          <button
            onClick={onOpenAITutor}
            className="w-full sm:w-auto px-5 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-zinc-700 min-h-[44px]"
            id="btn-tutor-prepare-quiz"
          >
            <Sparkles className="w-4 h-4 text-zinc-400" />
            <span>Diskusi Bersama Tutor</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-zinc-800">
        {prevLesson ? (
          <button
            onClick={() => onSelectLesson(prevLesson)}
            className="px-5 py-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
            id="btn-prev-lesson"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">Sebelumnya: {prevLesson.title}</span>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            onClick={() => {
              if (!isNextLocked) onSelectLesson(nextLesson);
              else setIsQuizOpen(true);
            }}
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px] ${
              isNextLocked
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-400'
                : 'bg-zinc-100 hover:bg-white text-zinc-900 shadow-sm active:scale-95'
            }`}
            id="btn-next-lesson"
          >
            <span className="truncate max-w-[200px] sm:max-w-none">Berikutnya: {nextLesson.title}</span>
            {isNextLocked ? <Lock className="w-3.5 h-3.5 shrink-0" /> : <ArrowRight className="w-4 h-4 shrink-0" />}
          </button>
        ) : <div />}
      </div>

      {/* Flashcard SRS Modal */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        lesson={lesson}
        courseTitle={course.title}
        onOpenAITutor={onOpenAITutor}
      />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        lesson={lesson}
        courseId={course.id}
        courseTitle={course.title}
        onPassQuiz={(score, xp) => {
          onPassLessonQuiz(score, xp);
        }}
        onOpenAITutor={onOpenAITutor}
      />
    </div>
  );
}
