import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#09090b',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Akademia Global — Universal Deep Learning & Academic Certification',
  description: 'Platform pembelajaran komprehensif mulai dari nol hingga mahir untuk coding, sains, humaniora, tracking kriteria universitas dunia & beasiswa, AI tutor cerdas, dan sertifikasi digital terverifikasi.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Akademia Global',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'Akademia Global — Universal Deep Learning & Academic Certification',
    description: 'Platform pembelajaran komprehensif mulai dari nol hingga mahir untuk coding, sains, humaniora, tracking kriteria universitas dunia & beasiswa, AI tutor cerdas, dan sertifikasi digital terverifikasi.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body suppressHydrationWarning className="bg-zinc-950 text-zinc-100 min-h-screen antialiased selection:bg-zinc-700 selection:text-white overscroll-none">
        {children}
      </body>
    </html>
  );
}
