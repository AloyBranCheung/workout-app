/*
  Warnings:

  - You are about to drop the column `exerciseOrder` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `WorkoutPlan` table. All the data in the column will be lost.
  - You are about to drop the column `lastWorkout` on the `WorkoutPlan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[exerciseId]` on the table `Target` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "exerciseOrder";

-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "duration",
DROP COLUMN "lastWorkout";

-- CreateTable
CREATE TABLE "CurrActiveSesh" (
    "actSeshId" UUID NOT NULL,
    "duration" INTEGER NOT NULL,
    "sessionId" UUID NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CurrActiveSesh_pkey" PRIMARY KEY ("actSeshId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrActiveSesh_actSeshId_key" ON "CurrActiveSesh"("actSeshId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrActiveSesh_sessionId_key" ON "CurrActiveSesh"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrActiveSesh_userId_key" ON "CurrActiveSesh"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Target_exerciseId_key" ON "Target"("exerciseId");

-- AddForeignKey
ALTER TABLE "CurrActiveSesh" ADD CONSTRAINT "CurrActiveSesh_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrActiveSesh" ADD CONSTRAINT "CurrActiveSesh_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
