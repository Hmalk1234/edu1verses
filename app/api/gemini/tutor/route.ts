import { NextRequest, NextResponse } from "next/server";
import { getGenAI } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { mode, userPrompt, lessonContext, courseTitle, codeSnippet, enableWebSearch } = await req.json();

    const systemInstruction = `Anda adalah "RoboAkademia AI", Tutor & Profesor Multidisiplin Kelas Dunia pada platform Akademia Global.
Karakteristik dan etika komunikasi Anda:
1. Selalu gunakan Bahasa Indonesia yang santun, terstruktur rapi, bersahabat, dan memotivasi.
2. Gunakan sapaan yang santun dan penuh rasa hormat ("Anda" atau "Rekan Pembelajar").
3. Jelaskan konsep rumit menggunakan analogi nyata sehari-hari yang intuitif dan mudah dipahami dengan penalaran yang mendalam.
4. Apabila terdapat rumus matematika, formulasi sains, kode pemrograman, atau analisis kasus, jabarkan langkah demi langkah (step-by-step) secara runut, jelas, dan transparan.
5. Berikan intisari konsep dan tips strategis agar pemahaman bersifat konseptual (first-principles), bukan sekadar hafalan.
6. Format seluruh jawaban dengan markdown yang rapi, terstruktur (headings, bullet points, penekanan teks tebal, dan code blocks yang terdokumentasi dengan baik).`;

    let promptContent = "";

    if (mode === "explain_simple") {
      promptContent = `Mohon berkenan menjelaskan materi "${lessonContext?.title || 'Topik ini'}" dalam kurikulum "${courseTitle || 'Kursus Ini'}" dengan penyampaian yang paling sederhana, intuitif, santun, dan menggunakan analogi kehidupan nyata yang jelas bagi pembelajar:
Detail materi:
${lessonContext?.content?.detailedExplanation || userPrompt}
Poin kunci:
${(lessonContext?.content?.keyConcepts || []).join(", ")}`;
    } else if (mode === "deep_dive") {
      promptContent = `Mohon berikan analisis dan pembahasan mendalam (Deep Dive) untuk topik "${lessonContext?.title || 'Topik Ini'}".
Uraikan secara terstruktur:
1. Prinsip fundamental dan fondasi konseptual (first principles).
2. Implementasi dan relevansi di industri modern maupun riset akademik global.
3. Contoh studi kasus terapan atau pemecahan masalah tingkat lanjut.
4. Kekeliruan umum (common pitfalls) dan strategi pencegahannya.
Konteks: ${lessonContext?.content?.detailedExplanation || userPrompt}`;
    } else if (mode === "code_debug") {
      promptContent = `Mohon bantu meninjau dan menganalisis kode berikut pada materi "${lessonContext?.title || 'Pemrograman'}":
\`\`\`
${codeSnippet || userPrompt}
\`\`\`
Mohon jabarkan:
1. Analisis ketepatan logika, potensi bug, atau aspek performa yang dapat ditingkatkan.
2. Penjelasan alur kerja kode baris demi baris.
3. Kode rekomendasi yang telah diperbaiki dengan praktik terbaik (best practices) dan komentar penjelasan yang rapi.
4. Ringkasan poin penting dari perbaikan yang dilakukan.`;
    } else if (mode === "math_solve") {
      promptContent = `Mohon bantu menurunkan dan menyelesaikan persoalan matematika/sains berikut secara bertahap dan terstruktur:
"${userPrompt}"
Tuliskan setiap langkah penalaran dengan notasi yang rapi dan sertakan penjelasan singkat mengenai alasan matematis di balik setiap langkah.`;
    } else {
      // General conversational chat
      promptContent = `Konteks Pembelajaran:
- Program Kursus: ${courseTitle || "Umum"}
- Modul/Topik Terkait: ${lessonContext?.title || "Umum"}
- Ringkasan Materi: ${lessonContext?.content?.overview || "Materi akademi"}

Pertanyaan Pembelajar: "${userPrompt}"

Mohon berikan penjelasan yang santun, bernas, mendidik, dan terstruktur untuk membantu penguasaan materi secara menyeluruh.`;
    }

    const ai = getGenAI();
    const config: any = {
      systemInstruction,
      temperature: 0.7,
    };

    if (enableWebSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptContent,
      config,
    });

    const reply = response.text || "RoboAkademia AI berhasil memproses pertanyaan Anda.";

    // Extract sources if web search was enabled
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources: Array<{ title: string; url: string }> = [];
    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        webSources.push({
          title: chunk.web.title || "Sumber Web",
          url: chunk.web.uri
        });
      }
    }

    return NextResponse.json({ success: true, reply, webSources });
  } catch (error: any) {
    console.error("Gemini Tutor Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        reply: "Halo! RoboAkademia AI mencatat pertanyaanmu. Terjadi sedikit kendala beban server sementara, silakan tanyakan kembali dalam beberapa saat atau pilih materi di panel kursus.",
        error: error?.message || "Internal error" 
      },
      { status: 200 }
    );
  }
}
