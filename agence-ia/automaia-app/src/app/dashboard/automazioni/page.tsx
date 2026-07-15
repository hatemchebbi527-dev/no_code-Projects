import { ensureAutomations } from "./actions";
import { AutomationCard } from "./automation-card";
import { ExecutionsTable } from "./executions-table";

export default async function AutomazioniPage() {
  const automations = await ensureAutomations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Automazioni n8n</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {automations.map((automation) => (
          <AutomationCard key={automation.id} automation={automation} />
        ))}
      </div>
      <div>
        <h2 className="mb-4 text-lg font-semibold">Ultime esecuzioni</h2>
        <ExecutionsTable automations={automations} />
      </div>
    </div>
  );
}
