import { profile } from "@/app/data";
import { SectionHeading } from "./Section";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-surface/30">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div data-reveal>
          <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs text-muted">
            <span className="h-px w-8 bg-border" />
            <span>04 — Contact</span>
            <span className="h-px w-8 bg-border" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Discutons de votre projet
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Une idée d'automatisation, un besoin d'intégration d'IA, ou un site à
            construire ? Écrivez-moi, je réponds rapidement.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block rounded-md bg-foreground px-6 py-3 font-mono text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>

          <div className="mt-10 flex items-center justify-center gap-6 font-mono text-sm">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
