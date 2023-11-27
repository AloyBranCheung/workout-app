/*
  Warnings:

  - Made the column `userId` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `activityId` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "activityId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;
