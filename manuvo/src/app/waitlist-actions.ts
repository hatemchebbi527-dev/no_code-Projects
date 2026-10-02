"use server";

// Manuvo - action serveur : inscription a la liste d'attente (coming soon).
// NB : un fichier "use server" ne peut exporter QUE des fonctions async.
import { getLocale } from "next-intl/server";
import { addToWaitlist } from "@/lib/waitlist";

export async function joinWaitlist(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string } | undefined> {
  const email = String(formData.get("email") ?? "");
  const lang = await getLocale();
  const res = await addToWaitlist(email, lang);
  return res.ok ? { ok: true } : { error: res.error };
}
