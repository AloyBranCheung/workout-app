-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_planId_fkey";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "planId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan"("planId") ON DELETE SET NULL ON UPDATE CASCADE;
