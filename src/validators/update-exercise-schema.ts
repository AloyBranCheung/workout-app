import { z } from "zod"

const UpdateExerciseSchema = z.object({
  exerciseId: z.string().uuid(),
  name: z.string(),
  url: z.string().nullish(),
  description: z.string().nullish(),
})

export default UpdateExerciseSchema
