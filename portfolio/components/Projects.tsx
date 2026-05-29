import { projects } from "@/app/data";
import { SectionHeading } from "./Section";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="03"
        title="Projets"
        subtitle="Quelques exemples de réalisations et de cas d'usage."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => {
          const Wrapper = p.href ? "a" : "div";
          return (
            <Wrapper
              key={p.title}
              {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
              data-reveal
              className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-foreground/20 hover:bg-surface-2"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted">
                  {p.category}
                </span>
                {p.href && (
                  <span className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="font-mono text-xs text-muted">
                    #{t}
                  </li>
                ))}
              </ul>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
