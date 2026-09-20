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
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    // Artisans ayant debloque chaque demande = qui traite quoi (tracabilite).
    include: {
      unlocks: {
        orderBy: { createdAt: "asc" },
        select: {
          createdAt: true,
          user: { select: { matricule: true, name: true, phone: true } },
        },
      },
    },
  });
}

// Ebauches non finalisees : identite (et coordonnees) captees sur /pubblica
// mais sans demande soumise. Contacts "perdus" a relancer par l'admin.
export async function getLeadDrafts() {
  return prisma.leadDraft.findMany({
    where: { convertedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      category: true,
      city: true,
      createdAt: true,
    },
  });
}

// Liste des artisans avec coordonnees et avis (pour le suivi et le marketing de l'admin).
export async function getArtisans() {
  return prisma.user.findMany({
    where: { role: "ARTIGIANO" },
    orderBy: { matricule: "asc" },
    select: {
      matricule: true,
      name: true,
      email: true,
      piva: true,
      phone: true,
      city: true,
      country: true,
      categories: true,
      credits: true,
      createdAt: true,
      // Avis soumis (avec nota) pour calculer la note moyenne et le badge verifie.
      reviews: {
        where: { submittedAt: { not: null }, rating: { not: null } },
        select: { rating: true },
      },
    },
  });
}
