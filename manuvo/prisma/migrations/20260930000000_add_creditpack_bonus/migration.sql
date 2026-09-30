-- Paliers de recharge avec credits offerts : ajout du bonus + mise a jour des packs.

-- AddColumn
ALTER TABLE "CreditPack" ADD COLUMN "bonusCredits" INTEGER NOT NULL DEFAULT 0;

-- Aligne les packs existants sur la nouvelle grille (prix plat 2 EUR/credit + bonus).
UPDATE "CreditPack" SET "priceEur" = 20,  "bonusCredits" = 0  WHERE "credits" = 10;
UPDATE "CreditPack" SET "priceEur" = 50,  "bonusCredits" = 3  WHERE "credits" = 25;
UPDATE "CreditPack" SET "priceEur" = 100, "bonusCredits" = 10 WHERE "credits" = 50;
