/*
  Warnings:

  - You are about to drop the column `activityId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_activityId_fkey";

-- DropIndex
DROP INDEX "Session_activityId_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "activityId";
