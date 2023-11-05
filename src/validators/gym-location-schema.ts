import { z } from "zod"

export const UpdateGymLocationSchema = z.object({
  gymId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
})
