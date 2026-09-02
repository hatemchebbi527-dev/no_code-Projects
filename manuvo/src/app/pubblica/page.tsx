// Manuvo - pagina pubblica: un privato pubblica una richiesta (senza account).
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { CATEGORIES, COUNTRIES, URGENCIES } from "@/lib/constants";
import { countryName } from "@/lib/catalog";
import { LeadForm } from "./LeadForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata = {
  title: "Manuvo",
};

export default async function PubblicaPage() {
  const locale = await getLocale();
  const t = await getTranslations("pubblica");
  const tCat = await getTranslations("categories");
  const tUrg = await getTranslations("urgency");

  const categories = CATEGORIES.map((c) => ({ value: c, label: tCat(c) }));
  const countries = COUNTRIES.map((c) => ({ value: c, label: countryName(c, locale) }));
  const urgencies = URGENCIES.map((u) => ({ value: u, label: tUrg(u) }));

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-white">M</span>
            Manuvo
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
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            {t("eyebrow")}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-2 text-neutral-500">{t("subtitle")}</p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <LeadForm categories={categories} countries={countries} urgencies={urgencies} />
        </div>
      </main>
    </div>
  );
}
