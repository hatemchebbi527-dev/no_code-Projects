// Manuvo - affichage des etoiles (note) et badge "artisan verifie".
export function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const filled = Math.round(rating);
  const cls = size === "md" ? "text-xl leading-none" : "text-base leading-none";
  return (
    <span
      className={`inline-flex items-center gap-px ${cls}`}
      aria-label={`${rating.toFixed(1)} / 5`}
      title={`${rating.toFixed(1)} / 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= filled ? "text-amber-400" : "text-neutral-200"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
      <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </span>
  );
}

// Badge "P.IVA registrata" : l'artisan a fourni un numero de TVA italien valide
// (format 11 chiffres + chiffre de controle) a l'inscription. Distinct du badge
// avis (couleur bleue + icone document).
export function PivaBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 ring-1 ring-inset ring-sky-200">
      <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M3 1.5h4L9.5 4v6.5h-6.5z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 6h3M4.5 8h3"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </span>
  );
}
