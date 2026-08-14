'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  KNOWLEDGE_NODES, 
  KNOWLEDGE_LINKS, 
  KnowledgeNode, 
  KnowledgeLink 
} from '@/lib/data/knowledgeGraph';
import { COURSES_DATA } from '@/lib/data/courses';
import { Course, Lesson } from '@/lib/types';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Info, 
  CheckCircle2, 
  Search, 
  Share2, 
  GitFork,
  X,
  Play
} from 'lucide-react';

interface SimulationNode extends d3.SimulationNodeDatum, KnowledgeNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: SimulationNode | string;
  target: SimulationNode | string;
  strength: number;
  type: string;
  label: string;
  description: string;
}

interface KnowledgeMapProps {
  completedLessonIds?: string[];
  onSelectCourseToStudy?: (course: Course, lesson: Lesson) => void;
  onOpenAITutor?: () => void;
}

// Category Color Map
const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; dot: string; glow: string }> = {
  science: { bg: '#1e1b4b', border: '#818cf8', text: '#c7d2fe', dot: '#818cf8', glow: 'rgba(129, 140, 248, 0.4)' },
  coding: { bg: '#0c4a6e', border: '#38bdf8', text: '#bae6fd', dot: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' },
  engineering: { bg: '#134e4a', border: '#2dd4bf', text: '#99f6e4', dot: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.4)' },
  humanities: { bg: '#451a03', border: '#fb923c', text: '#fed7aa', dot: '#fb923c', glow: 'rgba(251, 146, 60, 0.4)' },
  specialized: { bg: '#3b0764', border: '#c084fc', text: '#e9d5ff', dot: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)' }
};

export function KnowledgeMap({
  completedLessonIds = [],
  onSelectCourseToStudy,
  onOpenAITutor
}: KnowledgeMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(KNOWLEDGE_NODES[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);
  const [pathSource, setPathSource] = useState<string>('formal-logic');
  const [pathTarget, setPathTarget] = useState<string>('ai-algorithms');
  const [isPathFinderOpen, setIsPathFinderOpen] = useState<boolean>(false);

  // Find shortest path between two nodes (Breadth-First Search)
  const calculateShortestPath = (startId: string, endId: string): string[] => {
    if (startId === endId) return [startId];
    
    // Build adjacency list (directed or undirected for path finding)
    const adjacency: Record<string, string[]> = {};
    KNOWLEDGE_NODES.forEach(n => { adjacency[n.id] = []; });
    
    KNOWLEDGE_LINKS.forEach(l => {
      const s = typeof l.source === 'string' ? l.source : (l.source as any).id;
      const t = typeof l.target === 'string' ? l.target : (l.target as any).id;
      if (adjacency[s]) adjacency[s].push(t);
      if (adjacency[t]) adjacency[t].push(s); // Bi-directional navigation
    });

    const queue: { node: string; path: string[] }[] = [{ node: startId, path: [startId] }];
    const visited = new Set<string>([startId]);

    while (queue.length > 0) {
      const { node, path } = queue.shift()!;
      if (node === endId) return path;

      const neighbors = adjacency[node] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({ node: neighbor, path: [...path, neighbor] });
        }
      }
    }
    return [startId, endId];
  };

  // Trigger Path Highlight
  const handleFindPath = () => {
    const path = calculateShortestPath(pathSource, pathTarget);
    setHighlightedPath(path);
  };

  const handleClearPath = () => {
    setHighlightedPath([]);
  };

  // Setup D3 Simulation
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = 620;

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Defs for arrow markers and glow filters
    const defs = svg.append('defs');

    // Arrow marker for standard links
    defs.append('marker')
      .attr('id', 'arrow-default')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-4L10,0L0,4')
      .attr('fill', '#52525b');

    // Arrow marker for highlighted path
    defs.append('marker')
      .attr('id', 'arrow-highlight')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 30)
      .attr('refY', 0)
      .attr('markerWidth', 7)
      .attr('markerHeight', 7)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-4L10,0L0,4')
      .attr('fill', '#38bdf8');

    // Create container group for zoom/pan
    const g = svg.append('g').attr('class', 'main-layer');

    // Setup Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Clone data for simulation
    const nodesData: SimulationNode[] = KNOWLEDGE_NODES.map(d => ({ ...d }));
    const linksData: SimulationLink[] = KNOWLEDGE_LINKS.map(d => ({
      ...d,
      source: d.source,
      target: d.target
    }));

    // Force simulation setup
    const simulation = d3.forceSimulation<SimulationNode>(nodesData)
      .force('link', d3.forceLink<SimulationNode, SimulationLink>(linksData)
        .id(d => d.id)
        .distance(150)
        .strength(0.6)
      )
      .force('charge', d3.forceManyBody().strength(-480))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Links render
    const linkGroup = g.append('g').attr('class', 'links');
    const link = linkGroup.selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke-width', d => Math.max(1.5, d.strength * 0.8))
      .attr('stroke', '#3f3f46')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-dasharray', d => d.type === 'philosophical-interlock' ? '4 3' : 'none')
      .attr('marker-end', 'url(#arrow-default)');

    // Link Labels (midpoint indicator)
    const linkText = g.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(linksData)
      .enter()
      .append('text')
      .attr('font-size', '9px')
      .attr('fill', '#71717a')
      .attr('text-anchor', 'middle')
      .attr('dy', -4)
      .attr('pointer-events', 'none')
      .text(d => d.label);

    // Nodes render
    const nodeGroup = g.append('g').attr('class', 'nodes');
    
    const node = nodeGroup.selectAll<SVGGElement, SimulationNode>('g')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('class', 'node-item')
      .attr('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, SimulationNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
      });

    // Node Outer Ring
    node.append('circle')
      .attr('r', d => d.level === 'Mastery' ? 24 : d.level === 'Lanjutan' ? 20 : 18)
      .attr('fill', d => {
        const theme = CATEGORY_COLORS[d.category] || CATEGORY_COLORS.science;
        return theme.bg;
      })
      .attr('stroke', d => {
        const theme = CATEGORY_COLORS[d.category] || CATEGORY_COLORS.science;
        return theme.border;
      })
      .attr('stroke-width', 2.5)
      .attr('class', 'transition-all duration-200');

    // Node Inner Center Core Indicator
    node.append('circle')
      .attr('r', 5)
      .attr('fill', d => {
        const theme = CATEGORY_COLORS[d.category] || CATEGORY_COLORS.science;
        return theme.dot;
      });

    // Node Text Label
    node.append('text')
      .text(d => d.label)
      .attr('x', 0)
      .attr('y', d => (d.level === 'Mastery' ? 34 : 28))
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('fill', '#e4e4e7')
      .attr('pointer-events', 'none');

    // Sub-label for category badge
    node.append('text')
      .text(d => `[${d.level}]`)
      .attr('x', 0)
      .attr('y', d => (d.level === 'Mastery' ? 46 : 40))
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('fill', '#a1a1aa')
      .attr('pointer-events', 'none');

    // Simulation tick handler
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as SimulationNode).x || 0)
        .attr('y1', d => (d.source as SimulationNode).y || 0)
        .attr('x2', d => (d.target as SimulationNode).x || 0)
        .attr('y2', d => (d.target as SimulationNode).y || 0);

      linkText
        .attr('x', d => (((d.source as SimulationNode).x || 0) + ((d.target as SimulationNode).x || 0)) / 2)
        .attr('y', d => (((d.source as SimulationNode).y || 0) + ((d.target as SimulationNode).y || 0)) / 2);

      node.attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
    });

    // Initial center zoom
    svg.call(zoom.transform, d3.zoomIdentity.translate(width * 0.05, 20).scale(0.92));

    return () => {
      simulation.stop();
    };
  }, []);

  // Update styles when selected node or highlighted path or category filter changes
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Filter nodes
    svg.selectAll<SVGGElement, SimulationNode>('.node-item')
      .each(function(d) {
        const el = d3.select(this);
        const circle = el.select('circle');
        
        const isMatchCategory = categoryFilter === 'all' || d.category === categoryFilter;
        const isMatchSearch = !searchQuery || d.label.toLowerCase().includes(searchQuery.toLowerCase()) || d.coreConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
        const isSelected = selectedNode?.id === d.id;
        const isInHighlightedPath = highlightedPath.includes(d.id);

        const isDimmed = (!isMatchCategory || !isMatchSearch) && !isInHighlightedPath && !isSelected;

        el.attr('opacity', isDimmed ? 0.25 : 1);

        if (isSelected) {
          circle
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 4);
        } else if (isInHighlightedPath) {
          circle
            .attr('stroke', '#38bdf8')
            .attr('stroke-width', 3.5);
        } else {
          const theme = CATEGORY_COLORS[d.category] || CATEGORY_COLORS.science;
          circle
            .attr('stroke', theme.border)
            .attr('stroke-width', 2.5);
        }
      });

    // Update Links Highlight
    svg.selectAll<SVGLineElement, SimulationLink>('.links line')
      .each(function(d) {
        const el = d3.select(this);
        const sourceId = typeof d.source === 'string' ? d.source : (d.source as any).id;
        const targetId = typeof d.target === 'string' ? d.target : (d.target as any).id;

        const isLinkInPath = highlightedPath.length > 1 && 
          highlightedPath.some((nodeId, idx) => {
            if (idx === highlightedPath.length - 1) return false;
            const nextNode = highlightedPath[idx + 1];
            return (sourceId === nodeId && targetId === nextNode) || (sourceId === nextNode && targetId === nodeId);
          });

        const isRelatedToSelected = selectedNode && (sourceId === selectedNode.id || targetId === selectedNode.id);

        if (isLinkInPath) {
          el
            .attr('stroke', '#38bdf8')
            .attr('stroke-width', 3)
            .attr('stroke-opacity', 1)
            .attr('marker-end', 'url(#arrow-highlight)');
        } else if (isRelatedToSelected) {
          el
            .attr('stroke', '#e4e4e7')
            .attr('stroke-width', 2.5)
            .attr('stroke-opacity', 0.9)
            .attr('marker-end', 'url(#arrow-default)');
        } else {
          el
            .attr('stroke', '#3f3f46')
            .attr('stroke-width', Math.max(1.5, d.strength * 0.8))
            .attr('stroke-opacity', 0.5)
            .attr('marker-end', 'url(#arrow-default)');
        }
      });

  }, [selectedNode, categoryFilter, searchQuery, highlightedPath]);

  // Zoom Helpers
  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.3);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.7);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current || !containerRef.current) return;
    const width = containerRef.current.clientWidth || 900;
    d3.select(svgRef.current).transition().duration(400).call(
      zoomBehaviorRef.current.transform,
      d3.zoomIdentity.translate(width * 0.05, 20).scale(0.92)
    );
  };

  // Find linked course object if available
  const matchedCourse = useMemo(() => {
    if (!selectedNode?.courseId) return null;
    return COURSES_DATA.find(c => c.id === selectedNode.courseId) || null;
  }, [selectedNode]);

  // Check prerequisites completion
  const prerequisitesCompleted = useMemo(() => {
    if (!selectedNode) return true;
    return selectedNode.prerequisites.every(prereqId => {
      const prereqNode = KNOWLEDGE_NODES.find(n => n.id === prereqId);
      if (!prereqNode?.courseId) return true;
      const course = COURSES_DATA.find(c => c.id === prereqNode.courseId);
      if (!course) return true;
      const allLessons = course.modules.flatMap(m => m.lessons.map(l => l.id));
      return allLessons.some(lId => completedLessonIds.includes(lId));
    });
  }, [selectedNode, completedLessonIds]);

  return (
    <div className="space-y-6" id="knowledge-map-root">
      {/* Top Header Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <Network className="w-4 h-4 text-zinc-300" />
            <span>Peta Relasi Antardisiplin Ilmu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-100 tracking-tight">
            Peta Pengetahuan Global (Knowledge Map)
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Eksplorasi keterhubungan hierarkis dan sinergi matematis antardisiplin ilmu: bagaimana Logika & Kalkulus menopang Fisika Teoretis, Rekayasa Perangkat Lunak, Kriptografi, hingga Hukum Konstitusional dan Tata Negara.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setIsPathFinderOpen(!isPathFinderOpen)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              id="btn-toggle-path-finder"
            >
              <GitFork className="w-3.5 h-3.5 text-zinc-400" />
              <span>{isPathFinderOpen ? 'Tutup Simulator Rute' : 'Simulasi Alur Studi'}</span>
            </button>
            <button
              onClick={onOpenAITutor}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              id="btn-tutor-knowledge-map"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Diskusi Sinergi Bersama Tutor</span>
            </button>
          </div>
        </div>

        {/* Quick Legend Widget */}
        <div className="z-10 bg-black/60 border border-zinc-800/80 p-4 rounded-2xl space-y-2 text-xs text-zinc-300 shrink-0 w-full lg:w-auto">
          <span className="font-semibold text-zinc-400 text-[11px] block">Kategori Disiplin:</span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <span>Sains & Matematika</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>Komputasi & Sekuriti</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span>Rekayasa & Arsitektur</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Filsafat, Hukum & PPKN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Path Finder Bar (Collapsible) */}
      {isPathFinderOpen && (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <Compass className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Rute Belajar:</span>
            </div>

            {/* Source Selector */}
            <select
              value={pathSource}
              onChange={(e) => setPathSource(e.target.value)}
              className="bg-black/70 border border-zinc-700 text-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-zinc-500"
            >
              {KNOWLEDGE_NODES.map(n => (
                <option key={`src-${n.id}`} value={n.id}>Dari: {n.label}</option>
              ))}
            </select>

            <ArrowRight className="w-4 h-4 text-zinc-500 hidden sm:block shrink-0" />

            {/* Target Selector */}
            <select
              value={pathTarget}
              onChange={(e) => setPathTarget(e.target.value)}
              className="bg-black/70 border border-zinc-700 text-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-zinc-500"
            >
              {KNOWLEDGE_NODES.map(n => (
                <option key={`tgt-${n.id}`} value={n.id}>Menuju: {n.label}</option>
              ))}
            </select>

            <button
              onClick={handleFindPath}
              className="px-4 py-2 bg-zinc-200 hover:bg-white text-zinc-950 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
              id="btn-run-path-finding"
            >
              Sorot Trajektori Jalur
            </button>

            {highlightedPath.length > 0 && (
              <button
                onClick={handleClearPath}
                className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0"
              >
                Reset Sorotan
              </button>
            )}
          </div>

          {highlightedPath.length > 0 && (
            <div className="text-xs text-zinc-400 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
              <span>Jalur:</span>
              <strong className="text-zinc-200 font-mono">
                {highlightedPath.map(id => KNOWLEDGE_NODES.find(n => n.id === id)?.label).join(' → ')}
              </strong>
            </div>
          )}
        </div>
      )}

      {/* Main Grid: D3 Visual Graph + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Graph Area (Span 8) */}
        <div className="lg:col-span-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 sm:p-6 relative shadow-sm flex flex-col">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-800">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === 'all'
                    ? 'bg-zinc-200 text-zinc-950 font-semibold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Semua Disiplin
              </button>
              <button
                onClick={() => setCategoryFilter('science')}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === 'science'
                    ? 'bg-indigo-500 text-white font-semibold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Sains & Matematika
              </button>
              <button
                onClick={() => setCategoryFilter('coding')}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === 'coding'
                    ? 'bg-sky-500 text-white font-semibold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Komputasi & Sekuriti
              </button>
              <button
                onClick={() => setCategoryFilter('humanities')}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === 'humanities'
                    ? 'bg-amber-500 text-zinc-950 font-semibold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Filsafat & Tata Negara
              </button>
              <button
                onClick={() => setCategoryFilter('engineering')}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === 'engineering'
                    ? 'bg-teal-500 text-zinc-950 font-semibold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Arsitektur & Rekayasa
              </button>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 bg-black/60 border border-zinc-700/80 rounded-full px-3 py-1.5 text-xs text-zinc-300 w-full sm:w-48">
              <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Cari konsep / topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent focus:outline-none w-full placeholder:text-zinc-500 text-xs"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-zinc-500 hover:text-zinc-300">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* D3 Canvas Container */}
          <div
            ref={containerRef}
            className="w-full h-[540px] bg-black/70 border border-zinc-800/80 rounded-2xl relative overflow-hidden flex items-center justify-center"
          >
            <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Float Zoom Controls at Bottom-Right */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-2xl shadow-md z-10">
              <button
                onClick={handleZoomIn}
                title="Perbesar Grafik"
                className="p-2 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                id="btn-map-zoomin"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Perkecil Grafik"
                className="p-2 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                id="btn-map-zoomout"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Pusatkan Ulang"
                className="p-2 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                id="btn-map-resetzoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction tooltip badge */}
            <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800/80 px-3 py-1.5 rounded-full text-[11px] text-zinc-400 pointer-events-none flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              <span>Klik node untuk rincian • Geser & scroll untuk navigasi peta</span>
            </div>
          </div>
        </div>

        {/* Node Detail & Interdisciplinary Inspector (Span 4) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedNode ? (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-sm space-y-5">
              {/* Header of Inspector */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {selectedNode.categoryLabel} • Tingkat {selectedNode.level}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    ~{selectedNode.estimatedHours} Jam Studi
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Core Competencies */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Kompetensi Inti & Konsep:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.coreConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/60 text-zinc-300 border border-zinc-800"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interdisciplinary Synergies Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-800">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Sinergi Antardisiplin Ilmu:</span>
                </span>
                
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1 text-xs">
                  {selectedNode.interdisciplinarySynergy.map((syn, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-black/50 border border-zinc-800 rounded-xl space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-200">
                        <span>→ {syn.targetName}</span>
                        <span className="text-zinc-500 font-mono text-[10px]">{syn.relationship}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        {syn.mathematicalOrTheoreticalLink}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Application */}
              <div className="p-3 bg-black/40 border border-zinc-800/80 rounded-2xl space-y-1 text-xs">
                <span className="text-[11px] font-semibold text-zinc-300 block">
                  Penerapan Riset & Industri Nyata:
                </span>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {selectedNode.realWorldApplication}
                </p>
              </div>

              {/* Launch Course Action */}
              {matchedCourse && onSelectCourseToStudy ? (
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      const firstLesson = matchedCourse.modules[0]?.lessons[0];
                      if (firstLesson) {
                        onSelectCourseToStudy(matchedCourse, firstLesson);
                      }
                    }}
                    className="w-full py-3 bg-zinc-200 hover:bg-white text-zinc-950 font-semibold text-xs rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                    id="btn-launch-course-from-map"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Buka Kurikulum: {matchedCourse.title}</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 px-2">
                    <span>Prasyarat Terbuka:</span>
                    <span className="flex items-center gap-1 font-medium text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{prerequisitesCompleted ? 'Siap Dipelajari' : 'Perlu Fondasi Terlebih Dahulu'}</span>
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onOpenAITutor}
                  className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-zinc-400" />
                  <span>Konsultasi Topik Ini Bersama Tutor</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-500 text-xs flex flex-col items-center justify-center space-y-2 h-full">
              <Network className="w-8 h-8 text-zinc-600 mb-2" />
              <p>Pilih salah satu node pada grafik di samping untuk melihat hierarki konsep dan analisis sinergi keilmuan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
