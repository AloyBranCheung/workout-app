/*
  Warnings:

  - Added the required column `gymId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "gymId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "GymLocation"("gymId") ON DELETE CASCADE ON UPDATE CASCADE;
