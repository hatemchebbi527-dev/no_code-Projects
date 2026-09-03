// Manuvo - layout del pannello admin (header + guardia ruolo ADMIN).
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
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
