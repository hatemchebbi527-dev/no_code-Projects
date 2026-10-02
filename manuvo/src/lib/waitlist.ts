// Manuvo - liste d'attente (mode coming soon). Enregistre les emails des
// visiteurs interesses avant le lancement officiel.
import { prisma } from "@/lib/prisma";

// Mode coming soon actif ? (pilote par la variable d'env COMING_SOON=1)
export const COMING_SOON = process.env.COMING_SOON === "1";

export type WaitlistResult = { ok: true } | { ok: false; error: "invalid" | "generic" };

export async function addToWaitlist(rawEmail: string, lang: string): Promise<WaitlistResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid" };
  }
  try {
    // upsert : une 2e inscription du meme email ne renvoie pas d'erreur.
    await prisma.waitlist.upsert({
      where: { email },
      update: {},
      create: { email, lang },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "generic" };
  }
}
