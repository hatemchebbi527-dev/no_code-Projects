// Manuvo - pannello admin : richieste di rimborso crediti da approvare/rifiutare + storico.
import { getTranslations, getLocale } from "next-intl/server";
import { getRefundRequests, getRefundHistory } from "@/lib/refunds";
import { formatMatricule, isCategory, DEFAULT_LOCALE, type Locale } from "@/lib/constants";
import { RefundDecision } from "./RefundDecision";

export const metadata = { title: "Manuvo" };

// Libelles de l'historique (non presents dans les messages i18n).
const HIST: Record<Locale, {
  title: string;
  empty: string;
  client: string;
  artisan: string;
  approved: string;
  rejected: string;
}> = {
  it: { title: "Storico rimborsi", empty: "Nessun rimborso trattato.", client: "Cliente segnalato", artisan: "Rimborsi artigiano", approved: "Rimborsato", rejected: "Rifiutato" },
  fr: { title: "Historique des remboursements", empty: "Aucun remboursement traité.", client: "Client signalé", artisan: "Remboursements artisan", approved: "Remboursé", rejected: "Refusé" },
  en: { title: "Refund history", empty: "No processed refunds.", client: "Client reported", artisan: "Artisan refunds", approved: "Refunded", rejected: "Declined" },
  de: { title: "Erstattungsverlauf", empty: "Keine bearbeiteten Erstattungen.", client: "Kunde gemeldet", artisan: "Erstattungen Handwerker", approved: "Erstattet", rejected: "Abgelehnt" },
  ar: { title: "سجل المبالغ المستردة", empty: "لا توجد مستردات معالجة.", client: "العميل مُبلّغ عنه", artisan: "مستردات الحرفي", approved: "مُسترد", rejected: "مرفوض" },
};

export default async function AdminRefundsPage() {
  const t = await getTranslations("admin");
  const tCat = await getTranslations("categories");
  const tr = await getTranslations("refund");
  const locale = (await getLocale()) as Locale;
  const h = HIST[locale] ?? HIST[DEFAULT_LOCALE];
  const requests = await getRefundRequests();
  const history = await getRefundHistory();

  const reasonLabel = (code: string | null) => {
    if (code === "FAKE_NUMBER") return tr("reason_fake_number");
    if (code === "NO_ANSWER") return tr("reason_no_answer");
    if (code === "OTHER") return tr("reason_other");
    return "—";
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("rimborsi_title")}</h1>
        <p className="mt-1 text-sm text-neutral-500">{t("rimborsi_subtitle")}</p>
      </div>

      {requests.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {t("empty_rimborsi")}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {requests.map((r) => (
            <div key={r.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-800">
                      {isCategory(r.lead.category) ? tCat(r.lead.category) : r.lead.category}
                    </span>
                    <span className="text-xs text-neutral-400">{r.lead.city}</span>
                    <span className="ms-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                      {r.creditsSpent} {t("refund_credits")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-700 line-clamp-2">{r.lead.description}</p>
                  <div className="mt-2 text-xs text-neutral-500">
                    <span className="font-mono font-semibold text-red-800">{formatMatricule(r.user.matricule)}</span>{" "}
                    {r.user.name}
                    {r.user.phone && <> · {r.user.phone}</>}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {t("refund_contact")} : {r.lead.contactName} · {r.lead.contactPhone}
                  </div>

                  {/* Motif + note */}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-700">
                      {reasonLabel(r.refundReasonCode)}
                    </span>
                  </div>
                  {r.refundReason && (
                    <p className="mt-2 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
                      “{r.refundReason}”
                    </p>
                  )}

                  {/* Signaux anti-abus : corroboration + taux artisan */}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {(() => {
                      const suspect = r.leadUnlockCount > 1 && r.leadReportCount < r.leadUnlockCount;
                      return (
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold ${
                            suspect ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                          }`}
                          title={t("refund_corroboration_hint")}
                        >
                          {t("refund_corroboration", {
                            reports: r.leadReportCount,
                            unlocks: r.leadUnlockCount,
                          })}
                          {suspect ? ` · ${t("refund_suspect")}` : ""}
                        </span>
                      );
                    })()}
                    <span
                      className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 font-medium text-neutral-600"
                      title={t("refund_artisan_rate_hint")}
                    >
                      {t("refund_artisan_rate", {
                        reports: r.artisanReportCount,
                        unlocks: r.artisanUnlockCount,
                      })}
                    </span>
                  </div>
                </div>
                <RefundDecision unlockId={r.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Historique (tracabilite) --- */}
      <h2 className="mt-10 text-lg font-bold tracking-tight">{h.title}</h2>
      {history.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {h.empty}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-start text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-4 py-3 text-start font-semibold">{t("th_status")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_created")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_name")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("refund_contact")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("th_category")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("refund_credits")}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((r) => {
                const when = r.refundedAt ?? r.refundRequestedAt;
                return (
                  <tr key={r.id} className="border-b border-neutral-100 align-top last:border-0">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                          r.refundStatus === "APPROVED"
                            ? "bg-green-50 text-green-700"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {r.refundStatus === "APPROVED" ? h.approved : h.rejected}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap tabular-nums text-neutral-500">
                      {when ? when.toISOString().slice(0, 10) : "—"}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      <div>
                        <span className="font-mono font-semibold text-red-800">{formatMatricule(r.user.matricule)}</span> {r.user.name}
                      </div>
                      {r.artisanReportCount > 1 && (
                        <span className="mt-1 inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                          {h.artisan} ×{r.artisanReportCount}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      <div className="whitespace-nowrap">{r.lead.contactName} · {r.lead.contactPhone}</div>
                      <div className="mt-0.5 text-xs text-neutral-400">{reasonLabel(r.refundReasonCode)}</div>
                      {r.clientReportCount > 1 && (
                        <span className="mt-1 inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
                          {h.client} ×{r.clientReportCount}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                      {isCategory(r.lead.category) ? tCat(r.lead.category) : r.lead.category}
                      <span className="text-neutral-400"> · {r.lead.city}</span>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-neutral-600">{r.creditsSpent}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
