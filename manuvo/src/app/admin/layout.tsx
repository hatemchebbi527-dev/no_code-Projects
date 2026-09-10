// Manuvo - layout del pannello admin (header + guardia ruolo ADMIN).
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { getUnreadCount } from "@/lib/notifications";
import { logout } from "../(auth)/actions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AdminNav } from "./AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");
  const unread = await getUnreadCount(session.user.id);
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-3">
          <Link href="/admin" className="me-auto flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-900 text-white">M</span>
            Manuvo <span className="text-sm font-medium text-neutral-400">{tn("admin")}</span>
          </Link>
          <Link
            href="/admin/notifiche"
            aria-label={tn("notifiche")}
            className="relative rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unread > 0 && (
              <span className="absolute -end-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
          <form action={logout}>
            <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
              {tc("esci")}
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">
        <AdminNav />
        {children}
      </main>
    </div>
  );
}
