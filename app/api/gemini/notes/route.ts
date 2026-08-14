import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithFallback } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { notesContent, studentName, title } = await req.json();

    if (!notesContent || typeof notesContent !== 'string' || notesContent.trim().length === 0) {
      return NextResponse.json({ error: 'Konten catatan tidak boleh kosong' }, { status: 400 });
    }

    const systemInstruction = `
Anda adalah Asisten Akademik & Ringkasan Studi AI di platform Akademia Global.
Tugas Anda adalah membedah, merapikan, dan menyintesis catatan belajar siswa (${studentName || 'Pelajar'}) menjadi ringkasan yang sangat terstruktur, padat, berbobot, dan aplikatif.

Kembalikan format respon JSON yang valid dengan skema:
{
  "summary": "Ringkasan eksekutif 2-3 kalimat mengenai poin esensial.",
  "keyTakeaways": ["Poin kunci 1", "Poin kunci 2", "Poin kunci 3"],
  "actionItems": ["Tindakan konkret / latihan yang harus dilakukan 1", "Tindakan konkret 2"],
  "mentalModelOrRule": "Satu kaidah prinsip atau rumus mental yang wajib diingat."
}
Pastikan berbahasa Indonesia formal akademik, tajam, dan tidak bertele-tele.
`;

    const prompt = `
Judul Catatan: ${title || 'Catatan Studi'}
Konten Catatan Siswa:
"""
${notesContent.slice(0, 4000)}
"""

Silakan sintesis catatan ini menjadi JSON sesuai instruksi.
`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Error generating note summary:', error);
    return NextResponse.json(
      { error: 'Terjadi kegagalan saat memproses ringkasan catatan AI', details: error?.message },
      { status: 500 }
    );
  }
}
