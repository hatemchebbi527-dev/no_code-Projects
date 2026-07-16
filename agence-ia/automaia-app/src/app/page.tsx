import { Clock, Megaphone, ShieldCheck, Users, Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const PILLARS = [
  {
    icon: Workflow,
    iconBg: "bg-[#1FBF9E]",
    title: "Workflow di studio",
    description:
      "Automatizza attività e procedure ripetitive con modelli riutilizzabili e checklist generate dall'IA.",
  },
  {
    icon: Users,
    iconBg: "bg-[#0B1E33]",
    title: "Acquisizione clienti",
    description:
      "Gestisci i tuoi contatti in una pipeline chiara e scrivi email di prospezione con l'aiuto dell'IA.",
  },
  {
    icon: Megaphone,
    iconBg: "bg-[#0B1E33]",
    title: "Posizionamento e visibilità",
    description:
      "Genera post e contenuti professionali, pianificali e mantieni una presenza online che gira da sola.",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-[#0B1E33]">
      <header className="flex items-center justify-between px-6 py-4 lg:px-16">
        <span className="flex items-center gap-2 text-lg font-bold">
          <Clock className="h-5 w-5 text-[#1FBF9E]" />
          AutomaIA
        </span>
        <nav className="flex items-center gap-4">
          <span className="hidden text-sm text-slate-500 sm:inline">IT</span>
          <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-[#0B1E33]">
            Accedi
          </Link>
          <Button asChild className="bg-[#1FBF9E] text-[#0B1E33] hover:bg-[#1FBF9E]/90">
            <Link href="/signup">Inizia ora</Link>
          </Button>
        </nav>
      </header>

      <section className="bg-gradient-to-b from-[#EAF6F3] to-white px-6 py-16 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1FBF9E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1FBF9E]">
              <Clock className="h-3.5 w-3.5" />
              Automazione &amp; IA per studi professionali
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
              Recupera fino a 10 ore a settimana nel tuo studio
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              AutomaIA automatizza il lavoro ripetitivo, organizza i tuoi clienti e cura la tua
              visibilità online. I tuoi dati restano sempre protetti e sotto il tuo controllo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#1FBF9E] text-[#0B1E33] hover:bg-[#1FBF9E]/90"
              >
                <a href="https://automa-ia.net/contatti" target="_blank" rel="noopener noreferrer">
                  Prenota un audit gratuito →
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-300 text-[#0B1E33] hover:bg-slate-50"
              >
                <Link href="/login">Accedi alla piattaforma</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-[#1FBF9E]" />
              RGPD · Automazione &amp; IA per studi professionali
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#1FBF9E]/20 to-transparent p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/hero-office.jpg"
                alt="Professionisti di uno studio al lavoro"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold lg:text-3xl">
            Tre pilastri per far crescere il tuo studio
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${pillar.iconBg}`}>
                  <pillar.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex items-center justify-between bg-[#0B1E33] px-6 py-6 text-sm text-white/80 lg:px-16">
        <span className="font-semibold text-white">AutomaIA</span>
        <span>© {new Date().getFullYear()} AutomaIA · Automazione &amp; IA</span>
      </footer>
    </div>
  );
}
