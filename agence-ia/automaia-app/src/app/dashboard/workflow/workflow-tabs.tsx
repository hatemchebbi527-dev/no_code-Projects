"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export function WorkflowTabs({
  tasksSection,
  templatesSection,
}: {
  tasksSection: React.ReactNode;
  templatesSection: React.ReactNode;
}) {
  const [tab, setTab] = useState<"attivita" | "modelli">("attivita");

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b border-border">
        <button
          type="button"
          className={cn(
            "px-3 py-2 text-sm font-medium",
            tab === "attivita"
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground"
          )}
          onClick={() => setTab("attivita")}
        >
          Attività
        </button>
        <button
          type="button"
          className={cn(
            "px-3 py-2 text-sm font-medium",
            tab === "modelli"
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground"
          )}
          onClick={() => setTab("modelli")}
        >
          Modelli
        </button>
      </div>
      {tab === "attivita" ? tasksSection : templatesSection}
    </div>
  );
}
