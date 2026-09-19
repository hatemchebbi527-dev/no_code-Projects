"use client";

// Manuvo - bottone "Segnala contatto falso/irraggiungibile" su un contatto sbloccato.
import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { requestRefundAction, type RefundState } from "./refund-actions";

export function ReportContactButton({
  leadId,
  refundStatus,
}: {
  leadId: string;
  refundStatus: string;
}) {
  const t = useTranslations("refund");
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<RefundState, FormData>(
    requestRefundAction,
    undefined,
  );

  // Etats non modifiables : on affiche un badge.
  if (refundStatus === "REQUESTED" || state?.success) {
    return (
      <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
        {t("badge_pending")}
      </span>
    );
  }
  if (refundStatus === "APPROVED") {
    return (
      <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
        {t("badge_approved")}
      </span>
    );
  }
  if (refundStatus === "REJECTED") {
    return (
      <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-500">
        {t("badge_rejected")}
      </span>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 w-fit text-xs font-medium text-neutral-500 underline underline-offset-2 hover:text-red-700"
      >
        {t("report_cta")}
      </button>
    );
  }

  const inputCls =
    "rounded-lg border border-neutral-300 px-2.5 py-2 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20";

  return (
    <form action={formAction} className="mt-2 flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
      <input type="hidden" name="leadId" value={leadId} />
      <span className="text-xs font-medium text-neutral-700">{t("report_title")}</span>
      <select name="reasonCode" required defaultValue="" className={inputCls}>
        <option value="" disabled>{t("reason_choose")}</option>
        <option value="FAKE_NUMBER">{t("reason_fake_number")}</option>
        <option value="NO_ANSWER">{t("reason_no_answer")}</option>
        <option value="OTHER">{t("reason_other")}</option>
      </select>
      <textarea
        name="reason"
        rows={2}
        placeholder={t("reason_ph")}
        className={inputCls}
      />
      <p className="text-[11px] leading-snug text-neutral-400">{t("not_refundable_hint")}</p>
      {state?.error && <p className="text-xs text-red-700">{state.error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {t("report_submit")}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-500 hover:bg-neutral-100"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}
