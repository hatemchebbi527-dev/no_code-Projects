"use client";

// Manuvo - stepper per fissare il costo (3..5) di una richiesta.
import { useState, useTransition } from "react";
import { setLeadCost } from "./actions";
import { MIN_LEAD_COST, MAX_LEAD_COST } from "@/lib/constants";

export function CostStepper({ leadId, initial }: { leadId: string; initial: number }) {
  const [cost, setCost] = useState(initial);
  const [pending, start] = useTransition();

  function change(delta: number) {
    const next = Math.max(MIN_LEAD_COST, Math.min(MAX_LEAD_COST, cost + delta));
    if (next === cost) return;
    setCost(next);
    start(async () => {
      await setLeadCost(leadId, next);
    });
  }

  const btn =
    "grid h-7 w-7 place-items-center rounded-md border border-neutral-300 bg-neutral-50 text-base leading-none text-neutral-700 hover:border-red-500 hover:text-red-700 disabled:opacity-40";

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => change(-1)}
        disabled={pending || cost <= MIN_LEAD_COST}
        aria-label="Riduci"
        className={btn}
      >
        −
      </button>
      <span className="w-5 text-center font-mono font-semibold tabular-nums">{cost}</span>
      <button
        onClick={() => change(1)}
        disabled={pending || cost >= MAX_LEAD_COST}
        aria-label="Aumenta"
        className={btn}
      >
        +
      </button>
    </div>
  );
}
