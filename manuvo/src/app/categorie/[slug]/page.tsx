// Manuvo - pagina di una famiglia di mestieri (es. /categorie/casa-impianti).
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoWordmark } from "@/components/LogoWordmark";
import { CategoryImage } from "@/components/CategoryImage";
import { LOCALES, type Locale } from "@/lib/constants";
import { CATEGORY_ICON } from "@/lib/category-icons";
import { FAMILY_LABEL, familyBySlug } from "@/lib/category-groups";
import { CATEGORY_PHOTO } from "@/lib/category-photos";

const STRINGS: Record<Locale, { back: string; sub: string }> = {
  it: { back: "Torna alla home", sub: "Scegli il servizio di cui hai bisogno e pubblica la tua richiesta." },
  fr: { back: "Retour a l'accueil", sub: "Choisis le service dont tu as besoin et publie ta demande." },
  en: { back: "Back to home", sub: "Pick the service you need and post your request." },
  de: { back: "Zurueck zur Startseite", sub: "Waehle die gewuenschte Leistung und veroeffentliche deine Anfrage." },
  ar: { back: "العودة إلى الرئيسية", sub: "اختر الخدمة التي تحتاجها وانشر طلبك." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fam = familyBySlug(slug);
  if (!fam) return { title: "Manuvo" };
  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  return { title: `${FAMILY_LABEL[locale][fam.key]} · Manuvo` };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fam = familyBySlug(slug);
  if (!fam) notFound();

  const tc = await getTranslations("categories");
  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  const s = STRINGS[locale];

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <Link href="/" className="flex items-center">
            <LogoWordmark className="h-7 w-auto" />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-red-700">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          {s.back}
        </Link>

        <div className="mt-5 flex items-center gap-3">
          <span className={`inline-grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br ${fam.grad} text-white`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: CATEGORY_ICON[fam.categories[0]] }} />
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight">{FAMILY_LABEL[locale][fam.key]}</h1>
        </div>
        <p className="mt-2 text-neutral-500">{s.sub}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {fam.categories.map((cat) => (
            <Link
              key={cat}
              href={`/pubblica?category=${cat}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CategoryImage
                src={CATEGORY_PHOTO[cat]}
                label={tc(cat)}
                iconPath={CATEGORY_ICON[cat]}
                grad={fam.grad}
              />
              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <span className="text-sm font-semibold leading-tight">{tc(cat)}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-300 transition group-hover:text-red-600"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
