"use server";

// Manuvo - action serveur di sblocco contatto.
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { unlockLead, UnlockError } from "@/lib/leads";

export type UnlockState = { error?: string; success?: string } | undefined;

const MESSAGES: Record<string, string> = {
  INSUFFICIENT_CREDITS: "Crediti insufficienti. Ricarica per sbloccare.",
  LEAD_FULL: "Richiesta esaurita: gia sbloccata dal numero massimo di artigiani.",
  LEAD_UNAVAILABLE: "Richiesta non piu disponibile.",
  ALREADY_UNLOCKED: "Hai gia sbloccato questo contatto.",
  USER_NOT_FOUND: "Sessione non valida. Accedi di nuovo.",
};

export async function unlockLeadAction(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const session = await auth();
  if (!session?.user) return { error: "Sessione scaduta. Accedi di nuovo." };

  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return { error: "Richiesta non valida." };

  try {
    const res = await unlockLead(session.user.id, leadId);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/crediti");
    return { success: `Contatto sbloccato. Saldo: ${res.creditsLeft} crediti.` };
  } catch (e) {
    if (e instanceof UnlockError) {
      return { error: MESSAGES[e.message] ?? "Sblocco non riuscito." };
    }
    return { error: "Sblocco non riuscito. Riprova." };
  }
}
