/*
  Warnings:

  - You are about to drop the column `duration` on the `Session` table. All the data in the column will be lost.
  - Added the required column `endDuration` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDuration` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "duration",
ADD COLUMN     "endDuration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDuration" TIMESTAMP(3) NOT NULL;
