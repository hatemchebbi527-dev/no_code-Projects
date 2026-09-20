// Manuvo - vitrine publique d'un artisan (partageable). Donnees publiques uniquement.
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getArtisanStats } from "@/lib/reviews";
import { countryName } from "@/lib/catalog";
import { formatMatricule, isCategory, DEFAULT_LOCALE, type Locale } from "@/lib/constants";
import { StarRating, VerifiedBadge } from "@/components/StarRating";
import { LogoWordmark } from "@/components/LogoWordmark";

// Libelles propres a la vitrine (non presents dans les messages i18n).
const STRINGS: Record<Locale, {
  subtitle: string;
  reviews: string;
  cta: string;
  notFound: string;
  back: string;
}> = {
  it: {
    subtitle: "Artigiano su Manuvo",
    reviews: "Recensioni dei clienti",
    cta: "Ti serve un artigiano? Pubblica la tua richiesta gratis.",
    notFound: "Artigiano non trovato.",
    back: "Vai su Manuvo",
  },
  fr: {
    subtitle: "Artisan sur Manuvo",
    reviews: "Avis clients",
    cta: "Besoin d'un artisan ? Publie ta demande gratuitement.",
    notFound: "Artisan introuvable.",
    back: "Aller sur Manuvo",
  },
  en: {
    subtitle: "Artisan on Manuvo",
    reviews: "Customer reviews",
    cta: "Need an artisan? Post your request for free.",
    notFound: "Artisan not found.",
    back: "Go to Manuvo",
  },
  de: {
    subtitle: "Handwerker auf Manuvo",
    reviews: "Kundenbewertungen",
    cta: "Brauchst du einen Handwerker? Stelle deine Anfrage kostenlos.",
    notFound: "Handwerker nicht gefunden.",
    back: "Zu Manuvo",
  },
  ar: {
    subtitle: "حرفي على Manuvo",
    reviews: "تقييمات العملاء",
    cta: "تحتاج حرفيًا؟ انشر طلبك مجانًا.",
    notFound: "الحرفي غير موجود.",
    back: "اذهب إلى Manuvo",
  },
};

// Accepte "ART-0004", "ART0004" ou "4" -> 4.
function parseMatricule(raw: string): number | null {
  const cleaned = decodeURIComponent(raw).trim().toUpperCase().replace(/^ART-?/, "");
  const n = Number.parseInt(cleaned, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

async function getPublicArtisan(matricule: number) {
  return prisma.user.findFirst({
    where: { matricule, role: "ARTIGIANO" },
    select: { id: true, name: true, city: true, country: true, categories: true, matricule: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matricule: string }>;
}) {
  const { matricule } = await params;
  const n = parseMatricule(matricule);
  if (n) {
    const a = await getPublicArtisan(n);
    if (a) return { title: `${a.name} · Manuvo` };
  }
  return { title: "Manuvo" };
}

export default async function ArtisanPublicPage({
  params,
}: {
  params: Promise<{ matricule: string }>;
}) {
  const { matricule } = await params;
  const locale = (await getLocale()) as Locale;
  const s = STRINGS[locale] ?? STRINGS[DEFAULT_LOCALE];
  const tCat = await getTranslations("categories");
  const tp = await getTranslations("profilo");
  const th = await getTranslations("home");

  const n = parseMatricule(matricule);
  const artisan = n ? await getPublicArtisan(n) : null;

  if (!artisan) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4 py-10">
        <div className="mb-8">
          <LogoWordmark className="h-9 w-auto" />
        </div>
        <p className="text-sm text-neutral-500">{s.notFound}</p>
        <Link
          href="/"
          className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          {s.back}
        </Link>
      </div>
    );
  }

  const stats = await getArtisanStats(artisan.id);
  const trades = artisan.categories
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0 && isCategory(c));
  const recentReviews = await prisma.review.findMany({
    where: {
      artisanId: artisan.id,
      submittedAt: { not: null },
      rating: { not: null },
      comment: { not: null },
    },
    orderBy: { submittedAt: "desc" },
    take: 10,
    select: { rating: true, comment: true, submittedAt: true },
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center px-5 py-3">
          <Link href="/" className="flex items-center">
            <LogoWordmark className="h-7 w-auto" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 pt-8 pb-28 sm:pb-8">
        {/* Carte identite */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{artisan.name}</h1>
                {stats.verified && <VerifiedBadge label={tp("verified_badge")} />}
              </div>
              <p className="mt-1 text-sm text-neutral-500">{s.subtitle}</p>
              <p className="mt-2 text-sm text-neutral-600">
                {artisan.city ? `${artisan.city}, ` : ""}
                {countryName(artisan.country, locale)}
                <span className="mx-2 text-neutral-300">·</span>
                <span className="font-mono text-xs text-neutral-500">{formatMatricule(artisan.matricule)}</span>
              </p>
            </div>
            {stats.count > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={stats.avg} size="md" />
                <span className="text-sm font-semibold text-neutral-700">{stats.avg.toFixed(1)}</span>
                <span className="text-sm text-neutral-500">({stats.count})</span>
              </div>
            )}
          </div>

          {trades.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {trades.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-800"
                >
                  {tCat(c)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Avis clients */}
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-neutral-800">{s.reviews}</h2>
          {stats.count === 0 ? (
            <p className="mt-3 text-sm text-neutral-400">{tp("reviews_empty")}</p>
          ) : recentReviews.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-500">{tp("reviews_count", { n: stats.count })}</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-4">
              {recentReviews.map((r, i) => (
                <li key={i} className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <StarRating rating={r.rating ?? 0} />
                    <span className="text-xs text-neutral-400">
                      {r.submittedAt?.toISOString().slice(0, 10)}
                    </span>
                  </div>
                  {r.comment && <p className="mt-1.5 text-sm text-neutral-700">{r.comment}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA conversion */}
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-neutral-700">{s.cta}</p>
          <Link
            href="/pubblica"
            className="mt-3 inline-flex rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            {th("cta_publish")}
          </Link>
        </div>
      </main>
    </div>
  );
}
