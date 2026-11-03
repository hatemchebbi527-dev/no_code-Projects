// Manuvo - liste d'attente (mode coming soon). Enregistre les emails des
// visiteurs interesses avant le lancement officiel.
import { prisma } from "@/lib/prisma";
import type { Utm } from "@/lib/utm";
import { notifyAdminsWaitlistSignup } from "@/lib/notifications";
import { getBaseUrl } from "@/lib/base-url";

// Mode coming soon actif ? (pilote par la variable d'env COMING_SOON=1)
export const COMING_SOON = process.env.COMING_SOON === "1";

export type WaitlistResult = { ok: true } | { ok: false; error: "invalid" | "generic" };

export async function addToWaitlist(
  rawEmail: string,
  lang: string,
  utm?: Utm,
): Promise<WaitlistResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid" };
  }
  try {
    // Une 2e inscription du meme email ne renvoie pas d'erreur et ne notifie pas.
    const existing = await prisma.waitlist.findUnique({ where: { email }, select: { id: true } });
    if (existing) return { ok: true };
    await prisma.waitlist.create({ data: { email, lang, ...utm } });
  } catch (error) {
    // Course possible (double clic) : l'email existe deja, c'est un succes.
    if ((error as { code?: string })?.code === "P2002") return { ok: true };
    return { ok: false, error: "generic" };
  }

  // Avis admin (email + push), best effort : ne bloque jamais l'inscription.
  try {
    await notifyAdminsWaitlistSignup({
      email,
      lang,
      utmSource: utm?.utmSource,
      utmCampaign: utm?.utmCampaign,
      baseUrl: await getBaseUrl(),
    });
  } catch (error) {
    console.error("[waitlist] notifica admin fallita:", error);
  }
  return { ok: true };
}
