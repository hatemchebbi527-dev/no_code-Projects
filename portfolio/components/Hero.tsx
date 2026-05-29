import { profile, heroCode } from "@/app/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/4 top-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #34d399 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 pt-36 pb-24 md:grid-cols-2 md:pt-44 md:pb-32">
        {/* Colonne gauche : texte */}
        <div className="text-center md:text-left">
          <div data-reveal className="mb-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent">
              {">_"} {profile.role}
            </span>
            {profile.available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Disponibile
              </span>
            )}
          </div>

          <h1
            data-reveal
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="text-muted">{profile.greeting}</span>
            <span className="mt-2 block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <p data-reveal className="mt-6 max-w-md text-balance text-base text-muted md:text-lg">
            {profile.tagline}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#contact"
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Avvia un progetto
            </a>
            <a
              href="#projects"
              className="rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent/40 hover:bg-surface-2"
            >
              I miei progetti
            </a>
          </div>
        </div>

        {/* Colonne droite : bloc de code */}
        <div data-reveal className="md:justify-self-end">
          <div className="relative w-full max-w-md rounded-xl border border-border bg-surface/80 shadow-[0_0_60px_-20px_rgba(52,211,153,0.4)] backdrop-blur">
            {/* Barre de fenêtre */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-mono text-xs text-muted">freelancer.ts</span>
            </div>
            {/* Code */}
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
              <code>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-sky-300">{heroCode.varName}</span>
                <span className="text-muted"> = {"{"}</span>
                {heroCode.lines.map((l) => (
                  <span key={l.key} className="block pl-4">
                    <span className="text-emerald-300">{l.key}</span>
                    <span className="text-muted">: </span>
                    <span className="text-amber-300">{l.value}</span>
                    <span className="text-muted">,</span>
                  </span>
                ))}
                <span className="block text-muted">{"};"}</span>
                <span className="block">&nbsp;</span>
                <span className="block">
                  <span className="text-sky-300">{heroCode.varName}</span>
                  <span className="text-muted">.</span>
                  <span className="text-emerald-300">build</span>
                  <span className="text-muted">();</span>
                </span>
              </code>
            </pre>
          </div>
        </div>

        <p data-reveal className="font-mono text-xs text-muted md:col-span-2 md:text-left">
          {profile.location}
        </p>
      </div>
    </section>
  );
}
