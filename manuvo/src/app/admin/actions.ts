"use server";

// Manuvo - action admin: fissa il costo in crediti di una richiesta (3..5).
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { clampLeadCost } from "@/lib/constants";

export async function setLeadCost(leadId: string, cost: number) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "forbidden" as const };
  }
  const c = clampLeadCost(cost);
  await prisma.lead.update({ where: { id: leadId }, data: { creditCost: c } });
  revalidatePath("/admin");
  return { ok: true as const, cost: c };
}
