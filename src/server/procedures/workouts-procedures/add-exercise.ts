import { tProtectedProcedure } from "src/server/trpc"
import AddExerciseSchema from "src/validators/add-exercise-schema"

const addExercise = tProtectedProcedure
  .input(AddExerciseSchema)
  .mutation(async ({ input }) => {
    console.log("input", input)
  })

export default addExercise
