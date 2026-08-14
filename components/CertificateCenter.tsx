'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  Search, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  Copy,
  GraduationCap
} from 'lucide-react';
import { Certificate } from '@/lib/types';
import { QRCodeSVG } from './QRCodeSVG';

interface CertificateCenterProps {
  certificates: Certificate[];
  studentName: string;
  onUpdateStudentName: (name: string) => void;
}

export function CertificateCenter({ certificates, studentName, onUpdateStudentName }: CertificateCenterProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate>(certificates[0] || null);
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    found: boolean;
    cert?: Certificate;
    message?: string;
  } | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationInput.trim().toUpperCase();
    if (!code) return;

    const matched = certificates.find(
      (c) => c.serialNumber.toUpperCase() === code || c.id.toUpperCase() === code
    );

    if (matched) {
      setVerificationResult({
        found: true,
        cert: matched,
        message: 'Kredensial valid dan terdaftar resmi dalam basis data Akademia Global.'
      });
    } else {
      setVerificationResult({
        found: false,
        message: `Nomor kredensial "${code}" tidak ditemukan atau belum diterbitkan.`
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8" id="certificate-center-container">
      {/* Header Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <Award className="w-4 h-4 text-zinc-300" />
            <span>Kredensial & Sertifikasi Digital</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
            Sertifikat Kelulusan & Verifikasi
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Sertifikat digital diterbitkan setelah seluruh modul dan evaluasi kuis selesai. Setiap dokumen memiliki nomor seri unik dan kode verifikasi publik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-zinc-400 block">Nama pada Sertifikat:</span>
            {isEditingName ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-3 py-1 bg-black/60 border border-zinc-700 text-xs text-zinc-100 rounded-lg focus:outline-none"
                />
                <button
                  onClick={() => {
                    onUpdateStudentName(tempName);
                    setIsEditingName(false);
                  }}
                  className="px-3 py-1 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-bold text-zinc-100">{studentName}</span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
                >
                  Ubah
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Certificate Visualizer & Verification Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Certificate Selector & Verifier Tool */}
        <div className="lg:col-span-4 space-y-6">
          {/* Certificate List Selector */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-3 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Sertifikat yang Diterbitkan ({certificates.length})
            </h3>

            {certificates.length === 0 ? (
              <p className="text-xs text-zinc-500 italic p-4 text-center">
                Belum ada sertifikat. Selesaikan seluruh modul pada salah satu kurikulum untuk menerbitkan sertifikat pertamamu!
              </p>
            ) : (
              certificates.map((cert) => {
                const isSelected = selectedCert?.id === cert.id;

                return (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-zinc-800 border-zinc-600 shadow-sm'
                        : 'bg-black/40 border-zinc-800/80 hover:bg-zinc-800/60'
                    }`}
                    id={`cert-selector-${cert.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-100 text-xs truncate max-w-[170px]">{cert.courseTitle}</h4>
                        <span className="text-[10px] font-mono text-zinc-400">{cert.serialNumber}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {cert.grade}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Public Verification Engine Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>Verifikasi Keaslian Kredensial Publik</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Masukkan Nomor Seri Sertifikat (misal: <code>AKAD-2026-WEB-8849</code>) untuk memeriksa validitas di database akademik.
            </p>

            <form onSubmit={handleVerify} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={verificationInput}
                  onChange={(e) => setVerificationInput(e.target.value)}
                  placeholder="Contoh: AKAD-2026-WEB-8849"
                  className="flex-1 px-3.5 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:border-zinc-600 focus:outline-none"
                  id="input-verify-cert"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 active:scale-95"
                  id="btn-submit-verify-cert"
                >
                  Cek
                </button>
              </div>
            </form>

            {/* Verification Result Dialog */}
            <AnimatePresence>
              {verificationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    verificationResult.found
                      ? 'bg-zinc-800/90 border-zinc-700 text-zinc-200'
                      : 'bg-black/60 border-zinc-800 text-zinc-400'
                  }`}
                  id="verification-result-box"
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {verificationResult.found ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-zinc-200" />
                        <span className="text-zinc-100">STATUS: TERVERIFIKASI ASLI (VALID)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-300">STATUS: TIDAK VALID / TIDAK DITEMUKAN</span>
                      </>
                    )}
                  </div>
                  <p className="text-zinc-400 leading-relaxed">{verificationResult.message}</p>

                  {verificationResult.found && verificationResult.cert && (
                    <div className="mt-2 pt-2 border-t border-zinc-700 text-[11px] text-zinc-300 space-y-1">
                      <div>Penerima: <strong>{verificationResult.cert.studentName}</strong></div>
                      <div>Program: <strong>{verificationResult.cert.courseTitle}</strong></div>
                      <div>Predikat: <strong>{verificationResult.cert.grade} ({verificationResult.cert.scorePercent}%)</strong></div>
                      <div>Tanggal Terbit: <strong>{verificationResult.cert.issueDate}</strong></div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: High Resolution Visual Certificate Preview */}
        <div className="lg:col-span-8 space-y-4">
          {selectedCert ? (
            <div>
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3">
                <span className="text-xs text-zinc-400">
                  Pratinjau Kredensial Digital Resmi
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(selectedCert.serialNumber)}
                    className="flex-1 sm:flex-none px-3.5 py-2 sm:py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[40px]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode === selectedCert.serialNumber ? 'Kode Tersalin!' : 'Salin ID Seri'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-4 py-2 sm:py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 min-h-[40px]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak / PDF</span>
                  </button>
                </div>
              </div>

              {/* The Certificate Canvas */}
              <div
                className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden print:border-black print:text-black print:bg-white"
                id="printable-certificate-canvas"
              >
                {/* Inner Border Frame */}
                <div className="border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 relative space-y-5 sm:space-y-6 text-center bg-black/40">
                  {/* Top Emblem & Header */}
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-800 border border-zinc-700 p-0.5 shadow-sm flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-200" />
                    </div>

                    <h2 className="text-lg sm:text-2xl font-serif tracking-widest text-zinc-100 font-bold uppercase mt-2">
                      Akademia Global International
                    </h2>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                      Board of Global Academic Accreditation & Digital Credentials
                    </p>
                  </div>

                  {/* Statement */}
                  <div className="py-2">
                    <span className="text-xs uppercase tracking-widest text-zinc-400 font-serif">
                      Dengan ini menyatakan bahwa:
                    </span>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-zinc-100 tracking-wide mt-2 border-b border-zinc-700 pb-3 max-w-xl mx-auto">
                      {studentName}
                    </h3>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-2 max-w-xl mx-auto">
                    <p className="text-xs text-zinc-300 leading-relaxed font-serif">
                      Telah berhasil menyelesaikan kurikulum akademik penuh dan lulus seluruh ujian kualifikasi mandiri dengan predikat kehormatan pada program:
                    </p>
                    <h4 className="text-base sm:text-xl font-bold text-zinc-100">
                      {selectedCert.courseTitle}
                    </h4>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700">
                      Predikat: {selectedCert.grade} • Skor: {selectedCert.scorePercent}%
                    </span>
                  </div>

                  {/* Acquired Competencies */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono block mb-2">
                      Kompetensi & Keahlian yang Dikuasai:
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto">
                      {selectedCert.skillsAcquired.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px] text-zinc-300"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer: Signatures & QR Code */}
                  <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                    {/* Left: Signatory */}
                    <div className="text-center sm:text-left space-y-1">
                      <div className="font-serif italic text-zinc-200 text-sm">
                        Prof. Dr. Aris Santoso, Ph.D.
                      </div>
                      <div className="w-36 h-0.5 bg-zinc-700 mx-auto sm:mx-0" />
                      <span className="text-[10px] text-zinc-400 block font-mono">
                        Dean of International Academic Affairs
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        Diterbitkan: {selectedCert.issueDate}
                      </span>
                    </div>

                    {/* Center / Right: QR Code & Serial Key */}
                    <div className="flex items-center gap-3 sm:gap-4 bg-zinc-950 p-3 rounded-2xl border border-zinc-800 w-full sm:w-auto justify-center">
                      <QRCodeSVG
                        value={`https://akademia-global.edu/verify/${selectedCert.serialNumber}`}
                        size={76}
                        fgColor="#e4e4e7"
                        bgColor="#09090b"
                      />
                      <div className="text-xs space-y-1 font-mono">
                        <span className="text-[9px] text-zinc-400 block uppercase">Serial Verification</span>
                        <strong className="text-zinc-200 block text-[11px] sm:text-xs">{selectedCert.serialNumber}</strong>
                        <span className="text-[9px] text-zinc-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-zinc-300 shrink-0" />
                          <span>Signed Official</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center text-zinc-400 bg-zinc-900/90 border border-zinc-800 rounded-3xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 mx-auto flex items-center justify-center text-zinc-300">
                <Award className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-bold text-zinc-100">Belum Ada Sertifikat yang Diterbitkan</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Selesaikan semua modul dan lulus seluruh evaluasi kuis pada salah satu kurikulum (misal: <em>Fullstack Web Development</em>, <em>AI Prompt Engineering</em>, atau <em>Data Science</em>) untuk menerbitkan sertifikat digital resmi atas nama <strong>{studentName}</strong>.
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Sertifikat Terenkripsi & Dapat Diverifikasi Publik</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
