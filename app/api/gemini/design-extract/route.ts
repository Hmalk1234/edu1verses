import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";

export interface ColorToken {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  hsl: string;
  oklch?: string;
  contrastOnBg: string;
  wcagRating: "AAA" | "AA" | "AA Large" | "Fail";
  usage: string;
}

export interface TypographyStep {
  level: string;
  sizePx: string;
  sizeRem: string;
  lineHeight: string;
  letterSpacing: string;
  weight: string;
  usage: string;
}

export interface ComponentSpec {
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

export interface MotionSpec {
  name: string;
  timing: string;
  bezierOrSpring: string;
  usage: string;
}

export interface ExtractedDesignSystem {
  id: string;
  name: string;
  url: string;
  archetype: string;
  brandEthos: string;
  designMd: string;
  tokens: {
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
      sectionMargin: string;
    };
    motion: MotionSpec[];
  };
  components: ComponentSpec[];
  antiPatterns: string[];
  tailwindConfig: string;
  cssVariables: string;
}

export async function POST(req: NextRequest) {
  try {
    const { 
      url, 
      prompt, 
      archetype = "Engineering / DevTools Precision", 
      themeStyle = "Obsidian Dark Minimal",
      contrastRequirement = "WCAG AAA",
      cornerStyle = "mathematical-nested",
      actionType = "generate", // 'generate' | 'audit' | 'refine'
      previousSystem
    } = await req.json();

    if (!url && !prompt && !previousSystem) {
      return NextResponse.json(
        { error: "URL website, deskripsi konsep desain, atau sistem sebelumnya wajib disertakan." },
        { status: 400 }
      );
    }

    const systemPrompt = `Anda adalah World-Class Principal Design Systems Architect, Lead UI/UX Engineer, dan Pembuat Tool DesignSF (design-sf.vercel.app).
Tugas Anda adalah merancang atau mengekstrak sebuah SISTEM DESAIN SANGAT KOMPLEKS, MENDALAM, DAN BERSTANDAR TINGGI (Enterprise & Silicon Valley Caliber).

Output Anda WAJIB menghasilkan berkas "DESIGN.md" yang sangat ekstensif, terstruktur, profesional, dan matematis, mencakup:
1. Executive Summary & Brand Visual Ethos
2. Color Palette, Semantic Roles, OKLCH & WCAG Accessibility Matrix
3. Typography Scale Rhythms, Font Stacks & Optical Tracking
4. Spatial Rhythms & Mathematics Grid (Padding & Gaps)
5. Corner Radii Formulas & Nested Border Radius Math (R_inner = R_outer - Padding)
6. Elevation, Surfaces, Backdrop Blurs & Layering Hierarchy
7. Complete Component Library Specs (Buttons, Cards, Inputs, Modals, Badges, Command Palettes, Status Indicators) dengan tabel state lengkap
8. Micro-Interactions, Physics Springs & Cubic-Bezier Motion Curves
9. Strict "Anti-Slop" Banned Patterns & Design Quality Directives
10. Ready-to-use CSS Custom Properties (:root) & Tailwind CSS v4 Theme Config

Format output WAJIB dalam bentuk JSON valid dengan struktur:
{
  "name": "Nama Brand / Sistem Desain",
  "url": "https://...",
  "archetype": "Kategori Industri (contoh: DevTools CLI, Fintech Obsidian, Apple Spatial)",
  "brandEthos": "Deskripsi filosofi desain mendalam (2-3 kalimat tajam)",
  "designMd": "# DESIGN.md — [Nama Sistem Desain]... (dokumen markdown yang sangat lengkap, minimal 80-120 baris penjelasan teknis dan terstruktur)",
  "tokens": {
    "colors": [
      {
        "name": "Canvas Void",
        "role": "bg-root",
        "hex": "#09090b",
        "rgb": "9, 9, 11",
        "hsl": "240 10% 4%",
        "oklch": "oklch(0.14 0.005 285.8)",
        "contrastOnBg": "21.0:1",
        "wcagRating": "AAA",
        "usage": "Root body background canvas"
      },
      {
        "name": "Surface Card",
        "role": "surface-card",
        "hex": "#121215",
        "rgb": "18, 18, 21",
        "hsl": "240 8% 8%",
        "oklch": "oklch(0.18 0.006 285.8)",
        "contrastOnBg": "18.2:1",
        "wcagRating": "AAA",
        "usage": "Bento container surfaces and modals"
      },
      {
        "name": "Border Hairline",
        "role": "border-subtle",
        "hex": "#27272a",
        "rgb": "39, 39, 42",
        "hsl": "240 4% 16%",
        "oklch": "oklch(0.27 0.006 285.8)",
        "contrastOnBg": "4.5:1",
        "wcagRating": "AA",
        "usage": "Strict 1px separation boundaries"
      },
      {
        "name": "Text Primary",
        "role": "text-primary",
        "hex": "#fafafa",
        "rgb": "250, 250, 250",
        "hsl": "0 0% 98%",
        "oklch": "oklch(0.98 0.001 0)",
        "contrastOnBg": "19.8:1",
        "wcagRating": "AAA",
        "usage": "Primary headings & high priority content"
      },
      {
        "name": "Text Muted",
        "role": "text-muted",
        "hex": "#a1a1aa",
        "rgb": "161, 161, 170",
        "hsl": "240 5% 65%",
        "oklch": "oklch(0.71 0.01 285.8)",
        "contrastOnBg": "7.5:1",
        "wcagRating": "AAA",
        "usage": "Secondary metadata, captions & subtitles"
      },
      {
        "name": "Accent Primary",
        "role": "accent-brand",
        "hex": "#38bdf8",
        "rgb": "56, 189, 248",
        "hsl": "199 95% 60%",
        "oklch": "oklch(0.77 0.14 225.5)",
        "contrastOnBg": "11.2:1",
        "wcagRating": "AAA",
        "usage": "Interactive triggers, focus rings & primary CTA"
      },
      {
        "name": "Success Emerald",
        "role": "status-success",
        "hex": "#10b981",
        "rgb": "16, 185, 129",
        "hsl": "160 84% 39%",
        "oklch": "oklch(0.70 0.17 160.0)",
        "contrastOnBg": "8.9:1",
        "wcagRating": "AAA",
        "usage": "Positive state feedback & active badges"
      },
      {
        "name": "Danger Coral",
        "role": "status-danger",
        "hex": "#f43f5e",
        "rgb": "244, 63, 94",
        "hsl": "350 89% 60%",
        "oklch": "oklch(0.65 0.22 18.0)",
        "contrastOnBg": "7.2:1",
        "wcagRating": "AA",
        "usage": "Destructive triggers & critical alerts"
      }
    ],
    "typography": {
      "sansFont": "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "monoFont": "JetBrains Mono, 'SF Mono', Menlo, Consolas, monospace",
      "displayFont": "Plus Jakarta Sans, -apple-system, sans-serif",
      "scaleRatio": "1.25 (Major Third)",
      "scaleSteps": [
        { "level": "Display Hero (H1)", "sizePx": "40px - 56px", "sizeRem": "2.5rem - 3.5rem", "lineHeight": "1.1", "letterSpacing": "-0.03em", "weight": "800 ExtraBold", "usage": "Top hero banner headlines" },
        { "level": "Section Heading (H2)", "sizePx": "28px - 34px", "sizeRem": "1.75rem - 2.125rem", "lineHeight": "1.2", "letterSpacing": "-0.02em", "weight": "700 Bold", "usage": "Major section dividers" },
        { "level": "Card Title (H3)", "sizePx": "18px - 22px", "sizeRem": "1.125rem - 1.375rem", "lineHeight": "1.3", "letterSpacing": "-0.01em", "weight": "600 SemiBold", "usage": "Bento card headers" },
        { "level": "Subheading (H4)", "sizePx": "15px - 16px", "sizeRem": "0.9375rem - 1.0rem", "lineHeight": "1.4", "letterSpacing": "0", "weight": "600 SemiBold", "usage": "Component sub-labels" },
        { "level": "Body Text", "sizePx": "14px - 15px", "sizeRem": "0.875rem - 0.9375rem", "lineHeight": "1.6", "letterSpacing": "0", "weight": "400 Regular", "usage": "Paragraphs & technical documentation" },
        { "level": "Caption / Tag", "sizePx": "11px - 12px", "sizeRem": "0.6875rem - 0.75rem", "lineHeight": "1.4", "letterSpacing": "0.02em", "weight": "500 Medium", "usage": "Status tags, metadata, tooltips" },
        { "level": "Code / Terminal", "sizePx": "12px - 13px", "sizeRem": "0.75rem - 0.8125rem", "lineHeight": "1.6", "letterSpacing": "0", "weight": "500 Medium", "usage": "CLI blocks & token names" }
      ]
    },
    "radii": [
      { "name": "Radius XS", "value": "4px", "targetElement": "Tags, keycaps, tooltips", "nestedFormulaExplanation": "Micro element corner" },
      { "name": "Radius SM", "value": "8px", "targetElement": "Input controls, dropdown items, buttons", "nestedFormulaExplanation": "Child element inside 16px card with 8px padding" },
      { "name": "Radius MD", "value": "16px", "targetElement": "Bento cards, modal dialogs", "nestedFormulaExplanation": "Parent container (R_outer = 16px)" },
      { "name": "Radius LG", "value": "24px", "targetElement": "Feature hero cards, floating trays", "nestedFormulaExplanation": "Large container surface" },
      { "name": "Radius Full", "value": "9999px", "targetElement": "Pills, avatars, badge chips", "nestedFormulaExplanation": "Capsule shape" }
    ],
    "shadows": [
      { "name": "Hairline Glow", "value": "0 0 0 1px rgba(255, 255, 255, 0.08)", "usage": "Top surface edge lighting", "backdropBlur": "none" },
      { "name": "Surface Elevation", "value": "0 8px 24px -4px rgba(0, 0, 0, 0.4)", "usage": "Bento card hover state", "backdropBlur": "none" },
      { "name": "Modal Backdrop Frosted", "value": "0 24px 60px -12px rgba(0, 0, 0, 0.7)", "usage": "Command palette & floating sheets", "backdropBlur": "blur(20px)" }
    ],
    "spacing": {
      "baseUnit": "4px",
      "containerPadding": "24px - 32px",
      "cardGap": "16px - 20px",
      "sectionMargin": "48px - 64px"
    },
    "motion": [
      { "name": "Snappy Micro-Interaction", "timing": "150ms", "bezierOrSpring": "cubic-bezier(0.16, 1, 0.3, 1)", "usage": "Button click active scale, hover transitions" },
      { "name": "Modal Entrance Spring", "timing": "300ms", "bezierOrSpring": "spring(mass: 0.8, stiffness: 250, damping: 25)", "usage": "Drawer and dialog reveal" },
      { "name": "Layout Morph", "timing": "250ms", "bezierOrSpring": "cubic-bezier(0.4, 0, 0.2, 1)", "usage": "Tab switching and accordion expands" }
    ]
  },
  "components": [
    {
      "name": "Primary Button",
      "description": "High-priority interactive trigger with active scale feedback and crisp micro-borders.",
      "propsInterface": "interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg'; isLoading?: boolean; }",
      "anatomy": "Container [Radius SM] -> Icon [16px] -> Text Label [13px SemiBold] -> Shortcut KBD [10px]",
      "states": [
        { "state": "Default", "background": "var(--accent-brand)", "border": "1px solid rgba(255,255,255,0.1)", "text": "#000000", "shadowOrRing": "0 1px 2px rgba(0,0,0,0.1)" },
        { "state": "Hover", "background": "var(--accent-brand-hover)", "border": "1px solid rgba(255,255,255,0.2)", "text": "#000000", "shadowOrRing": "0 4px 12px rgba(56,189,248,0.25)" },
        { "state": "Active", "background": "var(--accent-brand-active)", "border": "1px solid rgba(255,255,255,0.05)", "text": "#000000", "shadowOrRing": "scale(0.98)" },
        { "state": "Focus", "background": "var(--accent-brand)", "border": "1px solid transparent", "text": "#000000", "shadowOrRing": "0 0 0 2px var(--bg-root), 0 0 0 4px var(--accent-brand)" },
        { "state": "Disabled", "background": "#27272a", "border": "1px solid #3f3f46", "text": "#71717a", "shadowOrRing": "none" }
      ],
      "jsxSnippet": "<button className=\"px-4 py-2.5 bg-sky-400 hover:bg-sky-300 text-zinc-950 font-bold text-xs rounded-lg transition-all active:scale-[0.98] focus:ring-2 focus:ring-sky-400\">\n  Execute Action\n</button>"
    }
  ],
  "antiPatterns": [
    "Dilarang menggunakan pure #000000 atau #ffffff tanpa saturasi mikroskopis pada teks body.",
    "Dilarang menggunakan gradient teks berlebihan di atas background gelap yang merusak rasio kontras.",
    "Dilarang menggunakan border-radius yang tidak selaras antara container luar dan elemen anak (wajib mematuhi rumus R_inner = R_outer - Padding).",
    "Dilarang membuat button atau pill tag yang teksnya wrap ke 2 baris."
  ],
  "tailwindConfig": "// Tailwind CSS Token Configuration\\nexport default {\\n  theme: {\\n    extend: {\\n      colors: {\\n        ds: {\\n          canvas: 'var(--bg-root)',\\n          surface: 'var(--surface-card)',\\n          border: 'var(--border-subtle)',\\n          primary: 'var(--text-primary)',\\n          muted: 'var(--text-muted)',\\n          accent: 'var(--accent-brand)'\\n        }\\n      }\\n    }\\n  }\\n};",
  "cssVariables": ":root {\\n  --bg-root: #09090b;\\n  --surface-card: #121215;\\n  --border-subtle: #27272a;\\n  --text-primary: #fafafa;\\n  --text-muted: #a1a1aa;\\n  --accent-brand: #38bdf8;\\n  --status-success: #10b981;\\n  --status-danger: #f43f5e;\\n  --radius-xs: 4px;\\n  --radius-sm: 8px;\\n  --radius-md: 16px;\\n  --radius-lg: 24px;\\n}"
}

JANGAN MENGELUARKAN TEKS APAPUN DI LUAR JSON.`;

    let userPrompt = "";
    if (actionType === "refine" && previousSystem) {
      userPrompt = `Lakukan REFINE DAN UPGRADE SISTEM DESAIN SEBELUMNYA berdasarkan instruksi baru:
Instruksi Pengguna: ${prompt}
Sistem Desain Saat Ini: ${JSON.stringify(previousSystem.name)}
Archetype: ${archetype}
Tema Visual: ${themeStyle}
Standar Kontras: ${contrastRequirement}
Aturan Radius: ${cornerStyle}

Perbarui dan pertajam semua token, buat "designMd" menjadi jauh lebih mendalam dan spesifik sesuai instruksi baru tersebut!`;
    } else {
      userPrompt = `Rancang & susun arsitektur sistem desain kelas dunia secara komprehensif:
- Target Website / Nama Brand / Prompt: ${url || prompt}
- Archetype Industri: ${archetype}
- Tema & Suasana Visual: ${themeStyle}
- Standar Kontras: ${contrastRequirement}
- Aturan Sudut & Radius: ${cornerStyle}
${prompt ? `- Spesifikasi Khusus: ${prompt}` : ""}

Pastikan "designMd" berisi panduan teknis yang sangat komprehensif, terstruktur, mendalam, dan siap digunakan oleh tim engineer & desainer!`;
    }

    const response = await generateContentWithFallback({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.6,
      }
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);

    // Ensure ID exists
    parsed.id = parsed.id || `custom-${Date.now()}`;

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Design Extract / AI Generate Error:", error);
    return NextResponse.json(
      { error: "Gagal menyusun sistem desain: " + (error?.message || "Kesalahan server internal") },
      { status: 500 }
    );
  }
}
