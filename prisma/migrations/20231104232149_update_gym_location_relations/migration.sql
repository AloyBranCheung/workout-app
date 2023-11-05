/*
  Warnings:

  - You are about to drop the column `gymLocation` on the `WorkoutPlan` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "WorkoutPlan_gymLocation_key";

-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "gymLocation";

-- CreateTable
CREATE TABLE "GymLocation" (
    "gymId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GymLocation_pkey" PRIMARY KEY ("gymId")
);

-- CreateIndex
CREATE UNIQUE INDEX "GymLocation_gymId_key" ON "GymLocation"("gymId");

-- AddForeignKey
ALTER TABLE "GymLocation" ADD CONSTRAINT "GymLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
