import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode = "medium", currentCode } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt website wajib disertakan." },
        { status: 400 }
      );
    }

    let complexityInstructions = "";
    if (mode === "quick") {
      complexityInstructions = "Mode: CEPAT (Quick Prototype). Buat single-page website/komponen yang ringkas, bersih, elegan, dengan fungsionalitas inti yang langsung jalan tanpa setup rumit.";
    } else if (mode === "medium") {
      complexityInstructions = "Mode: MEDIUM (Balanced & Interactive). Buat aplikasi web interaktif multi-seksi yang kaya, memiliki state interaktif (filter, modal, form, kalkulator/tabel), komponen visual menarik, dan navigasi mulus.";
    } else {
      complexityInstructions = "Mode: COMPLEX & MENYELURUH (Full Comprehensive Web App). Buat aplikasi web super lengkap dengan arsitektur multi-view/tab, dashboard analytics, visual charting interaktif (gunakan SVG/HTML5 canvas), state management lengkap, sistem filter & search, mock data realistis, modal dialogs, toast notifications, keyboard shortcuts, dan UI mewah berstandar kelas dunia.";
    }

    const systemPrompt = `Anda adalah Lead Web Engineer & UI/UX Designer kelas dunia.
Tugas Anda adalah menghasilkan SATU FILE HTML UTUH (Standalone HTML5) yang lengkap, berfungsi 100% langsung di browser, modern, memiliki copywriting/teks yang santun dan profesional, serta bebas error.

PANDUAN TEKNIS & BAHASA WAJIB:
1. Sertakan DOCTYPE html, head, dan body lengkap.
2. Seluruh teks, label antarmuka, judul, dan deskripsi pada website menggunakan Bahasa Indonesia yang santun, tertata rapi, dan profesional (kecuali jika pengguna meminta bahasa lain secara spesifik).
3. Di bagian <head>, sertakan CDN Tailwind CSS:
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
4. Tulis seluruh script logika interaktivitas JavaScript di dalam tag <script> di akhir <body>. Pastikan memanggil 'lucide.createIcons();' saat DOMContentLoaded dan setiap kali ada render ulang elemen DOM.
5. Gunakan palet warna modern (Zinc/Slate gelap & kontras tinggi, aksen Sky/Indigo/Emerald), border halus, tombol dengan feedback klik, animasi transisi yang mulus.
6. JANGAN gunakan library external yang membutuhkan build step (seperti React/Vue build). Gunakan Vanilla JS modern yang bersih dengan event listener, reactive state, atau DOM rendering yang rapi.
7. Hasilkan HANYA kode HTML mentah murni tanpa pembungkus markdown seperti \`\`\`html atau \`\`\`. Jika Anda menyertakan markdown pembungkus, aplikasi parser akan membersihkannya, tetapi lebih baik berikan kode langsung.`;

    const userPrompt = currentCode
      ? `Perbarui dan sempurnakan kode HTML berikut berdasarkan permintaan pengguna:
Permintaan: ${prompt}
${complexityInstructions}

Kode HTML Saat Ini:
${currentCode.slice(0, 3000)}`
      : `Buat aplikasi web lengkap dari awal berdasarkan permintaan:
Permintaan: ${prompt}
${complexityInstructions}`;

    const response = await generateContentWithFallback({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }
      ],
      config: {
        temperature: 0.7,
      },
    });

    let code = response.text || "";
    // Clean code if wrapped in markdown
    if (code.startsWith("```html")) {
      code = code.replace(/^```html\n?/, "").replace(/\n?```$/, "");
    } else if (code.startsWith("```")) {
      code = code.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    return NextResponse.json({ code: code.trim(), mode });
  } catch (error: any) {
    console.error("Web Generation Error:", error);
    return NextResponse.json(
      { error: "Gagal menghasilkan website: " + (error?.message || "Kesalahan server") },
      { status: 500 }
    );
  }
}
