import { services } from "@/app/data";
import { SectionHeading } from "./Section";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border bg-surface/30">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeading
          index="02"
          title="Services"
          subtitle="Ce que je peux faire pour votre entreprise."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              data-reveal
              className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-foreground/20 hover:bg-surface-2"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
