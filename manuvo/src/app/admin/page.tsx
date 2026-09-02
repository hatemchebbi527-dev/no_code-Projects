// Manuvo - pannello admin (placeholder de l'etape 3, complete a l'etape 7).
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logout } from "../(auth)/actions";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const [users, leads, unlocks] = await Promise.all([
    prisma.user.count(),
    prisma.lead.count(),
    prisma.unlock.count(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-white">M</span>
          Manuvo · Admin
        </span>
        <form action={logout}>
          <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
            Esci
          </button>
        </form>
      </div>

      <h1 className="mt-8 text-2xl font-bold tracking-tight">Pannello amministratore</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Accesso riservato agli admin. Verificato lato server.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="Utenti" value={users} />
        <Stat label="Richieste" value={leads} />
        <Stat label="Sblocchi" value={unlocks} />
      </div>

      <Link
        href="/dashboard"
        className="mt-6 inline-block text-sm font-semibold text-teal-700 hover:underline"
      >
        &larr; Torna alla dashboard
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
    </div>
  );
}
