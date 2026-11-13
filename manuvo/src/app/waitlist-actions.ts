"use server";

// Manuvo - action serveur : inscription a la liste d'attente (coming soon).
// NB : un fichier "use server" ne peut exporter QUE des fonctions async.
import { getLocale } from "next-intl/server";
import { addToWaitlist } from "@/lib/waitlist";
import { getUtm } from "@/lib/utm";

export async function joinWaitlist(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string } | undefined> {
  const email = String(formData.get("email") ?? "");
  const lang = await getLocale();
  // Champs professionnel facultatifs (metier + zone). Un particulier les laisse
  // vides ; addToWaitlist nettoie et ignore les valeurs vides.
  const mestiere = String(formData.get("mestiere") ?? "");
  const zona = String(formData.get("zona") ?? "");
  const res = await addToWaitlist(email, lang, await getUtm(), { mestiere, zona });
  return res.ok ? { ok: true } : { error: res.error };
}
