// Manuvo - home (landing completa all'etape 8.3).
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4 text-center">
      <div className="absolute end-4 top-4">
        <LanguageSwitcher />
      </div>

      <span className="mb-6 flex items-center gap-2.5">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-700 text-white">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </span>
        <span className="text-3xl font-extrabold tracking-tight">Manuvo</span>
      </span>

      <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
        {t("hero_title")}
      </h1>
      <p className="mt-3 max-w-md text-neutral-500">{t("hero_subtitle")}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/pubblica"
          className="rounded-lg bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800"
        >
          {t("cta_publish")}
        </Link>
        <Link
          href="/signup"
          className="rounded-lg border border-neutral-300 bg-white px-5 py-3 font-semibold transition hover:bg-neutral-50"
        >
          {t("cta_artisan")}
        </Link>
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        {t("already_artisan")}{" "}
        <Link href="/login" className="font-semibold text-red-700 hover:underline">
          {t("login_link")}
        </Link>
      </p>

      <p className="mt-10 text-xs text-neutral-400">{t("proto_note")}</p>
    </main>
  );
}
