export type Category = 
  | 'coding'
  | 'design'
  | 'science'
  | 'humanities'
  | 'engineering'
  | 'specialized';

export type DifficultyLevel = 'Pemula (Beginner)' | 'Menengah (Intermediate)' | 'Lanjutan (Advanced)' | 'Mastery / Riset';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  codeSnippet?: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  difficulty: DifficultyLevel;
  content: {
    overview: string;
    keyConcepts: string[];
    detailedExplanation: string;
    codeExample?: {
      language: string;
      code: string;
      outputExplanation?: string;
    };
    interactiveWidgetType?: 'code-runner' | 'math-solver' | 'circuit-diagram' | 'logic-table' | 'law-case' | 'none';
    practicalExercise: string;
    cheatSheetSummary: string[];
  };
  quiz: {
    minPassScorePercent: number; // e.g. 80
    questions: QuizQuestion[];
  };
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: Category;
  categoryLabel: string;
  iconName: string;
  tagline: string;
  description: string;
  level: DifficultyLevel;
  totalHours: number;
  totalLessons: number;
  modules: CourseModule[];
  color: string;
  badge: {
    title: string;
    icon: string;
  };
  prerequisites: string[];
  relatedUniversityMajors: string[];
  outcomes: string[];
}

export interface UniversityPrerequisite {
  courseId: string;
  courseTitle: string;
  category: Category;
  minimumScorePercent: number;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  targetUniversities: string[];
  coverage: string;
  stipend: string;
  eligibility: string[];
  deadline: string;
  link: string;
  flagEmoji: string;
  type: 'Penuh (Full Funded)' | 'Sebagian (Partial)' | 'Riset Khusus';
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  worldRank: number;
  logo: string;
  flag: string;
  popularMajors: string[];
  admissionRequirements: {
    minGPA: string;
    satScore?: string;
    ieltsScore: string;
    toeflScore?: string;
    acceptanceRate: string;
    essayRequirements: string[];
    prerequisiteSkills: UniversityPrerequisite[];
  };
  scholarshipsAvailable: string[];
  tuitionFeeRange: string;
  applicationDeadlines: {
    fall: string;
    spring?: string;
  };
  website: string;
  description: string;
}

export interface Certificate {
  id: string;
  serialNumber: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  category: string;
  issueDate: string;
  grade: 'Summa Cum Laude' | 'Magna Cum Laude' | 'Distinction' | 'Pass';
  scorePercent: number;
  verificationUrl: string;
  skillsAcquired: string[];
  instructorName: string;
  qrPayload: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  category?: string;
  difficulty?: 'Mudah' | 'Sedang' | 'Menantang';
  masteryStatus?: 'new' | 'learning' | 'review' | 'mastered';
  reviewCount?: number;
  lastReviewedAt?: string;
}

export interface FlashcardDeck {
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  cards: Flashcard[];
  masteryScore?: number;
  lastStudiedAt?: string;
}

export interface UserProgress {
  studentName: string;
  avatar: string;
  totalXp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  passedQuizScores: Record<string, number>; // lessonId -> score percent
  completedCourseIds: string[];
  earnedBadges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
  certificates: Certificate[];
  targetUniversityIds: string[];
  savedScholarshipIds: string[];
  dailyStudyMinutes: number;
}
