// Manuvo - layout del pannello admin (header + guardia ruolo ADMIN).
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "../(auth)/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
          <Link href="/admin" className="mr-auto flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-900 text-white">M</span>
            Manuvo <span className="text-sm font-medium text-neutral-400">Admin</span>
          </Link>
          <Link href="/dashboard" className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
            Bacheca
          </Link>
          <form action={logout}>
            <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
              Esci
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
    </div>
  );
}
