// Manuvo - pagina profilo artigiano: modifica dati di contatto e mestieri.
import { redirect } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isCategory, formatMatricule, DEFAULT_LOCALE, type Locale } from "@/lib/constants";
import { getArtisanStats, BADGE_MIN_REVIEWS, BADGE_MIN_AVG } from "@/lib/reviews";
import { getBaseUrl } from "@/lib/base-url";
import { StarRating, VerifiedBadge } from "@/components/StarRating";
import { ProfileForm } from "./ProfileForm";

export const metadata = { title: "Manuvo" };

// Libelles de la carte "profil public" (non presents dans les messages i18n).
const SHARE: Record<Locale, { title: string; hint: string; cta: string }> = {
  it: {
    title: "Il tuo profilo pubblico",
    hint: "Condividi questo link su WhatsApp o sui social per mostrare le tue recensioni.",
    cta: "Vedi e condividi",
  },
  fr: {
    title: "Ton profil public",
    hint: "Partage ce lien sur WhatsApp ou les reseaux pour montrer tes avis.",
    cta: "Voir et partager",
  },
  en: {
    title: "Your public profile",
    hint: "Share this link on WhatsApp or social media to show your reviews.",
    cta: "View and share",
  },
  de: {
    title: "Dein öffentliches Profil",
    hint: "Teile diesen Link auf WhatsApp oder in sozialen Netzwerken, um deine Bewertungen zu zeigen.",
    cta: "Ansehen und teilen",
  },
  ar: {
    title: "ملفك العام",
    hint: "شارك هذا الرابط على واتساب أو وسائل التواصل لعرض تقييماتك.",
    cta: "اعرض وشارك",
  },
};

export default async function ProfiloPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const t = await getTranslations("profilo");
  const locale = (await getLocale()) as Locale;
  const s = SHARE[locale] ?? SHARE[DEFAULT_LOCALE];
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      city: true,
      country: true,
      piva: true,
      categories: true,
      matricule: true,
    },
  });
  if (!user) redirect("/login");

  const categories = user.categories
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0 && isCategory(c));

  const stats = await getArtisanStats(session.user.id);
  const publicPath = `/artigiano/${formatMatricule(user.matricule)}`;
  const publicUrl = `${await getBaseUrl()}${publicPath}`;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <ProfileForm
          defaults={{
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
            city: user.city ?? "",
            country: user.country,
            piva: user.piva,
            categories,
          }}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-neutral-800">{t("reviews_title")}</h2>
          {stats.verified && <VerifiedBadge label={t("verified_badge")} />}
        </div>
        {stats.count === 0 ? (
          <p className="mt-3 text-sm text-neutral-400">{t("reviews_empty")}</p>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <StarRating rating={stats.avg} size="md" />
              <span className="text-sm font-medium text-neutral-700">{stats.avg.toFixed(1)}</span>
              <span className="text-sm text-neutral-500">{t("reviews_count", { n: stats.count })}</span>
            </div>
            {!stats.verified && (
              <p className="text-xs text-neutral-400">
                {stats.count < BADGE_MIN_REVIEWS
                  ? t("progress_hint", { n: BADGE_MIN_REVIEWS - stats.count })
                  : t("avg_hint", { avg: BADGE_MIN_AVG.toFixed(1) })}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-neutral-800">{s.title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{s.hint}</p>
        <a
          href={publicPath}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-100"
        >
          {s.cta}
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
        <p className="mt-2 break-all text-xs text-neutral-400">{publicUrl}</p>
      </div>
    </div>
  );
}
