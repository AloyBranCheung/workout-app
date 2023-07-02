/*
  Warnings:

  - Added the required column `name` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "name" TEXT NOT NULL;
