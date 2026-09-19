// Manuvo - pannello admin : richieste di rimborso crediti da approvare/rifiutare.
import { getTranslations } from "next-intl/server";
import { getRefundRequests } from "@/lib/refunds";
import { formatMatricule, isCategory } from "@/lib/constants";
import { RefundDecision } from "./RefundDecision";

export const metadata = { title: "Manuvo" };

export default async function AdminRefundsPage() {
  const t = await getTranslations("admin");
  const tCat = await getTranslations("categories");
  const requests = await getRefundRequests();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("rimborsi_title")}</h1>
        <p className="mt-1 text-sm text-neutral-500">{t("rimborsi_subtitle")}</p>
      </div>

      {requests.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
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
                  {r.refundReason && (
                    <p className="mt-2 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
                      “{r.refundReason}”
                    </p>
                  )}
                </div>
                <RefundDecision unlockId={r.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
