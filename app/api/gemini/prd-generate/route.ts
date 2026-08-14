import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt, productType, audience, complexity } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt produk wajib disertakan." },
        { status: 400 }
      );
    }

    const systemPrompt = `Anda adalah seorang Principal Product Manager & Technical Architect berstandar kelas dunia.
Karakteristik dan standar penulisan:
1. Selalu gunakan Bahasa Indonesia yang baku, formal, santun, terstruktur rapi, dan memiliki terminologi teknis yang presisi.
2. Formulasikan visi produk, rumusan masalah, dan solusi dengan kalimat yang tajam, elegan, dan profesional.
3. Seluruh kriteria penerimaan (Acceptance Criteria) ditulis dengan format terstruktur (Given-When-Then) yang jelas dan santun.
4. Panduan implementasi (Implementation Prompts) disusun secara rinci, sistematis, dan siap dieksekusi oleh tim engineering maupun coding agent.

Format output WAJIB berupa JSON valid dengan struktur:
{
  "title": "Nama Produk yang Elegan & Jelas",
  "vision": "Visi produk 1-2 kalimat yang tajam, inspiratif, dan berbobot",
  "targetAudience": ["Segmen Pengguna 1", "Segmen Pengguna 2", "Segmen Pengguna 3"],
  "problemStatement": "Pernyataan masalah inti yang dihadapi pengguna beserta dampaknya",
  "solutionOverview": "Penjelasan solusi komprehensif produk",
  "scope": {
    "inScope": ["Fitur/Cakupan 1", "Fitur/Cakupan 2", "Fitur/Cakupan 3", "Fitur/Cakupan 4"],
    "outOfScope": ["Batasan 1", "Batasan 2", "Batasan 3"]
  },
  "userStories": [
    {
      "id": "US-01",
      "asA": "Tipe Pengguna",
      "iWant": "Kebutuhan/Fitur",
      "soThat": "Nilai/Manfaat yang didapat",
      "acceptanceCriteria": [
        "Given kondisi awal, When aksi dilakukan, Then hasil yang diharapkan",
        "Given kondisi validasi, When input tidak sesuai, Then pesan informatif yang ramah ditampilkan"
      ]
    },
    {
      "id": "US-02",
      "asA": "Tipe Pengguna",
      "iWant": "Kebutuhan/Fitur",
      "soThat": "Nilai/Manfaat yang didapat",
      "acceptanceCriteria": [
        "Given kondisi awal, When aksi dilakukan, Then hasil yang diharapkan"
      ]
    }
  ],
  "technicalArchitecture": {
    "frontend": "Stack frontend yang direkomendasikan & pertimbangan arsitekturalnya",
    "backend": "Stack backend & arsitektur API",
    "database": "Skema database & strategi integritas data",
    "securityAndCompliance": "Protokol keamanan, enkripsi, dan standar kepatuhan privasi"
  },
  "tasks": [
    {
      "id": "TASK-1",
      "title": "Judul Task",
      "description": "Deskripsi teknis pengerjaan task",
      "category": "Frontend" | "Backend" | "DevOps" | "Design" | "QA",
      "priority": "P0" | "P1" | "P2",
      "estimatedHours": 8,
      "status": "todo"
    }
  ],
  "roadmap": [
    {
      "phase": "Fase 1: Fondasi & MVP Core",
      "duration": "Minggu 1 - 2",
      "milestones": ["Milestone 1", "Milestone 2"],
      "deliverables": "Hasil terukur yang diselesaikan"
    },
    {
      "phase": "Fase 2: Ekspansi Fitur & Integrasi",
      "duration": "Minggu 3 - 4",
      "milestones": ["Milestone 3", "Milestone 4"],
      "deliverables": "Hasil terukur yang diselesaikan"
    },
    {
      "phase": "Fase 3: Optimasi, Skalabilitas & Rilis",
      "duration": "Minggu 5 - 6",
      "milestones": ["Milestone 5", "Milestone 6"],
      "deliverables": "Hasil terukur yang diselesaikan"
    }
  ],
  "implementationPrompts": [
    {
      "title": "Prompt Setup Arsitektur & Foundation",
      "targetAI": "Cursor / Claude Code / AI Studio",
      "prompt": "Prompt detail langkah-demi-langkah siap pakai untuk AI coder..."
    },
    {
      "title": "Prompt Implementasi Core Engine & State",
      "targetAI": "Cursor / Claude Code / AI Studio",
      "prompt": "Prompt detail untuk implementasi fitur utama dan state management..."
    },
    {
      "title": "Prompt UI/UX & Tailwind Design System",
      "targetAI": "Cursor / Claude Code / AI Studio",
      "prompt": "Prompt detail untuk styling komponen dan responsivitas..."
    }
  ]
}

Gunakan Bahasa Indonesia yang baku, santun, profesional, dan akurat secara terminologi teknis. Jangan menyertakan tanda markdown pembungkus di luar JSON.`;

    const userPrompt = `Buatkan PRD komprehensif dan Task Planner berdasarkan deskripsi berikut:
- Ide Produk: ${prompt}
- Tipe Produk: ${productType || "Web / Mobile Application"}
- Target Audiens: ${audience || "Umum / Profesional"}
- Tingkat Kompleksitas: ${complexity || "Complex & Menyeluruh"}

Berikan minimal 4 User Stories lengkap dengan Gherkin Acceptance Criteria, minimal 6 Tasks berbobot realistis dengan prioritas P0/P1/P2, 3 Fase Roadmap, serta 3 Implementation Prompts siap pakai.`;

    const response = await generateContentWithFallback({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("PRD Generation Error:", error);
    return NextResponse.json(
      { error: "Gagal menghasilkan PRD: " + (error?.message || "Kesalahan server") },
      { status: 500 }
    );
  }
}
