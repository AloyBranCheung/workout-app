/*
  Warnings:

  - You are about to drop the column `exerciseOrder` on the `WorkoutPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "exerciseOrder",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "lastWorkout" TIMESTAMP(3);
