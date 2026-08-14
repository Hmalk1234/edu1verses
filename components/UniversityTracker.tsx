'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  AlertTriangle, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  ArrowRight,
  Bookmark,
  Calendar
} from 'lucide-react';
import { University, Scholarship, Course } from '@/lib/types';
import { UNIVERSITIES_DATA, SCHOLARSHIPS_DATA } from '@/lib/data/universities';
import { COURSES_DATA } from '@/lib/data/courses';

interface UniversityTrackerProps {
  completedLessonIds: string[];
  targetUniversityIds: string[];
  savedScholarshipIds: string[];
  onToggleTargetUniversity: (id: string) => void;
  onToggleSavedScholarship: (id: string) => void;
  onSelectCourseToStudy: (course: Course) => void;
  onOpenAITutor: () => void;
}

export function UniversityTracker({
  completedLessonIds,
  targetUniversityIds,
  savedScholarshipIds,
  onToggleTargetUniversity,
  onToggleSavedScholarship,
  onSelectCourseToStudy,
  onOpenAITutor
}: UniversityTrackerProps) {
  const [selectedTab, setSelectedTab] = useState<'universities' | 'scholarships' | 'gap-analysis'>('universities');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<University>(UNIVERSITIES_DATA[0]);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Calculate readiness for a given university
  const calculateUniversityReadiness = (uni: University) => {
    const prerequisites = uni.admissionRequirements.prerequisiteSkills;
    if (prerequisites.length === 0) return { percent: 100, completed: [], missing: [] };

    const completed: { courseId: string; courseTitle: string; minimumScorePercent: number; progressPercent: number; courseRef?: Course }[] = [];
    const missing: { courseId: string; courseTitle: string; minimumScorePercent: number; progressPercent: number; courseRef?: Course }[] = [];

    for (const req of prerequisites) {
      const course = COURSES_DATA.find((c) => c.id === req.courseId);
      if (course) {
        const allCourseLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
        const completedCount = allCourseLessonIds.filter((id) => completedLessonIds.includes(id)).length;
        const coursePercent = allCourseLessonIds.length > 0 ? (completedCount / allCourseLessonIds.length) * 100 : 0;

        if (coursePercent >= 75) {
          completed.push({ ...req, progressPercent: coursePercent, courseRef: course });
        } else {
          missing.push({ ...req, progressPercent: coursePercent, courseRef: course });
        }
      } else {
        missing.push({ ...req, progressPercent: 0, courseRef: undefined });
      }
    }

    const readinessPercent = Math.round((completed.length / prerequisites.length) * 100);
    return { percent: readinessPercent, completed, missing };
  };

  const selectedReadiness = calculateUniversityReadiness(selectedUniversity);

  const handleGenerateAIStrategy = async (uni: University) => {
    setIsAnalyzing(true);
    setAiAnalysisResult(null);

    try {
      const completedTitles = COURSES_DATA.filter((c) => {
        const ids = c.modules.flatMap((m) => m.lessons.map((l) => l.id));
        return ids.some((id) => completedLessonIds.includes(id));
      }).map((c) => c.title);

      const res = await fetch('/api/gemini/admission-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityName: `${uni.name} (${uni.country})`,
          targetMajor: uni.popularMajors[0],
          completedCourses: completedTitles,
          currentStats: {
            level: 3,
            totalXp: 950,
            streakDays: 8
          }
        })
      });

      const data = await res.json();
      setAiAnalysisResult(data.analysis || 'Analisis berhasil dibuat.');
    } catch (e) {
      console.error(e);
      setAiAnalysisResult('Terjadi sedikit kendala saat menghubungi konsultan AI. Silakan coba kembali sesaat lagi.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredUniversities = UNIVERSITIES_DATA.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.popularMajors.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8" id="university-tracker-container">
      {/* Header Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
              <GraduationCap className="w-4 h-4 text-zinc-300" />
              <span>Pemetaan Admisi & Beasiswa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
              Kriteria Universitas & Direktori Beasiswa
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Tinjau syarat admisi universitas global, bandingkan materi yang telah dipelajari dengan prasyarat program studi, dan temukan opsi beasiswa pascasarjana.
            </p>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-full border border-zinc-800 shrink-0 w-full sm:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedTab('universities')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedTab === 'universities'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="tab-btn-universities"
            >
              Universitas ({UNIVERSITIES_DATA.length})
            </button>
            <button
              onClick={() => setSelectedTab('gap-analysis')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedTab === 'gap-analysis'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="tab-btn-gap-analysis"
            >
              Analisis Kesenjangan
            </button>
            <button
              onClick={() => setSelectedTab('scholarships')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedTab === 'scholarships'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              id="tab-btn-scholarships"
            >
              Beasiswa ({SCHOLARSHIPS_DATA.length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex items-center gap-3 bg-black/50 border border-zinc-800 rounded-full px-4 py-3">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari universitas, program studi, negara, atau beasiswa (contoh: MIT, ITB, LPDP)..."
            className="w-full bg-transparent text-zinc-200 text-xs sm:text-sm focus:outline-none placeholder:text-zinc-500"
            id="input-search-universities"
          />
        </div>
      </div>

      {/* TAB 1: UNIVERSITIES LIST & DETAILS */}
      {selectedTab === 'universities' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredUniversities.map((uni) => {
              const isSelected = selectedUniversity.id === uni.id;
              const isSaved = targetUniversityIds.includes(uni.id);
              const readiness = calculateUniversityReadiness(uni);

              return (
                <div
                  key={uni.id}
                  onClick={() => setSelectedUniversity(uni)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-600 ring-1 ring-zinc-600 shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
                  id={`uni-card-${uni.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{uni.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-zinc-100 text-sm">{uni.name}</h4>
                      </div>
                      <p className="text-xs text-zinc-400">{uni.city}, {uni.country} • Rank #{uni.worldRank}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-bold text-zinc-200 block">{readiness.percent}%</span>
                      <span className="text-[10px] text-zinc-500">Kesiapan</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTargetUniversity(uni.id);
                      }}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                          : 'text-zinc-500 hover:text-zinc-300 bg-black/40'
                      }`}
                      title={isSaved ? 'Target Tersimpan' : 'Simpan sebagai Target Kampus Impian'}
                      id={`btn-save-uni-${uni.id}`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detail Card */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedUniversity.flag}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                      {selectedUniversity.name}
                    </h2>
                    <p className="text-xs text-zinc-400">{selectedUniversity.city}, {selectedUniversity.country}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedUniversity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700"
                >
                  <span>Portal Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Admission Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-black/50 border border-zinc-800 rounded-2xl">
                <span className="text-[11px] text-zinc-400 block">World Ranking</span>
                <span className="text-base sm:text-lg font-bold text-zinc-100">#{selectedUniversity.worldRank} Dunia</span>
              </div>
              <div className="p-3.5 bg-black/50 border border-zinc-800 rounded-2xl">
                <span className="text-[11px] text-zinc-400 block">Min GPA / Nilai</span>
                <span className="text-base sm:text-lg font-bold text-zinc-200">{selectedUniversity.admissionRequirements.minGPA}</span>
              </div>
              <div className="p-3.5 bg-black/50 border border-zinc-800 rounded-2xl">
                <span className="text-[11px] text-zinc-400 block">IELTS / TOEFL</span>
                <span className="text-base sm:text-lg font-bold text-zinc-200">{selectedUniversity.admissionRequirements.ieltsScore}</span>
              </div>
              <div className="p-3.5 bg-black/50 border border-zinc-800 rounded-2xl">
                <span className="text-[11px] text-zinc-400 block">Acceptance Rate</span>
                <span className="text-base sm:text-lg font-bold text-zinc-300">{selectedUniversity.admissionRequirements.acceptanceRate}</span>
              </div>
            </div>

            {/* Popular Majors */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Jurusan Unggulan Teratas:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedUniversity.popularMajors.map((major, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-black/40 border border-zinc-800 text-xs text-zinc-300 font-medium"
                  >
                    {major}
                  </span>
                ))}
              </div>
            </div>

            {/* Prerequisite Mastery Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Kesiapan Kurikulum & Prasyarat Kursus:
                </h4>
                <span className="text-xs font-bold text-zinc-200 font-mono">
                  {selectedReadiness.percent}% Terpenuhi
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-zinc-200 transition-all duration-500"
                  style={{ width: `${selectedReadiness.percent}%` }}
                />
              </div>

              {/* Prerequisite Items */}
              <div className="space-y-2 mt-3">
                {selectedUniversity.admissionRequirements.prerequisiteSkills.map((req, idx) => {
                  const course = COURSES_DATA.find((c) => c.id === req.courseId);
                  const isDone = selectedReadiness.completed.some((c) => c.courseId === req.courseId);

                  return (
                    <div
                      key={idx}
                      className="p-3 bg-black/50 border border-zinc-800 rounded-2xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-zinc-200 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-zinc-400 shrink-0" />
                        )}
                        <div>
                          <span className={`font-semibold ${isDone ? 'text-zinc-200' : 'text-zinc-400'}`}>
                            {req.courseTitle}
                          </span>
                          <span className="block text-[10px] text-zinc-500">
                            Standar nilai lulus: min. {req.minimumScorePercent}%
                          </span>
                        </div>
                      </div>

                      {course && (
                        <button
                          onClick={() => onSelectCourseToStudy(course)}
                          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                            isDone
                              ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                              : 'bg-zinc-100 hover:bg-white text-zinc-900 font-semibold'
                          }`}
                          id={`btn-study-prereq-${req.courseId}`}
                        >
                          <span>{isDone ? 'Buka Kembali' : 'Pelajari Materi Ini'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Advisor Button */}
            <div className="pt-2">
              <button
                onClick={() => handleGenerateAIStrategy(selectedUniversity)}
                disabled={isAnalyzing}
                className="w-full py-3 px-4 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                id="btn-ai-admission-strategy"
              >
                <Sparkles className="w-4 h-4 text-zinc-700" />
                <span>{isAnalyzing ? 'Menyusun strategi persiapan admisi...' : `Rekomendasi Strategi Admisi ${selectedUniversity.name}`}</span>
              </button>

              {aiAnalysisResult && (
                <div className="mt-4 p-5 bg-black/60 border border-zinc-800 rounded-3xl text-xs sm:text-sm text-zinc-300 space-y-3 prose prose-invert max-w-none leading-relaxed">
                  <div className="flex items-center gap-2 font-bold text-zinc-100">
                    <Sparkles className="w-4 h-4 text-zinc-400" />
                    <span>Panduan Persiapan Admisi & Beasiswa</span>
                  </div>
                  <div className="whitespace-pre-line">{aiAnalysisResult}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GAP ANALYSIS */}
      {selectedTab === 'gap-analysis' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
              Analisis Kesenjangan Prasyarat Akademik
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl">
              Membandingkan daftar mata kuliah prasyarat universitas pilihan dengan modul yang telah Anda selesaikan. Tanda &quot;Perlu Dipelajari&quot; menunjukkan materi yang direkomendasikan untuk diselesaikan sebelum mendaftar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {UNIVERSITIES_DATA.map((uni) => {
                const readiness = calculateUniversityReadiness(uni);

                return (
                  <div
                    key={uni.id}
                    className="p-5 rounded-3xl bg-black/50 border border-zinc-800 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{uni.flag}</span>
                          <h3 className="font-semibold text-zinc-100 text-sm truncate">{uni.name}</h3>
                        </div>
                        <span className="text-xs font-bold text-zinc-400">#{uni.worldRank}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-400 my-1">
                        <span>Kesiapan Prasyarat:</span>
                        <strong className="text-zinc-200 font-mono">{readiness.percent}%</strong>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-200"
                          style={{ width: `${readiness.percent}%` }}
                        />
                      </div>

                      {/* Missing List */}
                      <div className="mt-4 space-y-2">
                        <span className="text-[11px] font-medium text-zinc-400 block">
                          Prasyarat Belum Lengkap:
                        </span>
                        {readiness.missing.length === 0 ? (
                          <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-zinc-200" />
                            <span>Semua prasyarat telah terpenuhi!</span>
                          </div>
                        ) : (
                          readiness.missing.map((item, idx) => {
                            const courseRef = item.courseRef;
                            return (
                              <div
                                key={idx}
                                className="p-2.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl flex items-center justify-between gap-2 text-xs"
                              >
                                <span className="text-zinc-300 truncate">{item.courseTitle}</span>
                                {courseRef && (
                                  <button
                                    onClick={() => onSelectCourseToStudy(courseRef)}
                                    className="text-[10px] text-zinc-200 hover:text-white font-semibold underline shrink-0 cursor-pointer"
                                  >
                                    Mulai Belajar
                                  </button>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedUniversity(uni);
                        setSelectedTab('universities');
                      }}
                      className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium rounded-full transition-colors cursor-pointer"
                    >
                      Buka Rincian Admisi
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHOLARSHIPS DIRECTORY */}
      {selectedTab === 'scholarships' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredScholarships.map((sch) => {
              const isSaved = savedScholarshipIds.includes(sch.id);

              return (
                <div
                  key={sch.id}
                  className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between"
                  id={`scholarship-card-${sch.id}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{sch.flagEmoji}</span>
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700">
                            {sch.type}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-zinc-100 mt-1">{sch.name}</h3>
                          <p className="text-xs text-zinc-400">{sch.provider}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleSavedScholarship(sch.id)}
                        className={`p-2 rounded-full transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                            : 'text-zinc-500 hover:text-zinc-300 bg-black/40'
                        }`}
                        title={isSaved ? 'Beasiswa Tersimpan' : 'Simpan Beasiswa'}
                        id={`btn-save-scholarship-${sch.id}`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="p-3 bg-black/50 border border-zinc-800 rounded-2xl space-y-1">
                        <span className="text-zinc-400 font-medium block">Cakupan Pembiayaan:</span>
                        <p className="text-zinc-200 font-semibold">{sch.coverage}</p>
                      </div>

                      <div className="p-3 bg-black/50 border border-zinc-800 rounded-2xl space-y-1">
                        <span className="text-zinc-400 font-medium block">Uang Saku (Stipend Bulanan):</span>
                        <p className="text-zinc-200 font-semibold">{sch.stipend}</p>
                      </div>

                      <div className="pt-2">
                        <span className="text-zinc-400 font-semibold block mb-1">Persyaratan Kunci:</span>
                        <ul className="space-y-1 text-zinc-300">
                          {sch.eligibility.slice(0, 3).map((el, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-zinc-500 font-bold">•</span>
                              <span>{el}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-1.5 text-zinc-400 pt-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Deadline: <strong>{sch.deadline}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
                    <a
                      href={sch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-900 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                    >
                      <span>Website Resmi Pendaftaran</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={onOpenAITutor}
                      className="text-xs text-zinc-400 hover:text-zinc-200 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Review Esai AI</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
