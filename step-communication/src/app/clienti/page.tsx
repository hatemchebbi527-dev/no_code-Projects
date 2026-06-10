import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { clients } from "@/content/clients";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { img } from "@/content/media";

export const metadata: Metadata = {
  title: "Clienti — i brand e i club che hanno scelto lo sport con noi",
  description:
    "Oltre 100 clienti nel calcio di Serie A e B, basket, rugby, tennis e motorsport. Tra i partner di 7 Sport Agency: Tour de France, Brera Holdings e molti altri.",
  alternates: { canonical: "/clienti" },
  openGraph: {
    title: "Clienti — 7 Sport Agency",
    description:
      "Oltre 100 clienti nei principali sport. Tour de France, Brera Holdings e molti altri.",
    url: `${siteConfig.url}/clienti`,
  },
};

const stats = [
  { value: "100+", label: "clienti sportivi" },
  { value: "900+", label: "aziende nel network" },
  { value: "40M", label: "utenti al mese" },
  { value: "10+", label: "anni di esperienza" },
];

export default function ClientiPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Clienti", url: `${siteConfig.url}/clienti` },
        ])}
      />

      <PageHero
        eyebrow="Clienti & progetti"
        image={img("1431324155629-1a6deb1dec8d")}
        tone="ember"
        title={
          <>
            I brand e i club che vivono lo{" "}
            <span className="italic text-gradient-accent">sport con noi.</span>
          </>
        }
        intro="Oltre 100 clienti in progetti di sponsorizzazione nel calcio di Serie A e B, nel basket, nel rugby, nel tennis e nel motorsport."
      />

      {/* Loghi */}
      <section className="border-b border-line bg-bg-subtle py-14">
        <div className="container-wide">
          <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-fg-muted">
            Alcuni dei brand e partner con cui abbiamo lavorato
          </p>
          {/* ⚠️ DA SOSTITUIRE con i loghi ufficiali (SVG monocromatici). */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((name) => (
              <span
                key={name}
                className="font-display text-2xl font-semibold tracking-tight text-fg-muted/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Progetti */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
              <span className="h-px w-8 bg-accent" />
              Progetti in evidenza
            </span>
            <h2 className="mt-5 max-w-3xl text-fluid-h2 font-medium leading-[1.05] text-gradient">
              Partnership che fanno la differenza.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.08} className="h-full">
                <div className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border border-line p-7">
                  <CinematicImage
                    src={project.image}
                    alt={`${project.title} - ${project.category}`}
                    tone={project.tone}
                    zoom
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="relative z-10">
                    <span className="rounded-full border border-fg/15 bg-bg/40 px-3 py-1 text-xs font-medium text-fg backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 text-xs text-fg/70">
                      <span>{project.year}</span>
                      <span className="h-1 w-1 rounded-full bg-fg/40" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-fg">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg/75">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex items-baseline gap-2 border-t border-fg/15 pt-4">
                      <span className="font-display text-3xl font-medium text-accent">
                        {project.metric.value}
                      </span>
                      <span className="text-sm text-fg/70">
                        {project.metric.label}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numeri */}
      <section className="border-y border-line bg-bg-subtle py-16">
        <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
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

      <FinalCta />
    </>
  );
}
