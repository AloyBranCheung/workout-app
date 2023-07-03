/*
  Warnings:

  - Added the required column `planId` to the `Target` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Target" ADD COLUMN     "planId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan"("planId") ON DELETE CASCADE ON UPDATE CASCADE;
