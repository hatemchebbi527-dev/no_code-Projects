// Manuvo - attribution UTM.
// Le composant UtmCapture (cote client) enregistre les parametres utm_* de l'URL
// dans un cookie first-party ; les actions serveur le relisent avec getUtm()
// pour l'enregistrer avec la demande, l'inscription artisan ou la liste d'attente.
// Modele « dernier clic » : une nouvelle visite avec des UTM remplace les anciens.
import { cookies } from "next/headers";

export const UTM_COOKIE = "manuvo_utm";
export const UTM_MAX_AGE_DAYS = 30;

export type Utm = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
};

const EMPTY: Utm = { utmSource: null, utmMedium: null, utmCampaign: null, utmContent: null };

// Garde uniquement minuscules, chiffres, _ et - (convention du tableau UTM), 100 car. max.
function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 100);
  return v || null;
}

// Lit le cookie UTM cote serveur. Ne leve jamais d'erreur : sans cookie, tout est null.
export async function getUtm(): Promise<Utm> {
  try {
    const raw = (await cookies()).get(UTM_COOKIE)?.value;
    if (!raw) return EMPTY;
    const data = JSON.parse(decodeURIComponent(raw)) as Record<string, unknown>;
    return {
      utmSource: clean(data.source),
      utmMedium: clean(data.medium),
      utmCampaign: clean(data.campaign),
      utmContent: clean(data.content),
    };
  } catch {
    return EMPTY;
  }
}
