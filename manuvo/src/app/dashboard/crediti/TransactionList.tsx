// Manuvo - liste des mouvements de credits (composant serveur).
import { getTranslations, getLocale } from "next-intl/server";

type Tx = {
  id: string;
  type: string;
  credits: number;
  amountEur: number;
  createdAt: Date;
};

export async function TransactionList({
  transactions,
}: {
  transactions: Tx[];
}) {
  const t = await getTranslations("transactions");
  const tc = await getTranslations("common");
  const locale = await getLocale();

  function label(type: string) {
    if (type === "PURCHASE") return t("purchase");
    if (type === "SPEND") return t("unlock");
    return type;
  }

  if (!transactions.length) {
    return <p className="py-4 text-sm text-neutral-400">{t("empty")}</p>;
  }

  return (
    <ul className="divide-y divide-neutral-100">
      {transactions.map((tx) => {
        const positive = tx.credits >= 0;
        return (
          <li key={tx.id} className="flex items-center justify-between py-2.5">
            <div>
              <div className="text-sm font-medium">{label(tx.type)}</div>
              <div className="text-xs text-neutral-400">
                {new Date(tx.createdAt).toLocaleDateString(locale, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="text-end">
              <div
                className={`text-sm font-semibold tabular-nums ${
                  positive ? "text-teal-700" : "text-neutral-700"
                }`}
              >
                {positive ? "+" : ""}
                {tx.credits} {tc("credits")}
              </div>
              <div className="text-xs text-neutral-400 tabular-nums">
                {tx.amountEur >= 0 ? "" : "-"}
                {Math.abs(tx.amountEur)} €
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
