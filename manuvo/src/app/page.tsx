// Manuvo - home provvisoria (landing completa all'etape 8).
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4 text-center">
      <span className="mb-6 flex items-center gap-2.5">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-700 text-white">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </span>
        <span className="text-3xl font-extrabold tracking-tight">Manuvo</span>
      </span>

      <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
        Artigiani e privati, finalmente connessi.
      </h1>
      <p className="mt-3 max-w-md text-neutral-500">
        I privati pubblicano una richiesta gratis. Gli artigiani sbloccano i
        contatti con i crediti.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/signup"
          className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          Sono un artigiano
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-neutral-300 bg-white px-5 py-3 font-semibold transition hover:bg-neutral-50"
        >
          Accedi
        </Link>
      </div>

      <p className="mt-10 text-xs text-neutral-400">
        Prototipo in costruzione · fase 2/8
      </p>
    </main>
  );
}
