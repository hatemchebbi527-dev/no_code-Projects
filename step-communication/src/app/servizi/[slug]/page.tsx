import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronDown, ArrowUpRight } from "lucide-react";
import { services, methodology, getService } from "@/content/services";
import { siteConfig } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { buttonVariants } from "@/components/ui/Button";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servizi/${slug}` },
    openGraph: {
      title: `${service.metaTitle} — ${siteConfig.name}`,
      description: service.metaDescription,
      url: `${siteConfig.url}/servizi/${slug}`,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema(service),
          faqSchema(service.faq),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Servizi", url: `${siteConfig.url}/servizi` },
            { name: service.title, url: `${siteConfig.url}/servizi/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`Servizio ${service.number}`}
        image={service.image}
        imageAlt={service.title}
        tone={service.tone}
        title={service.title}
        intro={service.short}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Servizi", href: "/servizi" },
          { name: service.title, href: `/servizi/${service.slug}` },
        ]}
      />

      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-fluid-h3 font-medium leading-tight text-gradient">
              Cosa facciamo, nel dettaglio.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              {service.description}
            </p>
            <Link
              href="/clienti"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              Guarda i clienti e i progetti
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-bg-subtle p-8 lg:p-10">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg-muted">
                Perché conviene
              </h3>
              <ul className="mt-6 space-y-5">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed text-fg">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-bg-subtle py-24 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
              <span className="h-px w-8 bg-accent" />
              Come lavoriamo
            </span>
            <h2 className="mt-5 max-w-3xl text-fluid-h2 font-medium leading-[1.05] text-gradient">
              Una regia in quattro fasi.
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

      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
              <span className="h-px w-8 bg-accent" />
              Domande frequenti
            </span>
            <h2 className="mt-5 text-fluid-h2 font-medium leading-[1.05] text-gradient">
              Hai dei dubbi? Iniziamo da qui.
            </h2>
          </Reveal>

          <div className="divide-y divide-line border-y border-line">
            {service.faq.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-lg font-medium text-fg">
                      {f.q}
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-fg-muted transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg-subtle py-20">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-medium text-fg">
              Altri servizi
            </h2>
            <Link
              href="/servizi"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              Tutti i servizi
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/servizi/${s.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-bg p-5 transition-colors hover:border-fg/25"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="flex-1 font-medium text-fg">{s.title}</span>
                  <ArrowUpRight className="h-4 w-4 text-fg-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
