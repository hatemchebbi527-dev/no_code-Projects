"use client";

// Manuvo - filtri bacheca: portata (nazionale/internazionale) + categoria.
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { CATEGORY_LABEL_IT } from "@/lib/catalog";

export function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const scope = params.get("scope") === "international" ? "international" : "national";
  const cat = params.get("cat") ?? "all";

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(key);
    else next.set(key, value);
    router.push(`/dashboard?${next.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-neutral-400">Portata:</span>
        <div className="inline-flex rounded-full border border-neutral-300 bg-neutral-100 p-0.5">
          <button
            onClick={() => setParam("scope", null)}
            aria-pressed={scope === "national"}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              scope === "national" ? "bg-teal-700 text-white" : "text-neutral-600"
            }`}
          >
            🇮🇹 Italia
          </button>
          <button
            onClick={() => setParam("scope", "international")}
            aria-pressed={scope === "international"}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              scope === "international" ? "bg-teal-700 text-white" : "text-neutral-600"
            }`}
          >
            🌍 Internazionale
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip active={cat === "all"} onClick={() => setParam("cat", null)}>
          Tutte
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setParam("cat", c)}>
            {CATEGORY_LABEL_IT[c]}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400"
      }`}
    >
      {children}
    </button>
  );
}
