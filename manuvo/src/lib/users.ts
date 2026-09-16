// Manuvo - helper utente lato server.
import { prisma } from "@/lib/prisma";
import { isCategory } from "@/lib/constants";

// Mestieri (categorie) di un artigiano, come lista di codici validi.
export async function getUserTrades(userId: string): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { categories: true },
  });
  if (!user) return [];
  return user.categories
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0 && isCategory(c));
}
