import type { Automation } from "@/lib/supabase/types";

const LABELS: Record<string, string> = {
  appuntamenti: "Appuntamenti",
  solleciti: "Solleciti",
  faq: "FAQ",
  pubblicazione_social: "Pubblicazione social",
  modulo_contatto: "Modulo di contatto",
};

export function ExecutionsTable({ automations }: { automations: Automation[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-card text-left text-muted-foreground">
            <th className="px-4 py-2 font-medium">Automazione</th>
            <th className="px-4 py-2 font-medium">Ultima esecuzione</th>
            <th className="px-4 py-2 font-medium">Esito</th>
          </tr>
        </thead>
        <tbody>
          {automations.map((automation) => (
            <tr key={automation.id} className="border-b border-border last:border-0">
              <td className="px-4 py-2">{LABELS[automation.type] ?? automation.type}</td>
              <td className="px-4 py-2 text-muted-foreground">
                {automation.last_run_at
                  ? new Date(automation.last_run_at).toLocaleString("it-IT")
                  : "Mai eseguita"}
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {automation.last_run_status ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
