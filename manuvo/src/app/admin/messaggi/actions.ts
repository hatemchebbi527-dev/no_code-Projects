"use server";

// Manuvo - azione server: l'admin risponde a un artigiano.
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sendMessage } from "@/lib/messages";
import type { MessageState } from "@/components/MessageComposer";

export async function sendAdminMessage(
  _prev: MessageState,
  formData: FormData,
): Promise<MessageState> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "forbidden" };

  const userId = String(formData.get("userId") ?? "");
  const body = String(formData.get("body") ?? "");
  if (!userId) return { error: "invalid" };

  const res = await sendMessage(userId, true, body);
  if (!res.ok) return { error: "empty" };

  revalidatePath(`/admin/messaggi/${userId}`);
  revalidatePath("/admin/messaggi");
  return { success: true };
}
