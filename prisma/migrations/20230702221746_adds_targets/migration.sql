/*
  Warnings:

  - You are about to drop the column `targetReps` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `targetSets` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "targetReps",
DROP COLUMN "targetSets";

-- CreateTable
CREATE TABLE "Target" (
    "targetId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targetReps" INTEGER NOT NULL,
    "targetSets" INTEGER NOT NULL,
    "exerciseId" UUID NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("targetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Target_targetId_key" ON "Target"("targetId");

-- CreateIndex
CREATE UNIQUE INDEX "Target_exerciseId_key" ON "Target"("exerciseId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;
