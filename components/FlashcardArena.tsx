'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Layers, 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  HelpCircle, 
  Plus, 
  BrainCircuit, 
  BookOpen, 
  RefreshCw, 
  Zap, 
  Trophy, 
  Flame,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { Flashcard, FlashcardDeck } from '@/lib/types';

interface FlashcardArenaProps {
  onAwardXP?: (xp: number) => void;
  onOpenAITutor: () => void;
}

const PRESET_DECKS: { id: string; title: string; category: string; icon: string; count: number; description: string; cards: Flashcard[] }[] = [
  {
    id: 'deck-ml',
    title: 'Fondasi Machine Learning & Deep Learning',
    category: 'Kecerdasan Buatan',
    icon: '🧠',
    count: 6,
    description: 'Konsep backpropagation, attention mechanism, optimasi gradient, dan loss functions.',
    cards: [
      {
        id: 'ml-1',
        front: 'Apa mekanisme fundamental di balik Self-Attention pada arsitektur Transformer?',
        back: 'Self-Attention menghitung matriks korelasi antara Query (Q), Key (K), dan Value (V) melalui formula: Attention(Q,K,V) = softmax((Q K^T) / sqrt(d_k)) * V, memungkinkan model menangkap dependensi kontekstual jarak jauh tanpa rekursi.',
        hint: 'Perhatikan tiga proyeksi linear: Q, K, dan V serta faktor penskalaan akar dimensi.',
        category: 'Deep Learning',
        difficulty: 'Menantang'
      },
      {
        id: 'ml-2',
        front: 'Mengapa masalah Vanishing Gradient terjadi pada jaringan syaraf tiruan dalam dengan fungsi aktivasi Sigmoid?',
        back: 'Turunan maksimum dari fungsi sigmoid adalah 0.25. Ketika dilakukan perkalian berantai (chain rule) melewati banyak lapisan, gradien akan mendekati nol secara eksponensial, menghentikan pembaruan bobot pada lapisan awal.',
        hint: 'Turunan f\'(x) = f(x)(1 - f(x)) memiliki batas nilai tertinggi yang kecil.',
        category: 'Optimasi',
        difficulty: 'Sedang'
      },
      {
        id: 'ml-3',
        front: 'Jelaskan perbedaan mendasar antara L1 Regularization (Lasso) dan L2 Regularization (Ridge).',
        back: 'L1 menambahkan penalti nilai absolut bobot (|w|), mendorong sparsitas sehingga bobot fitur tidak penting menjadi tepat nol (feature selection). L2 menambahkan penalti kuadrat bobot (w^2), memperkecil magnitudo seluruh bobot secara merata tanpa menjadikannya nol.',
        hint: 'Bentuk kontur penalti: L1 berbentuk belah ketupat (diamond), L2 berbentuk lingkaran/bola.',
        category: 'Regulerisasi',
        difficulty: 'Sedang'
      },
      {
        id: 'ml-4',
        front: 'Apa tujuan utama dari Batch Normalization selama proses training?',
        back: 'Menstabilkan distribusi input tiap lapisan tersembunyi (mengurangi internal covariate shift), memungkinkan laju pembelajaran (learning rate) lebih tinggi, dan bertindak sebagai regularizer ringan.',
        hint: 'Menormalisasi mean menjadi 0 dan varians menjadi 1 dengan parameter skala gamma dan beta.',
        category: 'Deep Learning',
        difficulty: 'Mudah'
      },
      {
        id: 'ml-5',
        front: 'Bagaimana Dropout mencegah overfitting pada neural networks?',
        back: 'Dengan menonaktifkan neuron secara acak dengan probabilitas p pada setiap iterasi training. Ini mencegah ko-adaptasi kompleks antar-neuron dan memaksa jaringan mempelajari representasi fitur yang lebih redundan dan tangguh.',
        hint: 'Memutus dependensi berlebih antara neuron tetangga secara probabilistik.',
        category: 'Regulerisasi',
        difficulty: 'Mudah'
      },
      {
        id: 'ml-6',
        front: 'Apa keunggulan optimizer Adam dibanding Stochastic Gradient Descent (SGD) standar?',
        back: 'Adam menggabungkan keunggulan Momentum (first moment vector: rata-rata gradien bergerak) dan RMSProp (second moment vector: rata-rata kuadrat gradien tak-terpusat) untuk menyesuaikan learning rate individual per-parameter.',
        hint: 'Adaptive Moment Estimation: menghitung momen pertama dan momen kedua gradien.',
        category: 'Optimasi',
        difficulty: 'Menantang'
      }
    ]
  },
  {
    id: 'deck-quantum',
    title: 'Mekanika Kuantum & Fisika Modern',
    category: 'Fisika Lanjutan',
    icon: '⚛️',
    count: 5,
    description: 'Prinsip ketidakpastian Heisenberg, persamaan Schrödinger, dan superposisi kuantum.',
    cards: [
      {
        id: 'qm-1',
        front: 'Tuliskan dan jelaskan makna fisik dari Persamaan Schrödinger Tak Bergantung Waktu (Time-Independent).',
        back: 'H_hat * psi = E * psi. Di mana H_hat adalah operator Hamiltonian (energi total: kinetik + potensial), psi adalah fungsi gelombang partikel, dan E adalah nilai eigen energi terkuantisasi dari sistem.',
        hint: 'Persamaan nilai eigen (eigenvalue problem) dari operator energi sistem.',
        category: 'Persamaan Kunci',
        difficulty: 'Menantang'
      },
      {
        id: 'qm-2',
        front: 'Apa implikasi dari Prinsip Ketidakpastian Heisenberg: Delta_x * Delta_p >= hbar / 2?',
        back: 'Posisi dan momentum partikel kuantum tidak dapat diukur secara simultan dengan presisi tak terbatas. Ketidakpastian ini adalah sifat gelombang intrinsik alam semesta kuantum, bukan keterbatasan instrumen alat ukur.',
        hint: 'Hasil dari sifat non-komutatif operator posisi dan momentum: [x_hat, p_hat] = i * hbar.',
        category: 'Prinsip Dasar',
        difficulty: 'Sedang'
      },
      {
        id: 'qm-3',
        front: 'Jelaskan fenomena Quantum Tunneling (Penerobosan Kuantum).',
        back: 'Kemampuan partikel kuantum untuk menembus rintangan potensial yang energinya lebih tinggi dari energi kinetik partikel, karena fungsi gelombang psi memiliki amplitudo eksponensial tak-nol di dalam dan di luar dinding penghalang.',
        hint: 'Pikirkan fenomena peluruhan alfa dan cara kerja mikroskop STM.',
        category: 'Fenomena Kuantum',
        difficulty: 'Sedang'
      },
      {
        id: 'qm-4',
        front: 'Apa yang dimaksud dengan Entanglement Kuantum (Keterikatan Kuantum)?',
        back: 'Kondisi di mana dua atau lebih partikel memiliki keadaan kuantum yang saling terkait sedemikian rupa sehingga pengukuran pada satu partikel seketika menentukan keadaan partikel lainnya, terlepas dari jarak pemisah di antara keduanya.',
        hint: 'Sering disebut Einstein sebagai "spooky action at a distance".',
        category: 'Informasi Kuantum',
        difficulty: 'Menantang'
      },
      {
        id: 'qm-5',
        front: 'Apa makna fisis dari kuadrat mutlak fungsi gelombang |psi(x)|^2 menurut Interpretasi Born?',
        back: '|psi(x)|^2 mewakili kerapatan probabilitas (probability density) untuk menemukan partikel pada posisi x pada waktu t saat dilakukan pengukuran.',
        hint: 'Fungsi gelombang itu sendiri bernilai kompleks, namun kuadrat mutlaknya adalah probabilitas real.',
        category: 'Interpretasi Dasar',
        difficulty: 'Mudah'
      }
    ]
  },
  {
    id: 'deck-distributed',
    title: 'Arsitektur Sistem Terdistribusi & Cloud',
    category: 'Ilmu Komputer',
    icon: '🌐',
    count: 5,
    description: 'Teorema CAP, Raft consensus, consistent hashing, dan database replikasi.',
    cards: [
      {
        id: 'dist-1',
        front: 'Jelaskan Teorema CAP (Brewer\'s Theorem) dan trade-off utamanya.',
        back: 'Dalam sistem penyimpanan terdistribusi yang mengalami partisi jaringan (Partition Tolerance / P), sistem hanya dapat memilih antara Konsistensi Ketat (Consistency / C) atau Ketersediaan Tinggi (Availability / A), tidak dapat keduanya sekaligus.',
        hint: 'Pilihan fundamental di dunia nyata: CP vs AP saat koneksi antar-node terputus.',
        category: 'Teorema Dasar',
        difficulty: 'Sedang'
      },
      {
        id: 'dist-2',
        front: 'Bagaimana algoritma Consistent Hashing meminimalkan remapping kunci saat node server ditambah atau dikurangi?',
        back: 'Consistent Hashing memetakan node dan kunci ke dalam lingkaran virtual ring (0 hingga 2^32-1). Ketika sebuah node ditambah atau dihapus, hanya k/N kunci yang perlu dipindahkan (kunci di segmen node tersebut), bukan semua data.',
        hint: 'Bayangkan sebuah cincin cincin modular dengan node virtual (vnodes) untuk distribusi merata.',
        category: 'Hashing & Caching',
        difficulty: 'Menantang'
      },
      {
        id: 'dist-3',
        front: 'Apa peran log replication dan term number dalam protokol Konsensus Raft?',
        back: 'Leader yang terpilih menerima perintah klien, menambahkannya ke log lokal, lalu mereplikasi entri ke seluruh follower. Entri dianggap committed setelah diakui mayoritas (quorum). Term number bertindak sebagai jam logika untuk mendeteksi pesan basi dari leader terdahulu.',
        hint: 'Tiga state node: Follower, Candidate, Leader.',
        category: 'Konsensus',
        difficulty: 'Menantang'
      },
      {
        id: 'dist-4',
        front: 'Apa perbedaan antara Latensi (Latency) dan Throughput dalam sistem skala tinggi?',
        back: 'Latency adalah waktu yang dibutuhkan sebuah permintaan tunggal untuk diselesaikan (ms). Throughput adalah jumlah total permintaan yang berhasil diproses oleh sistem per satuan waktu (RPS / QPS).',
        hint: 'Latency = durasi per request; Throughput = volume kapasitas serentak.',
        category: 'Metrik Sistem',
        difficulty: 'Mudah'
      },
      {
        id: 'dist-5',
        front: 'Kapan sebaiknya menerapkan pola Read-Replica versus Sharding (Pemisahan Horizontal)?',
        back: 'Read-Replica digunakan ketika beban query baca (read-heavy) tinggi tanpa melebihi kapasitas memori/disk single-node. Sharding digunakan saat ukuran dataset atau volume tulis (write-heavy) melampaui kapasitas vertikal satu server tunggal.',
        hint: 'Read replication menyalin seluruh data; Sharding membagi data menjadi partisi terpisah.',
        category: 'Basis Data',
        difficulty: 'Sedang'
      }
    ]
  },
  {
    id: 'deck-calculus',
    title: 'Kalkulus Peubah Banyak & Optimasi',
    category: 'Matematika Terapan',
    icon: '📐',
    count: 5,
    description: 'Gradien, Matriks Hessian, Pengali Lagrange, dan Integral Lipat.',
    cards: [
      {
        id: 'calc-1',
        front: 'Apa signifikansi geometris dari vektor gradien Nabla(f) pada fungsi skalar f(x, y)?',
        back: 'Vektor gradien menunjuk ke arah laju peningkatan tercepat (steepest ascent) dari fungsi, dan magnitudonya ||Nabla(f)|| adalah laju perubahan maksimum tersebut. Gradien juga selalu tegak lurus (ortogonal) terhadap kurva ketinggian (level curve).',
        hint: 'Fondasi dari algoritma Gradient Descent dalam optimasi machine learning.',
        category: 'Turunan Parsial',
        difficulty: 'Mudah'
      },
      {
        id: 'calc-2',
        front: 'Bagaimana matriks Hessian H digunakan untuk menentukan jenis titik kritis (Uji Turunan Kedua)?',
        back: 'Jika H definit positif (semua nilai eigen > 0), titik tersebut adalah minimum lokal. Jika H definit negatif, titik tersebut maksimum lokal. Jika memiliki nilai eigen positif dan negatif, titik tersebut adalah titik pelana (saddle point).',
        hint: 'Matriks turunan parsial kedua berukuran n x n yang simetris.',
        category: 'Optimasi',
        difficulty: 'Menantang'
      },
      {
        id: 'calc-3',
        front: 'Jelaskan metode Pengali Lagrange (Lagrange Multipliers) untuk optimasi berkendala g(x, y) = c.',
        back: 'Metode ini mencari titik di mana kurva ketinggian fungsi tujuan f sejajar dengan kurva kendala g, dirumuskan: Nabla(f) = lambda * Nabla(g), di mana lambda adalah pengali Lagrange.',
        hint: 'Kondisi tangen antara fungsi objektif dan kurva batasan.',
        category: 'Optimasi Berkendala',
        difficulty: 'Menantang'
      },
      {
        id: 'calc-4',
        front: 'Kapan kita harus menyertakan faktor Jacobian r dalam integral lipat dua koordinat polar?',
        back: 'Saat melakukan transformasi variabel dari koordinat kartesius (dx dy) ke polar (dr dtheta), elemen luas berubah menjadi dA = r dr dtheta karena peregangan luas lokal oleh faktor determinan matriks Jacobian r.',
        hint: 'dx dy -> r dr dtheta.',
        category: 'Integral Lipat',
        difficulty: 'Sedang'
      },
      {
        id: 'calc-5',
        front: 'Apa isi dari Teorema Divergensi Gauss?',
        back: 'Fluks total medan vektor F yang menembus permukaan tertutup S sama dengan integral volume dari divergensi medan tersebut (div F) di seluruh ruang interior V yang dilingkupinya: Integral_S (F . n dA) = Integral_V (div F dV).',
        hint: 'Menghubungkan fluks permukaan dengan divergensi volume di dalamnya.',
        category: 'Kalkulus Vektor',
        difficulty: 'Menantang'
      }
    ]
  }
];

export function FlashcardArena({ onAwardXP, onOpenAITutor }: FlashcardArenaProps) {
  const [selectedDeck, setSelectedDeck] = useState<typeof PRESET_DECKS[0] | null>(PRESET_DECKS[0]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [masteredCardIds, setMasteredCardIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // AI Generator Custom Topic state
  const [customTopic, setCustomTopic] = useState('');
  const [isGeneratingDeck, setIsGeneratingDeck] = useState(false);
  const [customDecks, setCustomDecks] = useState<typeof PRESET_DECKS>([]);

  const allDecks = useMemo(() => {
    return [...customDecks, ...PRESET_DECKS];
  }, [customDecks]);

  const activeCards = selectedDeck?.cards || [];
  const currentCard = activeCards[currentCardIndex] || null;

  // Speak card front or back using Web Speech API
  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentCardIndex < activeCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Completed deck celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const handleRateCard = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    let xpGained = 15;
    if (rating === 'again') xpGained = 10;
    if (rating === 'hard') xpGained = 20;
    if (rating === 'good') xpGained = 30;
    if (rating === 'easy') xpGained = 40;

    if (rating === 'good' || rating === 'easy') {
      if (!masteredCardIds.includes(currentCard.id)) {
        setMasteredCardIds((prev) => [...prev, currentCard.id]);
      }
    }

    if (onAwardXP) {
      onAwardXP(xpGained);
    }

    handleNextCard();
  };

  // Generate Custom Deck via Gemini API
  const handleGenerateCustomDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim() || isGeneratingDeck) return;

    setIsGeneratingDeck(true);
    try {
      const res = await fetch('/app/api/gemini/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle: customTopic.trim(),
          courseTitle: 'Topik Riset Mandiri',
          overview: `Pembahasan mendalam dan intisari tentang: ${customTopic.trim()}`,
          keyConcepts: [customTopic.trim()],
          count: 5
        })
      });

      if (!res.ok) throw new Error('Gagal menyusun kartu memori');
      const data = await res.json();

      if (data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
        const newDeck = {
          id: `custom-deck-${Date.now()}`,
          title: data.deckTitle || `Studi: ${customTopic.trim()}`,
          category: 'AI Custom Deck',
          icon: '✨',
          count: data.cards.length,
          description: data.summary || `Set kartu memori interaktif untuk topik ${customTopic.trim()}`,
          cards: data.cards.map((c: any, idx: number) => ({
            id: `custom-card-${Date.now()}-${idx}`,
            front: c.front,
            back: c.back,
            hint: c.hint || 'Pikirkan konsep mendasar topik ini.',
            category: c.category || 'Konsep Kunci',
            difficulty: c.difficulty || 'Sedang'
          }))
        };

        setCustomDecks((prev) => [newDeck, ...prev]);
        setSelectedDeck(newDeck);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setCustomTopic('');

        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.5 }
        });
      }
    } catch (err) {
      console.error('Error creating custom deck:', err);
    } finally {
      setIsGeneratingDeck(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8" id="flashcard-arena-tab">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 text-xl shadow-md">
            <Layers className="w-6 h-6 text-zinc-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-zinc-100">
                Flashcard & Spaced Repetition Studio
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                Active Recall
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Pertajam retensi memori jangka panjang dengan metode ilmiah Spaced Repetition (SuperMemo/Anki).
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAITutor}
          className="px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>Tanya AI Tutor</span>
        </button>
      </div>

      {/* Main Grid: Deck Selector (Left) & Active Flashcard Studio (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Decks List & AI Generator */}
        <div className="lg:col-span-5 space-y-4">
          {/* AI Generator Input */}
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-300" />
              <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
                Generator Kartu AI Instan
              </h3>
            </div>
            <form onSubmit={handleGenerateCustomDeck} className="flex gap-2">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Ketik topik ilmiah apa saja (misal: B-Tree, Kuantum, DNA)..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                disabled={isGeneratingDeck}
              />
              <button
                type="submit"
                disabled={isGeneratingDeck || !customTopic.trim()}
                className="px-3 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 disabled:opacity-50 transition-all cursor-pointer shrink-0"
              >
                {isGeneratingDeck ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>Buat</span>
              </button>
            </form>
          </div>

          {/* Decks Selection List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">
              Koleksi Kartu Akademik ({allDecks.length})
            </h3>

            <div className="space-y-2">
              {allDecks.map((deck) => {
                const isSelected = selectedDeck?.id === deck.id;

                return (
                  <div
                    key={deck.id}
                    onClick={() => {
                      setSelectedDeck(deck);
                      setCurrentCardIndex(0);
                      setIsFlipped(false);
                      setShowHint(false);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-800/90 border-zinc-600 text-white shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{deck.icon}</span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-100">
                            {deck.title}
                          </h4>
                          <span className="text-[10px] text-zinc-400">
                            {deck.category} • {deck.count} Kartu
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-zinc-200" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Flip Card Experience */}
        <div className="lg:col-span-7 space-y-4">
          {selectedDeck && currentCard ? (
            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-5 shadow-lg">
              {/* Card Meta & Header */}
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-200">
                    Kartu {currentCardIndex + 1} / {activeCards.length}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium">
                    {currentCard.category || selectedDeck.category}
                  </span>
                  {currentCard.difficulty && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/60 border border-zinc-800 text-zinc-400">
                      {currentCard.difficulty}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(isFlipped ? currentCard.back : currentCard.front)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    title="Dengarkan Audio Teks"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between cursor-pointer relative group select-none transition-all hover:border-zinc-700"
              >
                {/* Front / Back Label Badge */}
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>{isFlipped ? 'JAWABAN & PENJELASAN' : 'PERTANYAAN / ACTIVE RECALL'}</span>
                  <span className="text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1 text-[10px]">
                    <RotateCw className="w-3 h-3" /> Klik untuk membalik kartu
                  </span>
                </div>

                {/* Card Main Text */}
                <div className="my-auto py-4">
                  <AnimatePresence mode="wait">
                    {isFlipped ? (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-zinc-100 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line"
                      >
                        {currentCard.back}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-zinc-100 text-base sm:text-lg font-bold leading-snug"
                      >
                        {currentCard.front}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hint Bar */}
                {currentCard.hint && !isFlipped && (
                  <div className="pt-2 border-t border-zinc-900">
                    {showHint ? (
                      <p className="text-xs text-amber-300/90 italic flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" /> Clue: {currentCard.hint}
                      </p>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHint(true);
                        }}
                        className="text-[11px] text-zinc-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <HelpCircle className="w-3 h-3" /> Butuh petunjuk?
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons: Flip or Rate SM-2 */}
              {!isFlipped ? (
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handlePrevCard}
                    disabled={currentCardIndex === 0}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsFlipped(true)}
                    className="flex-1 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Lihat Jawaban</span>
                  </button>

                  <button
                    onClick={handleNextCard}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <p className="text-center text-[11px] text-zinc-400 font-medium">
                    Bagaimana tingkat kemudahan Anda mengingat materi ini?
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleRateCard('again')}
                      className="py-2 px-1 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-[11px] font-bold text-center cursor-pointer transition-all"
                    >
                      <div>Lupa</div>
                      <span className="text-[9px] text-rose-400/80 font-normal">+10 XP</span>
                    </button>

                    <button
                      onClick={() => handleRateCard('hard')}
                      className="py-2 px-1 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 text-amber-300 text-[11px] font-bold text-center cursor-pointer transition-all"
                    >
                      <div>Sulit</div>
                      <span className="text-[9px] text-amber-400/80 font-normal">+20 XP</span>
                    </button>

                    <button
                      onClick={() => handleRateCard('good')}
                      className="py-2 px-1 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/60 text-blue-300 text-[11px] font-bold text-center cursor-pointer transition-all"
                    >
                      <div>Bagus</div>
                      <span className="text-[9px] text-blue-400/80 font-normal">+30 XP</span>
                    </button>

                    <button
                      onClick={() => handleRateCard('easy')}
                      className="py-2 px-1 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 text-[11px] font-bold text-center cursor-pointer transition-all"
                    >
                      <div>Mudah</div>
                      <span className="text-[9px] text-emerald-400/80 font-normal">+40 XP</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-zinc-500 rounded-3xl bg-zinc-900/40 border border-zinc-800">
              <Layers className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
              <p className="text-sm font-semibold text-zinc-400">Pilih set kartu untuk memulai sesi latihan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
