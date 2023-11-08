/*
  Warnings:

  - You are about to drop the `Target` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `targetReps` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetSets` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightUnit` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_planId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "targetReps" INTEGER NOT NULL,
ADD COLUMN     "targetSets" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "weightUnit" TEXT NOT NULL;

-- DropTable
DROP TABLE "Target";
