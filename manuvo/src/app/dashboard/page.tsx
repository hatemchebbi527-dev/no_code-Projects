// Manuvo - bacheca artigiano: richieste disponibili + sblocco + i miei contatti.
import { Suspense } from "react";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { getAvailableLeads, getUnlockedLeads, type Scope } from "@/lib/leads";
import { getUserBalance } from "@/lib/credits";
import { countryName } from "@/lib/catalog";
import { isCategory } from "@/lib/constants";
import { FilterBar } from "./FilterBar";
import { UnlockButton } from "./UnlockButton";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string; cat?: string }>;
}) {
  const sp = await searchParams;
  const scope: Scope = sp.scope === "international" ? "international" : "national";
  const category = sp.cat && isCategory(sp.cat) ? sp.cat : undefined;

  const session = await auth();
  const userId = session!.user.id;
  const locale = await getLocale();
  const t = await getTranslations("dashboard");
  const tc = await getTranslations("common");
  const tCat = await getTranslations("categories");
  const tUrg = await getTranslations("urgency");

  const [credits, available, mine] = await Promise.all([
    getUserBalance(userId),
    getAvailableLeads(userId, { scope, category }),
    getUnlockedLeads(userId),
  ]);

  function timeAgo(d: Date) {
    const min = Math.round((Date.now() - new Date(d).getTime()) / 60000);
    if (min < 60) return t("time_min", { n: min });
    const h = Math.round(min / 60);
    if (h < 24) return t("time_hour", { n: h });
    return t("time_day", { n: Math.round(h / 24) });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="text-neutral-500">
            {t("available")}: <b className="text-neutral-900">{available.length}</b>
          </span>
          <span className="text-neutral-500">
            {t("unlocked")}: <b className="text-neutral-900">{mine.length}</b>
          </span>
        </div>
      </div>

      {credits === 0 && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <span className="text-amber-800">{t("no_credits")}</span>
          <Link href="/dashboard/crediti" className="rounded-lg bg-amber-600 px-3 py-1.5 font-semibold text-white hover:bg-amber-700">
            {t("recharge")}
          </Link>
        </div>
      )}

      <div className="mt-5">
        <Suspense fallback={<div className="h-10" />}>
          <FilterBar />
        </Suspense>
      </div>

      {/* Bacheca */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {available.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-neutral-300 bg-white/50 py-12 text-center text-sm text-neutral-400">
            {t("empty")}
          </div>
        ) : (
          available.map((lead) => (
            <article key={lead.id} className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
                  {tCat(lead.category)}
                </span>
                <div className="ms-auto text-end">
                  <div className="font-mono text-xl font-bold leading-none text-amber-600">{lead.creditCost}</div>
                  <div className="text-[11px] text-neutral-400">{tc("credits")}</div>
                </div>
              </div>

              <p className="text-sm text-neutral-800">{lead.description}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                <span>📍 {lead.city}, {countryName(lead.country, locale)}</span>
                <span>⏱ {tUrg(lead.urgency)}</span>
                <span className="text-neutral-400">{timeAgo(lead.createdAt)}</span>
              </div>

              <div className="mt-1 flex items-center justify-between border-t border-dashed border-neutral-200 pt-3">
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  {t("contact_hidden")}
                </span>
                <UnlockButton leadId={lead.id} cost={lead.creditCost} />
              </div>
            </article>
          ))
        )}
      </div>

      {/* I miei contatti */}
      {mine.length > 0 && (
        <>
          <h2 className="mt-10 mb-3 flex items-center gap-2 text-lg font-semibold">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            {t("my_contacts")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mine.map(({ lead, unlockedAt }) => (
              <article key={lead.id} className="flex flex-col gap-3 rounded-2xl border-2 border-red-200 bg-white p-4">
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
                    {tCat(lead.category)}
                  </span>
                  <span className="ms-auto rounded-md bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">{t("unlocked_badge")}</span>
                </div>
                <p className="text-sm text-neutral-800">{lead.description}</p>
                <div className="text-xs text-neutral-500">
                  📍 {lead.city}, {countryName(lead.country, locale)} · {timeAgo(unlockedAt)}
                </div>
                <div className="mt-1 flex flex-col gap-1 border-t border-dashed border-neutral-200 pt-3">
                  <span className="font-semibold">{lead.contactName}</span>
                  <a href={`tel:${lead.contactPhone.replace(/\s/g, "")}`} className="text-sm text-red-700 hover:underline">
                    {lead.contactPhone}
                  </a>
                  {lead.contactEmail && (
                    <a href={`mailto:${lead.contactEmail}`} className="text-sm text-red-700 hover:underline">
                      {lead.contactEmail}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
