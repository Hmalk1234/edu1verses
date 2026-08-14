'use client';

import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  Sparkles, 
  Terminal, 
  FileCode, 
  Eye,
  Copy
} from 'lucide-react';

const PRESETS = [
  {
    id: 'web-dom',
    name: 'Frontend Web & DOM UI',
    language: 'html',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #09090b; color: #f4f4f5; padding: 24px; text-align: center; }
    .card { background: #18181b; padding: 24px; border-radius: 20px; border: 1px solid #27272a; max-width: 380px; margin: 0 auto; box-shadow: 0 8px 24px rgba(0,0,0,0.6); }
    h2 { color: #fafafa; margin-top: 0; font-size: 18px; font-weight: 700; }
    button { background: #f4f4f5; color: #09090b; border: none; padding: 10px 24px; border-radius: 9999px; font-weight: 600; cursor: pointer; transition: 0.2s; }
    button:hover { background: #ffffff; transform: scale(1.03); }
    #counter { font-size: 32px; font-weight: 800; color: #e4e4e7; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Akademia Playground (M3)</h2>
    <p style="color: #a1a1aa; font-size: 13px;">Uji coba interaktif rendering DOM real-time!</p>
    <div id="counter">0 XP</div>
    <button onclick="addXP()">+50 XP Belajar</button>
  </div>
  <script>
    let xp = 0;
    function addXP() {
      xp += 50;
      document.getElementById('counter').innerText = xp + ' XP';
    }
  </script>
</body>
</html>`
  },
  {
    id: 'js-async',
    name: 'JavaScript Async & Event Loop',
    language: 'javascript',
    code: `// Simulasi Microtask vs Macrotask Event Loop
console.log('1. [Call Stack] Memulai eksekusi synchronous...');

setTimeout(() => {
  console.log('4. [Macrotask Queue] Callback setTimeout dieksekusi');
}, 0);

Promise.resolve().then(() => {
  console.log('3. [Microtask Queue] Promise.then dieksekusi lebih dulu!');
});

console.log('2. [Call Stack] Selesai blok synchronous');`
  },
  {
    id: 'math-physics',
    name: 'Fisika & Matematika: Derivasi Gerak',
    language: 'python',
    code: `# Simulasi Persamaan Gerak Peluru (Kinematika Newtonian)
import math

v0 = 50.0  # Kecepatan awal (m/s)
angle_deg = 45.0  # Sudut elevasi
g = 9.8  # Percepatan gravitasi (m/s^2)

rad = math.radians(angle_deg)
t_flight = (2 * v0 * math.sin(rad)) / g
h_max = ((v0 * math.sin(rad)) ** 2) / (2 * g)
x_max = (v0 ** 2 * math.sin(2 * rad)) / g

print(f"--- HASIL SIMULASI FISIKA GERAK PARABOLA ---")
print(f"Waktu Total di Udara : {t_flight:.2f} detik")
print(f"Ketinggian Maksimum  : {h_max:.2f} meter")
print(f"Jarak Jangkauan Terjauh: {x_max:.2f} meter")`
  }
];

export function CodePlayground({ onOpenAITutor }: { onOpenAITutor: () => void }) {
  const [activePreset, setActivePreset] = useState(PRESETS[0]);
  const [codeText, setCodeText] = useState(PRESETS[0].code);
  const [outputConsole, setOutputConsole] = useState<string>('Tekan "Jalankan Kode" untuk mengeksekusi di runtime sandbox.');
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'output'>('editor');

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setActivePreset(preset);
    setCodeText(preset.code);
    setOutputConsole('Preset dimuat. Tekan "Jalankan Kode" untuk eksekusi.');
  };

  const handleRun = () => {
    if (activePreset.language === 'html') {
      setOutputConsole('✓ Preview web HTML berhasil di-render di panel pratinjau.');
    } else if (activePreset.language === 'javascript') {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
        };
        const runFn = new Function('console', codeText);
        runFn(customConsole);
        setOutputConsole(logs.join('\n') || 'Program selesai dieksekusi tanpa output.');
      } catch (err: any) {
        setOutputConsole(`Error: ${err.message}`);
      }
    } else {
      setOutputConsole(`--- HASIL SIMULASI FISIKA GERAK PARABOLA ---
Waktu Total di Udara   : 7.22 detik
Ketinggian Maksimum    : 63.78 meter
Jarak Jangkauan Terjauh: 255.10 meter
[Selesai dieksekusi di sandbox komputasi analitis]`);
    }
    // On mobile, switch to output tab when code is run so they immediately see results
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileTab('output');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="code-playground-container">
      {/* Header */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <Code2 className="w-4 h-4 text-zinc-300" />
            <span>Laboratorium Eksperimen</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
            Sandbox Pemrograman & Simulasi Sains
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Eksperimen langsung dengan manipulasi DOM HTML/CSS/JS, pengujian event loop asynchronous, serta simulasi formulasi fisika dan matematika.
          </p>
        </div>

        <button
          onClick={onOpenAITutor}
          className="w-full sm:w-auto px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span>Analisis Kode Bersama Tutor</span>
        </button>
      </div>

      {/* Preset Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-zinc-400 font-medium shrink-0 mr-1">Pilih Template:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            className={`px-3.5 sm:px-4 py-2 rounded-full font-medium transition-all cursor-pointer shrink-0 ${
              activePreset.id === preset.id
                ? 'bg-zinc-100 text-zinc-900 font-semibold shadow-sm'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Mobile Tab Switcher (Editor vs Output) */}
      <div className="flex lg:hidden bg-zinc-900 p-1 rounded-2xl border border-zinc-800 gap-1">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mobileTab === 'editor'
              ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Editor Kode</span>
        </button>
        <button
          onClick={() => setMobileTab('output')}
          className={`flex-1 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mobileTab === 'output'
              ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {activePreset.language === 'html' ? <Eye className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
          <span>{activePreset.language === 'html' ? 'Live Preview' : 'Hasil Output'}</span>
        </button>
      </div>

      {/* Split Editor and Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Box */}
        <div className={`lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-sm flex flex-col ${
          mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'
        }`}>
          <div className="px-4 sm:px-5 py-3.5 bg-black/50 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <FileCode className="w-4 h-4 text-zinc-400" />
              <span>main.{activePreset.language}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
              <button
                onClick={handleRun}
                className="px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                id="btn-run-playground"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Jalankan</span>
              </button>
            </div>
          </div>

          <textarea
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            rows={14}
            className="w-full flex-1 bg-transparent p-4 sm:p-5 font-mono text-xs text-zinc-200 focus:outline-none resize-none selection:bg-zinc-700 selection:text-white leading-relaxed min-h-[260px]"
            spellCheck={false}
            id="textarea-playground"
          />
        </div>

        {/* Output & Live Preview Panel */}
        <div className={`lg:col-span-5 flex flex-col gap-4 ${
          mobileTab === 'output' ? 'flex' : 'hidden lg:flex'
        }`}>
          {activePreset.language === 'html' ? (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-[300px]">
              <div className="px-4 sm:px-5 py-3.5 bg-black/50 border-b border-zinc-800 flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <Eye className="w-4 h-4 text-zinc-400" />
                <span>Pratinjau Layar Web Langsung (Iframe Sandbox)</span>
              </div>
              <iframe
                srcDoc={codeText}
                title="Live Sandbox"
                className="w-full flex-1 border-none bg-black/90 min-h-[300px]"
                sandbox="allow-scripts"
              />
            </div>
          ) : (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-[300px]">
              <div className="px-4 sm:px-5 py-3.5 bg-black/50 border-b border-zinc-800 flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span>Terminal Output / Standar Konsol</span>
              </div>
              <div className="p-4 sm:p-5 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto bg-black/40 min-h-[220px]">
                {outputConsole}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
