import { z } from "zod"

const UserProfileSchema = z.object({
  height: z.number().optional(),
  heightUnits: z.string().optional(),
  weight: z.number().optional(),
  weightUnits: z.string().optional(),
  BMI: z.number().optional(),
  avatar: z.string().optional(),
  restTimer: z.number().optional(),
})

export default UserProfileSchema
