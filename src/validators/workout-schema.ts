import { z } from "zod"

const TargetSchema = z.object({
  reps: z.string(),
  sets: z.string(),
})

const WorkoutPlanSchema = z
  .object({
    name: z.string().min(1),
    exercises: z.record(z.string(), TargetSchema.required()),
    gymLocation: z.object({
      name: z.string().min(1),
    }),
    exerciseOrder: z
      .array(z.string())
      .min(1, { message: "At least one exercise required." }),
  })
  .required()

export default WorkoutPlanSchema

export const UpdatePlanSchema = WorkoutPlanSchema.extend({
  planId: z.string().uuid(),
  exercises: z.record(z.string(), TargetSchema),
})

export const AddGymLocationSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})
