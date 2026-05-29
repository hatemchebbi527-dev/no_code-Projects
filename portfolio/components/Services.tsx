import { services } from "@/app/data";
import { serviceIcons } from "./Icons";
import { SectionHeading } from "./Section";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border bg-surface/30">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeading
          index="02"
          title="Servizi"
          subtitle="Cosa posso fare per la tua azienda."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <div
                key={s.title}
                data-reveal
                className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2 hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.25)]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-muted transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium transition-colors group-hover:text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted transition-colors group-hover:border-accent/20"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
