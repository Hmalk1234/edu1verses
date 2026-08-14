'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  useStudyProgress 
} from '@/lib/storage';
import { Course, Lesson } from '@/lib/types';

import { Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { BentoDashboard } from '@/components/BentoDashboard';
import { CourseCatalog } from '@/components/CourseCatalog';
import { LessonViewer } from '@/components/LessonViewer';
import { UniversityTracker } from '@/components/UniversityTracker';
import { CertificateCenter } from '@/components/CertificateCenter';
import { CodePlayground } from '@/components/CodePlayground';
import { KnowledgeMap } from '@/components/KnowledgeMap';
import { PRDBuilder } from '@/components/PRDBuilder';
import { PresentationCanvas } from '@/components/PresentationCanvas';
import { AIWebBuilder } from '@/components/AIWebBuilder';
import { DesignSFShowcase } from '@/components/DesignSFShowcase';
import { AIResearchLab } from '@/components/AIResearchLab';
import { SystemDesignArena } from '@/components/SystemDesignArena';
import { AITutorDrawer } from '@/components/AITutorDrawer';
import { RobotMascot } from '@/components/RobotMascot';
import { SettingsProfileModal } from '@/components/SettingsProfileModal';
import { StudyTimerModal } from '@/components/StudyTimerModal';
import { QuickNotesDrawer } from '@/components/QuickNotesDrawer';
import { GlobalCommandPalette } from '@/components/GlobalCommandPalette';
import { DailyQuestsDrawer } from '@/components/DailyQuestsDrawer';
import { FlashcardArena } from '@/components/FlashcardArena';
import { MasteryAnalytics } from '@/components/MasteryAnalytics';
import { 
  Sparkles 
} from 'lucide-react';

export default function Home() {
  const {
    progress,
    isLoaded,
    completeLesson,
    toggleTargetUniversity,
    toggleSavedScholarship,
    setStudentName,
    updateStudentProfile,
    awardFocusTimeXP,
    awardDirectXP,
    importFullProgress,
    resetAllProgress
  } = useStudyProgress();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Switch to lesson view
  const handleSelectLessonToStudy = (course: Course, lesson: Lesson) => {
    setActiveCourse(course);
    setActiveLesson(lesson);
    setActiveTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to catalog
  const handleBackToCourses = () => {
    setActiveTab('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pass lesson quiz handler
  const handlePassLessonQuiz = (scorePercent: number, xpEarned: number) => {
    if (activeLesson && activeCourse) {
      completeLesson(activeLesson.id, scorePercent, xpEarned, activeCourse.id);
    }
  };

  // Focus Timer Session Completion
  const handleTimerSessionComplete = (minutes: number, xpReward: number) => {
    awardFocusTimeXP(minutes, xpReward);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 gap-3">
        <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="text-xs font-mono text-zinc-400">Memuat kurikulum akademik...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-zinc-700 selection:text-zinc-100">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenQuests={() => setIsQuestsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <BentoDashboard
                progress={progress}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectCourseAndLesson={handleSelectLessonToStudy}
                onOpenAITutor={() => setIsAITutorOpen(true)}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenTimer={() => setIsTimerOpen(true)}
                onOpenNotes={() => setIsNotesOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'knowledge-map' && (
            <motion.div
              key="knowledge-map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <KnowledgeMap
                completedLessonIds={progress.completedLessonIds}
                onSelectCourseToStudy={(c, l) => handleSelectLessonToStudy(c, l)}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CourseCatalog
                completedLessonIds={progress.completedLessonIds}
                onSelectLessonToStudy={handleSelectLessonToStudy}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'flashcards' && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <FlashcardArena
                onAwardXP={awardDirectXP}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <MasteryAnalytics
                progress={progress}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'lesson' && activeCourse && activeLesson && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <LessonViewer
                course={activeCourse}
                lesson={activeLesson}
                allLessons={activeCourse.modules.flatMap((m) => m.lessons)}
                completedLessonIds={progress.completedLessonIds}
                onSelectLesson={(l) => {
                  setActiveLesson(l);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBackToCourse={handleBackToCourses}
                onPassLessonQuiz={handlePassLessonQuiz}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'universities' && (
            <motion.div
              key="universities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <UniversityTracker
                completedLessonIds={progress.completedLessonIds}
                targetUniversityIds={progress.targetUniversityIds}
                savedScholarshipIds={progress.savedScholarshipIds}
                onToggleTargetUniversity={toggleTargetUniversity}
                onToggleSavedScholarship={toggleSavedScholarship}
                onSelectCourseToStudy={(c) => {
                  const firstL = c.modules[0]?.lessons[0];
                  if (firstL) handleSelectLessonToStudy(c, firstL);
                }}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CertificateCenter
                certificates={progress.certificates}
                studentName={progress.studentName}
                onUpdateStudentName={setStudentName}
              />
            </motion.div>
          )}

          {activeTab === 'ai-research-lab' && (
            <motion.div
              key="ai-research-lab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AIResearchLab />
            </motion.div>
          )}

          {activeTab === 'system-design' && (
            <motion.div
              key="system-design"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SystemDesignArena />
            </motion.div>
          )}

          {activeTab === 'prd-builder' && (
            <motion.div
              key="prd-builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PRDBuilder />
            </motion.div>
          )}

          {activeTab === 'presentation' && (
            <motion.div
              key="presentation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PresentationCanvas />
            </motion.div>
          )}

          {activeTab === 'web-builder' && (
            <motion.div
              key="web-builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AIWebBuilder />
            </motion.div>
          )}

          {activeTab === 'design-sf' && (
            <motion.div
              key="design-sf"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DesignSFShowcase />
            </motion.div>
          )}

          {activeTab === 'playground' && (
            <motion.div
              key="playground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CodePlayground onOpenAITutor={() => setIsAITutorOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating AI Robot Mascot Companion at bottom-right */}
      <div className="fixed bottom-20 sm:bottom-24 lg:bottom-6 right-3.5 sm:right-6 z-30">
        <RobotMascot
          mood="idle"
          tipMessage="Ada yang belum dipahami? Klik saya untuk membuka konsultasi RoboAkademia AI Tutor!"
          onOpenTutor={() => setIsAITutorOpen(true)}
        />
      </div>

      {/* Mobile Dedicated Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenQuests={() => setIsQuestsOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      {/* Global Spotlight Search Command Palette (⌘K) */}
      <GlobalCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCourseAndLesson={handleSelectLessonToStudy}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenQuests={() => setIsQuestsOpen(true)}
      />

      {/* Daily Quests & Streak Challenges Drawer */}
      <DailyQuestsDrawer
        isOpen={isQuestsOpen}
        onClose={() => setIsQuestsOpen(false)}
        progress={progress}
        onAwardXP={awardDirectXP}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTimer={() => setIsTimerOpen(true)}
      />

      {/* Gemini AI 24/7 Tutor Drawer */}
      <AITutorDrawer
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        activeLesson={activeLesson}
        activeCourseTitle={activeCourse?.title}
      />

      {/* Settings & Profile Management Modal */}
      <SettingsProfileModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        progress={progress}
        onUpdateProfile={updateStudentProfile}
        onResetAll={resetAllProgress}
        onImportProgress={importFullProgress}
      />

      {/* Focus & Pomodoro Studio Modal */}
      <StudyTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        onSessionComplete={handleTimerSessionComplete}
      />

      {/* Quick Notes & AI Executive Synthesis Drawer */}
      <QuickNotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        studentName={progress.studentName}
      />

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 mt-16 py-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-zinc-200 text-sm">
              <span className="w-5 h-5 rounded-lg bg-zinc-200 flex items-center justify-center text-zinc-950 text-xs font-bold">Ω</span>
              <span>Akademia Global</span>
            </div>
            <p className="text-zinc-400 mt-1 max-w-md">
              Universal mastery learning platform with quiz-gated progression, world admission readiness radar, AI tutoring, and cryptographic certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors cursor-pointer">
              Dashboard
            </button>
            <button onClick={() => setActiveTab('courses')} className="hover:text-white transition-colors cursor-pointer">
              11 Kursus Lengkap
            </button>
            <button onClick={() => setActiveTab('flashcards')} className="hover:text-white transition-colors cursor-pointer">
              Flashcard Studio
            </button>
            <button onClick={() => setActiveTab('analytics')} className="hover:text-white transition-colors cursor-pointer">
              Mastery Radar
            </button>
            <button onClick={() => setActiveTab('ai-research-lab')} className="hover:text-white transition-colors cursor-pointer">
              Riset AI
            </button>
            <button onClick={() => setActiveTab('system-design')} className="hover:text-white transition-colors cursor-pointer">
              Arsitektur Sistem
            </button>
            <button onClick={() => setActiveTab('universities')} className="hover:text-white transition-colors cursor-pointer">
              Admisi & Beasiswa
            </button>
            <button onClick={() => setActiveTab('certificates')} className="hover:text-white transition-colors cursor-pointer">
              Sertifikat
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
