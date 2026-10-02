"use server";

// Manuvo - action serveur : inscription a la liste d'attente (coming soon).
import { getLocale } from "next-intl/server";
import { addToWaitlist } from "@/lib/waitlist";

export type WaitState = { ok?: boolean; error?: string } | undefined;

export async function joinWaitlist(_prev: WaitState, formData: FormData): Promise<WaitState> {
  const email = String(formData.get("email") ?? "");
  const lang = await getLocale();
  const res = await addToWaitlist(email, lang);
  return res.ok ? { ok: true } : { error: res.error };
}
