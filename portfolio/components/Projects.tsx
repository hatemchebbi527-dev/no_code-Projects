"use client";

import { useState } from "react";
import { projects } from "@/app/data";
import { GithubIcon } from "./Icons";
import { SectionHeading } from "./Section";

export default function Projects() {
  // Index de la carte retournée au tap (mobile). Le hover reste géré en CSS sur desktop.
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="03"
        title="Progetti"
        subtitle="Passa il mouse (o tocca su mobile) su una scheda per vederne i dettagli."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          // Wrapper externe : porte l'animation d'apparition (transform).
          <div key={p.title} data-reveal>
            {/* Élément flip : porte la perspective 3D, sans autre transform. */}
            <div
              tabIndex={0}
              role="button"
              aria-pressed={flipped === i}
              onClick={() => setFlipped((cur) => (cur === i ? null : i))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFlipped((cur) => (cur === i ? null : i));
                }
              }}
              className={`flip-card h-72 cursor-pointer outline-none ${
                flipped === i ? "is-flipped" : ""
              }`}
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
                  <h3 className="mt-4 text-xl font-medium">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {p.summary}
                  </p>
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
                  <p className="mt-3 flex-1 overflow-auto text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
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
          </div>
        ))}
      </div>
    </section>
  );
}
