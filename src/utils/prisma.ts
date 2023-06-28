import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient | null = null
if (!prisma) {
  prisma = new PrismaClient()
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default prisma!
