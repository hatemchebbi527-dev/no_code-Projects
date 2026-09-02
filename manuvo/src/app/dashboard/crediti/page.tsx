// Manuvo - pagina crediti : ricarica + storico.
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import {
  getActivePacks,
  getUserBalance,
  getUserTransactions,
} from "@/lib/credits";
import { RechargePanel } from "./RechargePanel";
import { TransactionList } from "./TransactionList";

export default async function CreditiPage() {
  const session = await auth();
  const userId = session!.user.id;
  const t = await getTranslations("credits");
  const tc = await getTranslations("common");

  const [credits, packs, transactions] = await Promise.all([
    getUserBalance(userId),
    getActivePacks(),
    getUserTransactions(userId, 30),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="text-sm font-medium text-amber-800">{t("current_balance")}</div>
        <div className="mt-1 text-3xl font-extrabold text-amber-700 tabular-nums">
          {credits} <span className="text-lg font-semibold">{tc("credits")}</span>
        </div>
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">{t("choose_pack")}</h2>
      <RechargePanel
        packs={packs.map((p) => ({
          id: p.id,
          credits: p.credits,
          priceEur: p.priceEur,
          popular: p.popular,
        }))}
      />

      <h2 className="mt-10 mb-2 text-lg font-semibold">{t("history")}</h2>
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
