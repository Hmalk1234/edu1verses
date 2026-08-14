'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Sparkles,
  Server,
  Database,
  Cpu,
  Zap,
  Flame,
  ShieldAlert,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Network,
  Share2,
  Download,
  Copy,
  Check,
  TrendingUp,
  HardDrive,
  Globe,
  Radio,
  Sliders,
  Terminal,
  ChevronRight,
  ArrowRight,
  Bot
} from 'lucide-react';

interface ArchNode {
  id: string;
  name: string;
  category: 'client' | 'gateway' | 'compute' | 'cache' | 'storage' | 'queue';
  type: string;
  status: 'healthy' | 'degraded' | 'failed';
  active: boolean;
  specs: string;
  qps: string;
  latency: string;
}

const BLUEPRINTS = [
  {
    id: 'global-video-streaming',
    name: 'Netflix-Scale Video Streaming & Transcoding',
    scale: '250M DAU • 1.2 PB/day Ingress',
    description: 'Arsitektur terdistribusi multi-tier dengan CDN Anycast, edge token auth, async transcoding pipeline, dan dynamic bitrate packaging.',
    nodes: [
      { id: 'client', name: 'Smart TV & Mobile Clients', category: 'client', type: 'Anycast DNS / HLS Player', status: 'healthy', active: true, specs: '250M DAU', qps: '1.4M req/s', latency: '2ms' },
      { id: 'cdn', name: 'Edge CDN Mesh (Cloudflare / Akamai)', category: 'gateway', type: 'Edge Cache Layer', status: 'healthy', active: true, specs: '300+ PoPs Global', qps: '1.2M req/s', latency: '8ms' },
      { id: 'gateway', name: 'API Gateway & Rate Limiter', category: 'gateway', type: 'Envoy Proxy + Token Bucket', status: 'healthy', active: true, specs: '24 Pods Envoy', qps: '200k req/s', latency: '12ms' },
      { id: 'service', name: 'Playback & Catalog Microservice', category: 'compute', type: 'Go / gRPC Cluster', status: 'healthy', active: true, specs: '80 Kubernetes Pods', qps: '180k req/s', latency: '15ms' },
      { id: 'cache', name: 'Distributed In-Memory Cache', category: 'cache', type: 'Redis Cluster (Master-Replica)', status: 'healthy', active: true, specs: '1.2 TB RAM (64 Shards)', qps: '450k req/s', latency: '0.8ms' },
      { id: 'queue', name: 'Video Transcoding Event Bus', category: 'queue', type: 'Apache Kafka Cluster', status: 'healthy', active: true, specs: '12 Partitions / Topic', qps: '40k events/s', latency: '5ms' },
      { id: 'db', name: 'Metadata & User History DB', category: 'storage', type: 'CockroachDB / Spanner', status: 'healthy', active: true, specs: 'Multi-Region Distributed SQL', qps: '25k writes/s', latency: '22ms' },
      { id: 's3', name: 'Master Video Object Storage', category: 'storage', type: 'AWS S3 Multi-Tier Glacier', status: 'healthy', active: true, specs: '45 PB Hot/Cold Tier', qps: '85k ops/s', latency: '35ms' }
    ]
  },
  {
    id: 'uber-geospatial-dispatch',
    name: 'Uber Real-Time Geospatial Driver Matching',
    scale: '50M Active Drivers/Riders • Sub-50ms Latency',
    description: 'Mesin pencocokan spasial real-time berbasis Uber H3 hexagonal indexing, Redis Geospatial in-memory store, dan WebSocket state streams.',
    nodes: [
      { id: 'client', name: 'Driver & Rider Mobile Apps', category: 'client', type: 'WebSocket / MQTT Client', status: 'healthy', active: true, specs: '50M Concurrent Devices', qps: '800k pings/s', latency: '18ms' },
      { id: 'gateway', name: 'WebSocket Gateway Cluster', category: 'gateway', type: 'Netty / Envoy WSS Proxies', status: 'healthy', active: true, specs: '40 Edge Nodes', qps: '800k conn/s', latency: '10ms' },
      { id: 'service', name: 'Spatial Matching Engine', category: 'compute', type: 'Uber H3 Hexagonal Grid Ring', status: 'healthy', active: true, specs: '120 Rust Workers', qps: '350k match/s', latency: '14ms' },
      { id: 'cache', name: 'Geo-Index Spatial In-Memory Cache', category: 'cache', type: 'Redis Geo + Memcached', status: 'healthy', active: true, specs: '850 GB RAM Active Index', qps: '1.2M queries/s', latency: '0.6ms' },
      { id: 'queue', name: 'Ride Dispatch Event Stream', category: 'queue', type: 'Apache Kafka Event Broker', status: 'healthy', active: true, specs: '32 Partitions', qps: '90k msgs/s', latency: '4ms' },
      { id: 'db', name: 'Ride History & Financial Ledger', category: 'storage', type: 'PostgreSQL + TimescaleDB', status: 'healthy', active: true, specs: 'Time-Series Sharded DB', qps: '15k writes/s', latency: '19ms' }
    ]
  },
  {
    id: 'stripe-idempotent-payments',
    name: 'Stripe-Grade Distributed Idempotent Payments',
    scale: '10k TPS Financial Transactions • Zero Double-Charging',
    description: 'Sistem pembayaran anti-gagal berstandar ACID dengan Two-Phase Commit (2PC) / Saga Pattern, Distributed Locking dengan Redlock, dan Idempotency Keys.',
    nodes: [
      { id: 'client', name: 'Merchant API & Checkout SDKs', category: 'client', type: 'REST / GraphQL Clients', status: 'healthy', active: true, specs: '10k TPS Peak', qps: '12k req/s', latency: '40ms' },
      { id: 'gateway', name: 'PCI-DSS Compliant API Gateway', category: 'gateway', type: 'Kong / Apisix Security Gateway', status: 'healthy', active: true, specs: 'Zero-Trust Vault SSL', qps: '12k req/s', latency: '15ms' },
      { id: 'service', name: 'Payment Orchestrator (Saga Engine)', category: 'compute', type: 'Temporal / Cadence Workflow', status: 'healthy', active: true, specs: '32 Orchestrator Nodes', qps: '10k saga/s', latency: '35ms' },
      { id: 'cache', name: 'Idempotency Lock & Deduplication', category: 'cache', type: 'Redis Redlock Distributed Lock', status: 'healthy', active: true, specs: 'Cluster with AOF Sync', qps: '25k locks/s', latency: '1.2ms' },
      { id: 'queue', name: 'Payment Settlement Event Log', category: 'queue', type: 'Kafka with Exactly-Once Semantics', status: 'healthy', active: true, specs: 'Immutable Audit Log', qps: '15k events/s', latency: '8ms' },
      { id: 'db', name: 'Double-Entry Accounting Ledger DB', category: 'storage', type: 'PostgreSQL + Spanner Two-Phase', status: 'healthy', active: true, specs: 'Strict Serializability ACID', qps: '8k writes/s', latency: '45ms' }
    ]
  }
];

export function SystemDesignArena() {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(BLUEPRINTS[0].id);
  const [activeBlueprint, setActiveBlueprint] = useState(BLUEPRINTS[0]);
  const [nodes, setNodes] = useState<ArchNode[]>(BLUEPRINTS[0].nodes as ArchNode[]);
  const [activeTab, setActiveTab] = useState<'canvas' | 'capacity' | 'chaos' | 'ai-review'>('canvas');

  // Capacity Calculator State
  const [dau, setDau] = useState<number>(50); // in millions
  const [readsPerUser, setReadsPerUser] = useState<number>(40);
  const [writesPerUser, setWritesPerUser] = useState<number>(4);
  const [avgPayloadKb, setAvgPayloadKb] = useState<number>(15);

  // Chaos Simulation State
  const [activeChaosScenario, setActiveChaosScenario] = useState<string | null>(null);
  const [isSimulatingChaos, setIsSimulatingChaos] = useState(false);
  const [chaosLog, setChaosLog] = useState<string[]>([]);

  // AI Review State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReviewResult, setAiReviewResult] = useState<any>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Calculated Capacity Metrics
  const totalDailyReads = dau * 1_000_000 * readsPerUser;
  const totalDailyWrites = dau * 1_000_000 * writesPerUser;
  const avgReadQps = Math.round(totalDailyReads / 86400);
  const peakReadQps = Math.round(avgReadQps * 2.5);
  const avgWriteQps = Math.round(totalDailyWrites / 86400);
  const peakWriteQps = Math.round(avgWriteQps * 2.5);
  
  // Storage & Bandwidth
  const dailyStorageGb = Math.round((totalDailyWrites * avgPayloadKb) / (1024 * 1024));
  const yearlyStorageTb = Math.round((dailyStorageGb * 365) / 1024);
  const ramCacheTb = Math.round(((totalDailyReads * 0.2 * avgPayloadKb) / (1024 * 1024 * 1024)) * 100) / 100;
  const egressBandwidthGbps = Math.round(((peakReadQps * avgPayloadKb * 8) / (1024 * 1024)) * 10) / 10;

  const handleSelectBlueprint = (bpId: string) => {
    const bp = BLUEPRINTS.find(b => b.id === bpId);
    if (bp) {
      setSelectedBlueprintId(bpId);
      setActiveBlueprint(bp);
      setNodes(bp.nodes as ArchNode[]);
      setAiReviewResult(null);
      setReviewError(null);
      setActiveChaosScenario(null);
      setChaosLog([]);
    }
  };

  const handleToggleNode = (nodeId: string) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, active: !n.active } : n));
  };

  // Chaos Injection Simulation
  const handleRunChaosTest = (scenarioName: string) => {
    setIsSimulatingChaos(true);
    setActiveChaosScenario(scenarioName);
    setChaosLog([
      `[T+00.0s] INISIASI SIMULASI KETAHANAN: "${scenarioName}"`,
      `[T+00.2s] Menginjeksikan parameter kegagalan pada zona ketersediaan aktif...`
    ]);

    setTimeout(() => {
      if (scenarioName.includes('Flash Spike')) {
        setNodes(prev => prev.map(n => n.id === 'gateway' ? { ...n, status: 'degraded', qps: '4.8M req/s (Surge)' } : n));
        setChaosLog(prev => [
          ...prev,
          `[T+01.2s] LONJAKAN TRAFIK: Lonjakan trafik 24x lipat terdeteksi pada API Gateway.`,
          `[T+02.0s] RATE LIMITER AKTIF: Token Bucket menstabilkan antrean permintaan.`,
          `[T+03.5s] AUTO-SCALING: Klaster Kubernetes menambah 40 worker pod cadangan secara otomatis.`,
          `[T+04.8s] CIRCUIT BREAKER: Klaster cache menyerap 94.2% lonjakan pembacaan.`,
          `[T+06.0s] EVALUASI SISTEM: Berhasil bertahan dengan transaksi tetap konsisten (P99: 42ms).`
        ]);
      } else if (scenarioName.includes('Outage')) {
        setNodes(prev => prev.map(n => n.id === 'db' ? { ...n, status: 'failed' } : n));
        setChaosLog(prev => [
          ...prev,
          `[T+01.0s] KENDALA DATABASE: Node database utama kehilangan heartbeat koneksi.`,
          `[T+02.1s] KONSENSUS RAFT: Inisiasi pemilihan node utama baru pada Region-2 & Region-3.`,
          `[T+03.8s] PROMOSI NODE: Node kandidat resmi ditetapkan sebagai Master baru (Term #418).`,
          `[T+04.5s] REPLIKASI DNS: Endpoint pembacaan beralih ke node aktif secara transparan.`,
          `[T+05.2s] EVALUASI SISTEM: Pemulihan otomatis berhasil (RTO: 4.5 detik, RPO: 0ms).`
        ]);
      } else {
        setChaosLog(prev => [
          ...prev,
          `[T+01.5s] Menguji partisi jaringan dan mekanisme eviksi cache memori...`,
          `[T+03.0s] Distributed lock berhasil mencegah terjadinya eksekusi ganda.`,
          `[T+04.2s] EVALUASI SISTEM: Sistem mempertahankan konsistensi data yang ketat.`
        ]);
      }
      setIsSimulatingChaos(false);
    }, 1200);
  };

  const handleResetChaos = () => {
    setActiveChaosScenario(null);
    setChaosLog([]);
    setNodes(activeBlueprint.nodes as ArchNode[]);
  };

  // Run AI Architecture Review
  const handleRunAiReview = async () => {
    setIsAnalyzing(true);
    setReviewError(null);
    try {
      const res = await fetch('/api/gemini/system-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeBlueprint.name,
          architectureNodes: nodes.filter(n => n.active),
          capacityStats: {
            dau: `${dau}M`,
            peakReadQps,
            peakWriteQps,
            yearlyStorageTb: `${yearlyStorageTb} TB`,
            ramCacheTb: `${ramCacheTb} TB`
          },
          chaosScenario: activeChaosScenario
        })
      });

      const data = await res.json();
      if (data.success && data.review) {
        setAiReviewResult(data.review);
        setActiveTab('ai-review');
      } else {
        setReviewError(data.error || 'Mohon maaf, evaluasi arsitektur belum berhasil diselesaikan. Silakan coba kembali.');
      }
    } catch (err) {
      console.error('System design analysis error:', err);
      setReviewError('Mohon maaf, terjadi kendala saat menghubungi AI Principal Architect. Silakan coba sesaat lagi.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-sm">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-zinc-800/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STAFF DISTRIBUTED SYSTEMS STUDIO & CHAOS ARENA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              System Design & High-Scale Architecture Arena
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Rancang arsitektur terdistribusi skala jutaan pengguna, simulasi injeksi kegagalan (Chaos Engineering), hitung kalkulasi kapasitas memori/storage, dan dapatkan evaluasi interview FAANG dari AI Principal Architect.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunAiReview}
              disabled={isAnalyzing}
              className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              id="run-ai-arch-review-btn"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Menganalisis SPOF...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 text-zinc-950" />
                  <span>AI Staff Architect Review</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Blueprint Selector Chips */}
        <div className="mt-5 pt-5 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono text-zinc-500 whitespace-nowrap mr-1">Blueprints:</span>
          {BLUEPRINTS.map((bp) => (
            <button
              key={bp.id}
              onClick={() => handleSelectBlueprint(bp.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedBlueprintId === bp.id
                  ? 'bg-zinc-100 text-zinc-900 font-semibold shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              <span>{bp.name.split(' ')[0]}</span>
              <span className="text-[10px] opacity-70">({bp.scale.split('•')[0].trim()})</span>
            </button>
          ))}
        </div>

        {reviewError && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{reviewError}</span>
          </div>
        )}
      </div>

      {/* Main Tabs: Architecture Topology, Capacity Planning, Chaos Simulator, AI Review */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 bg-zinc-950/60 overflow-x-auto gap-2">
          <div className="flex items-center gap-1 shrink-0">
            {[
              { id: 'canvas', label: 'Topology Visualizer', icon: Network },
              { id: 'capacity', label: 'Capacity Calculator', icon: Sliders },
              { id: 'chaos', label: 'Chaos Simulator', icon: ShieldAlert },
              { id: 'ai-review', label: 'Staff Architect Review', icon: Bot }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-zinc-500 hidden sm:block">
            {activeBlueprint.name}
          </div>
        </div>

        {/* Tab 1: Interactive Topology Canvas */}
        {activeTab === 'canvas' && (
          <div className="p-5 sm:p-7 space-y-6">
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center justify-between">
                <span>Distributed Pipeline Nodes & Dataflow</span>
                <span className="text-xs font-mono font-normal text-zinc-400">
                  {nodes.filter(n => n.active).length} Active Nodes
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {activeBlueprint.description}
              </p>
            </div>

            {/* Architecture Node Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {nodes.map((node, index) => {
                const isHealthy = node.status === 'healthy';
                const isDegraded = node.status === 'degraded';
                const isFailed = node.status === 'failed';

                return (
                  <div
                    key={node.id}
                    className={`p-4 rounded-xl border transition-all ${
                      !node.active
                        ? 'bg-zinc-950/40 border-zinc-800/50 opacity-40'
                        : isFailed
                        ? 'bg-rose-950/20 border-rose-800/80 shadow-sm'
                        : isDegraded
                        ? 'bg-amber-950/20 border-amber-800/80 shadow-sm'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Step {index + 1} • {node.category}
                      </span>
                      <button
                        onClick={() => handleToggleNode(node.id)}
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded cursor-pointer ${
                          node.active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                        }`}
                      >
                        {node.active ? 'ACTIVE' : 'BYPASS'}
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-100 mb-1">
                      {node.name}
                    </h4>
                    <p className="text-xs font-mono text-zinc-400 mb-3">
                      {node.type}
                    </p>

                    <div className="space-y-1 pt-2 border-t border-zinc-800/80 text-[11px] font-mono">
                      <div className="flex justify-between text-zinc-400">
                        <span>Provision:</span>
                        <span className="text-zinc-200">{node.specs}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Throughput:</span>
                        <span className="text-emerald-400">{node.qps}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>P99 Latency:</span>
                        <span className="text-zinc-300">{node.latency}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Bar */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Semua node terhubung melalui gRPC / mTLS internal network (Sub-1ms backbone).</span>
              </div>
              <button
                onClick={() => setActiveTab('capacity')}
                className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>Hitung Kapasitas QPS & RAM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Capacity Planning Calculator */}
        {activeTab === 'capacity' && (
          <div className="p-5 sm:p-7 space-y-6">
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Capacity Planning & Sizing Math Calculator
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Kalkulasi matematis untuk estimasi QPS puncak, kebutuhan memori RAM Redis (80/20 rule), dan pertumbuhan storage database per tahun.
              </p>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Daily Active Users</span>
                  <span className="font-mono font-bold text-zinc-200">{dau} Juta</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={dau}
                  onChange={(e) => setDau(Number(e.target.value))}
                  className="w-full accent-zinc-200"
                />
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Reads / User / Day</span>
                  <span className="font-mono font-bold text-zinc-200">{readsPerUser} reqs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={readsPerUser}
                  onChange={(e) => setReadsPerUser(Number(e.target.value))}
                  className="w-full accent-zinc-200"
                />
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Writes / User / Day</span>
                  <span className="font-mono font-bold text-zinc-200">{writesPerUser} writes</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={writesPerUser}
                  onChange={(e) => setWritesPerUser(Number(e.target.value))}
                  className="w-full accent-zinc-200"
                />
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Avg Payload Size</span>
                  <span className="font-mono font-bold text-zinc-200">{avgPayloadKb} KB</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={avgPayloadKb}
                  onChange={(e) => setAvgPayloadKb(Number(e.target.value))}
                  className="w-full accent-zinc-200"
                />
              </div>
            </div>

            {/* Calculated Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
                <div className="text-xs text-zinc-500 font-mono">Peak Read QPS (2.5x)</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {peakReadQps.toLocaleString()} req/s
                </div>
                <div className="text-[11px] text-zinc-500">Avg: {avgReadQps.toLocaleString()} req/s</div>
              </div>

              <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
                <div className="text-xs text-zinc-500 font-mono">Peak Write QPS (2.5x)</div>
                <div className="text-xl font-bold text-zinc-200 font-mono">
                  {peakWriteQps.toLocaleString()} writes/s
                </div>
                <div className="text-[11px] text-zinc-500">Avg: {avgWriteQps.toLocaleString()} writes/s</div>
              </div>

              <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
                <div className="text-xs text-zinc-500 font-mono">Redis RAM (80/20 Rule)</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {ramCacheTb} TB
                </div>
                <div className="text-[11px] text-zinc-500">20% of Daily Read Footprint</div>
              </div>

              <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
                <div className="text-xs text-zinc-500 font-mono">Storage (1-Year Growth)</div>
                <div className="text-xl font-bold text-zinc-200 font-mono">
                  {yearlyStorageTb} TB / year
                </div>
                <div className="text-[11px] text-zinc-500">{dailyStorageGb} GB / day written</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Chaos Engineering Simulator */}
        {activeTab === 'chaos' && (
          <div className="p-5 sm:p-7 space-y-6">
            <div>
              <h3 className="text-base font-bold text-zinc-100">
                Chaos Engineering & Resiliency Fault Injection
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Uji ketahanan arsitektur terhadap skenario kegagalan ekstrem seperti lonjakan trafik 50x, putusnya database master, dan cache stampede.
              </p>
            </div>

            {/* Scenario Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: '🔥 Flash Spike (50x Surge)', desc: 'Trafik tiba-tiba melonjak 50x dalam 30 detik.' },
                { name: '💥 DB Master Region Outage', desc: 'Node master mati, memicu pemilihan leader Raft.' },
                { name: '🌪️ Cache Cluster Stampede', desc: 'Eviction serentak pada key bernilai tinggi.' }
              ].map((sc, i) => (
                <button
                  key={i}
                  onClick={() => handleRunChaosTest(sc.name)}
                  disabled={isSimulatingChaos}
                  className="p-4 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 text-left transition-all cursor-pointer disabled:opacity-50 space-y-1"
                >
                  <div className="font-bold text-xs text-zinc-100">{sc.name}</div>
                  <div className="text-[11px] text-zinc-400">{sc.desc}</div>
                </button>
              ))}
            </div>

            {/* Terminal Log Output */}
            {chaosLog.length > 0 && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>Chaos Telemetry Log</span>
                  </div>
                  <button
                    onClick={handleResetChaos}
                    className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
                <div className="space-y-1 font-mono text-xs text-zinc-300">
                  {chaosLog.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">{log}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: AI Staff Architect Review */}
        {activeTab === 'ai-review' && (
          <div className="p-5 sm:p-7 space-y-6">
            {!aiReviewResult ? (
              <div className="text-center py-12 space-y-3">
                <Bot className="w-10 h-10 text-zinc-600 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-zinc-200">Belum Ada Evaluasi Arsitektur Aktif</h4>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Klik tombol di bawah untuk meminta AI Staff Distributed Systems Architect menganalisis Single Point of Failure (SPOF), CAP theorem trade-offs, dan kesiapan produksi sistem Anda.
                </p>
                <button
                  onClick={handleRunAiReview}
                  disabled={isAnalyzing}
                  className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                >
                  Jalankan Review AI
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Score & Verdict Card */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono text-emerald-400 mb-1">EVALUASI STAFF ARCHITECT</div>
                    <h3 className="text-lg font-bold text-zinc-100">{aiReviewResult.overallVerdict}</h3>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-center shrink-0">
                    <div className="text-[10px] text-zinc-500 font-mono">Skor Kesiapan</div>
                    <div className="text-2xl font-black text-emerald-400">{aiReviewResult.score} / 100</div>
                  </div>
                </div>

                {/* Rubric Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {aiReviewResult.detailedRubric && Object.entries(aiReviewResult.detailedRubric).map(([key, val]: any) => (
                    <div key={key} className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400 font-medium capitalize">{key}</span>
                        <span className="font-mono font-bold text-emerald-400">{val.score}/10</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{val.feedback}</p>
                    </div>
                  ))}
                </div>

                {/* Strengths and SPOFs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Kelebihan Arsitektur</span>
                    </div>
                    <ul className="space-y-1 text-xs text-zinc-300 list-disc pl-4">
                      {aiReviewResult.strengths?.map((s: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>SPOF & Catatan Bottleneck</span>
                    </div>
                    <ul className="space-y-1 text-xs text-zinc-300 list-disc pl-4">
                      {aiReviewResult.weaknessesAndSPOFs?.map((w: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Staff Interviewer Follow-up Questions */}
                {aiReviewResult.interviewerQuestions && (
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                      <HelpCircle className="w-4 h-4 text-zinc-400" />
                      <span>Pertanyaan Lanjutan Interviewer (FAANG Staff Level)</span>
                    </div>
                    <div className="space-y-2">
                      {aiReviewResult.interviewerQuestions.map((q: string, idx: number) => (
                        <div key={idx} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg text-xs text-zinc-300 flex items-start gap-2">
                          <span className="font-mono text-zinc-500 shrink-0">Q{idx + 1}:</span>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
