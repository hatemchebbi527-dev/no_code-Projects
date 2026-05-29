import { profile } from "@/app/data";
import { socialIcons, MailIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-surface/30">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div data-reveal className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs text-accent">
            <span className="h-px w-8 bg-border" />
            <span>04 — Contatti</span>
            <span className="h-px w-8 bg-border" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Parliamo del tuo progetto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Un&apos;idea di automazione, un&apos;esigenza di integrazione IA o un sito
            da realizzare? Scrivimi, rispondo rapidamente.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Carte e-mail principale */}
          <a
            href={`mailto:${profile.email}`}
            data-reveal
            className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.25)]"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              SISTEMA // COMUNICAZIONI ATTIVE
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-muted transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent">
                <MailIcon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-mono text-xs uppercase tracking-wide text-muted">
                  Email
                </div>
                <div className="font-medium">{profile.email}</div>
              </div>
            </div>
            <div className="mt-6 font-mono text-xs text-muted">
              {profile.location} · Remoto // Ibrido
            </div>
          </a>

          {/* Grille des réseaux */}
          <div data-reveal className="grid grid-cols-2 gap-4">
            {profile.socials
              .filter((s) => s.label !== "Email")
              .map((s) => {
              const Icon = socialIcons[s.label] ?? MailIcon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.25)]"
                >
                  <span className="text-muted transition-all duration-300 group-hover:scale-125 group-hover:text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wide text-muted transition-colors group-hover:text-foreground">
                    {s.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
