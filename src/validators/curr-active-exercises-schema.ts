import { z } from "zod"

export const CompletedSetsSchema = z
  .array(
    z.object({
      exerciseId: z.string().uuid(),
      frontendSetId: z.string().uuid(),
      isDone: z.boolean(),
      reps: z.number(),
      sessionId: z.string().uuid(),
      setNumber: z.number(),
      unit: z.string(),
      weight: z.string(),
    })
  )
  .min(1, "Completed at least 1 exercise.")
