// Manuvo - logica lato server per il pannello admin.
import { prisma } from "@/lib/prisma";
import { EUR_PER_CREDIT } from "@/lib/constants";

export async function getAdminStats() {
  const [totalLeads, openLeads, soldAgg, artisans] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "OPEN" } }),
    prisma.unlock.aggregate({ _sum: { creditsSpent: true }, _count: true }),
    prisma.user.count({ where: { role: "ARTIGIANO" } }),
  ]);
  const creditsSold = soldAgg._sum.creditsSpent ?? 0;
  return {
    totalLeads,
    openLeads,
    soldContacts: soldAgg._count,
    artisans,
    revenueEur: creditsSold * EUR_PER_CREDIT,
  };
}

export async function getAllLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}
