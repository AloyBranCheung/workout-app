import { z } from "zod"

const AddExerciseSchema = z.object({
  name: z.string(),
  url: z.string().nullish(),
  description: z.string().nullish(),
})

export default AddExerciseSchema
