"use client";

// Manuvo - bottoni admin per approvare o rifiutare una richiesta di rimborso.
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { approveRefundAction, rejectRefundAction, type AdminRefundState } from "./actions";

export function RefundDecision({ unlockId }: { unlockId: string }) {
  const t = useTranslations("admin");
  const [approveState, approve, approving] = useActionState<AdminRefundState, FormData>(
    approveRefundAction,
    undefined,
  );
  const [rejectState, reject, rejecting] = useActionState<AdminRefundState, FormData>(
    rejectRefundAction,
    undefined,
  );

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-2">
        <form action={approve}>
          <input type="hidden" name="unlockId" value={unlockId} />
          <button
            type="submit"
            disabled={approving}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {t("refund_approve")}
          </button>
        </form>
        <form action={reject}>
          <input type="hidden" name="unlockId" value={unlockId} />
          <button
            type="submit"
            disabled={rejecting}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-60"
          >
            {t("refund_reject")}
          </button>
        </form>
      </div>
      {(approveState?.error || rejectState?.error) && (
        <span className="text-xs text-red-700">{t("refund_action_error")}</span>
      )}
    </div>
  );
}
