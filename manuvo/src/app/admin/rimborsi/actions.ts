"use server";

// Manuvo - azioni admin : approva/rifiuta una richiesta di rimborso crediti.
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { approveRefund, rejectRefund } from "@/lib/refunds";

export type AdminRefundState = { error?: string; success?: boolean } | undefined;

async function ensureAdmin(): Promise<boolean> {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

export async function approveRefundAction(
  _prev: AdminRefundState,
  formData: FormData,
): Promise<AdminRefundState> {
  if (!(await ensureAdmin())) return { error: "forbidden" };
  const unlockId = String(formData.get("unlockId") ?? "");
  if (!unlockId) return { error: "invalid" };
  try {
    await approveRefund(unlockId);
    revalidatePath("/admin/rimborsi");
    return { success: true };
  } catch {
    return { error: "generic" };
  }
}

export async function rejectRefundAction(
  _prev: AdminRefundState,
  formData: FormData,
): Promise<AdminRefundState> {
  if (!(await ensureAdmin())) return { error: "forbidden" };
  const unlockId = String(formData.get("unlockId") ?? "");
  if (!unlockId) return { error: "invalid" };
  try {
    await rejectRefund(unlockId);
    revalidatePath("/admin/rimborsi");
    return { success: true };
  } catch {
    return { error: "generic" };
  }
}
