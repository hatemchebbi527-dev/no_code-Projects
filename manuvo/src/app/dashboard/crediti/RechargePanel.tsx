"use client";

// Manuvo - panneau de recharge (choix d'un pack, paiement simule).
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { buyPack, type BuyState } from "./actions";
import { EUR_PER_CREDIT } from "@/lib/constants";

type Pack = {
  id: string;
  credits: number;
  priceEur: number;
  popular: boolean;
};

export function RechargePanel({ packs }: { packs: Pack[] }) {
  const t = useTranslations("credits");
  const tc = useTranslations("common");
  const [state, formAction, isPending] = useActionState<BuyState, FormData>(
    buyPack,
    undefined,
  );

  return (
    <div>
      {state?.success && (
        <p className="mb-4 rounded-lg bg-teal-50 px-3 py-2 text-sm font-medium text-teal-800">
          {state.success}
        </p>
      )}
      {state?.error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {packs.map((pack) => {
          const perCredit = (pack.priceEur / pack.credits).toFixed(2).replace(".", ",");
          const saving = pack.priceEur < pack.credits * EUR_PER_CREDIT;
          return (
            <form
              key={pack.id}
              action={formAction}
              className={`relative flex flex-col items-center gap-1 rounded-2xl border-2 bg-white p-5 text-center ${
                pack.popular ? "border-amber-400" : "border-neutral-200"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-3 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-white">
                  {t("popular")}
                </span>
              )}
              <div className="text-3xl font-extrabold text-teal-700 tabular-nums">
                {pack.credits}
                <span className="ms-1 text-sm font-semibold text-neutral-500">{tc("credits")}</span>
              </div>
              <div className="font-mono text-lg font-semibold tabular-nums">{pack.priceEur} €</div>
              <div className="text-xs text-neutral-400">
                {perCredit} € {t("per_credit")}
                {saving && <span className="ms-1 font-semibold text-teal-600">{t("save")}</span>}
              </div>

              <input type="hidden" name="packId" value={pack.id} />
              <button
                type="submit"
                disabled={isPending}
                className="mt-3 w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-60"
              >
                {isPending ? "..." : t("buy")}
              </button>
            </form>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-neutral-400">{t("simulated", { eur: EUR_PER_CREDIT })}</p>
    </div>
  );
}
