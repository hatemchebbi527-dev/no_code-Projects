// Manuvo - tableau de bord artisan (placeholder de l'etape 3, complete a l'etape 6).
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logout } from "../(auth)/actions";
import { creditsToEur } from "@/lib/constants";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, role: true, credits: true, city: true },
  });
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-white">M</span>
          Manuvo
        </span>
        <form action={logout}>
          <button className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100">
            Esci
          </button>
        </form>
      </div>

      <h1 className="mt-8 text-2xl font-bold tracking-tight">
        Ciao {user.name.split(" ")[0]} 👋
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Accesso effettuato come <b>{user.role}</b> ({user.email}).
      </p>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="text-sm font-medium text-amber-800">Saldo crediti</div>
        <div className="mt-1 text-3xl font-extrabold text-amber-700">
          {user.credits} <span className="text-lg font-semibold">crediti</span>
        </div>
        <div className="text-xs text-amber-700/80">
          Valore: {creditsToEur(user.credits)} € (1 credito = 2 €)
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
        L&apos;autenticazione funziona. La bacheca delle richieste, la ricarica e lo
        sblocco dei contatti arriveranno nei prossimi passi.
      </div>

      {user.role === "ADMIN" && (
        <Link
          href="/admin"
          className="mt-4 inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Vai al pannello admin
        </Link>
      )}
    </div>
  );
}
