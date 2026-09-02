"use client";

// Manuvo - bottone di sblocco con conferma inline.
import { useActionState, useState } from "react";
import { unlockLeadAction, type UnlockState } from "./actions";

export function UnlockButton({ leadId, cost }: { leadId: string; cost: number }) {
  const [state, formAction, isPending] = useActionState<UnlockState, FormData>(
    unlockLeadAction,
    undefined,
  );
  const [confirming, setConfirming] = useState(false);

  if (state?.error) {
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs font-medium text-red-600">{state.error}</span>
        <button
          onClick={() => setConfirming(true)}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Riprova · {cost} cr
        </button>
      </div>
    );
  }

  if (confirming) {
    return (
      <form action={formAction} className="flex items-center gap-2">
        <input type="hidden" name="leadId" value={leadId} />
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          Annulla
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
        >
          {isPending ? "..." : `Conferma · ${cost} cr`}
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-amber-600"
    >
      Sblocca · {cost} cr
    </button>
  );
}
