'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Lightbulb, 
  X,
  BookOpenCheck
} from 'lucide-react';
import { Lesson } from '@/lib/types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  courseId: string;
  courseTitle: string;
  onPassQuiz: (scorePercent: number, xpEarned: number) => void;
  onOpenAITutor: () => void;
}

export function QuizModal({
  isOpen,
  onClose,
  lesson,
  courseId,
  courseTitle,
  onPassQuiz,
  onOpenAITutor
}: QuizModalProps) {
  const questions = lesson.quiz.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];
  const isAnswered = selectedOption !== undefined;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswerIndex) {
          correctCount++;
        }
      });
      const scorePercent = Math.round((correctCount / questions.length) * 100);
      setIsFinished(true);

      if (scorePercent >= lesson.quiz.minPassScorePercent) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        onPassQuiz(scorePercent, lesson.xpReward);
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  if (!isOpen) return null;

  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswerIndex) {
      correctCount++;
    }
  });
  const finalScorePercent = Math.round((correctCount / questions.length) * 100);
  const isPassed = finalScorePercent >= lesson.quiz.minPassScorePercent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative text-zinc-200 my-auto max-h-[92vh] overflow-y-auto"
        id="quiz-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-5 sm:top-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Tutup Kuis"
          id="btn-close-quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Header */}
            <div className="mb-4 sm:mb-6 pr-8">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-zinc-400 mb-1">
                <BookOpenCheck className="w-4 h-4 text-zinc-300 shrink-0" />
                <span className="truncate">Evaluasi Pemahaman • {courseTitle}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-zinc-100 tracking-tight leading-snug">
                {lesson.title}
              </h2>
              <div className="flex items-center justify-between text-xs text-zinc-400 mt-2 gap-2">
                <span>Batas Minimum: <strong className="text-zinc-200">{lesson.quiz.minPassScorePercent}%</strong></span>
                <span className="font-mono bg-zinc-800 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-zinc-200 border border-zinc-700 text-[11px]">
                  Soal {currentQuestionIndex + 1}/{questions.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-zinc-200 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Box */}
            <div className="bg-black/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 mb-4 sm:mb-5">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-100 leading-relaxed mb-3">
                {currentQuestion.question}
              </h3>

              {currentQuestion.codeSnippet && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 sm:p-3.5 mb-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre>{currentQuestion.codeSnippet}</pre>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2 sm:space-y-2.5 mt-3 sm:mt-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = currentQuestion.correctAnswerIndex === idx;

                  let btnStyle = 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-zinc-800 border-zinc-500 text-zinc-100 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-zinc-950 border-zinc-700 text-zinc-500 line-through';
                    } else {
                      btnStyle = 'opacity-40 border-zinc-800 bg-zinc-900/40 text-zinc-600';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 cursor-pointer min-h-[44px] disabled:cursor-default ${btnStyle}`}
                      id={`quiz-opt-${currentQuestionIndex}-${idx}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 font-medium leading-snug">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-zinc-200 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-zinc-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation Banner */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 sm:p-4 rounded-2xl border border-zinc-700 bg-zinc-800/90 text-xs sm:text-sm mb-4 sm:mb-5 text-zinc-200"
                >
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    <Lightbulb className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>
                      {selectedOption === currentQuestion.correctAnswerIndex
                        ? 'Jawaban Benar! Penjelasan:'
                        : 'Belum Tepat. Penjelasan Konsep:'}
                    </span>
                  </div>
                  <p className="leading-relaxed text-zinc-300">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                onClick={onOpenAITutor}
                className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center justify-center sm:justify-start gap-1.5 underline underline-offset-4 cursor-pointer transition-colors py-1"
                id="btn-ask-tutor-quiz"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tanya RoboAkademia AI jika bingung</span>
              </button>

              {isAnswered && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleNext}
                  className="w-full sm:w-auto px-5 py-3 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 min-h-[44px]"
                  id="btn-quiz-next"
                >
                  <span>{currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kelulusan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="text-center py-4">
            {isPassed ? (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 shadow-sm">
                  <Trophy className="w-10 h-10" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700">
                    EVALUASI BERHASIL
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-100 mt-2">Pemahaman Materi Tervalidasi</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
                    Skor Anda <strong>{finalScorePercent}%</strong> (Batas minimum {lesson.quiz.minPassScorePercent}%). Topik berikutnya telah terbuka dan poin kemajuan berhasil ditambahkan.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 py-3">
                  <div className="px-5 py-2.5 bg-black/60 border border-zinc-800 rounded-2xl text-center">
                    <span className="block text-[11px] text-zinc-400">Skor Akhir</span>
                    <span className="text-xl font-bold text-zinc-100">{finalScorePercent}%</span>
                  </div>
                  <div className="px-5 py-2.5 bg-black/60 border border-zinc-800 rounded-2xl text-center">
                    <span className="block text-[11px] text-zinc-400">Hadiah XP</span>
                    <span className="text-xl font-bold text-zinc-200">+{lesson.xpReward} XP</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-full text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
                    id="btn-continue-next-lesson"
                  >
                    <span>Lanjutkan Pembelajaran</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shadow-sm">
                  <RotateCcw className="w-10 h-10" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                    SKOR BELUM MENCAPAI STANDAR
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-100 mt-2">Perlu Mengulang Ujian Ini</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
                    Skor Anda adalah <strong>{finalScorePercent}%</strong>, sedangkan syarat kelulusan materi ini adalah <strong>{lesson.quiz.minPassScorePercent}%</strong>. Pelajari kembali materi atau mintalah bimbingan RoboAkademia AI.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleRetry}
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-full text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border border-zinc-700"
                    id="btn-retry-quiz"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Kuis</span>
                  </button>
                  <button
                    onClick={onOpenAITutor}
                    className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-full text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
                    id="btn-tutor-explain-quiz"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Minta AI Bedah Materi Ini</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
