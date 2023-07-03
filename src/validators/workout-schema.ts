import { z } from "zod"

const WorkoutPlanSchema = z
  .object({
    name: z.string().min(1),
    exercises: z.record(
      z.string(),
      z
        .object({
          reps: z.string(),
          sets: z.string(),
        })
        .required()
    ),
    exerciseOrder: z
      .array(z.string())
      .min(1, { message: "At least one exercise required." }),
  })
  .required()

export default WorkoutPlanSchema

export const UpdatePlanSchema = WorkoutPlanSchema.extend({
  planId: z.string().uuid(),
})
