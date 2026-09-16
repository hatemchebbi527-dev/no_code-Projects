"use client";

// Manuvo - selettore lingua (cookie NEXT_LOCALE + refresh).
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LANGS: { code: string; label: string }[] = [
  { code: "it", label: "🇮🇹 Italiano" },
  { code: "en", label: "🇬🇧 English" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "ar", label: "🇸🇦 العربية" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [, start] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    start(() => router.refresh());
  }

  return (
    <select
      value={locale}
      onChange={onChange}
      aria-label="Language"
      className="rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm font-medium text-neutral-700 hover:border-neutral-400"
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
