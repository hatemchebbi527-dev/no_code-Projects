import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/Button";

/**
 * "Progetti in evidenza" - portfolio premium.
 * ⚠️ I visual sono placeholder generati via CSS. Sostituire i blocchi gradiente
 * con next/image e le immagini reali dei case study (vedi content/projects.ts).
 */
export function FeaturedProjects() {
  return (
    <section id="progetti" className="relative bg-bg-subtle py-24 sm:py-32 lg:py-40">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Progetti in evidenza"
            title={
              <>
                Esperienze che le persone
                <br className="hidden sm:block" /> non dimenticano.
              </>
            }
          />
          <Reveal>
            <Link
              href="/#contatti"
              className={buttonVariants({ variant: "secondary" })}
            >
              Vedi tutti i progetti
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08} className="h-full">
              <Link
                href="/#contatti"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg"
              >
                {/* Visual placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-105 ${
                      project.accent
                        ? "bg-[radial-gradient(120%_120%_at_20%_0%,rgb(var(--accent)/0.45),transparent_55%),linear-gradient(160deg,rgb(var(--bg-elevated)),rgb(var(--bg)))]"
                        : "bg-[radial-gradient(120%_120%_at_80%_0%,rgb(var(--accent)/0.18),transparent_50%),linear-gradient(160deg,rgb(var(--bg-elevated)),rgb(var(--bg)))]"
                    }`}
                  />
                  <div className="absolute inset-0 grain" />
                  {/* Metrica in evidenza */}
                  <div className="absolute inset-0 flex flex-col justify-between p-7">
                    <span className="w-fit rounded-full border border-fg/15 bg-bg/30 px-3 py-1 text-xs font-medium text-fg backdrop-blur-sm">
                      {project.category}
                    </span>
                    <div>
                      <p className="font-display text-5xl font-semibold tracking-tightest text-fg">
                        {project.metric.value}
                      </p>
                      <p className="mt-1 text-sm text-fg-muted">
                        {project.metric.label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testo */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-xs text-fg-muted">
                    <span>{project.year}</span>
                    <span className="h-1 w-1 rounded-full bg-fg-muted/50" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="mt-3 flex items-start justify-between gap-3 font-display text-xl font-semibold text-fg">
                    {project.title}
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-muted transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
