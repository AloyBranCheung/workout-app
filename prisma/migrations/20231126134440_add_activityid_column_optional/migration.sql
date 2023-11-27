/*
  Warnings:

  - A unique constraint covering the columns `[activityId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_sessionId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "activityId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Session_activityId_key" ON "Session"("activityId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
