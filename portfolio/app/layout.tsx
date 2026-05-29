import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hatem Chebbi — Freelance IA & Automatisation",
  description:
    "Consultant et développeur indépendant en intelligence artificielle. J'aide les entreprises à automatiser leurs processus et à intégrer l'IA dans leurs opérations.",
  openGraph: {
    title: "Hatem Chebbi — Freelance IA & Automatisation",
    description:
      "Consultant et développeur indépendant en IA. Automatisation des processus, intégration de l'IA, développement web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
