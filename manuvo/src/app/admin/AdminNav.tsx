"use client";
// Manuvo - onglets del pannello admin (richieste / artigiani).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function AdminNav() {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const tabs = [
    { href: "/admin", label: t("nav_requests") },
    { href: "/admin/artigiani", label: t("nav_artisans") },
  ];

  return (
    <nav className="mb-6 flex gap-1 rounded-xl border border-neutral-200 bg-white p-1">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              active
                ? "bg-red-700 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
