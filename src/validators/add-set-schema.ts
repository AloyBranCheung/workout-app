import { z } from "zod"

export const AddSetSchema = z.object({
  weight: z.number().positive(),
  unit: z.string().min(1),
  reps: z.number().positive(),
  note: z
    .string()
    .min(1)
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  sessionId: z.string().min(1),
  exerciseId: z.string().min(1),
})
