// Manuvo - bacheca artigiano: richieste disponibili + sblocco + i miei contatti.
import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { getAvailableLeads, getUnlockedLeads, type Scope } from "@/lib/leads";
import { getUserBalance } from "@/lib/credits";
import { CATEGORY_LABEL_IT, URGENCY_LABEL_IT, countryNameIt } from "@/lib/catalog";
import { isCategory } from "@/lib/constants";
import { FilterBar } from "./FilterBar";
import { UnlockButton } from "./UnlockButton";

function timeAgo(d: Date) {
  const min = Math.round((Date.now() - new Date(d).getTime()) / 60000);
  if (min < 60) return `${min} min fa`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h fa`;
  return `${Math.round(h / 24)} g fa`;
}

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

  const [credits, available, mine] = await Promise.all([
    getUserBalance(userId),
    getAvailableLeads(userId, { scope, category }),
    getUnlockedLeads(userId),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bacheca richieste</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Sblocca il contatto di chi cerca i tuoi servizi. 1 credito = 2 €.
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="text-neutral-500">
            Disponibili: <b className="text-neutral-900">{available.length}</b>
          </span>
          <span className="text-neutral-500">
            Sbloccati: <b className="text-neutral-900">{mine.length}</b>
          </span>
        </div>
      </div>

      {credits === 0 && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <span className="text-amber-800">Non hai crediti. Ricarica per sbloccare i contatti.</span>
          <Link href="/dashboard/crediti" className="rounded-lg bg-amber-600 px-3 py-1.5 font-semibold text-white hover:bg-amber-700">
            Ricarica
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
            Nessuna richiesta disponibile in questa selezione.
          </div>
        ) : (
          available.map((lead) => (
            <article key={lead.id} className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
                  {CATEGORY_LABEL_IT[lead.category as keyof typeof CATEGORY_LABEL_IT] ?? lead.category}
                </span>
                <div className="ml-auto text-right">
                  <div className="font-mono text-xl font-bold leading-none text-amber-600">{lead.creditCost}</div>
                  <div className="text-[11px] text-neutral-400">crediti</div>
                </div>
              </div>

              <p className="text-sm text-neutral-800">{lead.description}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                <span>📍 {lead.city}, {countryNameIt(lead.country)}</span>
                <span>⏱ {URGENCY_LABEL_IT[lead.urgency as keyof typeof URGENCY_LABEL_IT] ?? lead.urgency}</span>
                <span className="text-neutral-400">{timeAgo(lead.createdAt)}</span>
              </div>

              <div className="mt-1 flex items-center justify-between border-t border-dashed border-neutral-200 pt-3">
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Contatto nascosto
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
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            I miei contatti sbloccati
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mine.map(({ lead, unlockedAt }) => (
              <article key={lead.id} className="flex flex-col gap-3 rounded-2xl border-2 border-teal-200 bg-white p-4">
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
                    {CATEGORY_LABEL_IT[lead.category as keyof typeof CATEGORY_LABEL_IT] ?? lead.category}
                  </span>
                  <span className="ml-auto rounded-md bg-teal-600 px-2 py-0.5 text-xs font-semibold text-white">Sbloccato</span>
                </div>
                <p className="text-sm text-neutral-800">{lead.description}</p>
                <div className="text-xs text-neutral-500">
                  📍 {lead.city}, {countryNameIt(lead.country)} · {timeAgo(unlockedAt)}
                </div>
                <div className="mt-1 flex flex-col gap-1 border-t border-dashed border-neutral-200 pt-3">
                  <span className="font-semibold">{lead.contactName}</span>
                  <a href={`tel:${lead.contactPhone.replace(/\s/g, "")}`} className="text-sm text-teal-700 hover:underline">
                    {lead.contactPhone}
                  </a>
                  {lead.contactEmail && (
                    <a href={`mailto:${lead.contactEmail}`} className="text-sm text-teal-700 hover:underline">
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
