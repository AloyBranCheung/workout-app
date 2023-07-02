/*
  Warnings:

  - The `exerciseOrder` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "exerciseOrder",
ADD COLUMN     "exerciseOrder" TEXT[];

-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "exerciseOrder" TEXT[];
