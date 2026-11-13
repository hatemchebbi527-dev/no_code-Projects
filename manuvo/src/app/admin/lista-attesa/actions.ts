"use server";

// Manuvo - action admin : renseigne le metier (mestiere) et la zone (zona) d'un
// inscrit a la liste d'attente. Permet de completer a la main les inscrits qui
// n'ont laisse que leur email, sans les recontacter.
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function clean(v: string): string | null {
  const s = v.trim().slice(0, 120);
  return s || null;
}

export async function saveWaitlistArtisanInfo(
  id: string,
  mestiere: string,
  zona: string,
): Promise<{ ok: true } | { error: "forbidden" | "generic" }> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "forbidden" };
  }
  try {
    await prisma.waitlist.update({
      where: { id },
      data: { mestiere: clean(mestiere), zona: clean(zona) },
    });
  } catch {
    return { error: "generic" };
  }
  revalidatePath("/admin/lista-attesa");
  return { ok: true };
}
