import type { Metadata } from "next";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { ContactForm } from "@/components/sections/ContactForm";
import { img } from "@/content/media";

export const metadata: Metadata = {
  title: "Contatti — richiedi una proposta",
  description:
    "Contatta Step Communication a Rimini. Raccontaci il tuo evento o la tua campagna: ti rispondiamo entro 24 ore con una proposta strategica.",
  alternates: { canonical: "/contatti" },
  openGraph: {
    title: "Contatti — Step Communication",
    description:
      "Raccontaci il tuo progetto: ti rispondiamo entro 24 ore con una proposta strategica.",
    url: `${siteConfig.url}/contatti`,
  },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city} ${siteConfig.address.region}, ${siteConfig.address.countryName}`
)}&output=embed`;

const socials = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
].filter((s) => s.href);

export default function ContattiPage() {
  return (
    <>
      <JsonLd
        schema={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Contatti", url: `${siteConfig.url}/contatti` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contatti"
        image={img("1492684223066-81342ee5ff30")}
        tone="gold"
        title={
          <>
            Parliamo del tuo
            <br className="hidden sm:block" /> prossimo{" "}
            <span className="italic text-gradient-accent">evento.</span>
          </>
        }
        intro="Raccontaci obiettivi, date e budget. Ti rispondiamo entro 24 ore con una prima proposta strategica, senza impegno."
      />

      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Info di contatto */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="space-y-6">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-accent">
                    <Mail className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-fg-muted">
                      Email
                    </span>
                    <span className="text-fg transition-colors group-hover:text-accent">
                      {siteConfig.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-accent">
                    <Phone className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-fg-muted">
                      Telefono
                    </span>
                    <span className="text-fg transition-colors group-hover:text-accent">
                      {siteConfig.phone}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-accent">
                    <MapPin className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-fg-muted">
                      Sede
                    </span>
                    <span className="text-fg">
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.postalCode} {siteConfig.address.city} (
                      {siteConfig.address.region})
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>

            {socials.length > 0 && (
              <Reveal delay={0.06}>
                <div className="flex items-center gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-muted transition-all hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-[1.1rem] w-[1.1rem]" />
                    </a>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-line">
                <iframe
                  title={`Mappa - ${siteConfig.name}`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[300px] w-full grayscale-[0.3] contrast-[1.05]"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
