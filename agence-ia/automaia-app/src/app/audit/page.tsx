import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck } from "lucide-react";

// Remplacer par ton URL Calendly quand disponible
// Exemple : https://calendly.com/automaia/audit
const CALENDLY_URL = "https://calendly.com/INSERIRE-LINK-CALENDLY";

export const metadata: Metadata = {
  title: "Audit gratuito · AutomaIA",
  description:
    "Prenoti un audit gratuito di 20 minuti per scoprire come automatizzare il Suo studio professionale.",
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1E33]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4 lg:px-16">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Clock className="h-5 w-5 text-[#1FBF9E]" />
          AutomaIA
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-[#0B1E33]"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna alla home
        </Link>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">

        {/* Intro */}
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1FBF9E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1FBF9E]">
            <Clock className="h-3.5 w-3.5" />
            Audit gratuito · 20 minuti
          </span>
          <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
            Scopra da dove iniziare
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-500">
            In 20 minuti analizziamo insieme le attività del Suo studio che
            rubano più tempo. Nessun impegno, nessuna vendita. Solo un'analisi
            concreta del Suo primo guadagno di tempo.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1FBF9E]" />
            Dati protetti · Nessun impegno · RGPD
          </div>
        </div>

        {/* Cosa aspettarsi */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Racconto",
              desc: "Mi racconta una giornata tipo del Suo studio.",
            },
            {
              step: "02",
              title: "Analisi",
              desc: "Identifichiamo insieme le attività che rubano più tempo.",
            },
            {
              step: "03",
              title: "Piano",
              desc: "Le presento il Suo primo guadagno di tempo concreto.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <span className="mb-2 block text-xs font-bold tracking-widest text-[#1FBF9E]">
                {item.step}
              </span>
              <p className="mb-1 font-semibold text-[#0B1E33]">{item.title}</p>
              <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Calendly widget */}
        <div
          className="calendly-inline-widget overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
          data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=1FBF9E`}
          style={{ minWidth: "320px", height: "700px" }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />

      </main>

      {/* Footer */}
      <footer className="mt-12 flex items-center justify-between bg-[#0B1E33] px-6 py-6 text-sm text-white/80 lg:px-16">
        <span className="font-semibold text-white">AutomaIA</span>
        <span>© {new Date().getFullYear()} AutomaIA · Automazione &amp; IA</span>
      </footer>
    </div>
  );
}
