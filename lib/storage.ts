'use client';

import { useState, useEffect } from 'react';
import { UserProgress, Certificate, Course } from './types';
import { COURSES_DATA } from './data/courses';

const STORAGE_KEY = 'akademia_global_user_progress_v3_release';

export const CLEAN_PRODUCTION_USER_PROGRESS: UserProgress = {
  studentName: 'Pelajar Akademia',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  totalXp: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  passedQuizScores: {},
  completedCourseIds: [],
  earnedBadges: [],
  certificates: [],
  targetUniversityIds: [],
  savedScholarshipIds: [],
  dailyStudyMinutes: 0
};

export const DEFAULT_USER_PROGRESS: UserProgress = CLEAN_PRODUCTION_USER_PROGRESS;

export function getStoredUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_USER_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_USER_PROGRESS, ...parsed };
  } catch (e) {
    console.error('Error reading localStorage', e);
    return DEFAULT_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving localStorage', e);
  }
}

export function calculateLevelFromXp(xp: number): number {
  return Math.floor(xp / 250) + 1;
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => getStoredUserProgress());
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveUserProgress(next);
      return next;
    });
  };

  const completeLesson = (lessonId: string, scorePercent: number, xpReward: number, courseId: string) => {
    updateProgress((prev) => {
      const isAlreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const newCompleted = isAlreadyCompleted ? prev.completedLessonIds : [...prev.completedLessonIds, lessonId];
      const newScores = { ...prev.passedQuizScores, [lessonId]: Math.max(scorePercent, prev.passedQuizScores[lessonId] || 0) };
      const newXp = isAlreadyCompleted ? prev.totalXp : prev.totalXp + xpReward;
      const newLevel = calculateLevelFromXp(newXp);

      // Check if entire course is completed
      const course = COURSES_DATA.find((c) => c.id === courseId);
      let newCompletedCourseIds = [...prev.completedCourseIds];
      let newCertificates = [...prev.certificates];
      let newBadges = [...prev.earnedBadges];

      if (course) {
        const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
        const hasFinishedAll = allLessonIds.every((id) => newCompleted.includes(id));

        if (hasFinishedAll && !newCompletedCourseIds.includes(courseId)) {
          newCompletedCourseIds.push(courseId);

          // Auto-generate Certificate
          const certCode = `AKAD-${new Date().getFullYear()}-${course.slug.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
          const newCert: Certificate = {
            id: `cert-${Date.now()}`,
            serialNumber: certCode,
            studentName: prev.studentName,
            courseId: course.id,
            courseTitle: course.title,
            category: course.categoryLabel,
            issueDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            grade: scorePercent >= 95 ? 'Summa Cum Laude' : scorePercent >= 85 ? 'Magna Cum Laude' : 'Distinction',
            scorePercent: Math.round(scorePercent),
            verificationUrl: `/certificate/${certCode}`,
            skillsAcquired: course.outcomes,
            instructorName: 'Board of International Academic Fellows Akademia Global',
            qrPayload: `https://akademia-global.edu/verify/${certCode}`
          };
          newCertificates.push(newCert);

          // Add Badge
          newBadges.push({
            id: `badge-${course.id}`,
            title: course.badge.title,
            description: `Menyelesaikan seluruh kurikulum ${course.title} dengan nilai luar biasa.`,
            icon: course.badge.icon,
            unlockedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          });
        }
      }

      return {
        ...prev,
        completedLessonIds: newCompleted,
        passedQuizScores: newScores,
        totalXp: newXp,
        level: newLevel,
        completedCourseIds: newCompletedCourseIds,
        certificates: newCertificates,
        earnedBadges: newBadges
      };
    });
  };

  const toggleTargetUniversity = (uniId: string) => {
    updateProgress((prev) => {
      const exists = prev.targetUniversityIds.includes(uniId);
      const targetUniversityIds = exists
        ? prev.targetUniversityIds.filter((id) => id !== uniId)
        : [...prev.targetUniversityIds, uniId];
      return { ...prev, targetUniversityIds };
    });
  };

  const toggleSavedScholarship = (scholarshipId: string) => {
    updateProgress((prev) => {
      const exists = prev.savedScholarshipIds.includes(scholarshipId);
      const savedScholarshipIds = exists
        ? prev.savedScholarshipIds.filter((id) => id !== scholarshipId)
        : [...prev.savedScholarshipIds, scholarshipId];
      return { ...prev, savedScholarshipIds };
    });
  };

  const setStudentName = (name: string) => {
    updateProgress((prev) => ({ ...prev, studentName: name.trim() || 'Pelajar Akademia' }));
  };

  const updateStudentProfile = (name: string, avatarUrl: string) => {
    updateProgress((prev) => ({
      ...prev,
      studentName: name.trim() || 'Pelajar Akademia',
      avatar: avatarUrl.trim() || prev.avatar
    }));
  };

  const awardFocusTimeXP = (minutes: number, xpBonus: number) => {
    updateProgress((prev) => {
      const newXp = prev.totalXp + xpBonus;
      const newMinutes = (prev.dailyStudyMinutes || 0) + minutes;
      return {
        ...prev,
        totalXp: newXp,
        level: calculateLevelFromXp(newXp),
        dailyStudyMinutes: newMinutes
      };
    });
  };

  const awardDirectXP = (xp: number) => {
    updateProgress((prev) => {
      const newXp = prev.totalXp + xp;
      return {
        ...prev,
        totalXp: newXp,
        level: calculateLevelFromXp(newXp)
      };
    });
  };

  const importFullProgress = (imported: UserProgress) => {
    if (!imported || typeof imported !== 'object') return;
    const sanitized: UserProgress = {
      ...DEFAULT_USER_PROGRESS,
      ...imported,
      studentName: imported.studentName || 'Pelajar Akademia',
      level: calculateLevelFromXp(imported.totalXp || 0)
    };
    setProgress(sanitized);
    saveUserProgress(sanitized);
  };

  const resetAllProgress = (customName?: string) => {
    const cleanState: UserProgress = {
      ...DEFAULT_USER_PROGRESS,
      studentName: customName || 'Pelajar Akademia'
    };
    setProgress(cleanState);
    saveUserProgress(cleanState);

    // Optional: Clear auxiliary local storage keys if desired
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove = Object.keys(localStorage).filter(
          (k) => k.startsWith('akademia_flashcards_') || k.startsWith('akademia_notes_')
        );
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        console.error('Error clearing auxiliary keys', e);
      }
    }
  };

  return {
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
  };
}
