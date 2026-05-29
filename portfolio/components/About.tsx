import { about } from "@/app/data";
import { SectionHeading } from "./Section";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="01" title="Chi sono" />

      <div className="grid gap-12 md:grid-cols-5">
        <div data-reveal className="space-y-4 text-muted md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div data-reveal className="md:col-span-2">
          <div className="grid gap-3">
            {about.stats.map((s) => (
              <div
                key={s.label}
                className="group rounded-lg border border-border bg-surface p-4 transition-all hover:border-accent/30 hover:bg-surface-2"
              >
                <div className="font-mono text-lg font-medium text-accent transition-transform group-hover:translate-x-1">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
