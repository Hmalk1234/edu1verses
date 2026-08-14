import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, count = 3 } = await req.json();

    const systemInstruction = `Anda adalah Dosen Penguji & Ahli Evaluasi Pendidikan Global.
Tugas Anda adalah merumuskan soal kuis pilihan ganda yang mendalam, bermutu tinggi, terbebas dari ambiguitas, dan mendidik.
Karakteristik soal dan penjelasan:
1. Seluruh kalimat pertanyaan dan opsi jawaban disusun menggunakan Bahasa Indonesia yang santun, jelas, dan baku.
2. Penjelasan jawaban (explanation) harus menguraikan konsep dasar secara logis, santun, dan komprehensif sehingga membantu pembelajar memahami alasan di balik pilihan jawaban yang benar.
3. Petunjuk (hint) bersifat membimbing pembelajar secara suportif.`;

    const prompt = `Mohon buatkan ${count} butir soal kuis pilihan ganda untuk topik: "${topic || 'Pemahaman Fundamental'}" dengan tingkat kesulitan "${difficulty || 'Menengah'}".
Setiap soal harus memiliki 4 pilihan jawaban yang terstruktur, indeks jawaban yang benar (0-3), penjelasan edukatif yang mendalam, serta petunjuk (hint) yang membimbing.`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.5,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswerIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  hint: { type: Type.STRING },
                },
                required: ["id", "question", "options", "correctAnswerIndex", "explanation"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    return NextResponse.json({ success: true, questions: data.questions || [] });
  } catch (error: any) {
    console.error("Quiz Generator Error:", error);
    return NextResponse.json({
      success: false,
      questions: [
        {
          id: "q-fallback-1",
          question: "Apa tujuan utama mempelajari dasar-dasar fundamental sebelum materi tingkat lanjut?",
          options: [
            "Membangun pemahaman first-principles yang kuat agar mudah memecahkan masalah kompleks",
            "Hanya untuk formalitas menghafal rumus",
            "Agar cepat lulus tanpa perlu latihan nyata",
            "Membatasi kreativitas dalam eksplorasi"
          ],
          correctAnswerIndex: 0,
          explanation: "Pemahaman fundamental/first-principles memungkinkan kita menghubungkan konsep dan beradaptasi dengan tantangan teknis apa pun."
        }
      ]
    });
  }
}

