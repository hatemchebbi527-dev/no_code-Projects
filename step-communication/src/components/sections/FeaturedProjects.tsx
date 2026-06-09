import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/Button";

/**
 * "Progetti in evidenza" - portfolio cinematografico.
 * ⚠️ Immagini e dati placeholder (vedi content/projects.ts e content/media.ts).
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
                <br className="hidden sm:block" /> non <span className="italic text-gradient-accent">dimenticano.</span>
              </>
            }
          />
          <Reveal>
            <Link href="/#contatti" className={buttonVariants({ variant: "secondary" })}>
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
                className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border border-line p-7"
              >
                <CinematicImage
                  src={project.image}
                  alt={`${project.title} - ${project.category}`}
                  tone={project.tone}
                  zoom
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Top */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="rounded-full border border-fg/15 bg-bg/40 px-3 py-1 text-xs font-medium text-fg backdrop-blur-md">
                    {project.category}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-fg/70 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* Bottom */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 text-xs text-fg/70">
                    <span>{project.year}</span>
                    <span className="h-1 w-1 rounded-full bg-fg/40" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-fg">
                    {project.title}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2 border-t border-fg/15 pt-4">
                    <span className="font-display text-3xl font-medium text-accent">
                      {project.metric.value}
                    </span>
                    <span className="text-sm text-fg/70">{project.metric.label}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
