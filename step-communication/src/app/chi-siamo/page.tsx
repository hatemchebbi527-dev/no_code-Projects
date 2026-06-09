import type { Metadata } from "next";
import {
  Lightbulb,
  Gem,
  TrendingUp,
  HeartHandshake,
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
  title: "Chi siamo — l'agenzia di eventi di Rimini dal 2005",
  description:
    "Step Communication è l'agenzia di eventi e marketing esperienziale di Rimini, fondata nel 2005 da Alessandro Lo Presti. Strategie non convenzionali, esecuzione impeccabile.",
  alternates: { canonical: "/chi-siamo" },
  openGraph: {
    title: "Chi siamo — Step Communication",
    description:
      "L'agenzia di eventi e marketing esperienziale di Rimini, dal 2005. Strategie non convenzionali, esecuzione impeccabile.",
    url: `${siteConfig.url}/chi-siamo`,
  },
};

type Value = { icon: LucideIcon; title: string; description: string };

const values: Value[] = [
  {
    icon: Lightbulb,
    title: "Idee non convenzionali",
    description:
      "Non seguiamo i format: li reinventiamo. Cerchiamo l'angolo che fa fermare le persone e ricordare il brand.",
  },
  {
    icon: Gem,
    title: "Cura ossessiva del dettaglio",
    description:
      "La differenza tra un buon evento e un'esperienza memorabile sta nei dettagli. Li presidiamo tutti.",
  },
  {
    icon: TrendingUp,
    title: "Risultati misurabili",
    description:
      "L'emozione conta, ma il business anche. Lavoriamo su KPI chiari e rendicontiamo l'impatto reale.",
  },
  {
    icon: HeartHandshake,
    title: "Relazioni durature",
    description:
      "Non cerchiamo clienti per un evento, ma partner per il lungo periodo. La fiducia è il nostro vero portfolio.",
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
        image={img("1540039155733-5bb30b53aa14")}
        tone="ember"
        title={
          <>
            Dal 2005 connettiamo i brand
            <br className="hidden sm:block" /> alle{" "}
            <span className="italic text-gradient-accent">persone.</span>
          </>
        }
        intro="Nati a Rimini, capitale italiana dell'intrattenimento, abbiamo fatto dell'energia della Riviera il nostro metodo: creatività, ospitalità e una macchina organizzativa che non sbaglia un colpo."
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
              Un&apos;agenzia nata dall&apos;ossessione per l&apos;esperienza dal vivo.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
              <p>
                Step Communication nasce nel {siteConfig.founded} dalla visione
                di {siteConfig.founder}: portare nel mondo degli eventi e della
                comunicazione un approccio diverso, fatto di strategie non
                convenzionali e di un&apos;attenzione maniacale al risultato.
              </p>
              <p>
                In vent&apos;anni siamo cresciuti seguendo l&apos;evoluzione del
                settore, ma senza mai perdere ciò che ci ha sempre distinto: la
                capacità di trasformare un obiettivo di business in
                un&apos;esperienza che le persone vivono, ricordano e raccontano.
                Tour, eventi MICE, attivazioni di marca, lanci di prodotto: una
                sola regia, dalla prima idea all&apos;ultimo applauso.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <CinematicImage
                src={img("1429962714451-bb934ecdc4ec")}
                alt="Evento live prodotto da Step Communication"
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
                Creare esperienze memorabili che generano engagement, visibilità
                e crescita reale per i brand che ci scelgono.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full bg-bg p-9 lg:p-12">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
                Visione
              </h3>
              <p className="mt-5 font-display text-2xl font-medium leading-snug text-fg">
                Essere il partner di riferimento in Italia per chi vuole far
                vivere il proprio brand, non solo raccontarlo.
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
              Quattro principi che guidano ogni progetto.
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
            { value: "2005", label: "anno di fondazione" },
            { value: "20", label: "anni di esperienza" },
            { value: "500+", label: "eventi prodotti" },
            { value: "360°", label: "regia completa" },
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
              Persone appassionate di eventi e comunicazione.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
              Dietro ogni progetto c&apos;è una squadra di professionisti che vive
              gli eventi come una vocazione. {/* DA COMPLETARE: foto e bio reali del team. */}
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
                      alt="Membro del team Step Communication"
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
