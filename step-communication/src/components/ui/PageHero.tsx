import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Reveal } from "@/components/motion/Reveal";
import type { Tone } from "@/content/media";

type Crumb = { name: string; href: string };

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  tone?: Tone;
  breadcrumbs?: Crumb[];
};

/** Hero riutilizzabile per le pagine interne. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  tone = "slate",
  breadcrumbs,
}: Props) {
  return (
    <section className="relative flex min-h-[58svh] items-end overflow-hidden pt-[72px]">
      <CinematicImage
        src={image}
        alt={imageAlt}
        tone={tone}
        sizes="100vw"
        priority
        overlay={false}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-bg/30"
      />

      <div className="container-wide relative z-10 pb-14 pt-20">
        {breadcrumbs && (
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-1.5 text-sm text-fg/60"
            >
              {breadcrumbs.map((c, i) => (
                <span key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={c.href} className="transition-colors hover:text-fg">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-fg/90">{c.name}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg/70">
              <span className="h-px w-8 bg-accent" />
              {eyebrow}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-4xl text-fluid-h2 font-medium leading-[1.04] text-fg">
            {title}
          </h1>
        </Reveal>

        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/80">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
