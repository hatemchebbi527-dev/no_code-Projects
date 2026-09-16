"use server";

// Manuvo - action serveur di sblocco contatto.
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { unlockLead, UnlockError } from "@/lib/leads";

export type UnlockState = { error?: string; success?: string } | undefined;

const KEY: Record<string, string> = {
  INSUFFICIENT_CREDITS: "insufficient",
  LEAD_FULL: "full",
  LEAD_UNAVAILABLE: "unavailable",
  ALREADY_UNLOCKED: "already",
  USER_NOT_FOUND: "no_user",
};

export async function unlockLeadAction(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const te = await getTranslations("unlockErrors");
  const session = await auth();
  if (!session?.user) return { error: te("session") };

  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return { error: te("invalid") };

  try {
    await unlockLead(session.user.id, leadId);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/crediti");
    return { success: "ok" };
  } catch (e) {
    if (e instanceof UnlockError) {
      const key = KEY[e.message] ?? "generic";
      return { error: te(key) };
    }
    return { error: te("generic") };
  }
}
