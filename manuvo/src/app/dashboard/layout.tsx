// Manuvo - layout de l'espace artisan (barre du haut + navigation).
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { getUserBalance } from "@/lib/credits";
import { logout } from "../(auth)/actions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  // L'admin ha il suo pannello: non entra nell'area artigiano.
  if (session.user.role === "ADMIN") redirect("/admin");
  const credits = await getUserBalance(session.user.id);
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-5 py-3">
          <Link href="/dashboard" className="me-auto flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-700 text-white">M</span>
            Manuvo
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            <Link href="/dashboard" className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
              {tn("bacheca")}
            </Link>
            <Link href="/dashboard/crediti" className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
              {tn("crediti")}
            </Link>
          </nav>

          <Link
            href="/dashboard/crediti"
            className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
            </svg>
            <span className="tabular-nums">{credits}</span>
          </Link>

          <LanguageSwitcher />

          <form action={logout}>
            <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
              {tc("esci")}
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8">{children}</main>
    </div>
  );
}
