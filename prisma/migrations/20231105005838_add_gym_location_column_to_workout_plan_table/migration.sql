/*
  Warnings:

  - Added the required column `gymId` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "gymId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "GymLocation"("gymId") ON DELETE RESTRICT ON UPDATE CASCADE;
