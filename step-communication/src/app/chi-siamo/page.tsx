import type { Metadata } from "next";
import {
  Handshake,
  Users,
  Trophy,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { img } from "@/content/media";

export const metadata: Metadata = {
  title: "Chi siamo — agenzia di marketing sportivo dal cuore di San Marino",
  description:
    "7 Sport Agency è specializzata da oltre 10 anni in sponsorizzazioni sportive e marketing dello sport. Network di 900+ aziende, 100+ clienti, 40M di utenti al mese.",
  alternates: { canonical: "/chi-siamo" },
  openGraph: {
    title: "Chi siamo — 7 Sport Agency",
    description:
      "Da oltre 10 anni connettiamo i brand al mondo dello sport. Sponsorizzazioni, eventi e un network unico.",
    url: `${siteConfig.url}/chi-siamo`,
  },
};

type Value = { icon: LucideIcon; title: string; description: string };

const values: Value[] = [
  {
    icon: Handshake,
    title: "Chiarezza e onestà",
    description:
      "Condividiamo opportunità con trasparenza. Aspettative reali, tempi realistici, nessuna promessa che non possiamo mantenere.",
  },
  {
    icon: Users,
    title: "Capacità di fare network",
    description:
      "Il nostro vero patrimonio è la rete: oltre 900 aziende e relazioni costruite in anni di lavoro nello sport.",
  },
  {
    icon: Trophy,
    title: "Passione per lo sport",
    description:
      "Viviamo lo sport ogni giorno. Conosciamo le dinamiche, il pubblico e l'emozione che muove i tifosi.",
  },
  {
    icon: TrendingUp,
    title: "Risultati nel tempo",
    description:
      "La ricerca sponsor richiede metodo e costanza: lavoriamo per risultati solidi, anche nel medio-lungo periodo.",
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Chi siamo", url: `${siteConfig.url}/chi-siamo` },
        ])}
      />

      <PageHero
        eyebrow="Chi siamo"
        image={img("1522778119026-d647f0596c20")}
        tone="ember"
        title={
          <>
            Da oltre 10 anni connettiamo
            <br className="hidden sm:block" /> i brand allo{" "}
            <span className="italic text-gradient-accent">sport.</span>
          </>
        }
        intro="Siamo 7 Sport Agency: agenzia specializzata in marketing sportivo e sponsorizzazioni, con sede a San Marino e progetti in tutta Italia e in Europa."
      />

      {/* Storia */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
              <span className="h-px w-8 bg-accent" />
              La nostra storia
            </span>
            <h2 className="mt-5 text-fluid-h2 font-medium leading-[1.05] text-gradient">
              Innovativi format di sponsorizzazione, da oltre dieci anni.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
              <p>
                L&apos;ideazione e la realizzazione di format di sponsorizzazione
                innovativi è da oltre 10 anni il nostro core business. Crediamo
                che ognuno possa dare un contributo unico, nella condivisione di
                opportunità con chiarezza e onestà, e soprattutto nella capacità
                di fare network.
              </p>
              <p>
                7 Sport Agency è titolare del marchio Step Communication, una
                partnership che ci ha permesso di acquisire esperienza e
                competenze specifiche nell&apos;Event Marketing. Abbiamo seguito
                oltre cento clienti in progetti di sponsorizzazione nel calcio di
                Serie A e B, nel basket, nel rugby, nel tennis e nel motorsport.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <CinematicImage
                src={img("1459865264687-595d652de67e")}
                alt="Evento sportivo seguito da 7 Sport Agency"
                tone="crimson"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Missione & Visione */}
      <section className="border-t border-line bg-bg-subtle py-24 sm:py-28">
        <div className="container-wide grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          <Reveal>
            <div className="h-full bg-bg p-9 lg:p-12">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
                Missione
              </h3>
              <p className="mt-5 font-display text-2xl font-medium leading-snug text-fg">
                Connettere le aziende al mondo dello sport con format di
                sponsorizzazione che generano visibilità e valore reale.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full bg-bg p-9 lg:p-12">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
                Visione
              </h3>
              <p className="mt-5 font-display text-2xl font-medium leading-snug text-fg">
                Essere il punto di riferimento per chi vuole entrare nel mondo
                dello sport nel modo giusto, e farlo crescere.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valori */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
              <span className="h-px w-8 bg-accent" />
              I nostri valori
            </span>
            <h2 className="mt-5 max-w-3xl text-fluid-h2 font-medium leading-[1.05] text-gradient">
              Quattro principi che guidano ogni partnership.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 0.07} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-bg-subtle p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-medium text-fg">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                      {v.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Numeri */}
      <section className="border-y border-line bg-bg-subtle py-16">
        <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "10+", label: "anni di esperienza" },
            { value: "100+", label: "clienti sportivi" },
            { value: "900+", label: "aziende nel network" },
            { value: "40M", label: "utenti al mese" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div>
                <p className="font-display text-4xl font-medium text-fg lg:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team (placeholder) */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
              <span className="h-px w-8 bg-accent" />
              Il team
            </span>
            <h2 className="mt-5 max-w-3xl text-fluid-h2 font-medium leading-[1.05] text-gradient">
              Professionisti che vivono di sport e di business.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
              Dietro ogni partnership c&apos;è una squadra che conosce sia il
              linguaggio dello sport sia quello delle aziende. {/* DA COMPLETARE: foto e bio reali del team. */}
            </p>
          </Reveal>

          {/* DA SOSTITUIRE: griglia del team con foto, nome e ruolo reali. */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Reveal key={n} delay={n * 0.06}>
                <div className="overflow-hidden rounded-3xl border border-line">
                  <div className="relative aspect-[3/4]">
                    <CinematicImage
                      src={img("1521737604893-d14cc237f11d")}
                      alt="Membro del team 7 Sport Agency"
                      tone="slate"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-display text-lg font-medium text-fg">
                      Nome Cognome
                    </p>
                    <p className="mt-0.5 text-sm text-fg-muted">Ruolo</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
