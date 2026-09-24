"use server";

// Manuvo - outils de TEST (admin uniquement) pour valider le badge "artisan verifie".
// Genere / supprime des avis de demonstration. A retirer avant le lancement.
import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const TEST_MARKER = "[TEST] recensione di dimostrazione";

// Cree 3 avis de test (note 5) pour un artisan, avec 3 demandes factices (CLOSED).
export async function seedTestReviewsAction(formData: FormData): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return;

  const artisanId = String(formData.get("artisanId") ?? "");
  if (!artisanId) return;

  const artisan = await prisma.user.findUnique({
    where: { id: artisanId },
    select: { id: true, city: true, country: true, categories: true },
  });
  if (!artisan) return;

  const category = artisan.categories.split(",")[0]?.trim() || "idraulica";
  const city = artisan.city || "Rimini";
  const country = artisan.country || "IT";

  for (let i = 0; i < 3; i++) {
    const lead = await prisma.lead.create({
      data: {
        category,
        country,
        city,
        description: TEST_MARKER,
        urgency: "NOT_URGENT",
        contactName: "Cliente Test",
        contactPhone: "+39 000 000 0000",
        status: "CLOSED",
      },
      select: { id: true },
    });
    await prisma.review.create({
      data: {
        artisanId: artisan.id,
        leadId: lead.id,
        token: crypto.randomBytes(24).toString("hex"),
        rating: 5,
        comment: "Ottimo lavoro, molto professionale. (recensione di test)",
        submittedAt: new Date(),
      },
    });
  }

  revalidatePath("/admin/artigiani");
}

// Supprime les demandes de test (et, par cascade, leurs avis) de cet artisan.
export async function clearTestReviewsAction(formData: FormData): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return;

  const artisanId = String(formData.get("artisanId") ?? "");
  if (!artisanId) return;

  // On retrouve les demandes de test liees aux avis de cet artisan, puis on les
  // supprime : la suppression du Lead efface l'avis associe (onDelete: Cascade).
  const testReviews = await prisma.review.findMany({
    where: { artisanId, lead: { description: TEST_MARKER } },
    select: { leadId: true },
  });
  const leadIds = testReviews.map((r) => r.leadId);
  if (leadIds.length > 0) {
    await prisma.lead.deleteMany({ where: { id: { in: leadIds } } });
  }

  revalidatePath("/admin/artigiani");
}
