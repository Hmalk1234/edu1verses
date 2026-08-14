'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Sparkles, 
  Zap, 
  Sliders, 
  Code2, 
  Eye, 
  Copy, 
  Check, 
  Download, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Send, 
  Layers, 
  ArrowRight,
  ExternalLink,
  Cpu,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const INITIAL_WEB_CODE = `<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus Analytics & AI Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased p-4 sm:p-8">
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl backdrop-blur-xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-950 flex items-center justify-center font-extrabold text-lg">
          N
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-zinc-100">Nexus Intelligence</h1>
          <p class="text-xs text-zinc-400 font-mono">Distributed Computational Platform</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="px-3 py-1 bg-emerald-950/80 border border-emerald-800/60 rounded-full text-xs font-mono text-emerald-300 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Cluster 100% Operational
        </div>
        <button id="theme-btn" class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium rounded-xl border border-zinc-700 transition-all cursor-pointer">
          Toggle Theme
        </button>
      </div>
    </header>

    <!-- Metrics Row -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-2">
        <span class="text-xs font-mono text-zinc-400 uppercase">Throughput</span>
        <div class="text-3xl font-extrabold font-mono text-zinc-100" id="metric-throughput">184,290</div>
        <p class="text-xs text-emerald-400 font-medium">+14.2% dari target mingguan</p>
      </div>
      <div class="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-2">
        <span class="text-xs font-mono text-zinc-400 uppercase">Avg Response Time</span>
        <div class="text-3xl font-extrabold font-mono text-zinc-100">3.8 ms</div>
        <p class="text-xs text-zinc-400">Zero packet degradation</p>
      </div>
      <div class="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-2">
        <span class="text-xs font-mono text-zinc-400 uppercase">Active Nodes</span>
        <div class="text-3xl font-extrabold font-mono text-zinc-100" id="metric-nodes">64 / 64</div>
        <p class="text-xs text-zinc-400">100% node health status</p>
      </div>
    </div>

    <!-- Interactive Workspace Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-zinc-100">Real-Time Ingestion Flow</h2>
          <button id="add-record-btn" class="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl transition-all cursor-pointer">
            + Tambah Event Data
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-zinc-300 font-mono">
            <thead class="text-zinc-500 border-b border-zinc-800">
              <tr>
                <th class="py-2.5">EVENT ID</th>
                <th class="py-2.5">SERVICE</th>
                <th class="py-2.5">PAYLOAD</th>
                <th class="py-2.5">STATUS</th>
              </tr>
            </thead>
            <tbody id="events-table" class="divide-y divide-zinc-800/60">
              <tr>
                <td class="py-2.5 text-zinc-400">#EVT-8921</td>
                <td class="py-2.5 font-bold text-zinc-200">auth-broker</td>
                <td class="py-2.5">JWT Signature Validated</td>
                <td class="py-2.5"><span class="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded">SUCCESS</span></td>
              </tr>
              <tr>
                <td class="py-2.5 text-zinc-400">#EVT-8922</td>
                <td class="py-2.5 font-bold text-zinc-200">inference-engine</td>
                <td class="py-2.5">Embedding Vector Generated</td>
                <td class="py-2.5"><span class="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded">SUCCESS</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="lg:col-span-4 p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-4">
        <h2 class="text-base font-bold text-zinc-100">Simulasi Interaktif</h2>
        <div class="space-y-3">
          <label class="text-xs text-zinc-400 font-medium block">Intensitas Beban Kerja</label>
          <input type="range" id="load-slider" min="10" max="250" value="100" class="w-full accent-zinc-100 cursor-pointer">
          <div class="flex justify-between text-xs font-mono text-zinc-500">
            <span>10k req/s</span>
            <span id="load-label" class="text-zinc-200 font-bold">100k req/s</span>
            <span>250k req/s</span>
          </div>
        </div>

        <button id="stress-test-btn" class="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold rounded-xl transition-all cursor-pointer">
          Jalankan Benchmark Kilat
        </button>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();

      const themeBtn = document.getElementById('theme-btn');
      themeBtn?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
      });

      const slider = document.getElementById('load-slider');
      const loadLabel = document.getElementById('load-label');
      const throughput = document.getElementById('metric-throughput');
      
      slider?.addEventListener('input', (e) => {
        const val = e.target.value;
        if (loadLabel) loadLabel.innerText = val + 'k req/s';
        if (throughput) throughput.innerText = (Number(val) * 1840).toLocaleString();
      });

      const addBtn = document.getElementById('add-record-btn');
      const table = document.getElementById('events-table');
      addBtn?.addEventListener('click', () => {
        const row = document.createElement('tr');
        const randomId = Math.floor(1000 + Math.random() * 9000);
        row.innerHTML = \`
          <td class="py-2.5 text-zinc-400">#EVT-\${randomId}</td>
          <td class="py-2.5 font-bold text-zinc-200">realtime-sync</td>
          <td class="py-2.5">Pushed to D3 Knowledge Pipeline</td>
          <td class="py-2.5"><span class="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded">SUCCESS</span></td>
        \`;
        table?.prepend(row);
      });

      const stressBtn = document.getElementById('stress-test-btn');
      stressBtn?.addEventListener('click', () => {
        stressBtn.innerText = 'Testing...';
        setTimeout(() => {
          stressBtn.innerText = 'Selesai: 0 Packet Loss';
          setTimeout(() => {
            stressBtn.innerText = 'Jalankan Benchmark Kilat';
          }, 2000);
        }, 1000);
      });
    });
  </script>
</body>
</html>`;

const PROMPT_PRESETS = [
  {
    label: "SaaS Analytics Dashboard",
    prompt: "Aplikasi SaaS Dashboard analitik modern dengan live data filter, grafik interaktif, dan tabel log server.",
    mode: "complex" as const
  },
  {
    label: "Kanban Task Manager",
    prompt: "Aplikasi Kanban Board dengan fitur tambah task, drag/move kolom (To Do, In Progress, Done), filter label, dan status prioritas.",
    mode: "medium" as const
  },
  {
    label: "E-Commerce Checkout & Cart",
    prompt: "Storefront produk interaktif lengkap dengan katalog filter kategori, keranjang belanja dinamis, kalkulator diskon voucher, dan checkout modal.",
    mode: "complex" as const
  },
  {
    label: "Quick Converter / Tool",
    prompt: "Kalkulator konversi unit ilmiah dan kalkulator formula matematika cepat dengan feedback visual responsif.",
    mode: "quick" as const
  }
];

export function AIWebBuilder() {
  const [promptInput, setPromptInput] = useState('');
  const [complexityMode, setComplexityMode] = useState<'quick' | 'medium' | 'complex'>('complex');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentCode, setCurrentCode] = useState(INITIAL_WEB_CODE);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [refineChatInput, setRefineChatInput] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleGenerate = async (customPrompt?: string, modeToUse?: 'quick' | 'medium' | 'complex') => {
    const p = customPrompt || promptInput;
    if (!p.trim()) return;
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/web-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: p,
          mode: modeToUse || complexityMode,
          currentCode: customPrompt ? currentCode : undefined
        })
      });

      if (!res.ok) throw new Error('Gagal membuat web');
      const data = await res.json();
      if (data && data.code) {
        setCurrentCode(data.code);
        setActiveTab('preview');
      } else {
        setErrorMessage('Mohon maaf, pembuatan kode web belum berhasil diselesaikan. Silakan coba kembali.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Mohon maaf, terjadi kendala saat memproses pembuatan website. Silakan coba beberapa saat lagi.');
    } finally {
      setIsGenerating(false);
      setRefineChatInput('');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([currentCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-${Date.now()}.html`;
    a.click();
  };

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'mobile': return 'max-w-[380px]';
      case 'tablet': return 'max-w-[768px]';
      case 'desktop': default: return 'w-full';
    }
  };

  return (
    <div className="space-y-8" id="ai-web-builder-studio">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/70 text-zinc-300 text-xs font-mono">
              <Globe className="w-3.5 h-3.5 text-zinc-300" />
              <span>Full-Stack Web Generator Sandbox</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              AI Web Builder • Cepat, Medium & Complex
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Ketik deskripsi atau ide aplikasi web Anda, pilih tingkat kedalaman (Cepat, Medium, atau Complex & Menyeluruh), lalu saksikan aplikasi web hidup langsung di preview sandbox.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-xl border border-zinc-700 flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>Salin Kode HTML</span>
            </button>
            <button
              onClick={handleDownloadHTML}
              className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Unduh index.html</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Prompt & Mode Selector Panel */}
      <div className="p-5 sm:p-6 bg-zinc-900/70 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-bold text-zinc-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-300" />
            <span>Pilih Mode Kedalaman Pembuatan Web</span>
          </span>

          {/* Complexity Mode Pills */}
          <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setComplexityMode('quick')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                complexityMode === 'quick' ? 'bg-zinc-800 text-zinc-100 font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Cepat (Quick)</span>
            </button>
            <button
              onClick={() => setComplexityMode('medium')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                complexityMode === 'medium' ? 'bg-zinc-800 text-zinc-100 font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Sliders className="w-3 h-3 text-sky-400" />
              <span>Medium</span>
            </button>
            <button
              onClick={() => setComplexityMode('complex')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                complexityMode === 'complex' ? 'bg-zinc-800 text-zinc-100 font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Flame className="w-3 h-3 text-purple-400" />
              <span>Complex & Menyeluruh</span>
            </button>
          </div>
        </div>

        {/* Prompt Input Box */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Ketik ide web Anda (contoh: Toko Kopi Minimalis dengan Menu Customizer, Cart Drawer, dan Checkout)..."
            className="flex-1 px-4 py-3 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !promptInput.trim()}
            className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md active:scale-95 shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Membangun Web...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Buat Website Sekarang</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-zinc-500 font-mono">Inspirasi Siap Pakai:</span>
          {PROMPT_PRESETS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(item.prompt);
                setComplexityMode(item.mode);
              }}
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-[11px] text-zinc-300 transition-all cursor-pointer truncate max-w-xs"
            >
              {item.label}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Workspace Sandbox Preview & Code Editor */}
      <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-4">
        {/* Workspace Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'preview' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'code' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Source HTML Code</span>
            </button>
          </div>

          {/* Viewport Width Selector (for preview tab) */}
          {activeTab === 'preview' && (
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewportMode === 'desktop' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewportMode === 'tablet' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  viewportMode === 'mobile' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Workspace Display Area */}
        {activeTab === 'preview' ? (
          <div className="flex justify-center bg-zinc-950 rounded-2xl p-2 sm:p-4 min-h-[550px] border border-zinc-800/80 overflow-hidden">
            <div className={`transition-all duration-300 ${getViewportWidth()} h-[550px] rounded-xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950`}>
              <iframe
                ref={iframeRef}
                srcDoc={currentCode}
                title="AI Web Generated Preview"
                className="w-full h-full border-none bg-zinc-950"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Edit kode langsung di bawah untuk mengubah preview</span>
              <span>{currentCode.length} Karakter</span>
            </div>
            <textarea
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              rows={22}
              className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl font-mono text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>
        )}

        {/* Iterative AI Refinement Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 p-3 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
          <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>AI Refine:</span>
          </span>
          <input
            type="text"
            value={refineChatInput}
            onChange={(e) => setRefineChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate(refineChatInput)}
            placeholder="Minta perubahan (contoh: 'Tambahkan dark/light toggle', 'Ganti layout jadi 3 kolom', 'Tambahkan fitur search')..."
            className="flex-1 px-3.5 py-1.5 bg-zinc-900 border border-zinc-700/70 rounded-xl text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
          />
          <button
            onClick={() => handleGenerate(refineChatInput)}
            disabled={isGenerating || !refineChatInput.trim()}
            className="px-4 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Send className="w-3 h-3" />
            <span>Terapkan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
