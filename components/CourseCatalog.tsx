'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Layers, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Search, 
  Zap,
  Code2,
  Atom,
  Landmark,
  Compass,
  X
} from 'lucide-react';
import { Course, Lesson, Category } from '@/lib/types';
import { COURSES_DATA } from '@/lib/data/courses';

interface CourseCatalogProps {
  completedLessonIds: string[];
  onSelectLessonToStudy: (course: Course, lesson: Lesson) => void;
  onOpenAITutor: () => void;
}

const CATEGORIES: { id: Category | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'Semua Bidang Keilmuan', icon: Layers },
  { id: 'coding', label: 'Coding & Cyber Security', icon: Code2 },
  { id: 'science', label: 'Matematika, Fisika, Astronomi & Geologi', icon: Atom },
  { id: 'humanities', label: 'Filsafat, Hukum, Civics & PAI', icon: Landmark },
  { id: 'engineering', label: 'Arsitektur & Desain Spasial', icon: Compass }
];

export function CourseCatalog({
  completedLessonIds,
  onSelectLessonToStudy,
  onOpenAITutor
}: CourseCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCourseProgress = (course: Course) => {
    const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const completedCount = allLessonIds.filter((id) => completedLessonIds.includes(id)).length;
    const percent = allLessonIds.length > 0 ? Math.round((completedCount / allLessonIds.length) * 100) : 0;
    return { completedCount, totalCount: allLessonIds.length, percent };
  };

  return (
    <div className="space-y-8" id="course-catalog-container">
      {/* Header Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <BookOpen className="w-4 h-4 text-zinc-300" />
            <span>Kurikulum Multidisiplin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
            Katalog Program Studi & Silabus
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed">
            Materi disusun bertahap dari pemahaman konsep dasar hingga penerapan praktis. Selesaikan seluruh modul dan kuis evaluasi untuk memperoleh sertifikat akademik terverifikasi.
          </p>
        </div>

        <button
          onClick={onOpenAITutor}
          className="px-4 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span>Panduan Pemilihan Jalur</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 font-semibold shadow-sm'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                id={`cat-btn-${cat.id}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl px-4 py-2.5">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kurikulum (misal: Web Dev, Cyber Security, Kalkulus, Fisika Kuantum, Filsafat, Hukum, Geologi, PPKn, PAI)..."
            className="w-full bg-transparent text-zinc-200 text-xs sm:text-sm focus:outline-none placeholder:text-zinc-500"
            id="input-search-courses"
          />
        </div>
      </div>

      {/* Courses Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progress = getCourseProgress(course);
          const firstLesson = course.modules[0]?.lessons[0];

          return (
            <div
              key={course.id}
              className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-zinc-700 transition-all group"
              id={`course-card-${course.id}`}
            >
              <div>
                {/* Header Chips */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/60 border border-zinc-800 text-zinc-300">
                    {course.categoryLabel}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1 font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>+{course.totalLessons * 150} XP</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Progress Bar Container */}
                <div className="mt-4 p-3 bg-black/50 border border-zinc-800/80 rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Kemajuan: <strong>{progress.completedCount}/{progress.totalCount} Modul</strong></span>
                    <strong className="text-zinc-200 font-mono">{progress.percent}%</strong>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-200"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>

                {/* Meta details */}
                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{course.totalHours} Jam Total</span>
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Level: {course.level}
                  </span>
                </div>
              </div>

              {/* Action Buttons - shadcn / M3 Pills */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCourseDetail(course)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full transition-colors cursor-pointer text-center"
                  id={`btn-syllabus-${course.id}`}
                >
                  Silabus Lengkap
                </button>

                {firstLesson && (
                  <button
                    onClick={() => onSelectLessonToStudy(course, firstLesson)}
                    className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0 active:scale-95"
                    id={`btn-start-course-${course.id}`}
                  >
                    <span>Mulai</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Syllabus Modal Drawer */}
      <AnimatePresence>
        {selectedCourseDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative text-zinc-200 my-auto max-h-[90vh] flex flex-col"
              id="course-syllabus-modal"
            >
              <button
                onClick={() => setSelectedCourseDetail(null)}
                className="absolute right-3 top-3 sm:right-5 sm:top-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pb-4 border-b border-zinc-800 pr-8">
                <span className="text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Silabus Kurikulum Lengkap
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-zinc-100 mt-1 leading-snug">
                  {selectedCourseDetail.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  {selectedCourseDetail.tagline}
                </p>
              </div>

              {/* Module Lessons List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-5 sm:space-y-6 scrollbar-thin">
                {selectedCourseDetail.modules.map((module) => (
                  <div key={module.id} className="space-y-2.5">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-zinc-200">
                      <Layers className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{module.title}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{module.description}</p>

                    <div className="space-y-2 mt-2">
                      {module.lessons.map((lesson, lIdx) => {
                        const isCompleted = completedLessonIds.includes(lesson.id);
                        const allPrev = selectedCourseDetail.modules
                          .flatMap((m) => m.lessons)
                          .slice(0, lIdx);
                        const isUnlocked = lIdx === 0 || allPrev.every((p) => completedLessonIds.includes(p.id)) || isCompleted;

                        return (
                          <div
                            key={lesson.id}
                            className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isCompleted
                                ? 'bg-black/50 border-zinc-700 text-zinc-200'
                                : isUnlocked
                                ? 'bg-black/40 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                                : 'bg-black/20 border-zinc-800/40 text-zinc-600 opacity-60'
                            }`}
                          >
                            <div className="flex items-start sm:items-center gap-3">
                              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0 ${
                                isCompleted
                                  ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                                  : isUnlocked
                                  ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                                  : 'bg-zinc-950 text-zinc-600'
                              }`}>
                                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : isUnlocked ? lIdx + 1 : <Lock className="w-3.5 h-3.5" />}
                              </div>

                              <div>
                                <h4 className="text-xs sm:text-sm font-semibold leading-snug">{lesson.title}</h4>
                                <span className="text-[11px] text-zinc-400 block mt-0.5">
                                  {lesson.durationMinutes} Menit • Syarat Kuis: min {lesson.quiz.minPassScorePercent}%
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                onSelectLessonToStudy(selectedCourseDetail, lesson);
                                setSelectedCourseDetail(null);
                              }}
                              disabled={!isUnlocked}
                              className={`w-full sm:w-auto px-4 py-2 sm:py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer min-h-[38px] flex items-center justify-center disabled:cursor-not-allowed ${
                                isCompleted
                                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                                  : isUnlocked
                                  ? 'bg-zinc-100 hover:bg-white text-zinc-900 font-semibold shadow-sm'
                                  : 'bg-zinc-900 text-zinc-600'
                              }`}
                            >
                              {isCompleted ? 'Ulas Materi' : isUnlocked ? 'Mulai Pelajaran' : 'Terkunci'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
