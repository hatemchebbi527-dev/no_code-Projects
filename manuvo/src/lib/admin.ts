// Manuvo - logica lato server per il pannello admin.
import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [totalLeads, openLeads, soldAgg, artisans, revenueAgg] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "OPEN" } }),
    prisma.unlock.aggregate({ _count: true }),
    prisma.user.count({ where: { role: "ARTIGIANO" } }),
    // Ricavi reali = denaro effettivamente incassato dalle ricariche (acquisti pacchetti).
    prisma.creditTransaction.aggregate({
      where: { type: "PURCHASE" },
      _sum: { amountEur: true },
    }),
  ]);
  return {
    totalLeads,
    openLeads,
    soldContacts: soldAgg._count,
    artisans,
    revenueEur: revenueAgg._sum.amountEur ?? 0,
  };
}

export async function getAllLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}
