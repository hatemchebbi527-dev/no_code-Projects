// Manuvo - donnees de demonstration.
// Lancer avec: npm run db:seed  (ou automatiquement via `prisma migrate reset`)
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  DEFAULT_LEAD_COST,
  MAX_UNLOCKS_PER_LEAD,
  creditsToEur,
} from "../src/lib/constants";

const prisma = new PrismaClient();

// Mots de passe de demo (a changer en prod).
const DEMO_PASSWORD = "Manuvo2025!";

async function main() {
  // Repartir propre a chaque seed
  await prisma.unlock.deleteMany();
  await prisma.creditTransaction.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.creditPack.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  // ---- Utilisateurs ----
  const admin = await prisma.user.create({
    data: {
      email: "admin@manuvo.app",
      passwordHash,
      role: "ADMIN",
      name: "Admin Manuvo",
      country: "IT",
      city: "Rimini",
      credits: 0,
    },
  });

  const artigiano = await prisma.user.create({
    data: {
      email: "artigiano@manuvo.app",
      passwordHash,
      role: "ARTIGIANO",
      name: "Mario Idraulico",
      phone: "+39 347 000 1122",
      country: "IT",
      city: "Rimini",
      categories: "idraulica,elettricista,elettrodomestici",
      credits: 12,
    },
  });

  // ---- Packs de recharge ----
  await prisma.creditPack.createMany({
    data: [
      { credits: 10, priceEur: 20, popular: false, sortOrder: 1 },
      { credits: 25, priceEur: 48, popular: true, sortOrder: 2 },
      { credits: 50, priceEur: 90, popular: false, sortOrder: 3 },
    ],
  });

  // ---- Demandes (leads) : Italie + international ----
  const leads = [
    { category: "idraulica", country: "IT", city: "Rimini", urgency: "ASAP", creditCost: 5,
      description: "Perdita d'acqua sotto il lavello della cucina, serve intervento urgente.",
      contactName: "Marco Bianchi", contactPhone: "+39 347 112 4455", contactEmail: "m.bianchi@email.it" },
    { category: "elettricista", country: "IT", city: "Riccione", urgency: "THIS_WEEK", creditCost: 4,
      description: "Installazione di 4 punti luce e due prese nuove in salotto.",
      contactName: "Giulia Rossi", contactPhone: "+39 320 887 2210", contactEmail: "giulia.rossi@email.it" },
    { category: "imbianchino", country: "IT", city: "Rimini", urgency: "NOT_URGENT", creditCost: 3,
      description: "Tinteggiatura completa di un appartamento di 75 mq.",
      contactName: "Luca Ferrari", contactPhone: "+39 333 445 9981", contactEmail: null },
    { category: "trasporti", country: "IT", city: "Milano", urgency: "THIS_WEEK", creditCost: 4,
      description: "Trasloco di un bilocale al terzo piano senza ascensore.",
      contactName: "Anna Conti", contactPhone: "+39 348 220 7734", contactEmail: "anna.conti@email.it" },
    { category: "spazzacamino", country: "IT", city: "Bologna", urgency: "NOT_URGENT", creditCost: 3,
      description: "Pulizia annuale della canna fumaria di una stufa a pellet.",
      contactName: "Paolo Verdi", contactPhone: "+39 351 009 3321", contactEmail: "p.verdi@email.it" },
    { category: "elettrodomestici", country: "IT", city: "Rimini", urgency: "ASAP", creditCost: 4,
      description: "Lavatrice che non scarica l'acqua, serve riparazione.",
      contactName: "Sara Moretti", contactPhone: "+39 340 556 1120", contactEmail: "sara.m@email.it" },
    { category: "idraulica", country: "FR", city: "Paris", urgency: "ASAP", creditCost: 5,
      description: "Remplacement du chauffe-eau dans un appartement.",
      contactName: "Julien Martin", contactPhone: "+33 6 12 34 56 78", contactEmail: "j.martin@email.fr" },
    { category: "elettricista", country: "DE", city: "Berlin", urgency: "THIS_WEEK", creditCost: 4,
      description: "Installation eines Sicherungskastens fuer eine neue Kueche.",
      contactName: "Lena Schmidt", contactPhone: "+49 151 2345678", contactEmail: "lena.s@email.de" },
    { category: "pulizie", country: "ES", city: "Barcelona", urgency: "NOT_URGENT", creditCost: 3,
      description: "Limpieza de fin de obra para una oficina de 120 m2.",
      contactName: "Marc Puig", contactPhone: "+34 612 345 678", contactEmail: "marc.puig@email.es" },
  ];

  const createdLeads = [];
  for (const l of leads) {
    const lead = await prisma.lead.create({
      data: { ...l, status: "OPEN", unlocksCount: 0, maxUnlocks: MAX_UNLOCKS_PER_LEAD },
    });
    createdLeads.push(lead);
  }

  // ---- Un deblocage de demo pour l'artisan (montre l'historique) ----
  const target = createdLeads[2]; // imbianchino Rimini, cost 3
  await prisma.$transaction([
    prisma.unlock.create({
      data: { userId: artigiano.id, leadId: target.id, creditsSpent: target.creditCost },
    }),
    prisma.lead.update({
      where: { id: target.id },
      data: { unlocksCount: { increment: 1 } },
    }),
    prisma.user.update({
      where: { id: artigiano.id },
      data: { credits: { decrement: target.creditCost } },
    }),
    prisma.creditTransaction.create({
      data: {
        userId: artigiano.id,
        type: "SPEND",
        credits: -target.creditCost,
        amountEur: -creditsToEur(target.creditCost),
        reference: target.id,
      },
    }),
  ]);

  console.log("Seed termine.");
  console.log(`  Admin     : ${admin.email} / ${DEMO_PASSWORD}`);
  console.log(`  Artigiano : ${artigiano.email} / ${DEMO_PASSWORD} (credits: 9)`);
  console.log(`  Leads     : ${createdLeads.length} (Italie + international)`);
  console.log(`  Packs     : 3`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
