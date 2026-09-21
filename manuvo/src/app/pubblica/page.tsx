// Manuvo - pagina pubblica: un privato pubblica una richiesta (senza account).
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { CATEGORIES, COUNTRIES, URGENCIES, isCategory, LOCALES, type Locale } from "@/lib/constants";
import { countryName } from "@/lib/catalog";
import { FAMILIES, FAMILY_SLUG, FAMILY_LABEL } from "@/lib/category-groups";
import { LeadForm } from "./LeadForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoWordmark } from "@/components/LogoWordmark";

export const metadata = {
  title: "Manuvo",
};

// Libelle du bouton retour (inline, 5 langues).
const BACK: Record<Locale, { prefix: string; home: string }> = {
  it: { prefix: "Torna a", home: "home" },
  fr: { prefix: "Retour a", home: "l'accueil" },
  en: { prefix: "Back to", home: "home" },
  de: { prefix: "Zurueck zu", home: "Startseite" },
  ar: { prefix: "العودة إلى", home: "الرئيسية" },
};

export default async function PubblicaPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  const t = await getTranslations("pubblica");
  const tCat = await getTranslations("categories");
  const tUrg = await getTranslations("urgency");
  const tCommon = await getTranslations("common");

  const categories = CATEGORIES.map((c) => ({ value: c, label: tCat(c) }));
  const countries = COUNTRIES.map((c) => ({ value: c, label: countryName(c, locale) }));
  const urgencies = URGENCIES.map((u) => ({ value: u, label: tUrg(u) }));
  const defaultCategory = sp.category && isCategory(sp.category) ? sp.category : "";

  // Bouton retour : vers la famille du metier preselectionne, sinon vers l'accueil.
  const backFam = defaultCategory
    ? FAMILIES.find((f) => f.categories.includes(defaultCategory))
    : undefined;
  const backHref = backFam ? `/categorie/${FAMILY_SLUG[backFam.key]}` : "/";
  const backText = backFam
    ? `${BACK[locale].prefix} ${FAMILY_LABEL[locale][backFam.key]}`
    : `${BACK[locale].prefix} ${BACK[locale].home}`;

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
          <Link href="/" className="flex items-center">
            <LogoWordmark className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
              {t("header_artisan")}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-red-700"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          {backText}
        </Link>

        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            {t("eyebrow")}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-2 text-neutral-500">{t("subtitle")}</p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <LeadForm
            categories={categories}
            countries={countries}
            urgencies={urgencies}
            defaultCategory={defaultCategory}
          />
        </div>

        <p className="mt-4 text-center text-xs text-neutral-500">
          {tCommon.rich("legal_consent", {
            terms: (c) => (
              <Link href="/legal/termini" className="underline hover:text-red-700">{c}</Link>
            ),
            privacy: (c) => (
              <Link href="/legal/privacy" className="underline hover:text-red-700">{c}</Link>
            ),
          })}
        </p>
      </main>
    </div>
  );
}
