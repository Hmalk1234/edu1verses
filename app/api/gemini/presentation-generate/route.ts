import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { topic, slideCount = 6, theme = "dark", audience = "Umum & Profesional", format = "pitch-deck" } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topik presentasi wajib disertakan." },
        { status: 400 }
      );
    }

    const systemPrompt = `Anda adalah seorang Presentation Designer & Executive Storyteller tingkat dunia.
Tugas Anda adalah merancang struktur slide presentasi / pitch deck / materi kuliah yang memukau, bernas, berbobot, dan memiliki tata bahasa yang santun, elegan, dan profesional.

Karakteristik penyusunan materi:
1. Seluruh teks, judul, subjudul, dan butir pemikiran (bullet points) menggunakan Bahasa Indonesia yang baku, santun, dan komunikatif.
2. Catatan pembicara (speakerNotes) disusun dengan bahasa narasi lisan yang santun, percaya diri, sistematis, dan mengalir dengan baik saat dibacakan kepada audiens.
3. Struktur slide memiliki variasi layout yang dinamis dan berbobot akademis maupun profesional tinggi.

Format output WAJIB berupa JSON valid dengan struktur:
{
  "deckTitle": "Judul Presentasi Utama yang Elegan",
  "deckSubtitle": "Subjudul Presentasi yang Menarik dan Informatif",
  "theme": "${theme}",
  "totalSlides": ${slideCount},
  "slides": [
    {
      "id": "slide-1",
      "layoutType": "title" | "two-column" | "bento-metrics" | "timeline-process" | "key-takeaway" | "feature-grid",
      "badge": "Pengantar / Visi / Analisis",
      "title": "Judul Slide yang Kuat dan Jelas",
      "subtitle": "Keterangan singkat slide",
      "content": {
        "bullets": ["Poin penting 1", "Poin penting 2", "Poin penting 3"],
        "metrics": [
          { "value": "99.8%", "label": "Tingkat Keandalan" },
          { "value": "10x", "label": "Akselerasi Efisiensi" }
        ],
        "leftColumn": {
          "title": "Tantangan Saat Ini",
          "points": ["Kendala A", "Kendala B"]
        },
        "rightColumn": {
          "title": "Solusi Terobosan",
          "points": ["Strategi X", "Strategi Y"]
        },
        "quote": {
          "text": "Kutipan inspiratif atau pernyataan inti slide",
          "author": "Nama Pakar / Visi Tim"
        }
      },
      "speakerNotes": "Catatan pembicara (speaker notes) yang komprehensif, santun, terstruktur, dan siap dibacakan saat memaparkan materi kepada audiens.",
      "visualRecommendation": "Saran visual atau diagram pendukung"
    }
  ]
}

Gunakan Bahasa Indonesia yang formal, santun, berkelas, dan mudah dipahami. Buat tepat ${slideCount} slide dengan variasi layout yang dinamis (misal: slide 1 = title, slide 2 = two-column/masalah, slide 3 = bento-metrics, slide 4 = timeline-process, slide 5 = feature-grid, slide 6 = key-takeaway).`;

    const userPrompt = `Buatkan presentasi lengkap untuk:
- Topik: ${topic}
- Target Audiens: ${audience}
- Format Presentasi: ${format}
- Jumlah Slide: ${slideCount}`;

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
    console.error("Presentation Generation Error:", error);
    return NextResponse.json(
      { error: "Gagal menghasilkan presentasi: " + (error?.message || "Kesalahan server") },
      { status: 500 }
    );
  }
}
