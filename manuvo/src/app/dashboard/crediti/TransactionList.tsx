// Manuvo - liste des mouvements de credits (composant serveur).
type Tx = {
  id: string;
  type: string;
  credits: number;
  amountEur: number;
  createdAt: Date;
};

function label(type: string) {
  if (type === "PURCHASE") return "Ricarica crediti";
  if (type === "SPEND") return "Sblocco contatto";
  return type;
}

export function TransactionList({
  transactions,
  empty = "Nessuna operazione.",
}: {
  transactions: Tx[];
  empty?: string;
}) {
  if (!transactions.length) {
    return <p className="py-4 text-sm text-neutral-400">{empty}</p>;
  }

  return (
    <ul className="divide-y divide-neutral-100">
      {transactions.map((t) => {
        const positive = t.credits >= 0;
        return (
          <li key={t.id} className="flex items-center justify-between py-2.5">
            <div>
              <div className="text-sm font-medium">{label(t.type)}</div>
              <div className="text-xs text-neutral-400">
                {new Date(t.createdAt).toLocaleDateString("it-IT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-semibold tabular-nums ${
                  positive ? "text-teal-700" : "text-neutral-700"
                }`}
              >
                {positive ? "+" : ""}
                {t.credits} crediti
              </div>
              <div className="text-xs text-neutral-400 tabular-nums">
                {t.amountEur >= 0 ? "" : "-"}
                {Math.abs(t.amountEur)} €
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
