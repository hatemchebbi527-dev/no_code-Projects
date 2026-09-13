-- Partita IVA de l'artisan : cle anti-abus des credits de bienvenue (une fois par P.IVA).
-- Nullable + unique : Postgres autorise plusieurs NULL, donc les comptes existants (admin, demos) survivent.
-- AlterTable
ALTER TABLE "User" ADD COLUMN "piva" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_piva_key" ON "User"("piva");
