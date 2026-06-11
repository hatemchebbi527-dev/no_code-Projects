import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
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

/** Hero riutilizzabile per le pagine interne (versione chiara editoriale). */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  tone = "slate",
  breadcrumbs,
}: Props) {
  const hasImage = Boolean(image);

  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-40 lg:pb-24 lg:pt-44">
      {/* Alone ciano discreto del brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[130px]"
      />

      <div className="container-wide relative z-10">
        <div
          className={cn(
            "grid items-center gap-12 lg:gap-16",
            hasImage && "lg:grid-cols-[1.05fr_0.95fr]"
          )}
        >
          {/* Testo */}
          <div>
            {breadcrumbs && (
              <Reveal>
                <nav
                  aria-label="Breadcrumb"
                  className="mb-6 flex items-center gap-1.5 text-sm text-fg-muted"
                >
                  {breadcrumbs.map((c, i) => (
                    <span key={c.href} className="flex items-center gap-1.5">
                      {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                      {i < breadcrumbs.length - 1 ? (
                        <Link href={c.href} className="transition-colors hover:text-fg">
                          {c.name}
                        </Link>
                      ) : (
                        <span className="text-fg">{c.name}</span>
                      )}
                    </span>
                  ))}
                </nav>
              </Reveal>
            )}

            {eyebrow && (
              <Reveal>
                <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
                  <span className="h-px w-8 bg-accent" />
                  {eyebrow}
                </span>
              </Reveal>
            )}

            <Reveal delay={0.05}>
              <h1 className="mt-5 max-w-3xl text-fluid-h2 font-medium leading-[1.04] text-fg">
                {title}
              </h1>
            </Reveal>

            {intro && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
                  {intro}
                </p>
              </Reveal>
            )}
          </div>

          {/* Immagine cinematografica in cornice */}
          {hasImage && (
            <Reveal delay={0.12}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line shadow-[0_36px_80px_-44px_rgba(0,0,0,0.4)] lg:aspect-[5/4]">
                <CinematicImage
                  src={image}
                  alt={imageAlt}
                  tone={tone}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
