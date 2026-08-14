'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Layers,
  Sparkles,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  X,
  Flame,
  BookOpen,
  RefreshCw,
  Volume2
} from 'lucide-react';
import { Lesson, Flashcard } from '@/lib/types';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  courseTitle: string;
  onOpenAITutor: () => void;
}

// Generate an instant curated fallback deck from lesson data
function generateDefaultCards(lesson: Lesson): Flashcard[] {
  const cards: Flashcard[] = [];

  // Card 1: Overview concept
  if (lesson.content.overview) {
    cards.push({
      id: `default-card-1-${lesson.id}`,
      front: `Apa intisari fundamental dan tujuan utama dari materi "${lesson.title}"?`,
      back: lesson.content.overview,
      hint: 'Pikirkan tentang permasalahan utama yang dipecahkan oleh konsep ini.',
      category: 'Konsep Fundamental',
      difficulty: 'Mudah',
      masteryStatus: 'new',
      reviewCount: 0
    });
  }

  // Cards from key concepts
  lesson.content.keyConcepts.forEach((concept, idx) => {
    const parts = concept.split(':');
    const term = parts.length > 1 ? parts[0].trim() : `Poin Konsep ${idx + 1}`;
    const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : concept;

    cards.push({
      id: `default-card-kc-${idx}-${lesson.id}`,
      front: `Jelaskan prinsip kerja dan signifikansi dari: ${term}?`,
      back: desc,
      hint: `Tinjau hubungan antara ${term} dengan fondasi materi topik ini.`,
      category: 'Kaidah Kunci',
      difficulty: idx === 0 ? 'Mudah' : idx % 2 === 0 ? 'Sedang' : 'Menantang',
      masteryStatus: 'new',
      reviewCount: 0
    });
  });

  // Cards from cheatSheetSummary
  if (lesson.content.cheatSheetSummary && lesson.content.cheatSheetSummary.length > 0) {
    lesson.content.cheatSheetSummary.slice(0, 3).forEach((item, idx) => {
      cards.push({
        id: `default-card-cs-${idx}-${lesson.id}`,
        front: `Bagaimana kaidah aturan atau rumus berikut diterapkan dalam praktik nyata: "${item.length > 60 ? item.slice(0, 60) + '...' : item}"?`,
        back: `Prinsip: ${item}\n\nPenerapan: Gunakan sebagai tolok ukur verifikasi logika dan efisiensi implementasi solusi.`,
        hint: 'Ingat kembali ringkasan lembar contekan (cheat sheet) materi.',
        category: 'Formula & Aturan',
        difficulty: 'Sedang',
        masteryStatus: 'new',
        reviewCount: 0
      });
    });
  }

  // Practical exercise prompt card
  if (lesson.content.practicalExercise) {
    cards.push({
      id: `default-card-practical-${lesson.id}`,
      front: `Skenario Praktik Mandiri: Bagaimana strategi Anda menyelesaikan tantangan berikut?\n"${lesson.content.practicalExercise}"`,
      back: `Langkah Strategis:\n1. Dekomposisi masalah menjadi sub-komponen terisolasi.\n2. Terapkan prinsip dasar topik ${lesson.title}.\n3. Uji batasan (edge cases) dan validasi hasil.`,
      hint: 'Fokus pada alur pemecahan masalah tahap demi tahap.',
      category: 'Analisis Kasus',
      difficulty: 'Menantang',
      masteryStatus: 'new',
      reviewCount: 0
    });
  }

  return cards.length > 0 ? cards : [
    {
      id: `default-fallback-${lesson.id}`,
      front: `Apa konsep utama yang dipelajari pada ${lesson.title}?`,
      back: lesson.description || 'Pahami prinsip dasar dan implementasi terapan dari materi ini.',
      category: 'Konsep Inti',
      difficulty: 'Mudah',
      masteryStatus: 'new',
      reviewCount: 0
    }
  ];
}

function FlashcardModalInner({
  onClose,
  lesson,
  courseTitle,
  onOpenAITutor
}: Omit<FlashcardModalProps, 'isOpen'>) {
  const storageKey = `akademia_flashcards_${lesson.id}`;

  const [cards, setCards] = useState<Flashcard[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Failed to load flashcards', e);
      }
    }
    return generateDefaultCards(lesson);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [activeTab, setActiveTab] = useState<'study' | 'list'>('study');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speechActive, setSpeechActive] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && cards.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(cards));
      } catch (e) {
        console.error('Failed to save flashcards', e);
      }
    }
  }, [cards, storageKey]);

  // Calculate mastery statistics
  const masteryStats = useMemo(() => {
    if (!cards || cards.length === 0) return { total: 0, mastered: 0, review: 0, newCards: 0, percentage: 0 };
    const total = cards.length;
    const mastered = cards.filter((c) => c.masteryStatus === 'mastered').length;
    const review = cards.filter((c) => c.masteryStatus === 'review' || c.masteryStatus === 'learning').length;
    const newCards = cards.filter((c) => !c.masteryStatus || c.masteryStatus === 'new').length;
    
    // Weighted percentage: Mastered = 100%, Review/Learning = 50%, New = 0%
    const score = (mastered * 100 + review * 50) / (total * 100);
    const percentage = Math.round(score * 100);

    return { total, mastered, review, newCards, percentage };
  }, [cards]);

  const currentCard = cards[currentIndex] || cards[0];

  // Rate card with Spaced Repetition logic
  const handleRateCard = useCallback((rating: 'again' | 'good' | 'mastered') => {
    if (!currentCard) return;

    setCards((prevCards) => {
      const updated = [...prevCards];
      const cardToUpdate = { ...updated[currentIndex] };

      if (rating === 'again') {
        cardToUpdate.masteryStatus = 'review';
        cardToUpdate.reviewCount = (cardToUpdate.reviewCount || 0) + 1;
        cardToUpdate.lastReviewedAt = new Date().toISOString();
        // Move to the back of the queue for this session
        updated.splice(currentIndex, 1);
        updated.push(cardToUpdate);
        return updated;
      } else if (rating === 'good') {
        cardToUpdate.masteryStatus = 'learning';
        cardToUpdate.reviewCount = (cardToUpdate.reviewCount || 0) + 1;
        cardToUpdate.lastReviewedAt = new Date().toISOString();
        updated[currentIndex] = cardToUpdate;
        return updated;
      } else {
        // Mastered
        cardToUpdate.masteryStatus = 'mastered';
        cardToUpdate.reviewCount = (cardToUpdate.reviewCount || 0) + 1;
        cardToUpdate.lastReviewedAt = new Date().toISOString();
        updated[currentIndex] = cardToUpdate;

        // Check if now all mastered
        const willAllMaster = updated.every((c) => c.masteryStatus === 'mastered');
        if (willAllMaster) {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
        return updated;
      }
    });

    // Advance to next card smoothly
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentCard, currentIndex, cards.length]);

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  }, [cards.length]);

  const handlePrevCard = useCallback(() => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  }, [cards.length]);

  // Generate fresh AI Deck
  const handleGenerateAIDeck = async () => {
    setIsGeneratingAI(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle: lesson.title,
          courseTitle: courseTitle,
          overview: lesson.content.overview,
          keyConcepts: lesson.content.keyConcepts,
          detailedExplanation: lesson.content.detailedExplanation,
          cheatSheetSummary: lesson.content.cheatSheetSummary,
          count: 6,
          focusArea: 'Komprehensif'
        })
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi layanan AI');
      }

      const data = await res.json();
      if (data && Array.isArray(data.cards) && data.cards.length > 0) {
        const mappedCards: Flashcard[] = data.cards.map((c: any, i: number) => ({
          id: c.id || `ai-card-${Date.now()}-${i}`,
          front: c.front,
          back: c.back,
          hint: c.hint,
          category: c.category || 'Konsep Kunci',
          difficulty: c.difficulty || 'Sedang',
          masteryStatus: 'new',
          reviewCount: 0
        }));

        setCards(mappedCards);
        setCurrentIndex(0);
        setIsFlipped(false);
        setShowHint(false);
      } else {
        setErrorMessage('Mohon maaf, kartu memori belum berhasil dihasilkan. Silakan coba kembali.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Mohon maaf, terjadi kendala saat memproses pembuatan flashcards AI. Silakan coba beberapa saat lagi.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleResetMastery = () => {
    setCards((prev) =>
      prev.map((c) => ({
        ...c,
        masteryStatus: 'new',
        reviewCount: 0
      }))
    );
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCard();
      } else if (e.key === '1') {
        e.preventDefault();
        handleRateCard('again');
      } else if (e.key === '2') {
        e.preventDefault();
        handleRateCard('good');
      } else if (e.key === '3') {
        e.preventDefault();
        handleRateCard('mastered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextCard, handlePrevCard, handleRateCard]);

  // Speech synthesis for pronunciation/audio
  const handleSpeakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    setSpeechActive(true);
    utterance.onend = () => setSpeechActive(false);
    utterance.onerror = () => setSpeechActive(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-7 shadow-2xl relative text-zinc-200 my-auto max-h-[94vh] flex flex-col justify-between overflow-y-auto"
        id="flashcard-modal-container"
      >
        {/* Top Header & Mastery Progress Bar */}
        <div>
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-800 pr-9">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Layers className="w-4 h-4 text-zinc-300" />
                <span className="truncate">Kartu Memori Spaced Repetition (SRS)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-100 mt-1 tracking-tight">
                {lesson.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Tutup Flashcard"
              id="btn-close-flashcard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Animated Mastery Progress Meter */}
          <div className="mt-4 p-3.5 rounded-2xl bg-black/50 border border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${masteryStats.percentage > 70 ? 'text-zinc-200' : 'text-zinc-400'}`} />
                <span className="font-semibold text-zinc-200">Tingkat Penguasaan Materi:</span>
                <span className="font-mono text-zinc-100 font-bold">{masteryStats.percentage}%</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-zinc-300 inline-block" />
                  <span>{masteryStats.mastered} Dikuasai</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-zinc-500 inline-block" />
                  <span>{masteryStats.review} Dipelajari</span>
                </span>
              </div>
            </div>

            {/* Dynamic Progress Bar with animated sheen */}
            <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-0.5 relative">
              <motion.div
                className="h-full bg-zinc-200 rounded-full transition-all duration-500 relative"
                style={{ width: `${Math.max(masteryStats.percentage, 4)}%` }}
                layout
              />
            </div>
          </div>

          {/* Sub Navigation & Filter */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs">
            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab('study')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'study'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                id="tab-flashcard-study"
              >
                Latihan Kartu
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'list'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                id="tab-flashcard-list"
              >
                Semua Kartu ({cards.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerateAIDeck}
                disabled={isGeneratingAI}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-medium flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 text-[11px]"
                id="btn-ai-generate-fresh-deck"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>{isGeneratingAI ? 'Merancang Kartu AI...' : 'Buat Kartu Baru AI'}</span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-3 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Study Mode View */}
        {activeTab === 'study' ? (
          <div className="my-4 space-y-4">
            {/* Card Counter & Badges */}
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-mono">
                  {currentCard.category || 'Materi Inti'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px]">
                  Tingkat: {currentCard.difficulty || 'Sedang'}
                </span>
              </div>
              <span className="font-mono text-zinc-300">
                Kartu {currentIndex + 1} dari {cards.length}
              </span>
            </div>

            {/* Interactive Flippable 3D Card */}
            <div
              className="relative w-full min-h-[260px] sm:min-h-[290px] cursor-pointer select-none perspective-1000"
              onClick={() => setIsFlipped((prev) => !prev)}
              id="active-flashcard-surface"
              role="button"
              tabIndex={0}
              aria-label="Balik Kartu Memori"
            >
              <motion.div
                className="w-full h-full min-h-[260px] sm:min-h-[290px] rounded-2xl sm:rounded-3xl border border-zinc-700 bg-gradient-to-b from-zinc-850 to-zinc-900 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all hover:border-zinc-500"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* FRONT FACE */}
                <div
                  className={`w-full h-full flex flex-col justify-between space-y-4 ${
                    isFlipped ? 'invisible' : 'visible'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Sisi Pertanyaan / Tantangan</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakText(currentCard.front);
                      }}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                      title="Dengarkan Pertanyaan"
                    >
                      <Volume2 className={`w-4 h-4 ${speechActive ? 'text-zinc-100 animate-pulse' : ''}`} />
                    </button>
                  </div>

                  <div className="my-auto py-2">
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-zinc-100 leading-relaxed">
                      {currentCard.front}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
                    {currentCard.hint ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHint((prev) => !prev);
                        }}
                        className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}</span>
                      </button>
                    ) : <div />}

                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <RotateCw className="w-3 h-3" />
                      <span>Klik untuk membuka jawaban</span>
                    </span>
                  </div>

                  {/* Hint Box Dropdown */}
                  {showHint && currentCard.hint && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-zinc-300"
                    >
                      <strong className="text-zinc-200 font-semibold block mb-0.5">Petunjuk:</strong>
                      {currentCard.hint}
                    </motion.div>
                  )}
                </div>

                {/* BACK FACE */}
                <div
                  className={`w-full h-full flex flex-col justify-between space-y-4 absolute inset-0 p-6 sm:p-8 bg-zinc-900 rounded-2xl sm:rounded-3xl ${
                    isFlipped ? 'visible' : 'invisible'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" />
                      <span>Penjelasan & Jawaban Inti</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakText(currentCard.back);
                      }}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
                      title="Dengarkan Jawaban"
                    >
                      <Volume2 className={`w-4 h-4 ${speechActive ? 'text-zinc-100 animate-pulse' : ''}`} />
                    </button>
                  </div>

                  <div className="my-auto py-2 overflow-y-auto max-h-[160px] pr-1">
                    <p className="text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-line">
                      {currentCard.back}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <span className="text-[11px] text-zinc-400">
                      Bagaimana ingatan Anda terhadap konsep ini?
                    </span>
                    <span className="text-[11px] text-zinc-400">Klik untuk membalik</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* SRS Active Recall Rating Buttons */}
            <div className="pt-1">
              <div className="text-[11px] font-medium text-zinc-400 text-center mb-2">
                Pilih status evaluasi ingatan Anda (Spaced Repetition Rating):
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleRateCard('again')}
                  className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 min-h-[48px]"
                  id="btn-rate-again"
                  title="Tekan tombol '1' di keyboard"
                >
                  <span className="flex items-center gap-1 text-zinc-300 font-bold">
                    <span>🔴 Ulangi Lagi</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal">Perlu review segera</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRateCard('good')}
                  className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 min-h-[48px]"
                  id="btn-rate-good"
                  title="Tekan tombol '2' di keyboard"
                >
                  <span className="flex items-center gap-1 text-zinc-200 font-bold">
                    <span>🟡 Cukup Ingat</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal">Sedang dipelajari</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRateCard('mastered')}
                  className="p-2.5 sm:p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-100 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 min-h-[48px] shadow-sm"
                  id="btn-rate-mastered"
                  title="Tekan tombol '3' di keyboard"
                >
                  <span className="flex items-center gap-1 text-zinc-100 font-bold">
                    <span>🟢 Sangat Kuat</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 font-normal">Dikuasai penuh</span>
                </button>
              </div>
            </div>

            {/* Navigation & Keyboard shortcuts helper */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs text-zinc-400">
              <button
                type="button"
                onClick={handlePrevCard}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 cursor-pointer py-1"
                id="btn-prev-flashcard"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800">Space: Balik</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800">1: Ulangi</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800">2: Cukup</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800">3: Kuat</span>
              </div>

              <button
                type="button"
                onClick={handleNextCard}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 cursor-pointer py-1"
                id="btn-next-flashcard"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* List Mode View: Browse all cards */
          <div className="my-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
              <span>Daftar Seluruh Kartu Memori ({cards.length})</span>
              <button
                type="button"
                onClick={handleResetMastery}
                className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Status Penguasaan</span>
              </button>
            </div>

            {cards.map((c, idx) => (
              <div
                key={c.id || idx}
                className="p-4 rounded-2xl bg-black/50 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-[10px] text-zinc-300">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-zinc-200">{c.category || 'Materi Inti'}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      c.masteryStatus === 'mastered'
                        ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                        : c.masteryStatus === 'learning' || c.masteryStatus === 'review'
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                    }`}
                  >
                    {c.masteryStatus === 'mastered'
                      ? 'Dikuasai Penuh'
                      : c.masteryStatus === 'learning' || c.masteryStatus === 'review'
                      ? 'Sedang Dipelajari'
                      : 'Belum Dicoba'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-zinc-200">{c.front}</p>
                <p className="text-xs text-zinc-400 pl-3 border-l-2 border-zinc-700 leading-relaxed whitespace-pre-line">
                  {c.back}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenAITutor}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 underline underline-offset-4 cursor-pointer transition-colors py-1"
            id="btn-tutor-from-flashcards"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Diskusi konsep mendalam bersama RoboAkademia AI</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-sm min-h-[40px] flex items-center justify-center gap-2"
              id="btn-finish-flashcards"
            >
              <span>Selesai Latihan</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FlashcardModal({
  isOpen,
  onClose,
  lesson,
  courseTitle,
  onOpenAITutor
}: FlashcardModalProps) {
  if (!isOpen) return null;
  return (
    <FlashcardModalInner
      key={lesson.id}
      onClose={onClose}
      lesson={lesson}
      courseTitle={courseTitle}
      onOpenAITutor={onOpenAITutor}
    />
  );
}
