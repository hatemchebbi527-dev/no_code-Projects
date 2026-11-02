-- Attribution marketing : parametres utm_* enregistres au moment de la conversion
-- (demande d'un particulier, inscription artisan, liste d'attente).

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "utmSource" TEXT,
ADD COLUMN "utmMedium" TEXT,
ADD COLUMN "utmCampaign" TEXT,
ADD COLUMN "utmContent" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "utmSource" TEXT,
ADD COLUMN "utmMedium" TEXT,
ADD COLUMN "utmCampaign" TEXT,
ADD COLUMN "utmContent" TEXT;

-- AlterTable
ALTER TABLE "Waitlist" ADD COLUMN "utmSource" TEXT,
ADD COLUMN "utmMedium" TEXT,
ADD COLUMN "utmCampaign" TEXT,
ADD COLUMN "utmContent" TEXT;
