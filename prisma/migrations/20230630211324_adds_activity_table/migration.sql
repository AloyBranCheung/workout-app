/*
  Warnings:

  - A unique constraint covering the columns `[activityId]` on the table `RunExercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activityId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activityId` to the `RunExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RunExercise" ADD COLUMN     "activityId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "activityId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Activity" (
    "activityId" UUID NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_activityId_key" ON "Activity"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "RunExercise_activityId_key" ON "RunExercise"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_activityId_key" ON "Session"("activityId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunExercise" ADD CONSTRAINT "RunExercise_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;
