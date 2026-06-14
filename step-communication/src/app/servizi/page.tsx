import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, methodology } from "@/content/services";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servizi — sport sponsorship, eventi e marketing sportivo",
  description:
    "I servizi di 7 Sport Agency: sport sponsorship e ricerca sponsor, eventi e tour, fiere e congressi, incentive, sampling e life & sport coaching.",
  alternates: { canonical: "/servizi" },
  openGraph: {
    title: "Servizi — 7 Sport Agency",
    description:
      "Sport sponsorship, eventi e tour, fiere e congressi, incentive, sampling e coaching.",
    url: `${siteConfig.url}/servizi`,
  },
};

export default function ServiziPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Servizi", url: `${siteConfig.url}/servizi` },
        ])}
      />

      <PageHero
        eyebrow="Cosa facciamo"
        image={services[0].image}
        tone="crimson"
        title={
          <>
            Sei servizi per portare il tuo brand nello{" "}
            <span className="italic text-gradient-accent">sport.</span>
          </>
        }
        intro="Dalla ricerca sponsor agli eventi, dal sampling al coaching: scegli il punto di partenza, alla regia pensiamo noi."
      />

      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide flex flex-col gap-20 lg:gap-28">
          {services.map((service, i) => {
            const Icon = service.icon;
            const reversed = i % 2 === 1;
            return (
              <Reveal key={service.slug}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-3xl border border-line",
                      reversed && "lg:order-2"
                    )}
                  >
                    <CinematicImage
                      src={service.image}
                      alt={service.title}
                      tone={service.tone}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className={cn(reversed && "lg:order-1")}>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-sm text-fg-muted">
                        {service.number}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                    </div>
                    <h2 className="mt-5 text-fluid-h3 font-medium leading-tight text-fg">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-fg-muted">
                      {service.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/servizi/${service.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
                    >
                      Scopri il servizio
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-bg-subtle py-24 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
              <span className="h-px w-8 bg-accent" />
              Il nostro metodo
            </span>
            <h2 className="mt-5 max-w-3xl text-fluid-h2 font-medium leading-[1.05] text-gradient">
              Una regia in quattro fasi, dalla visione al risultato.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((m, i) => (
              <Reveal key={m.step} delay={i * 0.07}>
                <div className="flex h-full flex-col bg-bg p-8">
                  <span className="font-display text-3xl font-medium text-accent">
                    {m.step}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-medium text-fg">
                    {m.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                    {m.description}
                  </p>
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
