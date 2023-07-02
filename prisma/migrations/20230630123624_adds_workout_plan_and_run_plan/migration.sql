/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `historyId` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `Set` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `setId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[historyId]` on the table `Set` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `targetReps` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetSets` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseHistory" DROP CONSTRAINT "ExerciseHistory_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_historyId_fkey";

-- DropIndex
DROP INDEX "Set_setId_key";

-- DropIndex
DROP INDEX "WorkoutPlan_userId_key";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "description" TEXT,
ADD COLUMN     "targetReps" INTEGER NOT NULL,
ADD COLUMN     "targetSets" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "heightUnits" TEXT DEFAULT 'cm',
ADD COLUMN     "weight" INTEGER,
ADD COLUMN     "weightUnits" TEXT DEFAULT 'kg',
ALTER COLUMN "BMI" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "exerciseId",
DROP COLUMN "historyId",
ADD COLUMN     "planId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Set" DROP CONSTRAINT "Set_pkey",
DROP COLUMN "setId",
ADD COLUMN     "exerciseId" UUID NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "sessionId" UUID NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'kg',
ADD CONSTRAINT "Set_pkey" PRIMARY KEY ("historyId");

-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ExerciseHistory";

-- CreateTable
CREATE TABLE "RunPlan" (
    "planId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RunPlan_pkey" PRIMARY KEY ("planId")
);

-- CreateTable
CREATE TABLE "RunExercise" (
    "exerciseId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targetDistance" INTEGER NOT NULL,
    "targetDistanceUnits" TEXT NOT NULL DEFAULT 'km',
    "isCompleted" BOOLEAN NOT NULL,
    "planId" UUID NOT NULL,

    CONSTRAINT "RunExercise_pkey" PRIMARY KEY ("exerciseId")
);

-- CreateTable
CREATE TABLE "Run" (
    "runId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "speedUnits" TEXT NOT NULL DEFAULT 'km',
    "speedPerTimeUnit" TEXT NOT NULL DEFAULT 'hour',
    "actualDistance" INTEGER NOT NULL,
    "actualDistanceUnits" TEXT NOT NULL DEFAULT 'km',
    "note" TEXT,
    "exerciseId" UUID NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("runId")
);

-- CreateIndex
CREATE UNIQUE INDEX "RunPlan_planId_key" ON "RunPlan"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "RunExercise_exerciseId_key" ON "RunExercise"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "Run_runId_key" ON "Run"("runId");

-- CreateIndex
CREATE UNIQUE INDEX "Set_historyId_key" ON "Set"("historyId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("exerciseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunPlan" ADD CONSTRAINT "RunPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunExercise" ADD CONSTRAINT "RunExercise_planId_fkey" FOREIGN KEY ("planId") REFERENCES "RunPlan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "RunExercise"("exerciseId") ON DELETE RESTRICT ON UPDATE CASCADE;
