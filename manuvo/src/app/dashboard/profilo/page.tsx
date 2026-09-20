// Manuvo - pagina profilo artigiano: modifica dati di contatto e mestieri.
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isCategory } from "@/lib/constants";
import { getArtisanStats, BADGE_MIN_REVIEWS, BADGE_MIN_AVG } from "@/lib/reviews";
import { StarRating, VerifiedBadge } from "@/components/StarRating";
import { ProfileForm } from "./ProfileForm";

export const metadata = { title: "Manuvo" };

export default async function ProfiloPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const t = await getTranslations("profilo");
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
    },
  });
  if (!user) redirect("/login");

  const categories = user.categories
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0 && isCategory(c));

  const stats = await getArtisanStats(session.user.id);

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
    </div>
  );
}
