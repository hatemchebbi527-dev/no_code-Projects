import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salon Éclat — Coiffure & Beauté à Rimini',
  description: 'Prenez rendez-vous en ligne 24h/24 avec notre assistante IA Sofia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-rose-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
