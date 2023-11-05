import { z } from "zod"

const AddExerciseSchema = z.object({
  name: z.string(),
  url: z.string().nullish(),
  description: z.string().nullish(),
  gymId: z.string().min(1),
  unit: z.string().min(1),
})

export default AddExerciseSchema
