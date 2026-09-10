// Manuvo - logique metier des credits (cote serveur uniquement).
import { prisma } from "@/lib/prisma";

export async function getActivePacks() {
  return prisma.creditPack.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getUserBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return user?.credits ?? 0;
}

export async function getUserTransactions(userId: string, limit = 20) {
  return prisma.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

// Credite le compte apres un paiement Stripe confirme. Idempotent : la
// reference (id de session Stripe) garantit qu'un meme paiement ne credite
// qu'une seule fois, meme si Stripe renvoie le webhook plusieurs fois.
export async function grantCreditsForCheckout(params: {
  userId: string;
  credits: number;
  amountEur: number;
  reference: string; // id de session Stripe (unique)
}): Promise<{ granted: boolean }> {
  const { userId, credits, amountEur, reference } = params;

  const existing = await prisma.creditTransaction.findFirst({
    where: { type: "PURCHASE", reference },
    select: { id: true },
  });
  if (existing) return { granted: false }; // deja traite

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: credits } },
    }),
    prisma.creditTransaction.create({
      data: { userId, type: "PURCHASE", credits, amountEur, reference },
    }),
  ]);

  return { granted: true };
}
