'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquareCode, BrainCircuit, X } from 'lucide-react';

interface RobotMascotProps {
  mood?: 'idle' | 'happy' | 'thinking' | 'explaining' | 'celebrating';
  tipMessage?: string;
  onOpenTutor?: () => void;
}

export function RobotMascot({ mood = 'idle', tipMessage, onOpenTutor }: RobotMascotProps) {
  const [isOpenTip, setIsOpenTip] = useState(true);

  const defaultTip = tipMessage || "Halo! Saya RoboAkademia. Butuh penjelasan konsep rumit, bantuan kode, atau bedah rumus? Klik saya kapan saja!";

  return (
    <div className="relative inline-flex items-center gap-3 select-none" id="robot-mascot-container">
      {/* Interactive Speech Bubble */}
      {isOpenTip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative hidden sm:flex items-start gap-2 bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-xs px-3.5 py-2.5 rounded-2xl shadow-xl max-w-[280px] backdrop-blur-md"
          id="robot-speech-bubble"
        >
          <div className="flex-1">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-100 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>RoboAkademia AI</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">{defaultTip}</p>
            {onOpenTutor && (
              <button
                onClick={onOpenTutor}
                className="mt-2 text-[11px] font-medium text-zinc-200 hover:text-white flex items-center gap-1 underline underline-offset-2 cursor-pointer transition-colors"
                id="btn-ask-robot-tip"
              >
                <MessageSquareCode className="w-3 h-3" />
                <span>Buka Konsultasi AI Tutor</span>
              </button>
            )}
          </div>
          <button
            onClick={() => setIsOpenTip(false)}
            className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup pesan robot"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Floating Animated Robot Mascot */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: mood === 'celebrating' ? [-3, 3, -3] : [0, 1, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenTutor}
        className="relative cursor-pointer group"
        title="Klik untuk membuka RoboAkademia AI Tutor"
        id="robot-avatar-button"
      >
        {/* Subtle Ambient Aura */}
        <div className="absolute -inset-1.5 bg-zinc-700/30 rounded-2xl blur-md group-hover:blur-lg opacity-60 group-hover:opacity-100 transition-all" />

        {/* Robot Body Frame */}
        <div className="relative w-14 h-14 bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-1.5 flex flex-col items-center justify-between shadow-xl backdrop-blur-xl group-hover:border-zinc-500 transition-colors">
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                backgroundColor: mood === 'thinking' ? ['#71717a', '#d4d4d8', '#71717a'] : ['#a1a1aa', '#ffffff', '#a1a1aa']
              }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-2 h-2 rounded-full shadow-sm"
            />
            <div className="w-0.5 h-1.5 bg-zinc-600" />
          </div>

          {/* Screen Visor */}
          <div className="w-full h-7 bg-black rounded-lg flex items-center justify-center gap-2 px-1 border border-zinc-800">
            {/* Left Eye */}
            <motion.div
              animate={{
                scaleY: mood === 'thinking' ? [1, 0.2, 1] : [1, 1, 0.1, 1],
                height: mood === 'happy' ? '4px' : '8px'
              }}
              transition={{ repeat: Infinity, duration: 2.8, times: [0, 0.45, 0.5, 1] }}
              className="w-2.5 rounded-full bg-zinc-200 shadow-sm"
            />
            {/* Right Eye */}
            <motion.div
              animate={{
                scaleY: mood === 'thinking' ? [1, 0.2, 1] : [1, 1, 0.1, 1],
                height: mood === 'happy' ? '4px' : '8px'
              }}
              transition={{ repeat: Infinity, duration: 2.8, times: [0, 0.45, 0.5, 1] }}
              className="w-2.5 rounded-full bg-zinc-200 shadow-sm"
            />
          </div>

          {/* Core Indicator / Chest */}
          <div className="w-full flex items-center justify-between px-1 text-[9px] text-zinc-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-ping" />
            <BrainCircuit className="w-2.5 h-2.5 text-zinc-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
          </div>
        </div>

        {/* Live Badge */}
        <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-zinc-200 border-2 border-zinc-900 text-[7px] text-zinc-950 items-center justify-center font-bold">
            AI
          </span>
        </span>
      </motion.div>
    </div>
  );
}
