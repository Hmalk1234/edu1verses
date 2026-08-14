import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-2xl mb-4">
        404
      </div>
      <h2 className="text-xl font-bold text-zinc-100 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mb-6">
        Halaman atau modul yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-colors"
      >
        Kembali ke Dashboard Utama
      </Link>
    </div>
  );
}
