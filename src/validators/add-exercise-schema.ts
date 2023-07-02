import { z } from "zod"

const AddExerciseSchema = z.object({
  name: z.string(),
  url: z.string().url().nullish(),
  description: z.string().nullish(),
})

export default AddExerciseSchema
