// Manuvo - tableau de bord artisan (bacheca a l'etape 6).
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserBalance, getUserTransactions } from "@/lib/credits";
import { creditsToEur } from "@/lib/constants";
import { TransactionList } from "./crediti/TransactionList";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [user, credits, transactions] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
    getUserBalance(userId),
    getUserTransactions(userId, 5),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        Ciao {user?.name.split(" ")[0]} 👋
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Ecco il tuo saldo e le ultime operazioni.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:col-span-1">
          <div className="text-sm font-medium text-amber-800">Saldo crediti</div>
          <div className="mt-1 text-3xl font-extrabold text-amber-700 tabular-nums">
            {credits} <span className="text-lg font-semibold">crediti</span>
          </div>
          <div className="text-xs text-amber-700/80">= {creditsToEur(credits)} €</div>
          <Link
            href="/dashboard/crediti"
            className="mt-4 inline-block rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          >
            Ricarica crediti
          </Link>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Ultime operazioni</h2>
            <Link href="/dashboard/crediti" className="text-sm font-medium text-teal-700 hover:underline">
              Vedi tutto
            </Link>
          </div>
          <div className="mt-3">
            <TransactionList transactions={transactions} empty="Nessuna operazione ancora." />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
        La bacheca delle richieste e lo sblocco dei contatti arriveranno nel
        prossimo passo. Per ora puoi ricaricare i tuoi crediti.
      </div>
    </div>
  );
}
