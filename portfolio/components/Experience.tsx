import { experience, achievements, education } from "@/app/data";
import { SectionHeading } from "./Section";
import { BriefcaseIcon, TrophyIcon, GraduationIcon } from "./Icons";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="04"
        title="Percorso"
        subtitle="Esperienza, risultati e formazione."
      />

      <div className="grid gap-12 md:grid-cols-2">
        {/* Colonne gauche : Experience + Education */}
        <div data-reveal className="space-y-10">
          <div>
            <div className="mb-5 flex items-center gap-2 text-accent">
              <BriefcaseIcon className="h-5 w-5" />
              <h3 className="text-lg font-medium text-foreground">Esperienza</h3>
            </div>
            <div className="relative space-y-7 border-l border-border pl-6">
              {experience.map((e) => (
                <div key={e.role} className="relative">
                  <span className="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                  <h4 className="font-medium">{e.role}</h4>
                  <div className="text-sm text-accent">{e.org}</div>
                  <div className="mt-0.5 font-mono text-xs text-muted">{e.period}</div>
                  <ul className="mt-2 space-y-1.5">
                    {e.points.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted">
                        <span className="text-accent">›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-2 text-accent">
              <GraduationIcon className="h-5 w-5" />
              <h3 className="text-lg font-medium text-foreground">Formazione</h3>
            </div>
            {education.map((ed) => (
              <div
                key={ed.title}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h4 className="font-medium">{ed.title}</h4>
                <div className="text-sm text-accent">{ed.org}</div>
                <div className="mt-0.5 font-mono text-xs text-muted">{ed.period}</div>
                {ed.note && <p className="mt-2 text-sm text-muted">{ed.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite : Achievements */}
        <div data-reveal>
          <div className="mb-5 flex items-center gap-2 text-accent">
            <TrophyIcon className="h-5 w-5" />
            <h3 className="text-lg font-medium text-foreground">Risultati</h3>
          </div>
          <div className="space-y-3">
            {achievements.map((a) => (
              <div
                key={a.title}
                className="group flex gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.25)]"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent">
                  <TrophyIcon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-medium">{a.title}</h4>
                  <p className="mt-1 text-sm text-muted">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
