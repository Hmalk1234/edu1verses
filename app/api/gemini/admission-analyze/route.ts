import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { universityName, targetMajor, completedCourses, currentStats } = await req.json();

    const systemInstruction = `Anda adalah Konsultan Senior Admisi Perguruan Tinggi Terkemuka Dunia & Dewan Penasihat Beasiswa Internasional.
Karakteristik penyampaian Anda:
1. Selalu gunakan Bahasa Indonesia yang formal, santun, objektif, profesional, dan membangkitkan optimisme.
2. Gunakan sapaan yang santun dan penuh rasa hormat ("Anda" atau "Kandidat").
3. Berikan analisis komprehensif, terstruktur, berbasis data riil, dan disertai peta jalan (actionable roadmap) yang realistis untuk menembus universitas impian dan beasiswa penuh.
4. Format seluruh laporan dengan Markdown yang rapi dan terorganisir secara sistematis.`;

    const prompt = `Profil Calon Mahasiswa:
- Universitas Tujuan: ${universityName}
- Program Studi / Bidang Peminatan: ${targetMajor}
- Riwayat Kursus & Modul yang Telah Diselesaikan di Akademia Global: ${completedCourses?.join(", ") || "Belum ada riwayat kursus tercatat"}
- Indikator Perkembangan Saat Ini: Level ${currentStats?.level || 1}, Total XP: ${currentStats?.totalXp || 0}, Konsistensi Belajar: ${currentStats?.streakDays || 0} hari berturut-turut.

Mohon susun laporan telaah admisi komprehensif berformat Markdown dengan susunan sebagai berikut:
1. 🎯 **Evaluasi Kesiapan Akademik & Profil Saat Ini** (Telaah kekuatan profil, pencapaian, dan kecocokan dengan standar kualifikasi kampus tujuan)
2. ⚠️ **Analisis Kesenjangan Kompetensi (Gap Analysis)** (Identifikasi materi teoritis, keterampilan teknis, atau bukti pencapaian yang perlu segera diperkuat)
3. 🗺️ **Peta Jalan Strategis 3 Fase (3-Phase Actionable Roadmap)** (Langkah terencana jangka pendek, menengah, dan finalisasi aplikasi menuju deadline pendaftaran)
4. 🏆 **Rekomendasi Portofolio, Karya Ilmiah & Proyek Nyata** (Inisiatif riset atau proyek terapan yang dapat menempatkan kandidat dalam 1% teratas pelamar)
5. 💰 **Rekomendasi Program Beasiswa Relevan & Strategi Lolos** (Panduan persyaratan dan taktik penulisan esai untuk beasiswa seperti LPDP, Fulbright, Chevening, MEXT, AAS, dll.)`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const analysis = response.text || "Peta jalan admisi berhasil dibuat.";

    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error("Admission Analysis Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        analysis: "Analisis admisi sedang disiapkan. Harap coba kembali sesaat lagi.",
        error: error?.message || "Internal error" 
      },
      { status: 200 }
    );
  }
}

