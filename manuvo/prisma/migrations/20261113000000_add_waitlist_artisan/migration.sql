-- Liste d'attente : metier (mestiere) et zone (zona) facultatifs.
-- Fournis par l'artisan a l'inscription coming soon, ou remplis par l'admin,
-- pour preparer le lancement sans recontacter chaque inscrit.

-- AlterTable
ALTER TABLE "Waitlist" ADD COLUMN "mestiere" TEXT,
ADD COLUMN "zona" TEXT;
