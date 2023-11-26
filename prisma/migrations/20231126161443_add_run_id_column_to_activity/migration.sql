/*
  Warnings:

  - A unique constraint covering the columns `[runId]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "runId" UUID,
ALTER COLUMN "sessionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Activity_runId_key" ON "Activity"("runId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("runId") ON DELETE CASCADE ON UPDATE CASCADE;
