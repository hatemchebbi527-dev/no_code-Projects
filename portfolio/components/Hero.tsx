import { profile } from "@/app/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-40 pb-24 text-center md:pt-48 md:pb-32">
        {profile.available && (
          <div
            data-reveal
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponible pour de nouveaux projets
          </div>
        )}

        <h1
          data-reveal
          className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          {profile.name}
          <span className="mt-2 block bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
            {profile.role}
          </span>
        </h1>

        <p
          data-reveal
          className="mt-6 max-w-xl text-balance text-base text-muted md:text-lg"
        >
          {profile.tagline}
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact"
            className="rounded-md bg-foreground px-5 py-2.5 font-mono text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Démarrer un projet
          </a>
          <a
            href="#projects"
            className="rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-sm transition-colors hover:bg-surface-2"
          >
            Voir mes projets
          </a>
        </div>

        <p data-reveal className="mt-8 font-mono text-xs text-muted">
          {profile.location}
        </p>
      </div>
    </section>
  );
}
