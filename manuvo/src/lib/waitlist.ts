// Manuvo - liste d'attente (mode coming soon). Enregistre les emails des
// visiteurs interesses avant le lancement officiel.
import { prisma } from "@/lib/prisma";
import type { Utm } from "@/lib/utm";
import { notifyAdminsWaitlistSignup } from "@/lib/notifications";
import { getBaseUrl } from "@/lib/base-url";

// Mode coming soon actif ? (pilote par la variable d'env COMING_SOON=1)
export const COMING_SOON = process.env.COMING_SOON === "1";

export type WaitlistResult = { ok: true } | { ok: false; error: "invalid" | "generic" };

// Champs facultatifs d'un artisan (metier + zone). Nettoyage : trim, plafond,
// et null si vide (un champ vide ne doit pas ecraser une donnee deja saisie).
export type WaitlistArtisanInfo = { mestiere?: string | null; zona?: string | null };

function cleanField(v: string | null | undefined): string | null {
  const s = (v ?? "").trim().slice(0, 120);
  return s || null;
}

export async function addToWaitlist(
  rawEmail: string,
  lang: string,
  utm?: Utm,
  artisan?: WaitlistArtisanInfo,
): Promise<WaitlistResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid" };
  }
  const mestiere = cleanField(artisan?.mestiere);
  const zona = cleanField(artisan?.zona);
  try {
    // Une 2e inscription du meme email ne renvoie pas d'erreur et ne notifie pas.
    const existing = await prisma.waitlist.findUnique({
      where: { email },
      select: { id: true, mestiere: true, zona: true },
    });
    if (existing) {
      // Si l'inscrit revient en precisant son metier/zone et que ces champs
      // etaient vides, on les complete (sans ecraser une saisie existante).
      const data: { mestiere?: string; zona?: string } = {};
      if (mestiere && !existing.mestiere) data.mestiere = mestiere;
      if (zona && !existing.zona) data.zona = zona;
      if (Object.keys(data).length > 0) {
        await prisma.waitlist.update({ where: { id: existing.id }, data });
      }
      return { ok: true };
    }
    await prisma.waitlist.create({ data: { email, lang, mestiere, zona, ...utm } });
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
