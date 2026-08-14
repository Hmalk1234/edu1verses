'use client';

import React, { useState } from 'react';
import { 
  Palette, 
  Layers, 
  Sparkles, 
  Copy, 
  Check, 
  Sliders, 
  Search, 
  Command, 
  ArrowRight, 
  Zap, 
  Code2, 
  RefreshCw, 
  Terminal, 
  Activity, 
  Box, 
  Globe, 
  FileText, 
  Download, 
  ExternalLink, 
  MousePointer, 
  CheckCircle2, 
  AlertCircle, 
  Wand2,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Edit3,
  Flame,
  Maximize2,
  Minimize2,
  Eye,
  Settings,
  Cpu,
  Bookmark,
  Share2,
  RotateCcw,
  Sparkle,
  SlidersVertical,
  HelpCircle,
  FolderDown,
  LayoutGrid,
  FileCode2,
  TrendingUp,
  Clock,
  Laptop
} from 'lucide-react';

interface ColorToken {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  hsl: string;
  oklch?: string;
  contrastOnBg: string;
  wcagRating?: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  usage: string;
}

interface TypographyStep {
  level: string;
  sizePx: string;
  sizeRem?: string;
  lineHeight: string;
  letterSpacing?: string;
  weight: string;
  usage: string;
}

interface ComponentSpec {
  name: string;
  description: string;
  propsInterface: string;
  anatomy: string;
  states: {
    state: string;
    background: string;
    border: string;
    text: string;
    shadowOrRing: string;
  }[];
  jsxSnippet: string;
}

interface MotionSpec {
  name: string;
  timing: string;
  bezierOrSpring: string;
  usage: string;
}

interface DesignSystemData {
  id: string;
  name: string;
  url: string;
  archetype: string;
  brandEthos: string;
  colors: ColorToken[];
  typography: {
    sansFont: string;
    monoFont: string;
    displayFont: string;
    scaleRatio: string;
    scaleSteps: TypographyStep[];
  };
  radii: {
    name: string;
    value: string;
    targetElement: string;
    nestedFormulaExplanation?: string;
  }[];
  shadows: {
    name: string;
    value: string;
    usage: string;
    backdropBlur?: string;
  }[];
  spacing: {
    baseUnit: string;
    containerPadding: string;
    cardGap: string;
    sectionMargin?: string;
  };
  motion?: MotionSpec[];
  components?: ComponentSpec[];
  antiPatterns?: string[];
  tailwindConfig: string;
  cssVariables: string;
  designMd: string;
}

const PRESET_SYSTEMS: DesignSystemData[] = [
  {
    id: 'linear',
    name: 'Linear App',
    url: 'https://linear.app',
    archetype: 'Issue Tracking / DevTools Precision',
    brandEthos: 'Minimalist high-density dark mode, subtle violet/indigo luminescent accents, strict 1.25 major third typography, and razor 1px micro-border precision.',
    colors: [
      { name: 'Canvas Void', role: 'bg-root', hex: '#08090a', rgb: '8, 9, 10', hsl: '210 11% 4%', oklch: 'oklch(0.12 0.005 240)', contrastOnBg: '20.1:1', wcagRating: 'AAA', usage: 'Aplikasi background utama' },
      { name: 'Surface Panel', role: 'surface-card', hex: '#121417', rgb: '18, 20, 23', hsl: '216 12% 8%', oklch: 'oklch(0.18 0.007 235)', contrastOnBg: '16.8:1', wcagRating: 'AAA', usage: 'Kartu bento, dialog modal' },
      { name: 'Hairline Border', role: 'border-subtle', hex: '#22262b', rgb: '34, 38, 43', hsl: '213 12% 15%', oklch: 'oklch(0.26 0.008 230)', contrastOnBg: '4.2:1', wcagRating: 'AA', usage: 'Garis batas 1px micro-border' },
      { name: 'Text Primary', role: 'text-primary', hex: '#f7f8f8', rgb: '247, 248, 248', hsl: '180 3% 97%', oklch: 'oklch(0.97 0.001 0)', contrastOnBg: '19.4:1', wcagRating: 'AAA', usage: 'Heading & teks utama' },
      { name: 'Text Muted', role: 'text-muted', hex: '#8a8f98', rgb: '138, 143, 152', hsl: '219 6% 57%', oklch: 'oklch(0.68 0.01 240)', contrastOnBg: '6.9:1', wcagRating: 'AAA', usage: 'Keterangan sekunder & metadata' },
      { name: 'Linear Violet', role: 'accent-brand', hex: '#5e6ad2', rgb: '94, 106, 210', hsl: '234 58% 60%', oklch: 'oklch(0.55 0.18 275)', contrastOnBg: '8.4:1', wcagRating: 'AAA', usage: 'Primary CTA & status aktif' }
    ],
    typography: {
      sansFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      monoFont: 'JetBrains Mono, monospace',
      displayFont: 'Inter',
      scaleRatio: '1.25 (Major Third)',
      scaleSteps: [
        { level: 'Display H1', sizePx: '36px - 44px', sizeRem: '2.25rem', lineHeight: '1.15', letterSpacing: '-0.025em', weight: '700 Bold', usage: 'Hero & page titles' },
        { level: 'Heading H2', sizePx: '24px - 28px', sizeRem: '1.5rem', lineHeight: '1.25', letterSpacing: '-0.02em', weight: '600 SemiBold', usage: 'Section titles' },
        { level: 'Heading H3', sizePx: '16px - 18px', sizeRem: '1.125rem', lineHeight: '1.35', letterSpacing: '-0.01em', weight: '600 SemiBold', usage: 'Card titles' },
        { level: 'Body Text', sizePx: '13px - 14px', sizeRem: '0.875rem', lineHeight: '1.55', letterSpacing: '0', weight: '400 Regular', usage: 'Data table & issue description' },
        { level: 'Caption / KBD', sizePx: '11px - 12px', sizeRem: '0.75rem', lineHeight: '1.4', letterSpacing: '0.01em', weight: '500 Medium', usage: 'Badges, keyboard shortcuts' }
      ]
    },
    radii: [
      { name: 'Radius XS', value: '4px', targetElement: 'Badges, tags, filter chips', nestedFormulaExplanation: 'Micro element corner' },
      { name: 'Radius SM', value: '8px', targetElement: 'Buttons, text inputs, dropdown menus', nestedFormulaExplanation: 'Child element inside 14px card with 6px gap' },
      { name: 'Radius MD', value: '14px', targetElement: 'Bento cards, drawer panels', nestedFormulaExplanation: 'Parent container corner radius' },
      { name: 'Radius Full', value: '9999px', targetElement: 'Avatar circles, pill status', nestedFormulaExplanation: 'Capsule form' }
    ],
    shadows: [
      { name: 'Luminescent Edge', value: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)', usage: 'Top border illumination' },
      { name: 'Command Palette Depth', value: '0 16px 70px rgba(0,0,0,0.6)', usage: '⌘K Command search modal', backdropBlur: 'blur(16px)' }
    ],
    spacing: {
      baseUnit: '4px',
      containerPadding: '24px',
      cardGap: '12px',
      sectionMargin: '48px'
    },
    motion: [
      { name: 'Snappy Active Feedback', timing: '120ms', bezierOrSpring: 'cubic-bezier(0.2, 0.8, 0.2, 1)', usage: 'Button active scale down to 0.98' },
      { name: 'Command Palette Reveal', timing: '200ms', bezierOrSpring: 'cubic-bezier(0.16, 1, 0.3, 1)', usage: '⌘K modal fade & slide entry' }
    ],
    components: [
      {
        name: 'Action Button',
        description: 'Linear signature button with 1px border and luminescent hover glow.',
        propsInterface: 'interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md"; }',
        anatomy: 'Container [Radius SM: 8px] -> Icon (14px) -> Text Label (13px Medium) -> Keycap Hint (10px)',
        states: [
          { state: 'Default', background: '#5e6ad2', border: '1px solid rgba(255,255,255,0.15)', text: '#ffffff', shadowOrRing: '0 1px 2px rgba(0,0,0,0.2)' },
          { state: 'Hover', background: '#6875e5', border: '1px solid rgba(255,255,255,0.25)', text: '#ffffff', shadowOrRing: '0 4px 14px rgba(94,106,210,0.35)' },
          { state: 'Active', background: '#535ec0', border: '1px solid rgba(255,255,255,0.1)', text: '#ffffff', shadowOrRing: 'scale(0.98)' }
        ],
        jsxSnippet: `<button className="px-3.5 py-1.5 bg-[#5e6ad2] hover:bg-[#6875e5] text-white text-xs font-medium rounded-lg border border-white/15 transition-all active:scale-[0.98] flex items-center gap-2">
  <span>New Issue</span>
  <kbd className="px-1 py-0.5 bg-black/20 text-[10px] font-mono rounded">C</kbd>
</button>`
      }
    ],
    antiPatterns: [
      'Dilarang menggunakan border lebih tebal dari 1px pada kontainer.',
      'Dilarang menggunakan bayangan drop shadow berwarna warni tanpa luminansi gelap.',
      'Dilarang melompat langsung dari H1 ke H3 tanpa H2.',
      'Dilarang membuat teks tombol melompat ke dua baris.'
    ],
    tailwindConfig: `// Tailwind CSS Token Config for Linear
export default {
  theme: {
    extend: {
      colors: {
        linear: {
          bg: '#08090a',
          surface: '#121417',
          border: '#22262b',
          text: '#f7f8f8',
          muted: '#8a8f98',
          accent: '#5e6ad2',
        }
      },
      borderRadius: {
        'linear-sm': '8px',
        'linear-md': '14px',
      }
    }
  }
};`,
    cssVariables: `:root {
  --color-bg: #08090a;
  --color-surface: #121417;
  --color-border: #22262b;
  --color-text-primary: #f7f8f8;
  --color-text-muted: #8a8f98;
  --color-accent: #5e6ad2;
  --radius-button: 8px;
  --radius-card: 14px;
}`,
    designMd: `# DESIGN.md — Linear App Design System Architecture

## 1. Executive Summary & Brand Visual Ethos
Linear represents high-velocity engineering craft, absolute minimalism, and low visual friction. Built for power users, every pixel is calibrated for high information density without feeling cramped.

### Core Tenets:
- **Zero Decorative Fluff**: Every line, border, and background serves structural grouping.
- **Micro-Border Framing**: Surfaces are bounded by strict 1px hairline borders (\`#22262b\`) with subtle top-edge luminosity.
- **Obsidian Gradient Void**: The background canvas (\`#08090a\`) anchors the UI, creating deep contrast for active elements.

---

## 2. Color Palette & WCAG AAA Accessibility Matrix
| Role | Token Name | HEX | RGB | Contrast on Canvas | WCAG Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Canvas** | \`--linear-bg\` | \`#08090a\` | 8, 9, 10 | 1:1 (Root) | Base |
| **Surface** | \`--linear-surface\` | \`#121417\` | 18, 20, 23 | 1.8:1 | Layer 1 |
| **Border** | \`--linear-border\` | \`#22262b\` | 34, 38, 43 | 4.2:1 | AA Pass |
| **Primary Text** | \`--linear-text\` | \`#f7f8f8\` | 247, 248, 248 | 19.4:1 | **AAA Pass** |
| **Muted Text** | \`--linear-muted\` | \`#8a8f98\` | 138, 143, 152 | 6.9:1 | **AAA Pass** |
| **Brand Accent** | \`--linear-accent\` | \`#5e6ad2\` | 94, 106, 210 | 8.4:1 | **AAA Pass** |

---

## 3. Typography Scale & Optical Hierarchy
- **Primary Typeface**: \`Inter, -apple-system, BlinkMacSystemFont, sans-serif\`
- **Monospace Typeface**: \`JetBrains Mono, monospace\`
- **Scale Factor**: \`1.25 (Major Third)\`

\`\`\`
Display (H1)  : 36px / 1.15 / -0.025em / 700 Bold
Heading (H2)  : 24px / 1.25 / -0.020em / 600 SemiBold
Card Title (H3): 16px / 1.35 / -0.010em / 600 SemiBold
Body Text     : 13px / 1.55 /  0.000em / 400 Regular
Caption/KBD   : 11px / 1.40 / +0.010em / 500 Medium
\`\`\`

---

## 4. Corner Radii & Nested Math
When elements nest inside containers, radii must obey the mathematical formula:
$$\\text{Radius}_{\\text{inner}} = \\text{Radius}_{\\text{outer}} - \\text{Padding}$$

- **Parent Bento Card**: $R_{\\text{outer}} = 14\\text{px}$, Padding $= 6\\text{px}$
- **Child Button / Control**: $R_{\\text{inner}} = 14\\text{px} - 6\\text{px} = 8\\text{px}$

---

## 5. Elevation, Depth & Micro-Interactions
- **Active Button Compression**: \`active:scale-[0.98]\` with duration 120ms \`cubic-bezier(0.2, 0.8, 0.2, 1)\`.
- **Command Bar Layer**: \`backdrop-filter: blur(16px)\` + elevation shadow \`0 16px 70px rgba(0,0,0,0.6)\`.`
  },
  {
    id: 'stripe',
    name: 'Stripe Press',
    url: 'https://stripe.com',
    archetype: 'Fintech & Global Commerce',
    brandEthos: 'Fintech elegance, rich obsidian indigo slate, silky smooth micro-shadows, friendly humanist geometry, and mathematical gradient meshes.',
    colors: [
      { name: 'Slate Indigo Canvas', role: 'bg-root', hex: '#0a2540', rgb: '10, 37, 64', hsl: '210 73% 15%', oklch: 'oklch(0.25 0.08 250)', contrastOnBg: '17.2:1', wcagRating: 'AAA', usage: 'Deep dark indigo canvas' },
      { name: 'Surface Pure', role: 'surface-card', hex: '#ffffff', rgb: '255, 255, 255', hsl: '0 0% 100%', oklch: 'oklch(1.0 0 0)', contrastOnBg: '19.8:1', wcagRating: 'AAA', usage: 'White card components' },
      { name: 'Border Crisp', role: 'border-subtle', hex: '#e2e8f0', rgb: '226, 232, 240', hsl: '214 32% 91%', oklch: 'oklch(0.92 0.01 240)', contrastOnBg: '1.3:1', wcagRating: 'AA', usage: 'Clean slate borders' },
      { name: 'Text Dark', role: 'text-primary', hex: '#0a2540', rgb: '10, 37, 64', hsl: '210 73% 15%', oklch: 'oklch(0.25 0.08 250)', contrastOnBg: '16.5:1', wcagRating: 'AAA', usage: 'High contrast titles' },
      { name: 'Text Subtitle', role: 'text-muted', hex: '#425466', rgb: '66, 84, 102', hsl: '210 21% 33%', oklch: 'oklch(0.45 0.04 245)', contrastOnBg: '8.2:1', wcagRating: 'AAA', usage: 'Body descriptions' },
      { name: 'Stripe Indigo', role: 'accent-brand', hex: '#635bff', rgb: '99, 91, 255', hsl: '243 100% 68%', oklch: 'oklch(0.60 0.24 280)', contrastOnBg: '6.7:1', wcagRating: 'AAA', usage: 'Iconic Stripe blurple CTA' }
    ],
    typography: {
      sansFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      monoFont: '"SF Mono", "Roboto Mono", monospace',
      displayFont: 'Söhne, -apple-system, sans-serif',
      scaleRatio: '1.333 (Perfect Fourth)',
      scaleSteps: [
        { level: 'Display H1', sizePx: '48px - 64px', sizeRem: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.03em', weight: '700 Bold', usage: 'Hero headlines' },
        { level: 'Heading H2', sizePx: '32px - 38px', sizeRem: '2.25rem', lineHeight: '1.2', letterSpacing: '-0.02em', weight: '600 SemiBold', usage: 'Feature titles' },
        { level: 'Heading H3', sizePx: '20px - 24px', sizeRem: '1.375rem', lineHeight: '1.3', letterSpacing: '-0.01em', weight: '600 SemiBold', usage: 'Product cards' },
        { level: 'Body Text', sizePx: '16px - 18px', sizeRem: '1.0625rem', lineHeight: '1.6', letterSpacing: '0', weight: '400 Regular', usage: 'Paragraph explanations' },
        { level: 'Caption', sizePx: '13px - 14px', sizeRem: '0.875rem', lineHeight: '1.4', letterSpacing: '0.01em', weight: '500 Medium', usage: 'API parameter badges' }
      ]
    },
    radii: [
      { name: 'Radius Small', value: '6px', targetElement: 'Code tags, status chips', nestedFormulaExplanation: 'Micro chips' },
      { name: 'Radius Button', value: '20px', targetElement: 'Pill action buttons', nestedFormulaExplanation: 'Humanist pill curve' },
      { name: 'Radius Card', value: '16px', targetElement: 'Payment forms, pricing tables', nestedFormulaExplanation: 'Container envelope' },
      { name: 'Radius Large', value: '24px', targetElement: 'Hero containers', nestedFormulaExplanation: 'Hero canvas' }
    ],
    shadows: [
      { name: 'Stripe Elevation 1', value: '0 2px 5px -1px rgba(50,50,93,.25), 0 1px 3px -1px rgba(0,0,0,.3)', usage: 'Card default shadow' },
      { name: 'Stripe Elevation 2', value: '0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3)', usage: 'Hover elevated state' }
    ],
    spacing: {
      baseUnit: '8px',
      containerPadding: '32px',
      cardGap: '24px',
      sectionMargin: '64px'
    },
    tailwindConfig: `// Tailwind CSS Token Config for Stripe
export default {
  theme: {
    extend: {
      colors: {
        stripe: {
          slate: '#0a2540',
          blurple: '#635bff',
          cyan: '#00d4ff',
          muted: '#425466',
          card: '#ffffff',
        }
      },
      borderRadius: {
        'stripe-pill': '20px',
        'stripe-card': '16px',
      }
    }
  }
};`,
    cssVariables: `:root {
  --stripe-bg: #0a2540;
  --stripe-accent: #635bff;
  --stripe-muted: #425466;
  --stripe-radius-pill: 20px;
  --stripe-radius-card: 16px;
}`,
    designMd: `# DESIGN.md — Stripe Press Design System Architecture

## 1. Executive Summary
Stripe set the benchmark for global payments and modern visual web infrastructure. The system focuses on friendly yet authoritative geometry, rich contrast, and mathematically balanced layout grids.`
  },
  {
    id: 'apple-sf',
    name: 'Apple SF System',
    url: 'https://apple.com',
    archetype: 'Spatial & Human Interface Guidelines',
    brandEthos: 'San Francisco design principles: continuous squircle curves, layered frosted translucency, optical typography kerning, and natural haptic micro-interactions.',
    colors: [
      { name: 'OLED Black', role: 'bg-root', hex: '#000000', rgb: '0, 0, 0', hsl: '0 0% 0%', contrastOnBg: '21:1', wcagRating: 'AAA', usage: 'True OLED canvas' },
      { name: 'Glass Sheet', role: 'surface-card', hex: '#1c1c1e', rgb: '28, 28, 30', hsl: '240 3% 11%', contrastOnBg: '17.1:1', wcagRating: 'AAA', usage: 'Secondary system background' },
      { name: 'Vibrant Border', role: 'border-subtle', hex: '#38383a', rgb: '56, 56, 58', hsl: '240 2% 22%', contrastOnBg: '4.9:1', wcagRating: 'AA', usage: 'Translucent separator' },
      { name: 'System White', role: 'text-primary', hex: '#ffffff', rgb: '255, 255, 255', hsl: '0 0% 100%', contrastOnBg: '21:1', wcagRating: 'AAA', usage: 'SF Pro primary label' },
      { name: 'Secondary Gray', role: 'text-muted', hex: '#8e8e93', rgb: '142, 142, 147', hsl: '240 2% 57%', contrastOnBg: '7.1:1', wcagRating: 'AAA', usage: 'Secondary label' },
      { name: 'SF System Blue', role: 'accent-brand', hex: '#0a84ff', rgb: '10, 132, 255', hsl: '210 100% 52%', contrastOnBg: '8.9:1', wcagRating: 'AAA', usage: 'System tint & active control' }
    ],
    typography: {
      sansFont: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif',
      monoFont: '"SF Mono", Menlo, monospace',
      displayFont: '"SF Pro Display", -apple-system, sans-serif',
      scaleRatio: '1.2 (Minor Third)',
      scaleSteps: [
        { level: 'Large Title', sizePx: '34px', lineHeight: '1.2', weight: '700 Bold', usage: 'iOS / macOS main view headers' },
        { level: 'Title 1', sizePx: '28px', lineHeight: '1.25', weight: '600 SemiBold', usage: 'Section level 1' },
        { level: 'Title 2', sizePx: '22px', lineHeight: '1.3', weight: '600 SemiBold', usage: 'Section level 2' },
        { level: 'Headline / Body', sizePx: '17px', lineHeight: '1.45', weight: '400 Regular', usage: 'Standard reading body' },
        { level: 'Footnote', sizePx: '13px', lineHeight: '1.4', weight: '400 Regular', usage: 'Timestamp & small captions' }
      ]
    },
    radii: [
      { name: 'SF Continuous SM', value: '10px', targetElement: 'List cells, segmented pickers', nestedFormulaExplanation: 'Squircle curve' },
      { name: 'SF Continuous MD', value: '16px', targetElement: 'Action cards, control groups', nestedFormulaExplanation: 'Widget inner layer' },
      { name: 'SF Continuous LG', value: '26px', targetElement: 'App widgets, floating sheets', nestedFormulaExplanation: 'App icon / Widget outer boundary' },
      { name: 'SF Capsule', value: '9999px', targetElement: 'Capsule buttons & search pills', nestedFormulaExplanation: 'Full pill shape' }
    ],
    shadows: [
      { name: 'Spatial Layer 1', value: '0 4px 14px 0 rgba(0, 0, 0, 0.25)', usage: 'Widget elevation', backdropBlur: 'blur(24px)' },
      { name: 'Vision Sheet Glow', value: '0 20px 50px rgba(0, 0, 0, 0.5)', usage: 'Modal presentation', backdropBlur: 'blur(32px)' }
    ],
    spacing: {
      baseUnit: '4px',
      containerPadding: '20px',
      cardGap: '16px'
    },
    tailwindConfig: `// Tailwind CSS Token Config for Apple SF
export default {
  theme: {
    extend: {
      colors: {
        sf: {
          black: '#000000',
          surface: '#1c1c1e',
          border: '#38383a',
          blue: '#0a84ff',
          gray: '#8e8e93',
        }
      },
      borderRadius: {
        'sf-sm': '10px',
        'sf-md': '16px',
        'sf-lg': '26px',
      }
    }
  }
};`,
    cssVariables: `:root {
  --sf-bg: #000000;
  --sf-card: #1c1c1e;
  --sf-border: #38383a;
  --sf-blue: #0a84ff;
  --sf-gray: #8e8e93;
}`,
    designMd: `# DESIGN.md — Apple SF Human Interface Architecture

## 1. Design Philosophy
Content deference, clarity, continuous squircle curvature, and frosted translucent layering (\`backdrop-filter: blur(24px)\`).`
  }
];

export function DesignSFShowcase() {
  const [activeSystem, setActiveSystem] = useState<DesignSystemData>(PRESET_SYSTEMS[0]);
  const [activeTab, setActiveTab] = useState<'sandbox' | 'design-md' | 'tokens-audit' | 'components' | 'export'>('sandbox');
  
  // AI Generator & Extractor Form State
  const [generatorMode, setGeneratorMode] = useState<'prompt' | 'url' | 'refine'>('prompt');
  const [aiPrompt, setAiPrompt] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('Engineering / DevTools Precision');
  const [selectedThemeStyle, setSelectedThemeStyle] = useState('Obsidian Dark Minimal');
  const [selectedContrast, setSelectedContrast] = useState('WCAG AAA');
  const [selectedCornerStyle, setSelectedCornerStyle] = useState('mathematical-nested');
  
  // Loading & Error States
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  // Live Token Sandbox Controls
  const [customRadius, setCustomRadius] = useState<'sharp' | 'subtle' | 'modern' | 'pill'>('modern');
  const [customAccent, setCustomAccent] = useState<string>(activeSystem.colors[5]?.hex || '#5e6ad2');
  const [sliderVal, setSliderVal] = useState(68);
  const [toggleState, setToggleState] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isEditingMarkdown, setIsEditingMarkdown] = useState(false);
  const [editableMdText, setEditableMdText] = useState(activeSystem.designMd);

  // AI Generation & Refinement Handler
  const handleAIGenerate = async (overrideAction?: 'generate' | 'audit' | 'refine') => {
    const action = overrideAction || (generatorMode === 'refine' ? 'refine' : generatorMode === 'url' ? 'audit' : 'generate');
    
    if (action === 'audit' && !urlInput.trim()) {
      setErrorMessage('Silakan masukkan URL website yang ingin diaudit.');
      return;
    }
    if ((action === 'generate' || action === 'refine') && !aiPrompt.trim() && !urlInput.trim()) {
      setErrorMessage('Silakan tuliskan deskripsi sistem desain atau instruksi refine.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setGenerationSuccess(false);

    try {
      const res = await fetch('/api/gemini/design-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: generatorMode === 'url' ? urlInput.trim() : undefined,
          prompt: aiPrompt.trim() || urlInput.trim(),
          archetype: selectedArchetype,
          themeStyle: selectedThemeStyle,
          contrastRequirement: selectedContrast,
          cornerStyle: selectedCornerStyle,
          actionType: action,
          previousSystem: action === 'refine' ? activeSystem : undefined
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Gagal menyusun sistem desain dengan AI.');
      }

      const data = await res.json();

      const newSystem: DesignSystemData = {
        id: data.id || 'custom-' + Date.now(),
        name: data.name || 'Custom AI Design System',
        url: data.url || (urlInput.trim() ? urlInput.trim() : 'https://design-sf.vercel.app'),
        archetype: data.archetype || selectedArchetype,
        brandEthos: data.brandEthos || 'Disusun secara otomatis oleh AI Design Architecture Engine.',
        colors: data.tokens?.colors || PRESET_SYSTEMS[0].colors,
        typography: data.tokens?.typography || PRESET_SYSTEMS[0].typography,
        radii: data.tokens?.radii || PRESET_SYSTEMS[0].radii,
        shadows: data.tokens?.shadows || PRESET_SYSTEMS[0].shadows,
        spacing: data.tokens?.spacing || PRESET_SYSTEMS[0].spacing,
        motion: data.tokens?.motion || PRESET_SYSTEMS[0].motion,
        components: data.components || PRESET_SYSTEMS[0].components,
        antiPatterns: data.antiPatterns || PRESET_SYSTEMS[0].antiPatterns,
        tailwindConfig: data.tailwindConfig || PRESET_SYSTEMS[0].tailwindConfig,
        cssVariables: data.cssVariables || PRESET_SYSTEMS[0].cssVariables,
        designMd: data.designMd || PRESET_SYSTEMS[0].designMd,
      };

      setActiveSystem(newSystem);
      setEditableMdText(newSystem.designMd);
      const firstAccent = newSystem.colors.find(c => c.role.includes('accent') || c.role.includes('brand'))?.hex || newSystem.colors[0]?.hex || '#5e6ad2';
      setCustomAccent(firstAccent);
      setGenerationSuccess(true);
      setActiveTab('design-md');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Terjadi kesalahan saat memproses sistem desain dengan AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRadiusStyle = () => {
    switch (customRadius) {
      case 'sharp': return 'rounded-none';
      case 'subtle': return 'rounded-md';
      case 'modern': return 'rounded-2xl';
      case 'pill': return 'rounded-3xl';
    }
  };

  const getBtnRadiusStyle = () => {
    switch (customRadius) {
      case 'sharp': return 'rounded-none';
      case 'subtle': return 'rounded-md';
      case 'modern': return 'rounded-xl';
      case 'pill': return 'rounded-full';
    }
  };

  return (
    <div className="space-y-8" id="design-sf-pro-suite">
      {/* HERO BANNER & AI DESIGN ARCHITECTURE STUDIO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/70 text-zinc-300 text-xs font-mono">
              <Globe className="w-3.5 h-3.5 text-zinc-300" />
              <span>https://design-sf.vercel.app • Autonomous AI DESIGN.md Architect</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-100">
              Design SF • Enterprise Design System Engine
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Arsitekturi dan susun sistem desain super kompleks secara otomatis menggunakan kecerdasan buatan. Hasilkan dokumen lengkap <code className="text-zinc-200 font-mono bg-zinc-800 px-1 py-0.5 rounded text-xs">DESIGN.md</code>, audit token WCAG AAA, rumus matematis corner radius nesting, serta kode Tailwind v4 & CSS Variables siap ekspor.
            </p>
          </div>

          {/* Active System Quick Badge */}
          <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl shrink-0 space-y-1.5 text-right min-w-[200px]">
            <div className="flex items-center justify-end gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-zinc-400">Current Architecture</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-zinc-100 truncate">{activeSystem.name}</div>
            <div className="text-[11px] font-mono text-zinc-400 truncate">{activeSystem.archetype}</div>
          </div>
        </div>

        {/* AI GENERATOR & AUDIT INTERFACE */}
        <div className="mt-6 pt-6 border-t border-zinc-800/70 space-y-4">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
              <button
                onClick={() => setGeneratorMode('prompt')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  generatorMode === 'prompt' ? 'bg-zinc-800 text-white font-bold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>AI Prompt Concept</span>
              </button>

              <button
                onClick={() => setGeneratorMode('url')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  generatorMode === 'url' ? 'bg-zinc-800 text-white font-bold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-zinc-300" />
                <span>URL / Live Web Audit</span>
              </button>

              <button
                onClick={() => setGeneratorMode('refine')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  generatorMode === 'refine' ? 'bg-zinc-800 text-white font-bold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5 text-zinc-300" />
                <span>AI Refine & Upgrade</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-zinc-400">
              Generates rigorous, production-grade DESIGN.md with 10+ sections
            </span>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Main Input Text / URL */}
            <div className="md:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1 flex items-center bg-zinc-950 border border-zinc-700/80 focus-within:border-zinc-400 rounded-xl px-3.5 py-2.5 transition-all">
                {generatorMode === 'url' ? (
                  <Globe className="w-4 h-4 text-zinc-500 shrink-0 mr-2.5" />
                ) : (
                  <Sparkle className="w-4 h-4 text-zinc-500 shrink-0 mr-2.5" />
                )}
                
                <input
                  type="text"
                  value={generatorMode === 'url' ? urlInput : aiPrompt}
                  onChange={(e) => generatorMode === 'url' ? setUrlInput(e.target.value) : setAiPrompt(e.target.value)}
                  placeholder={
                    generatorMode === 'url' 
                      ? "Masukkan URL website (contoh: stripe.com, vercel.com, linear.app, raycast.com)..."
                      : generatorMode === 'refine'
                      ? "Contoh instruksi refine: 'Buat token lebih gelap dengan aksen emerald cyberpunk, tambah rumus radius matematis'..."
                      : "Jelaskan konsep sistem desain (contoh: 'AI Agent OS dengan dark mode obsidian, aksen cyan neon, tipografi Söhne & JetBrains Mono')..."
                  }
                  className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAIGenerate();
                    }
                  }}
                />
              </div>

              <button
                onClick={() => handleAIGenerate()}
                disabled={isGenerating}
                className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-900" />
                    <span>Menyusun DESIGN.md...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-zinc-900" />
                    <span>{generatorMode === 'refine' ? 'Refine DESIGN.md' : 'Buat DESIGN.md AI'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Advanced Parameter Selectors */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-400">Industry Archetype</label>
              <select
                value={selectedArchetype}
                onChange={(e) => setSelectedArchetype(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
              >
                <option value="Engineering / DevTools Precision">Engineering / DevTools</option>
                <option value="Fintech & Global Commerce">Fintech & High-Trust Commerce</option>
                <option value="Spatial & Apple Vision OS">Apple Spatial & Vision OS</option>
                <option value="Cyberpunk Terminal Matrix">Cyberpunk Terminal & Matrix</option>
                <option value="Swiss Modernist Clean">Swiss Modernist Editorial</option>
                <option value="AI Autonomous Agent OS">AI Autonomous Agent OS</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-400">Visual Tone & Canvas</label>
              <select
                value={selectedThemeStyle}
                onChange={(e) => setSelectedThemeStyle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
              >
                <option value="Obsidian Dark Minimal">Obsidian Void Dark</option>
                <option value="Pure OLED High-Contrast">Pure OLED (#000000)</option>
                <option value="Deep Slate Indigo">Deep Slate Indigo</option>
                <option value="Frosted Glass & Translucency">Frosted Glassmorphism</option>
                <option value="Clean Academic Light">Clean Academic Light</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-400">Accessibility Standard</label>
              <select
                value={selectedContrast}
                onChange={(e) => setSelectedContrast(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
              >
                <option value="WCAG AAA (7.0:1 Strict)">WCAG AAA (7.0:1 Strict)</option>
                <option value="WCAG AA (4.5:1 Standard)">WCAG AA (4.5:1 Standard)</option>
                <option value="High Density UI (3.0:1 Subtlety)">High Density Precision</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-zinc-400">Radius & Corner Math</label>
              <select
                value={selectedCornerStyle}
                onChange={(e) => setSelectedCornerStyle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600"
              >
                <option value="mathematical-nested">Nested Formula (R_in = R_out - P)</option>
                <option value="razor-sharp">Razor Sharp (0px Box)</option>
                <option value="humanist-continuous">Squircle Continuous Curves</option>
                <option value="full-capsule">Full Pill Geometry</option>
              </select>
            </div>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/70 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {generationSuccess && (
            <div className="p-3 bg-emerald-950/70 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Dokumen <strong>DESIGN.md</strong> dan token sistem desain berhasil di-generate secara mendalam oleh AI!</span>
              </div>
              <button 
                onClick={() => setActiveTab('design-md')}
                className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-lg font-mono text-[10px] cursor-pointer"
              >
                Buka DESIGN.md →
              </button>
            </div>
          )}

          {/* Quick Preset Selector */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Preset Arsitektur Kelas Dunia:</span>
              <span>1-Click Switch</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_SYSTEMS.map((sys) => (
                <button
                  key={sys.id}
                  onClick={() => {
                    setActiveSystem(sys);
                    setEditableMdText(sys.designMd);
                    setCustomAccent(sys.colors[5]?.hex || '#5e6ad2');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeSystem.id === sys.id
                      ? 'bg-zinc-800 border-zinc-400 text-white font-bold shadow-sm ring-1 ring-zinc-400'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sys.colors[5]?.hex || '#fff' }} />
                  <span>{sys.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS: 5-Step Suite */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'sandbox'
                ? 'bg-zinc-800 text-white shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Interactive Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('design-md')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'design-md'
                ? 'bg-zinc-800 text-white shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. AI DESIGN.md</span>
            <span className="px-1.5 py-0.2 bg-zinc-700 text-[9px] font-mono rounded text-zinc-300">AI Architect</span>
          </button>

          <button
            onClick={() => setActiveTab('tokens-audit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'tokens-audit'
                ? 'bg-zinc-800 text-white shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>3. Token & Contrast Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'components'
                ? 'bg-zinc-800 text-white shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>4. Component Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'export'
                ? 'bg-zinc-800 text-white shadow-sm font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>5. Export & Hand-off</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownloadFile(editableMdText, `${activeSystem.id}-DESIGN.md`, 'text/markdown')}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono rounded-xl border border-zinc-700/80 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>

          <button
            onClick={() => handleDownloadFile(JSON.stringify(activeSystem, null, 2), `${activeSystem.id}-tokens.json`, 'application/json')}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono rounded-xl border border-zinc-700/80 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>tokens.json</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE INTERACTIVE SANDBOX PREVIEW */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          {/* Interactive Live Token Controller */}
          <div className="p-5 bg-zinc-900/70 border border-zinc-800 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 font-mono uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-zinc-400" />
                <span>Interactive Token Override Controller</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">
                Atur radius & aksen untuk memodifikasi komponen secara real-time
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Corner Radius Mode */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-400">Corner Radius Token</span>
                <div className="grid grid-cols-4 gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                  {(['sharp', 'subtle', 'modern', 'pill'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setCustomRadius(r)}
                      className={`py-1 text-[11px] font-medium capitalize rounded-lg transition-all cursor-pointer ${
                        customRadius === r ? 'bg-zinc-800 text-zinc-100 font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Swatch Chooser */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-400">Custom Accent Hue</span>
                <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
                  {activeSystem.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setCustomAccent(c.hex)}
                      className={`flex-1 h-6 rounded-lg transition-all cursor-pointer ${
                        customAccent === c.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name} (${c.hex})`}
                    />
                  ))}
                </div>
              </div>

              {/* Typography Spec */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-400">Font Family Stacks</span>
                <div className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-zinc-200 truncate">{activeSystem.typography.sansFont.split(',')[0]}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{activeSystem.typography.monoFont.split(',')[0]}</span>
                </div>
              </div>

              {/* Scale Ratio */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-400">Scale Factor & Rhythm</span>
                <div className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400">{activeSystem.typography.scaleRatio}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* RENDERED COMPONENT SUITE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1. BUTTONS & INTERACTION CONTROLS (Span 12) */}
            <div className={`lg:col-span-12 p-6 bg-zinc-900/60 border border-zinc-800 ${getRadiusStyle()} space-y-4`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                  <Box className="w-4 h-4 text-zinc-400" />
                  <span>Interactive Control Triggers ({activeSystem.name} Style)</span>
                </h3>
                <button
                  onClick={() => handleCopyCode(`// ${activeSystem.name} Action Button
<button className="px-4 py-2.5 text-xs font-bold ${getBtnRadiusStyle()} shadow-sm" style={{ backgroundColor: '${customAccent}', color: '#000' }}>
  Trigger Execution
</button>`, 'btn-sample')}
                  className="text-xs text-zinc-400 hover:text-zinc-200 font-mono flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'btn-sample' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Salin JSX</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Primary Button */}
                <button
                  className={`px-4 py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${getBtnRadiusStyle()}`}
                  style={{ backgroundColor: customAccent, color: '#000' }}
                >
                  Primary Action
                </button>

                {/* Secondary Button */}
                <button className={`px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-medium transition-all active:scale-95 cursor-pointer ${getBtnRadiusStyle()}`}>
                  Secondary Action
                </button>

                {/* Ghost Button */}
                <button className={`px-4 py-2.5 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100 text-xs font-medium transition-all cursor-pointer ${getBtnRadiusStyle()}`}>
                  Ghost Button
                </button>

                {/* Danger Button */}
                <button className={`px-4 py-2.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-medium transition-all active:scale-95 cursor-pointer ${getBtnRadiusStyle()}`}>
                  Danger Action
                </button>

                {/* Icon Button */}
                <button
                  className={`w-9 h-9 flex items-center justify-center transition-all cursor-pointer active:scale-90 ${getBtnRadiusStyle()}`}
                  style={{ backgroundColor: customAccent, color: '#000' }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className={`w-9 h-9 bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center transition-all cursor-pointer active:scale-90 ${getBtnRadiusStyle()}`}>
                  <Command className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. BENTO METRIC CARDS (Span 4 + Span 4 + Span 4) */}
            <div className={`lg:col-span-4 p-5 bg-zinc-900/70 border border-zinc-800 ${getRadiusStyle()} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Akurasi Penalaran</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: customAccent }} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-zinc-100">99.8%</span>
                <span className="text-xs font-mono font-semibold" style={{ color: customAccent }}>+4.2%</span>
              </div>
              <p className="text-xs text-zinc-400">Verifikasi formal & test suite otomatis</p>
            </div>

            <div className={`lg:col-span-4 p-5 bg-zinc-900/70 border border-zinc-800 ${getRadiusStyle()} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Micro-Tasks Pipeline</span>
                <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-zinc-100">1,842</span>
                <span className="text-xs text-zinc-400 font-mono">Running</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full w-4/5" style={{ backgroundColor: customAccent }} />
              </div>
            </div>

            <div className={`lg:col-span-4 p-5 bg-zinc-900/70 border border-zinc-800 ${getRadiusStyle()} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Strict Sandbox Worker</span>
                <button
                  onClick={() => setToggleState(!toggleState)}
                  className={`w-11 h-6 rounded-full p-1 transition-all cursor-pointer ${
                    toggleState ? 'bg-zinc-200' : 'bg-zinc-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-zinc-950 transition-all ${
                    toggleState ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Isolasi eksekusi kode di thread worker mandiri dengan verifikasi token.
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/80 inline-block">
                {toggleState ? 'Sandbox Aktif' : 'Sandbox Non-aktif'}
              </span>
            </div>

            {/* 3. SEARCH BAR, SLIDER & CONTROLS (Span 12) */}
            <div className={`lg:col-span-12 p-6 bg-zinc-900/60 border border-zinc-800 ${getRadiusStyle()} grid grid-cols-1 md:grid-cols-3 gap-6 items-center`}>
              {/* Command Search Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Search Command Bar</label>
                <div className={`relative flex items-center bg-zinc-950 border border-zinc-800 px-3 py-2 ${getBtnRadiusStyle()}`}>
                  <Search className="w-4 h-4 text-zinc-500 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Cari token atau komponen..."
                    className="w-full bg-transparent text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                  />
                  <div className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded text-[10px] font-mono shrink-0">
                    ⌘K
                  </div>
                </div>
              </div>

              {/* Intensity Range Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Dynamic Elevation</span>
                  <strong className="text-zinc-200">{sliderVal}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full accent-zinc-200 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Status Chips */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Status Chips</label>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-1 text-[11px] font-mono font-medium border border-zinc-700 bg-zinc-800/80 text-zinc-200 ${getBtnRadiusStyle()}`}>
                    v2.4.0-prod
                  </span>
                  <span
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold ${getBtnRadiusStyle()}`}
                    style={{ backgroundColor: `${customAccent}20`, color: customAccent, border: `1px solid ${customAccent}40` }}
                  >
                    Verified AAA
                  </span>
                  <span className={`px-2.5 py-1 text-[11px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800 ${getBtnRadiusStyle()}`}>
                    ● Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI GENERATED DESIGN.md ARCHITECTURE */}
      {activeTab === 'design-md' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 font-mono">
                <FileText className="w-4 h-4 text-zinc-300" />
                <span>DESIGN.md — Autonomous AI Architectural Document</span>
              </div>
              <p className="text-xs text-zinc-400">
                Spesifikasi sistem desain lengkap, matematis, dan berstandar Silicon Valley siap dibaca atau diunduh.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditingMarkdown(!isEditingMarkdown)}
                className={`px-3 py-1.5 text-xs font-mono rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isEditingMarkdown 
                    ? 'bg-zinc-100 text-zinc-900 border-white font-bold' 
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingMarkdown ? 'Preview Markdown' : 'Edit Text'}</span>
              </button>

              <button
                onClick={() => handleCopyCode(editableMdText, 'copy-md')}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono rounded-xl border border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedKey === 'copy-md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin Markdown</span>
              </button>

              <button
                onClick={() => handleDownloadFile(editableMdText, `${activeSystem.id}-DESIGN.md`, 'text/markdown')}
                className="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          </div>

          {/* Quick AI Refine Bar for Markdown */}
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-400 shrink-0 ml-1" />
            <input
              type="text"
              placeholder="Instruksi AI Refine cepat (contoh: 'Perdalam seksi rumus corner radius dan perketat aturan anti-slop')..."
              className="w-full bg-transparent text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setAiPrompt((e.target as HTMLInputElement).value);
                  handleAIGenerate('refine');
                }
              }}
            />
            <button
              onClick={() => handleAIGenerate('refine')}
              disabled={isGenerating}
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono rounded-lg shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? 'Refining...' : 'Refine AI'}
            </button>
          </div>

          {/* Markdown Content Viewer / Editor */}
          {isEditingMarkdown ? (
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <textarea
                value={editableMdText}
                onChange={(e) => setEditableMdText(e.target.value)}
                rows={28}
                className="w-full bg-transparent font-mono text-xs sm:text-sm text-zinc-200 focus:outline-none leading-relaxed resize-y"
              />
            </div>
          ) : (
            <div className="p-6 sm:p-8 bg-zinc-950/90 border border-zinc-800 rounded-3xl space-y-6 text-zinc-200 leading-relaxed font-sans shadow-inner">
              <div className="prose prose-invert max-w-none space-y-4 font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {editableMdText}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TOKEN & CONTRAST AUDIT MATRIX */}
      {activeTab === 'tokens-audit' && (
        <div className="space-y-8">
          {/* Color Tokens Matrix */}
          <div className="p-6 bg-zinc-900/70 border border-zinc-800 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-zinc-300" />
                  <span>Color Palette & WCAG AAA Accessibility Audit</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Audit rasio kontras warna terhadap kanvas dasar serta alokasi semantic roles.
                </p>
              </div>
              <button
                onClick={() => handleCopyCode(JSON.stringify(activeSystem.colors, null, 2), 'colors-json')}
                className="px-3 py-1.5 bg-zinc-950 text-zinc-300 text-xs font-mono rounded-xl border border-zinc-800 hover:border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedKey === 'colors-json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Salin Colors JSON</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="pb-3">Swatch & Token</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">HEX</th>
                    <th className="pb-3">RGB / HSL</th>
                    <th className="pb-3">Contrast</th>
                    <th className="pb-3">WCAG Status</th>
                    <th className="pb-3">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {activeSystem.colors.map((c) => (
                    <tr key={c.name} className="hover:bg-zinc-800/30 transition-all">
                      <td className="py-3 flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md border border-zinc-700 shrink-0" style={{ backgroundColor: c.hex }} />
                        <span className="font-bold text-zinc-100">{c.name}</span>
                      </td>
                      <td className="py-3 text-zinc-400">{c.role}</td>
                      <td className="py-3 text-zinc-200">{c.hex}</td>
                      <td className="py-3 text-zinc-400">{c.rgb}</td>
                      <td className="py-3 font-semibold text-zinc-200">{c.contrastOnBg}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {c.wcagRating || 'AAA'}
                        </span>
                      </td>
                      <td className="py-3 text-zinc-400 max-w-[200px] truncate">{c.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Typography Scale Table */}
          <div className="p-6 bg-zinc-900/70 border border-zinc-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-zinc-300" />
                  <span>Typography Scale & Step Multipliers ({activeSystem.typography.scaleRatio})</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Stack: {activeSystem.typography.sansFont.split(',')[0]} (Sans) + {activeSystem.typography.monoFont.split(',')[0]} (Mono)
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="pb-3">Step Level</th>
                    <th className="pb-3">Size (px / rem)</th>
                    <th className="pb-3">Line Height</th>
                    <th className="pb-3">Weight</th>
                    <th className="pb-3">Letter Spacing</th>
                    <th className="pb-3">Peruntukan UI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {activeSystem.typography.scaleSteps.map((step) => (
                    <tr key={step.level} className="hover:bg-zinc-800/30 transition-all">
                      <td className="py-3 font-bold text-zinc-100">{step.level}</td>
                      <td className="py-3 text-zinc-200">{step.sizePx}</td>
                      <td className="py-3 text-zinc-400">{step.lineHeight}</td>
                      <td className="py-3 text-zinc-300">{step.weight}</td>
                      <td className="py-3 text-zinc-400">{step.letterSpacing || '0'}</td>
                      <td className="py-3 text-zinc-400">{step.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Radii & Nested Math Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900/70 border border-zinc-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                <Box className="w-4 h-4 text-zinc-400" />
                <span>Corner Radii & Mathematical Nesting</span>
              </h3>
              <div className="space-y-3">
                {activeSystem.radii.map((rad) => (
                  <div key={rad.name} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-zinc-100 block">{rad.name} ({rad.value})</span>
                      <span className="text-[11px] text-zinc-400">{rad.targetElement}</span>
                    </div>
                    {rad.nestedFormulaExplanation && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        {rad.nestedFormulaExplanation}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-zinc-900/70 border border-zinc-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                <Flame className="w-4 h-4 text-zinc-400" />
                <span>Strict Anti-Slop Directives</span>
              </h3>
              <ul className="space-y-2.5">
                {(activeSystem.antiPatterns || [
                  'Dilarang menggunakan pure #000000 atau #ffffff tanpa saturasi mikroskopis pada teks body.',
                  'Dilarang menggunakan gradient teks berlebihan di atas background gelap yang merusak rasio kontras.',
                  'Dilarang menggunakan border-radius yang tidak selaras antara container luar dan elemen anak (wajib mematuhi rumus R_inner = R_outer - Padding).'
                ]).map((rule, idx) => (
                  <li key={idx} className="p-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl text-xs text-zinc-300 flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPONENT SPECS & STATE MATRIX */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Box className="w-4 h-4 text-zinc-300" />
                <span>Component Specifications & State Matrices</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Spesifikasi prop types, state matrices (Default, Hover, Active, Focus, Disabled), dan JSX snippets.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {(activeSystem.components && activeSystem.components.length > 0 ? activeSystem.components : [
              {
                name: 'Action Button',
                description: 'Core interactive trigger with micro-border and scale feedback.',
                propsInterface: 'interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md"; isLoading?: boolean; }',
                anatomy: 'Container -> Icon (14px) -> Text Label (13px Medium) -> Keycap (10px)',
                states: [
                  { state: 'Default', background: 'var(--accent-brand)', border: '1px solid rgba(255,255,255,0.15)', text: '#000000', shadowOrRing: '0 1px 2px rgba(0,0,0,0.1)' },
                  { state: 'Hover', background: 'var(--accent-brand-hover)', border: '1px solid rgba(255,255,255,0.25)', text: '#000000', shadowOrRing: '0 4px 14px rgba(56,189,248,0.25)' },
                  { state: 'Active', background: 'var(--accent-brand-active)', border: '1px solid rgba(255,255,255,0.05)', text: '#000000', shadowOrRing: 'scale(0.98)' }
                ],
                jsxSnippet: `<button className="px-4 py-2 bg-sky-400 hover:bg-sky-300 text-zinc-950 font-bold text-xs rounded-lg transition-all active:scale-[0.98]">
  Execute Action
</button>`
              }
            ]).map((comp) => (
              <div key={comp.name} className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-zinc-100">{comp.name}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{comp.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(comp.jsxSnippet, `comp-${comp.name}`)}
                    className="px-3 py-1.5 bg-zinc-950 text-zinc-300 text-xs font-mono rounded-xl border border-zinc-800 hover:border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer self-start"
                  >
                    {copiedKey === `comp-${comp.name}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Salin JSX Snippet</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-400 block">TypeScript Props Interface:</span>
                  <pre className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-300 overflow-x-auto">
                    {comp.propsInterface}
                  </pre>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-400 block">State Matrix:</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-400">
                          <th className="pb-2">State</th>
                          <th className="pb-2">Background</th>
                          <th className="pb-2">Border</th>
                          <th className="pb-2">Text Color</th>
                          <th className="pb-2">Shadow / Transform</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50">
                        {comp.states.map((st) => (
                          <tr key={st.state}>
                            <td className="py-2 font-bold text-zinc-200">{st.state}</td>
                            <td className="py-2 text-zinc-400">{st.background}</td>
                            <td className="py-2 text-zinc-400">{st.border}</td>
                            <td className="py-2 text-zinc-300">{st.text}</td>
                            <td className="py-2 text-zinc-400">{st.shadowOrRing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EXPORT & CODE HAND-OFF */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900/70 border border-zinc-800 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-zinc-300" />
                  <span>Tailwind CSS v4 Configuration & Theme Token Mapping</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Konfigurasi Tailwind CSS v4 (@theme) siap disematkan langsung ke proyek Next.js Anda.
                </p>
              </div>
              <button
                onClick={() => handleCopyCode(activeSystem.tailwindConfig, 'tailwind-config')}
                className="px-3 py-1.5 bg-zinc-950 text-zinc-300 text-xs font-mono rounded-xl border border-zinc-800 hover:border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedKey === 'tailwind-config' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Salin Tailwind Config</span>
              </button>
            </div>

            <pre className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed">
              {activeSystem.tailwindConfig}
            </pre>
          </div>

          <div className="p-6 bg-zinc-900/70 border border-zinc-800 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-zinc-300" />
                  <span>CSS Custom Properties (:root Variables)</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Variabel CSS murni untuk kompatibilitas global web.
                </p>
              </div>
              <button
                onClick={() => handleCopyCode(activeSystem.cssVariables, 'css-variables')}
                className="px-3 py-1.5 bg-zinc-950 text-zinc-300 text-xs font-mono rounded-xl border border-zinc-800 hover:border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedKey === 'css-variables' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Salin CSS Variables</span>
              </button>
            </div>

            <pre className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed">
              {activeSystem.cssVariables}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
