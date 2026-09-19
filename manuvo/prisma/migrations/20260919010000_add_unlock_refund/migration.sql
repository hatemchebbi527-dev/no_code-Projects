-- Remboursement des credits (anti-faux-leads) : etat de remboursement par deblocage.

-- AlterTable
ALTER TABLE "Unlock" ADD COLUMN "refundStatus" TEXT NOT NULL DEFAULT 'NONE';
ALTER TABLE "Unlock" ADD COLUMN "refundReasonCode" TEXT;
ALTER TABLE "Unlock" ADD COLUMN "refundReason" TEXT;
ALTER TABLE "Unlock" ADD COLUMN "refundRequestedAt" TIMESTAMP(3);
ALTER TABLE "Unlock" ADD COLUMN "refundedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Unlock_refundStatus_idx" ON "Unlock"("refundStatus");
