import Link from "next/link";
import { Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { footerNav, siteConfig } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

const socials = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
].filter((s) => s.href);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-subtle">
      {/* Glow di brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="container-wide relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo large />
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">
              {siteConfig.tagline}. Da {siteConfig.experience} connettiamo i
              brand alla passione dello sport. Sponsorizzazioni sportive, eventi
              e tour da San Marino, per l&apos;Italia e l&apos;Europa.
            </p>

            {socials.length > 0 && (
              <div className="mt-7 flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-muted transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contatti */}
        <div className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">Sede</p>
            <p className="mt-2 text-sm text-fg">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city} (
              {siteConfig.address.region}), {siteConfig.address.countryName}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">
              Scrivici
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-flex items-center gap-1 text-sm text-fg transition-colors hover:text-accent"
            >
              {siteConfig.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={`mailto:${siteConfig.emailEvents}`}
              className="mt-1 block text-sm text-fg-muted transition-colors hover:text-accent"
            >
              {siteConfig.emailEvents}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">
              Chiamaci
            </p>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="mt-2 block text-sm text-fg transition-colors hover:text-accent"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-fg-muted sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.legalName}. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-fg">
              Privacy
            </Link>
            <Link href="/cookie" className="transition-colors hover:text-fg">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
