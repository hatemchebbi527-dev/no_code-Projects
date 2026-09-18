-- Ebauche de demande : identite (et coordonnees) captees avant la soumission finale de /pubblica.
-- convertedAt renseigne quand l'ebauche aboutit a une vraie demande (Lead).

-- CreateTable
CREATE TABLE "LeadDraft" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "category" TEXT,
    "city" TEXT,
    "country" TEXT,
    "convertedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadDraft_convertedAt_idx" ON "LeadDraft"("convertedAt");
