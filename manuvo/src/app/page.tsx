// Manuvo - landing completa (etape 8.3): hero, come funziona, mestieri, privati/artigiani, CTA, footer.
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CATEGORIES } from "@/lib/constants";
import { CATEGORY_ICON } from "@/lib/category-icons";

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-xl bg-red-700 font-display font-extrabold text-white ${className}`}
    >
      M
    </span>
  );
}

export default async function Home() {
  const t = await getTranslations("home");
  const tl = await getTranslations("landing");
  const tc = await getTranslations("categories");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1b1e24]">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <span className="flex items-center gap-2.5">
          <LogoMark className="h-9 w-9 text-lg" />
          <span className="font-display text-2xl font-extrabold tracking-tight">Manuvo</span>
        </span>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-white sm:inline-block"
          >
            {t("login_link")}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-red-100 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -start-24 top-40 h-80 w-80 rounded-full bg-amber-100 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 text-center sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-sm font-semibold text-red-700">
            {tl("eyebrow")}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            {t("hero_title")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">{t("hero_subtitle")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pubblica"
              className="rounded-xl bg-red-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-red-800"
            >
              {t("cta_publish")}
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-neutral-300 bg-white px-6 py-3.5 font-semibold transition hover:bg-neutral-50"
            >
              {t("cta_artisan")}
            </Link>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {tl("how_title")}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-red-50 font-display text-xl font-extrabold text-red-700">
                {n}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{tl(`how${n}_t`)}</h3>
              <p className="mt-2 text-neutral-600">{tl(`how${n}_d`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mestieri */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {tl("cats_title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-neutral-600">{tl("cats_sub")}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-[#FAF8F4] px-4 py-3.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-700">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: CATEGORY_ICON[cat] }}
                  />
                </span>
                <span className="text-sm font-semibold leading-tight">{tc(cat)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privati / Artigiani */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold">{tl("priv_title")}</h3>
            <p className="mt-3 grow text-neutral-600">{tl("priv_desc")}</p>
            <Link
              href="/pubblica"
              className="mt-6 inline-flex w-fit rounded-xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800"
            >
              {tl("priv_cta")}
            </Link>
          </div>
          <div className="flex flex-col rounded-2xl border border-neutral-900 bg-neutral-900 p-8 text-white shadow-sm">
            <h3 className="font-display text-2xl font-bold">{tl("art_title")}</h3>
            <p className="mt-3 grow text-neutral-300">{tl("art_desc")}</p>
            <Link
              href="/signup"
              className="mt-6 inline-flex w-fit rounded-xl bg-white px-5 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              {tl("art_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-red-700 py-16 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {tl("band_title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-red-100">{tl("band_sub")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pubblica"
              className="rounded-xl bg-white px-6 py-3.5 font-semibold text-red-700 transition hover:bg-red-50"
            >
              {t("cta_publish")}
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-red-300 px-6 py-3.5 font-semibold text-white transition hover:bg-red-800"
            >
              {t("cta_artisan")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <span className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8 text-base" />
            <span className="font-display text-lg font-extrabold tracking-tight">Manuvo</span>
          </span>
          <p className="text-sm text-neutral-500">{tl("footer")}</p>
          <Link href="/login" className="text-sm font-semibold text-red-700 hover:underline">
            {t("login_link")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
