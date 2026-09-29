// Manuvo - reputazione del numero del privato (anti clients fantomes).
// Un numero il cui contatto e stato rimborsato (segnalazione approvata dall'admin:
// numero falso / irraggiungibile) piu volte e considerato inaffidabile:
// le sue richieste aperte non vengono piu mostrate e non puo ripubblicare.
// Si contano SOLO i rimborsi APPROVED (validati dall'admin), non le semplici
// segnalazioni: un artigiano da solo non puo bloccare un cliente.
import { prisma } from "@/lib/prisma";

// Numero di rimborsi approvati oltre il quale un numero viene bloccato.
export const BLOCK_THRESHOLD = 2;

// contactPhone e memorizzato in formato display internazionale (vedi createLead):
// i confronti qui usano lo stesso formato.

// Il numero ha raggiunto la soglia di rimborsi approvati? (controllo alla pubblicazione)
export async function isPhoneBlocked(contactPhone: string): Promise<boolean> {
  const n = await prisma.unlock.count({
    where: { refundStatus: "APPROVED", lead: { contactPhone } },
  });
  return n >= BLOCK_THRESHOLD;
}

// Sottoinsieme bloccato tra una lista di numeri, in una sola query
// (usato per filtrare la bacheca degli artigiani).
export async function getBlockedPhones(phones: string[]): Promise<Set<string>> {
  const unique = [...new Set(phones)];
  if (unique.length === 0) return new Set();
  const rows = await prisma.unlock.findMany({
    where: { refundStatus: "APPROVED", lead: { contactPhone: { in: unique } } },
    select: { lead: { select: { contactPhone: true } } },
  });
  const counts = new Map<string, number>();
  for (const r of rows) {
    const p = r.lead.contactPhone;
    counts.set(p, (counts.get(p) ?? 0) + 1);
  }
  return new Set(
    [...counts].filter(([, n]) => n >= BLOCK_THRESHOLD).map(([p]) => p),
  );
}
