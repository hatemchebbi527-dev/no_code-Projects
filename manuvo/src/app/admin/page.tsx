// Manuvo - pannello admin: statistiche + gestione costo richieste.
import { getAdminStats, getAllLeads } from "@/lib/admin";
import { CATEGORY_LABEL_IT, countryNameIt } from "@/lib/catalog";
import { CostStepper } from "./CostStepper";

export const metadata = { title: "Admin · Manuvo" };

export default async function AdminPage() {
  const [stats, leads] = await Promise.all([getAdminStats(), getAllLeads()]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Gestione richieste</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Fissa il costo in crediti di ogni richiesta (3-5) e monitora l&apos;attivita.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Richieste totali" value={stats.totalLeads} />
        <Stat label="Contatti venduti" value={stats.soldContacts} />
        <Stat label="Ricavi stimati" value={`${stats.revenueEur} €`} accent />
        <Stat label="Artigiani" value={stats.artisans} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-wide text-neutral-400">
              <th className="px-4 py-3 font-semibold">Categoria</th>
              <th className="px-4 py-3 font-semibold">Luogo</th>
              <th className="px-4 py-3 font-semibold">Richiesta</th>
              <th className="px-4 py-3 font-semibold">Sblocchi</th>
              <th className="px-4 py-3 font-semibold">Costo (crediti)</th>
              <th className="px-4 py-3 font-semibold">Stato</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800">
                    {CATEGORY_LABEL_IT[lead.category as keyof typeof CATEGORY_LABEL_IT] ?? lead.category}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                  {lead.city}, {countryNameIt(lead.country)}
                </td>
                <td className="max-w-[260px] px-4 py-3 text-neutral-500">
                  <span className="line-clamp-2">{lead.description}</span>
                </td>
                <td className="px-4 py-3 tabular-nums text-neutral-600">
                  {lead.unlocksCount}/{lead.maxUnlocks}
                </td>
                <td className="px-4 py-3">
                  <CostStepper leadId={lead.id} initial={lead.creditCost} />
                </td>
                <td className="px-4 py-3">
                  {lead.status === "OPEN" ? (
                    <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">Attivo</span>
                  ) : (
                    <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-500">Chiuso</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-xs font-medium text-neutral-500">{label}</div>
      <div className={`mt-1 text-2xl font-extrabold tabular-nums ${accent ? "text-amber-600" : "text-neutral-900"}`}>
        {value}
      </div>
    </div>
  );
}
