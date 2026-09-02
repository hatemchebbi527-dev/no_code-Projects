// Manuvo - bootstrap idempotente per la PRODUZIONE.
// Crea (se mancano) i pacchetti crediti e l'account admin. NON cancella dati.
// Eseguito al deploy (vercel-build). Sicuro da rilanciare piu volte.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Pacchetti crediti (solo se la tabella e vuota)
  const packCount = await prisma.creditPack.count();
  if (packCount === 0) {
    await prisma.creditPack.createMany({
      data: [
        { credits: 10, priceEur: 20, popular: false, sortOrder: 1 },
        { credits: 25, priceEur: 48, popular: true, sortOrder: 2 },
        { credits: 50, priceEur: 90, popular: false, sortOrder: 3 },
      ],
    });
    console.log("ensure-base: pacchetti crediti creati.");
  }

  // Account admin (da variabili d'ambiente, con fallback).
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@manuvo.app").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Manuvo2025!";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
        name: "Admin Manuvo",
        country: "IT",
        credits: 0,
      },
    });
    console.log(`ensure-base: admin creato (${adminEmail}).`);
  }

  console.log("ensure-base: OK.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
