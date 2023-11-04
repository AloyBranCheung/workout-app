/*
  Warnings:

  - A unique constraint covering the columns `[gymLocation]` on the table `WorkoutPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gymLocation` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "gymLocation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_gymLocation_key" ON "WorkoutPlan"("gymLocation");
