'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  Map, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  Layers, 
  Target, 
  ShieldAlert, 
  Terminal, 
  ArrowRight,
  RefreshCw,
  Cpu,
  Bookmark,
  Share2,
  FolderGit2
} from 'lucide-react';

interface UserStory {
  id: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: string[];
}

interface PRDTask {
  id: string;
  title: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'QA';
  priority: 'P0' | 'P1' | 'P2';
  estimatedHours: number;
  status: 'todo' | 'in-progress' | 'done';
}

interface RoadmapPhase {
  phase: string;
  duration: string;
  milestones: string[];
  deliverables: string;
}

interface ImplementationPrompt {
  title: string;
  targetAI: string;
  prompt: string;
}

interface PRDData {
  title: string;
  vision: string;
  targetAudience: string[];
  problemStatement: string;
  solutionOverview: string;
  scope: {
    inScope: string[];
    outOfScope: string[];
  };
  userStories: UserStory[];
  technicalArchitecture: {
    frontend: string;
    backend: string;
    database: string;
    securityAndCompliance: string;
  };
  tasks: PRDTask[];
  roadmap: RoadmapPhase[];
  implementationPrompts: ImplementationPrompt[];
}

const INITIAL_PRD: PRDData = {
  title: "Akademia Intelligence & Adaptive Mastery Engine",
  vision: "Platform edukasi adaptif generasi baru yang memadukan grafik pengetahuan ontologis dengan asisten kurikulum berbasis penalaran logis.",
  targetAudience: [
    "Mahasiswa Teknik & Ilmu Komputer (MIT, Stanford, ITB, UI)",
    "Peneliti & Akademisi Interdisipliner",
    "Self-taught Software Architects & Data Engineers"
  ],
  problemStatement: "Materi pembelajaran teknis tingkat lanjut seringkali terfragmentasi tanpa adanya pemetaan relasi konsep yang jelas, mengakibatkan kurva belajar yang curam dan hilangnya pemahaman fondasi aksiomatik.",
  solutionOverview: "Membangun sistem kurikulum terstruktur dengan graf pengetahuan interaktif D3.js, verifikasi kuis otomatis berbobot XP, simulasi sandbox terintegrasi, dan arsitektur dokumen siap produksi.",
  scope: {
    inScope: [
      "Visualisasi Graf Relasi Pengetahuan (D3 Force-Directed)",
      "Engine Evaluasi Kuis & Jalur Prasyarat Otomatis",
      "Sistem Sertifikasi Kriptografis Digital",
      "Task Planner & Sprint Execution Kanban"
    ],
    outOfScope: [
      "Integrasi Gateway Pembayaran Finansial Langsung",
      "Penyimpanan Video Streaming Terdistribusi Kustom (menggunakan link terindeks)"
    ]
  },
  userStories: [
    {
      id: "US-01",
      asA: "Mahasiswa Informatika Tingkat Lanjut",
      iWant: "Melihat rute prasyarat tersingkat menuju materi AI & Algoritma",
      soThat: "Saya dapat menghemat waktu belajar tanpa melewatkan fondasi logika matematika penting",
      acceptanceCriteria: [
        "Given pengguna memilih node awal dan target, When algoritma BFS dieksekusi, Then jalur node terpendek menyala dengan highlight neon.",
        "Given pengguna mengklik node pada grafik, When panel inspeksi terbuka, Then tampil prasyarat dan korelasi lintas disiplin."
      ]
    },
    {
      id: "US-02",
      asA: "Calon Penerima Beasiswa Global",
      iWant: "Menganalisis profil kualifikasi terhadap universitas top dunia",
      soThat: "Saya mendapatkan rekomendasi strategi admisi dan beasiswa yang relevan dengan target riset",
      acceptanceCriteria: [
        "Given pengguna memilih target universitas (misal: Oxford / MIT), When klik evaluasi kualifikasi, Then muncul roadmap persiapan dokumen dan tes."
      ]
    }
  ],
  technicalArchitecture: {
    frontend: "Next.js 15+ (App Router), React 19, Tailwind CSS v4, Motion (Framer Motion), D3.js v7",
    backend: "Next.js Server Actions & API Routes, Google GenAI SDK (@google/genai)",
    database: "Client-side Durable LocalStorage State dengan Skema Terstruktur",
    securityAndCompliance: "API Key Terisolasi di Sisi Server (Zero Client Leakage), Sanitasi Input & Evaluasi Eksekusi Sandboxed"
  },
  tasks: [
    {
      id: "TASK-1",
      title: "Desain Skema Ontologi Graf & Node Prasyarat",
      description: "Definisikan struktur data kursus, relasi bobot graf, dan format serialisasi kurikulum.",
      category: "Backend",
      priority: "P0",
      estimatedHours: 6,
      status: "done"
    },
    {
      id: "TASK-2",
      title: "Implementasi Canvas Interaktif D3.js dengan Force Simulation",
      description: "Bangun komponen graf interaktif dengan zoom, pan, drag node, dan rendering tautan dinamis.",
      category: "Frontend",
      priority: "P0",
      estimatedHours: 12,
      status: "done"
    },
    {
      id: "TASK-3",
      title: "Engine Pencari Rute Terpendek (BFS Path Finder)",
      description: "Implementasikan traversal graf untuk menghitung rute tercepat antar topik keilmuan.",
      category: "Frontend",
      priority: "P1",
      estimatedHours: 5,
      status: "done"
    },
    {
      id: "TASK-4",
      title: "Integrasi Generator PRD & Prompt Engineer Otomatis",
      description: "Hubungkan model Gemini 3.7 untuk menyusun kebutuhan produk, task planner, dan prompt implementasi siap pakai.",
      category: "Backend",
      priority: "P0",
      estimatedHours: 8,
      status: "in-progress"
    },
    {
      id: "TASK-5",
      title: "Studio Showcase Design Tokens & Komponen UI (Design SF Style)",
      description: "Buat katalog sistem desain modern dengan inspektur token, sandbox interaktif, dan snippet React.",
      category: "Design",
      priority: "P1",
      estimatedHours: 10,
      status: "todo"
    },
    {
      id: "TASK-6",
      title: "AI Presentation Canvas & Web Builder Sandbox",
      description: "Bangun multi-slide PPT generator dan Web HTML prototype builder terintegrasi.",
      category: "Frontend",
      priority: "P1",
      estimatedHours: 14,
      status: "todo"
    }
  ],
  roadmap: [
    {
      phase: "Fase 1: Core Foundation & Knowledge Topology",
      duration: "Minggu 1 - 2",
      milestones: ["Struktur Data Kurikulum", "Canvas D3 Force Graph", "Dashboard Bento Stats"],
      deliverables: "Aplikasi dasar dengan visualisasi graf interaktif dan tracking kemajuan belajar."
    },
    {
      phase: "Fase 2: Generative Intelligence & Tooling Suites",
      duration: "Minggu 3 - 4",
      milestones: ["PRD & Task Planner Builder", "Presentation Canvas", "Web Builder Sandbox"],
      deliverables: "Rangkaian tool AI terpadu untuk percepatan perancangan produk dan coding."
    },
    {
      phase: "Fase 3: Design Tokens & Polished Certification",
      duration: "Minggu 5 - 6",
      milestones: ["Design SF Token System", "Export PDF/JSON", "Audit Keamanan & Performa"],
      deliverables: "Platform siap rilis dengan sertifikasi digital dan dokumentasi lengkap."
    }
  ],
  implementationPrompts: [
    {
      title: "Prompt Inisialisasi Arsitektur Next.js & D3 Canvas",
      targetAI: "Cursor / Claude Code / AI Studio",
      prompt: `Buatlah modul visualisasi interaktif menggunakan D3.js versi 7 dalam komponen React Next.js 15.
Komponen harus memiliki:
1. Canvas SVG responsif dengan zoom & pan via d3.zoom().
2. Simulasi fisika d3.forceSimulation() dengan gaya forceLink, forceManyBody, dan forceCenter.
3. Node interaktif dengan label kategori warna kontras dan indikator status penyelesaian.
4. Hover tooltip dan event listener saat node diklik untuk membuka panel inspeksi samping.`
    },
    {
      title: "Prompt Engine Task Planner & State Kanban",
      targetAI: "Cursor / Claude Code / AI Studio",
      prompt: `Bangun komponen Task Planner dalam React dengan TypeScript yang mendukung:
1. Filter berdasarkan kategori (Frontend, Backend, DevOps, Design, QA) dan prioritas (P0, P1, P2).
2. Perubahan status task (Todo, In-Progress, Done) dengan visual pill yang estetik.
3. Perhitungan total jam estimasi kerja dan persentase penyelesaian proyek secara real-time.
4. Fitur penambahan task baru dan tombol salin seluruh task ke format Markdown tabular.`
    }
  ]
};

const TEMPLATE_PRESETS = [
  {
    label: "AI-Powered SaaS Analytics",
    prompt: "SaaS dashboard analitik berbasis AI untuk memantau churn rate, performa server, dan segmentasi pengguna secara real-time.",
    category: "Web Application",
    audience: "Product Managers & Data Teams"
  },
  {
    label: "Decentralized EdTech Protocol",
    prompt: "Platform pembelajaran terdesentralisasi dengan sertifikat kriptografis on-chain, peer-to-peer code review, dan kurikulum terbuka.",
    category: "Web3 / EdTech",
    audience: "Developer Global & Komunitas Terbuka"
  },
  {
    label: "Healthcare Biomarker Assistant",
    prompt: "Aplikasi monitoring kesehatan preventif yang mengintegrasikan data biomarker wearable device dengan rekomendasi gaya hidup adaptif.",
    category: "Mobile & Health Tech",
    audience: "Pasien, Dokter, & Health Enthusiasts"
  },
  {
    label: "Enterprise Cloud Cost Optimizer",
    prompt: "Tool FinOps otomatis untuk mendeteksi resource cloud menganggur (AWS, GCP, Azure), menghemat pengeluaran server hingga 40%.",
    category: "DevOps / Enterprise Tool",
    audience: "DevOps Leads & CFOs"
  }
];

export function PRDBuilder() {
  const [prd, setPrd] = useState<PRDData>(INITIAL_PRD);
  const [activeSubTab, setActiveSubTab] = useState<'prd' | 'tasks' | 'roadmap' | 'prompts'>('prd');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [productType, setProductType] = useState('Web & Cloud Platform');
  const [audience, setAudience] = useState('Mahasiswa, Developer, & Tim Engineering');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'QA'>('Frontend');
  const [newTaskPriority, setNewTaskPriority] = useState<'P0' | 'P1' | 'P2'>('P0');
  const [newTaskHours, setNewTaskHours] = useState(6);

  const handleGeneratePRD = async () => {
    if (!userPrompt.trim()) return;
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/gemini/prd-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          productType,
          audience,
          complexity: 'Complex & Menyeluruh'
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghasilkan PRD.');
      }

      const data: PRDData = await response.json();
      if (data && data.title) {
        setPrd(data);
      } else {
        setErrorMessage('Mohon maaf, dokumen PRD belum dapat diproses secara lengkap. Silakan coba kembali.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Mohon maaf, terjadi kendala saat menghubungi server penyusun PRD. Silakan coba sesaat lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setPrd(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'todo' ? 'in-progress' : t.status === 'in-progress' ? 'done' : 'todo';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    }));
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: PRDTask = {
      id: `TASK-${Date.now().toString().slice(-4)}`,
      title: newTaskTitle,
      description: 'Task implementasi teknis kustom',
      category: newTaskCategory,
      priority: newTaskPriority,
      estimatedHours: newTaskHours,
      status: 'todo'
    };

    setPrd(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    setNewTaskTitle('');
  };

  const handleDeleteTask = (taskId: string) => {
    setPrd(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }));
  };

  const completedTasks = prd.tasks.filter(t => t.status === 'done').length;
  const progressPercent = prd.tasks.length > 0 ? Math.round((completedTasks / prd.tasks.length) * 100) : 0;
  const totalHours = prd.tasks.reduce((acc, t) => acc + t.estimatedHours, 0);

  // Markdown Export
  const generateMarkdownPRD = () => {
    return `# ${prd.title}
## Visi Produk
${prd.vision}

### Target Pengguna
${prd.targetAudience.map(a => `- ${a}`).join('\n')}

### Problem Statement
${prd.problemStatement}

### Solusi
${prd.solutionOverview}

## Cakupan Proyek
### In-Scope:
${prd.scope.inScope.map(s => `- ${s}`).join('\n')}

### Out-of-Scope:
${prd.scope.outOfScope.map(s => `- ${s}`).join('\n')}

## User Stories & Acceptance Criteria
${prd.userStories.map(u => `### [${u.id}] As a ${u.asA}, I want to ${u.iWant}, so that ${u.soThat}
**Acceptance Criteria:**
${u.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}
`).join('\n')}

## Arsitektur Teknis
- **Frontend**: ${prd.technicalArchitecture.frontend}
- **Backend**: ${prd.technicalArchitecture.backend}
- **Database**: ${prd.technicalArchitecture.database}
- **Keamanan**: ${prd.technicalArchitecture.securityAndCompliance}

## Task Planner
| ID | Judul | Kategori | Prioritas | Estimasi | Status |
|---|---|---|---|---|---|
${prd.tasks.map(t => `| ${t.id} | ${t.title} | ${t.category} | ${t.priority} | ${t.estimatedHours} jam | ${t.status} |`).join('\n')}
`;
  };

  return (
    <div className="space-y-8" id="prd-builder-studio">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/70 text-zinc-300 text-xs font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Architect & PM Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              PRD Builder & Task Planner Komprehensif
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Rancang spesifikasi kebutuhan produk (PRD), breakdown task engineering, roadmap fase rilis, serta prompt implementasi AI siap pakai secara otomatis dan terstruktur.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopy(generateMarkdownPRD(), 'all-md')}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-xl border border-zinc-700 flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              id="copy-prd-markdown-btn"
            >
              {copiedSection === 'all-md' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>Salin Markdown</span>
            </button>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(prd, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${prd.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-prd.json`;
                a.click();
              }}
              className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              id="download-prd-json-btn"
            >
              <Download className="w-4 h-4" />
              <span>Unduh JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Generator Input Panel */}
      <div className="p-5 sm:p-6 bg-zinc-900/70 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 font-semibold text-sm text-zinc-200">
          <Sparkles className="w-4 h-4 text-zinc-300" />
          <span>Hasilkan PRD Baru dengan AI Generator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Ide / Deskripsi Produk</label>
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Contoh: Platform simulasi trading algoritma kuantitatif dengan backtest multi-aset..."
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
              id="prd-prompt-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Tipe Produk</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-zinc-400 cursor-pointer"
              id="prd-type-select"
            >
              <option value="Web Application & SaaS">Web Application & SaaS</option>
              <option value="Mobile App (iOS / Android)">Mobile App (iOS / Android)</option>
              <option value="Developer Tool / CLI / API Engine">Developer Tool / CLI / API Engine</option>
              <option value="AI Agent & Automation Platform">AI Agent & Automation Platform</option>
            </select>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-zinc-500 font-mono">Inspirasi:</span>
          {TEMPLATE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setUserPrompt(preset.prompt);
                setProductType(preset.category);
                setAudience(preset.audience);
              }}
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-[11px] text-zinc-300 transition-all cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGeneratePRD}
            disabled={isGenerating || !userPrompt.trim()}
            className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-95"
            id="generate-prd-submit-btn"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Menyusun Dokumen Teknis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Hasilkan Dokumen PRD & Task</span>
              </>
            )}
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveSubTab('prd')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'prd'
                ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            id="subtab-prd-btn"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Dokumen PRD</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tasks')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'tasks'
                ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            id="subtab-tasks-btn"
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>Task Planner ({prd.tasks.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('roadmap')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'roadmap'
                ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            id="subtab-roadmap-btn"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Roadmap</span>
          </button>

          <button
            onClick={() => setActiveSubTab('prompts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'prompts'
                ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            id="subtab-prompts-btn"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>AI Implementation Prompts</span>
          </button>
        </div>

        {/* Task Summary Stat Pill */}
        <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
          <span>Progress: <strong className="text-zinc-200">{completedTasks}/{prd.tasks.length}</strong></span>
          <span className="text-zinc-600">•</span>
          <span>Estimasi: <strong className="text-zinc-200">{totalHours} Jam</strong></span>
          <span className="text-zinc-600">•</span>
          <div className="w-20 bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <AnimatePresence mode="wait">
        {activeSubTab === 'prd' && (
          <motion.div
            key="prd-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Title & Vision */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Product Specification</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">{prd.title}</h2>
                </div>
                <button
                  onClick={() => handleCopy(prd.vision, 'vision')}
                  className="p-2 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Salin Visi"
                >
                  {copiedSection === 'vision' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl">
                <span className="text-xs font-semibold text-zinc-300 block mb-1">Visi & Sasaran Strategis</span>
                <p className="text-sm text-zinc-300 leading-relaxed italic">&ldquo;{prd.vision}&rdquo;</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-zinc-400" />
                    Target Pengguna
                  </span>
                  <ul className="space-y-1.5">
                    {prd.targetAudience.map((aud, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <span>{aud}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
                    Problem Statement
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/60">
                    {prd.problemStatement}
                  </p>
                </div>
              </div>
            </div>

            {/* Scope Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-zinc-900/50 border border-emerald-900/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>In-Scope (Cakupan Fitur Wajib)</span>
                </div>
                <ul className="space-y-2">
                  {prd.scope.inScope.map((item, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider font-mono">
                  <ShieldAlert className="w-4 h-4 text-zinc-400" />
                  <span>Out-of-Scope (Batasan Fase Ini)</span>
                </div>
                <ul className="space-y-2">
                  {prd.scope.outOfScope.map((item, idx) => (
                    <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                      <span className="text-zinc-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* User Stories */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  <span>User Stories & Acceptance Criteria (Gherkin Format)</span>
                </h3>
              </div>

              <div className="space-y-4">
                {prd.userStories.map((story) => (
                  <div key={story.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded font-mono text-[10px] font-bold">
                        {story.id}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-200">
                      <strong>Sebagai</strong> {story.asA}, <strong>saya ingin</strong> {story.iWant}, <strong>sehingga</strong> {story.soThat}.
                    </p>

                    <div className="space-y-1.5 pt-1 border-t border-zinc-800/70">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Acceptance Criteria:</span>
                      {story.acceptanceCriteria.map((ac, idx) => (
                        <div key={idx} className="text-xs font-mono text-zinc-400 bg-zinc-900/60 p-2 rounded-md border border-zinc-800/40">
                          {ac}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Architecture */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-zinc-400" />
                <span>Rekomendasi Arsitektur Teknis</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Frontend Stack</span>
                  <p className="text-xs text-zinc-300 font-mono">{prd.technicalArchitecture.frontend}</p>
                </div>
                <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Backend & API</span>
                  <p className="text-xs text-zinc-300 font-mono">{prd.technicalArchitecture.backend}</p>
                </div>
                <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Database & State</span>
                  <p className="text-xs text-zinc-300 font-mono">{prd.technicalArchitecture.database}</p>
                </div>
                <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Security & Compliance</span>
                  <p className="text-xs text-zinc-300 font-mono">{prd.technicalArchitecture.securityAndCompliance}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'tasks' && (
          <motion.div
            key="tasks-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Add Task Bar */}
            <div className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-2xl space-y-3">
              <span className="text-xs font-semibold text-zinc-300">Tambah Task Baru</span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Judul task implementasi teknis..."
                  className="sm:col-span-6 px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
                />
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  className="sm:col-span-2 px-2.5 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-zinc-200"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Design">Design</option>
                  <option value="QA">QA</option>
                </select>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="sm:col-span-2 px-2.5 py-2 bg-zinc-950 border border-zinc-700/80 rounded-xl text-xs text-zinc-200"
                >
                  <option value="P0">P0 (Critical)</option>
                  <option value="P1">P1 (Important)</option>
                  <option value="P2">P2 (Nice to have)</option>
                </select>
                <button
                  onClick={handleAddTask}
                  className="sm:col-span-2 px-3 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {prd.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    task.status === 'done'
                      ? 'bg-zinc-950/60 border-zinc-800/60 opacity-75'
                      : task.status === 'in-progress'
                      ? 'bg-zinc-900 border-zinc-700 shadow-sm'
                      : 'bg-zinc-900/80 border-zinc-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
                        task.status === 'done'
                          ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                          : task.status === 'in-progress'
                          ? 'border-amber-400 bg-amber-400/20 text-amber-400'
                          : 'border-zinc-700 hover:border-zinc-500'
                      }`}
                      title="Klik untuk ubah status"
                    >
                      {task.status === 'done' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      {task.status === 'in-progress' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500">{task.id}</span>
                        <h4 className={`text-xs sm:text-sm font-semibold ${task.status === 'done' ? 'line-through text-zinc-400' : 'text-zinc-100'}`}>
                          {task.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-400">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                    <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono text-zinc-300">
                      {task.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      task.priority === 'P0' ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60' :
                      task.priority === 'P1' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {task.estimatedHours}h
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 rounded transition-all cursor-pointer"
                      title="Hapus Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSubTab === 'roadmap' && (
          <motion.div
            key="roadmap-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {prd.roadmap.map((phase, idx) => (
                <div key={idx} className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-zinc-200">
                        {idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-zinc-100">{phase.phase}</h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800 self-start sm:self-center">
                      <Clock className="w-3 h-3 inline mr-1 text-zinc-400" />
                      {phase.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-zinc-300 font-mono uppercase tracking-wider">Milestones Utama:</span>
                      <ul className="space-y-1.5">
                        {phase.milestones.map((ms, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                            <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span>{ms}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
                      <span className="text-xs font-semibold text-zinc-300 font-mono uppercase tracking-wider">Deliverables Konkret:</span>
                      <p className="text-xs text-zinc-400 leading-relaxed">{phase.deliverables}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSubTab === 'prompts' && (
          <motion.div
            key="prompts-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {prd.implementationPrompts.map((promptItem, idx) => (
              <div key={idx} className="p-5 bg-zinc-900/70 border border-zinc-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-400" />
                    <h4 className="text-sm font-bold text-zinc-100">{promptItem.title}</h4>
                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded text-[10px] font-mono">
                      Target: {promptItem.targetAI}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(promptItem.prompt, `prompt-${idx}`)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg border border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {copiedSection === `prompt-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Salin Prompt</span>
                  </button>
                </div>

                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {promptItem.prompt}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
