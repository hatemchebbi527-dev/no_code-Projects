-- AlterTable
ALTER TABLE "User" ADD COLUMN     "matricule" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_matricule_key" ON "User"("matricule");
