import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hatem Chebbi — Freelance IA & Automazione",
  description:
    "Consulente e sviluppatore freelance in intelligenza artificiale. Aiuto le aziende ad automatizzare i processi e a integrare l'IA nelle loro operazioni.",
  openGraph: {
    title: "Hatem Chebbi — Freelance IA & Automazione",
    description:
      "Consulente e sviluppatore freelance in IA. Automazione dei processi, integrazione dell'IA, sviluppo web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
