import { projects } from "@/app/data";
import { GithubIcon } from "./Icons";
import { SectionHeading } from "./Section";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="03"
        title="Progetti"
        subtitle="Passa il mouse su una scheda per vederne i dettagli."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.title}
            data-reveal
            tabIndex={0}
            className="flip-card h-72 outline-none"
            aria-label={p.title}
          >
            <div className="flip-inner">
              {/* Recto */}
              <div className="flip-face rounded-xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-accent">
                    {p.category}
                  </span>
                  <GithubIcon className="h-5 w-5 text-muted" />
                </div>
                <h3 className="mt-auto text-xl font-medium">{p.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="font-mono text-xs text-muted">
                      #{t}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 font-mono text-xs text-accent/80">
                  Dettagli →
                </span>
              </div>

              {/* Verso */}
              <div className="flip-face flip-back rounded-xl border border-accent/40 bg-surface-2 p-6 shadow-[0_0_50px_-12px_rgba(52,211,153,0.35)]">
                <span className="font-mono text-xs text-accent">{p.category}</span>
                <h3 className="mt-1 text-lg font-medium">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Vedi il progetto ↗
                  </a>
                ) : (
                  <span className="mt-4 font-mono text-xs text-muted">
                    Caso d&apos;uso
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
