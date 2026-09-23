"use server";

// Manuvo - azione server: l'artigiano invia un messaggio all'assistenza (admin).
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sendMessage } from "@/lib/messages";
import type { MessageState } from "@/components/MessageComposer";

export async function sendArtisanMessage(
  _prev: MessageState,
  formData: FormData,
): Promise<MessageState> {
  const session = await auth();
  if (!session?.user) return { error: "session" };

  const body = String(formData.get("body") ?? "");
  const res = await sendMessage(session.user.id, false, body);
  if (!res.ok) return { error: "empty" };

  revalidatePath("/dashboard/messaggi");
  return { success: true };
}
