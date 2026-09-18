"use server";

// Manuvo - salvataggio progressivo dell'ebauche di richiesta (LeadDraft).
// Chiamata mentre il privato compila /pubblica, prima dell'invio finale, per
// non perdere il contatto se la richiesta non viene finalizzata. Best effort :
// non blocca mai l'utente e non solleva errori verso il client.
import { prisma } from "@/lib/prisma";
import { isCategory } from "@/lib/constants";

export type DraftInput = {
  draftId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  category?: string;
  city?: string;
  country?: string;
};

function clean(v: string | undefined, max = 200): string | null {
  const s = (v ?? "").trim();
  if (!s) return null;
  return s.slice(0, max);
}

export async function saveLeadDraft(input: DraftInput): Promise<{ id: string } | null> {
  const firstName = clean(input.firstName);
  const lastName = clean(input.lastName);
  // On n'enregistre rien tant qu'on n'a pas au moins un prenom : pas de ligne vide.
  if (!firstName) return null;

  const data = {
    firstName,
    lastName: lastName ?? "",
    phone: clean(input.phone, 40),
    email: clean(input.email),
    category: input.category && isCategory(input.category) ? input.category : null,
    city: clean(input.city, 120),
    country: clean(input.country, 2),
  };

  try {
    if (input.draftId) {
      const updated = await prisma.leadDraft.update({
        where: { id: input.draftId },
        data,
        select: { id: true },
      });
      return updated;
    }
    const created = await prisma.leadDraft.create({ data, select: { id: true } });
    return created;
  } catch {
    // Ebauche best effort : en cas d'erreur (ex. draftId perime), on abandonne en silence.
    return null;
  }
}
