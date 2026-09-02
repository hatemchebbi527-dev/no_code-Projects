"use server";

// Manuvo - action serveur d'achat de credits (paiement simule).
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { purchasePackForUser } from "@/lib/credits";

export type BuyState = { error?: string; success?: string } | undefined;

export async function buyPack(_prev: BuyState, formData: FormData): Promise<BuyState> {
  const session = await auth();
  if (!session?.user) return { error: "Sessione scaduta. Accedi di nuovo." };

  const packId = String(formData.get("packId") ?? "");
  if (!packId) return { error: "Pacchetto non valido." };

  try {
    const credits = await purchasePackForUser(session.user.id, packId);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/crediti");
    return { success: `Ricarica completata. Nuovo saldo: ${credits} crediti.` };
  } catch {
    return { error: "Ricarica non riuscita. Riprova." };
  }
}
