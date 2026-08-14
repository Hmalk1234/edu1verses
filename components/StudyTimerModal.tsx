'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  X,
  Flame,
  Radio,
  Coffee,
  Brain,
  Zap
} from 'lucide-react';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete: (minutes: number, xpReward: number) => void;
}

type SoundType = 'none' | 'alpha' | 'brown' | 'rain';

// Procedural Audio Helper generated outside render
function generateNoiseBuffer(ctx: AudioContext, sound: 'brown' | 'rain'): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let lastOut = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (sound === 'brown') {
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    } else {
      output[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = output[i];
      output[i] *= 2.5;
    }
  }
  return noiseBuffer;
}

export function StudyTimerModal({
  isOpen,
  onClose,
  onSessionComplete
}: StudyTimerModalProps) {
  // Timer state
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<'pomodoro' | 'deep' | 'short_break' | 'long_break'>('pomodoro');
  const [activeSound, setActiveSound] = useState<SoundType>('none');
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  // Audio Context refs for Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Stop audio synthesis helper
  const stopAudio = useCallback(() => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (noiseNodeRef.current) {
        noiseNodeRef.current.disconnect();
        noiseNodeRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
        gainRef.current = null;
      }
    } catch (e) {
      console.error('Error stopping audio', e);
    }
  }, []);

  // Completion chime
  const playCompletionChime = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sound generator
  const startSound = (sound: SoundType) => {
    stopAudio();
    if (sound === 'none') {
      setActiveSound('none');
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      if (sound === 'alpha') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 10;
        lfoGain.gain.value = 0.04;
        lfo.connect(masterGain.gain);
        lfo.start();

        osc.connect(masterGain);
        osc.start();
        oscRef.current = osc;
      } else if (sound === 'brown' || sound === 'rain') {
        const noiseBuffer = generateNoiseBuffer(ctx, sound);
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = sound === 'brown' ? 'lowpass' : 'bandpass';
        filter.frequency.value = sound === 'brown' ? 300 : 700;

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;
      }

      setActiveSound(sound);
    } catch (e) {
      console.error('Audio init error', e);
      setActiveSound('none');
    }
  };

  // Timer Tick
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          stopAudio();
          playCompletionChime();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
          const xp = mode === 'deep' ? 50 : mode === 'pomodoro' ? 25 : 5;
          onSessionComplete(durationMinutes, xp);
          setCompletedSessions((c) => c + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, durationMinutes, mode, onSessionComplete, playCompletionChime, stopAudio]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  // Set preset
  const handleSelectMode = (newMode: 'pomodoro' | 'deep' | 'short_break' | 'long_break') => {
    setIsRunning(false);
    setMode(newMode);
    let mins = 25;
    if (newMode === 'pomodoro') mins = 25;
    if (newMode === 'deep') mins = 50;
    if (newMode === 'short_break') mins = 5;
    if (newMode === 'long_break') mins = 15;
    setDurationMinutes(mins);
    setTimeLeft(mins * 60);
  };

  if (!isOpen) return null;

  // Formatting MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = Math.round(((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-zinc-200 my-auto"
        id="study-focus-timer-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-100">Focus & Pomodoro Studio</h2>
              <p className="text-xs text-zinc-400">Tingkatkan konsentrasi dengan audio fokus sintetis & reward XP</p>
            </div>
          </div>

          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Tutup Timer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mt-5 p-1 bg-black/60 border border-zinc-800 rounded-2xl">
          <button
            type="button"
            onClick={() => handleSelectMode('pomodoro')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
              mode === 'pomodoro' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>25m Focus</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('deep')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
              mode === 'deep' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>50m Deep</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('short_break')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
              mode === 'short_break' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>5m Rehat</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('long_break')}
            className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
              mode === 'long_break' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>15m Rehat</span>
          </button>
        </div>

        {/* Circular Countdown Display */}
        <div className="my-7 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Outer SVG Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                className="text-zinc-800 fill-none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={276.46}
                strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                strokeLinecap="round"
                className="text-zinc-200 fill-none transition-all duration-1000"
              />
            </svg>

            {/* Centered Timer text */}
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-zinc-100">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs text-zinc-400 font-medium mt-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-zinc-400" />
                <span>+{mode === 'deep' ? '50' : mode === 'pomodoro' ? '25' : '5'} XP Saat Selesai</span>
              </span>
            </div>
          </div>

          {/* Controls: Play / Pause / Reset */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(durationMinutes * 60);
              }}
              className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all cursor-pointer active:scale-95"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              className="px-8 py-3.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 font-bold text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 min-w-[140px] justify-center"
              id="btn-toggle-focus-timer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Mulai Fokus</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Ambient Synthesizer Sound Generator */}
        <div className="p-4 bg-black/50 border border-zinc-800 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-zinc-400" />
              <span>Suara Ambience Fokus (Web Audio Synth):</span>
            </div>
            {activeSound !== 'none' && (
              <span className="text-[10px] text-zinc-400 font-mono animate-pulse">
                Audio Aktif
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'none', label: 'Hening' },
              { id: 'alpha', label: '432Hz Alpha' },
              { id: 'brown', label: 'Brown Noise' },
              { id: 'rain', label: 'Suara Hujan' }
            ].map((snd) => (
              <button
                key={snd.id}
                type="button"
                onClick={() => startSound(snd.id as SoundType)}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-medium border transition-all cursor-pointer ${
                  activeSound === snd.id
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-100 font-bold shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Session Stats Counter */}
        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>Sesi Selesai Hari Ini: <strong className="text-zinc-300 font-mono">{completedSessions} Sesi</strong></span>
          <span>Teknik Pomodoro 25/5 Pro</span>
        </div>
      </motion.div>
    </div>
  );
}
