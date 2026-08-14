import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { 
      lessonTitle, 
      courseTitle, 
      overview, 
      keyConcepts, 
      detailedExplanation, 
      cheatSheetSummary, 
      count = 6,
      focusArea = "all" 
    } = await req.json();

    const systemInstruction = `Anda adalah Spesialis Pedagogi & Desainer Kurikulum Spaced Repetition (SRS) Kelas Dunia pada platform Akademia Global.
Tugas Anda adalah merancang set flashcard (kartu memori interaktif) berbasis materi pelajaran untuk memaksimalkan retensi jangka panjang melalui metode active recall dan spaced repetition.

Prinsip pembuatan kartu:
1. Sisi depan (front): Berupa pertanyaan kritis, problem-solving singkat, pertanyaan konsep mendasar (first-principles), atau skenario kasus yang memicu proses berpikir aktif.
2. Sisi belakang (back): Jawaban yang terstruktur, santun, bernas, langsung ke inti konsep, disertai analogi atau intisari formula yang mudah diingat.
3. Petunjuk (hint): Clue singkat yang membimbing tanpa langsung membocorkan jawaban lengkap.
4. Kategori (category): Label ringkas seperti "Konsep Fundamental", "Formula & Logika", "Analisis Kasus", atau "Praktik Terbaik".
5. Tingkat kesulitan (difficulty): 'Mudah', 'Sedang', atau 'Menantang'.
6. Gunakan Bahasa Indonesia yang santun, baku, edukatif, dan jelas.`;

    const prompt = `Mohon buatkan ${count} flashcard spaced-repetition berkualitas tinggi untuk materi berikut:
- Topik Pelajaran: ${lessonTitle || "Topik Pelajaran"}
- Mata Kuliah / Program: ${courseTitle || "Kurikulum Akademik"}
- Ringkasan Materi: ${overview || "Materi akademi"}
- Poin Kunci: ${Array.isArray(keyConcepts) ? keyConcepts.join("; ") : keyConcepts || "-"}
- Ringkasan Cheat Sheet: ${Array.isArray(cheatSheetSummary) ? cheatSheetSummary.join("; ") : cheatSheetSummary || "-"}
- Penjelasan Detail:
${typeof detailedExplanation === 'string' ? detailedExplanation.slice(0, 1500) : ''}
- Fokus Tambahan: ${focusArea}

Susun setiap kartu agar mendorong pemahaman konseptual yang kokoh.`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            deckTitle: {
              type: Type.STRING,
              description: "Judul set kartu memori",
            },
            summary: {
              type: Type.STRING,
              description: "Ringkasan manfaat kartu memori",
            },
            cards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  front: {
                    type: Type.STRING,
                    description: "Pertanyaan atau tantangan active recall di sisi depan",
                  },
                  back: {
                    type: Type.STRING,
                    description: "Jawaban terstruktur dan penjelasan di sisi belakang",
                  },
                  hint: {
                    type: Type.STRING,
                    description: "Petunjuk pembimbing",
                  },
                  category: {
                    type: Type.STRING,
                    description: "Kategori kartu (misal: Konsep Fundamental, Formula & Kaidah, Analisis Kasus)",
                  },
                  difficulty: {
                    type: Type.STRING,
                    enum: ["Mudah", "Sedang", "Menantang"],
                    description: "Tingkat kesulitan kartu",
                  },
                },
                required: ["id", "front", "back", "category", "difficulty"],
              },
            },
          },
          required: ["deckTitle", "cards"],
        },
      },
    });

    const rawText = response.text || "{}";
    const parsed = JSON.parse(rawText);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Flashcard generation error:", error);
    return NextResponse.json(
      { error: "Mohon maaf, terjadi kendala saat memproses pembuatan flashcards AI. Silakan coba beberapa saat lagi." },
      { status: 500 }
    );
  }
}
