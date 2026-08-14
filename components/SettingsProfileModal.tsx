'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  User,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Shield,
  Zap,
  Flame,
  Award,
  Layers,
  Info
} from 'lucide-react';
import { UserProgress } from '@/lib/types';

interface SettingsProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateProfile: (name: string, avatar: string) => void;
  onResetAll: (name?: string) => void;
  onImportProgress: (imported: UserProgress) => void;
}

const AVATAR_PRESETS = [
  {
    id: 'avatar-1',
    label: 'Scholar Neo',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-2',
    label: 'Researcher Alex',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-3',
    label: 'Architect Elena',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-4',
    label: 'Engineer Dev',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-5',
    label: 'Fellow Maya',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-6',
    label: 'Strategist Ken',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export function SettingsProfileModal({
  isOpen,
  onClose,
  progress,
  onUpdateProfile,
  onResetAll,
  onImportProgress
}: SettingsProfileModalProps) {
  const [studentName, setStudentName] = useState(progress.studentName || 'Pelajar Akademia');
  const [avatarUrl, setAvatarUrl] = useState(progress.avatar || AVATAR_PRESETS[0].url);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(studentName, avatarUrl);
    setSuccessMessage('Profil pelajar berhasil disimpan!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(progress, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `akademia_progress_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setSuccessMessage('Cadangan data berhasil diunduh (JSON).');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage('Gagal mengunduh cadangan data.');
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed === 'object') {
          onImportProgress(parsed);
          setStudentName(parsed.studentName || 'Pelajar Akademia');
          if (parsed.avatar) setAvatarUrl(parsed.avatar);
          setSuccessMessage('Data kemajuan berhasil dipulihkan!');
          setTimeout(() => setSuccessMessage(null), 3000);
        } else {
          setErrorMessage('Format berkas JSON tidak valid.');
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Gagal membaca berkas JSON.');
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  const handleExecuteFullReset = () => {
    onResetAll(studentName);
    setIsResetConfirmOpen(false);
    setSuccessMessage('Semua status dan progres pembelajaran berhasil direset ke kondisi awal (Siap Rilis).');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative text-zinc-200 my-auto max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        id="settings-profile-modal"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-zinc-100">Pengaturan Profil & Data</h2>
                <p className="text-xs text-zinc-400">Konfigurasi akun, backup data, dan reset status rilis</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Tutup Pengaturan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Feedback Alerts */}
          {successMessage && (
            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form: Student Profile */}
          <form onSubmit={handleSaveProfile} className="mt-5 space-y-5">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Nama Lengkap Siswa (Tercantum pada Sertifikat & Dasbor):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Masukkan nama Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-zinc-700 text-zinc-100 text-sm focus:outline-none focus:border-zinc-400 transition-colors placeholder:text-zinc-600 font-medium"
                  required
                />
                <User className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Nama ini akan dicetak otomatis pada sertifikat kelulusan terenkripsi.
              </p>
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Pilih Foto Profil / Avatar Akademik:
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_PRESETS.map((preset) => {
                  const isSelected = avatarUrl === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setAvatarUrl(preset.url)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer p-0.5 ${
                        isSelected ? 'border-zinc-100 scale-105 shadow-md' : 'border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Profile Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-all cursor-pointer shadow-sm active:scale-95"
                id="btn-save-profile-settings"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          </form>

          {/* Data Backup & Migration Section */}
          <div className="mt-6 pt-5 border-t border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Manajemen & Cadangan Data
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleExportData}
                className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left"
                id="btn-export-progress-json"
              >
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-zinc-200 block">Ekspor Data (JSON)</span>
                  <span className="text-[10px] text-zinc-500">Unduh cadangan progres & sertifikat</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left"
                id="btn-import-progress-json"
              >
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-zinc-200 block">Impor Data (JSON)</span>
                  <span className="text-[10px] text-zinc-500">Pulihkan dari file cadangan</span>
                </div>
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImport}
              accept=".json,application/json"
              className="hidden"
            />
          </div>

          {/* Danger Zone: Production Factory Reset */}
          <div className="mt-6 pt-5 border-t border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
              Reset Data Siap Rilis (Factory Reset)
            </h3>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Mereset seluruh status level (Level 1, 0 XP), menghapus riwayat kuis, kursus yang terselesaikan, sertifikat demo, dan mengembalikan aplikasi ke kondisi bersih untuk pengguna baru pertama kali.
            </p>

            {!isResetConfirmOpen ? (
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(true)}
                className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/80 text-red-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                id="btn-trigger-factory-reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Semua Status & Progress ke Awal</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-950/60 border border-red-700 rounded-2xl space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-red-200 font-bold block mb-1">
                      Konfirmasi Pembersihan & Reset Total
                    </strong>
                    <p className="text-red-300/90 leading-relaxed">
                      Tindakan ini akan menghapus seluruh data lokal dan mereset status XP menjadi 0, Level 1, dan mengosongkan riwayat kuis. Tindakan ini tidak dapat dibatalkan.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleExecuteFullReset}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all cursor-pointer active:scale-95"
                    id="btn-confirm-factory-reset"
                  >
                    Ya, Reset Semua Data Sekarang
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsResetConfirmOpen(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-zinc-500" />
            <span>Akademia Global v1.0.0 Production Release</span>
          </div>
          <span>Privasi Lokal & Zero Telemetry</span>
        </div>
      </motion.div>
    </div>
  );
}
