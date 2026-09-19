-- Avis client (etoiles) : base du futur badge "artisan verifie".

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "artisanId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_token_key" ON "Review"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Review_artisanId_leadId_key" ON "Review"("artisanId", "leadId");

-- CreateIndex
CREATE INDEX "Review_artisanId_idx" ON "Review"("artisanId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
