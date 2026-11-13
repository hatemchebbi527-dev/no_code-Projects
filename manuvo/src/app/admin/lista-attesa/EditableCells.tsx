"use client";

// Manuvo - cellules editables (metier + zone) d'un inscrit de la liste d'attente.
// L'admin remplit/corrige puis enregistre ; bouton actif seulement si modifie.
import { useState, useTransition } from "react";
import { saveWaitlistArtisanInfo } from "./actions";

type Labels = { mestierePh: string; zonaPh: string; save: string; saved: string };

export function EditableCells({
  id,
  mestiere,
  zona,
  labels,
}: {
  id: string;
  mestiere: string | null;
  zona: string | null;
  labels: Labels;
}) {
  const [m, setM] = useState(mestiere ?? "");
  const [z, setZ] = useState(zona ?? "");
  const [savedOk, setSavedOk] = useState(false);
  const [pending, start] = useTransition();

  const dirty = m !== (mestiere ?? "") || z !== (zona ?? "");

  function save() {
    if (!dirty || pending) return;
    setSavedOk(false);
    start(async () => {
      const res = await saveWaitlistArtisanInfo(id, m, z);
      if ("ok" in res) setSavedOk(true);
    });
  }

  const input =
    "w-32 rounded-md border border-neutral-300 px-2 py-1 text-sm text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={m}
        maxLength={120}
        placeholder={labels.mestierePh}
        onChange={(e) => {
          setM(e.target.value);
          setSavedOk(false);
        }}
        className={input}
      />
      <input
        type="text"
        value={z}
        maxLength={120}
        placeholder={labels.zonaPh}
        onChange={(e) => {
          setZ(e.target.value);
          setSavedOk(false);
        }}
        className={input}
      />
      <button
        type="button"
        onClick={save}
        disabled={!dirty || pending}
        className="shrink-0 rounded-md border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-red-500 hover:text-red-700 disabled:opacity-40"
      >
        {pending ? "..." : savedOk && !dirty ? "✓" : labels.save}
      </button>
      {savedOk && !dirty && !pending && (
        <span className="text-xs text-green-600">{labels.saved}</span>
      )}
    </div>
  );
}
