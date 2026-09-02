// Manuvo - layout de l'espace artisan (barre du haut + navigation).
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserBalance } from "@/lib/credits";
import { logout } from "../(auth)/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const credits = await getUserBalance(session.user.id);
  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-5 py-3">
          <Link href="/dashboard" className="mr-auto flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-white">M</span>
            Manuvo
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            <Link href="/dashboard" className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
              Bacheca
            </Link>
            <Link href="/dashboard/crediti" className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
              Crediti
            </Link>
            {isAdmin && (
              <Link href="/admin" className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
                Admin
              </Link>
            )}
          </nav>

          <Link
            href="/dashboard/crediti"
            className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
            title="Il tuo saldo crediti"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
            </svg>
            <span className="tabular-nums">{credits}</span>
          </Link>

          <form action={logout}>
            <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
              Esci
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8">{children}</main>
    </div>
  );
}
