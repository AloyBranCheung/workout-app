/*
  Warnings:

  - You are about to drop the column `activityId` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_activityId_fkey";

-- DropIndex
DROP INDEX "Session_activityId_key";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "sessionId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "activityId";

-- CreateIndex
CREATE UNIQUE INDEX "Activity_sessionId_key" ON "Activity"("sessionId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
