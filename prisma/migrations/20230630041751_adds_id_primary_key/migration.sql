-- AlterTable
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("exerciseId");

-- AlterTable
ALTER TABLE "ExerciseHistory" ADD CONSTRAINT "ExerciseHistory_pkey" PRIMARY KEY ("historyId");

-- AlterTable
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId");

-- AlterTable
ALTER TABLE "Session" ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId");

-- AlterTable
ALTER TABLE "Set" ADD CONSTRAINT "Set_pkey" PRIMARY KEY ("setId");

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "WorkoutPlan" (
    "planId" UUID NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("planId")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutPlan" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_planId_key" ON "WorkoutPlan"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_userId_key" ON "WorkoutPlan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutPlan_AB_unique" ON "_ExerciseToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutPlan_B_index" ON "_ExerciseToWorkoutPlan"("B");

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("planId") ON DELETE CASCADE ON UPDATE CASCADE;
