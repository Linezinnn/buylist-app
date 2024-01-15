import { PrismaClient } from "@prisma/client"

export const prismaClient = new PrismaClient()

export async function connectDatabase() {
   try {
      await prismaClient.$connect()
      console.log("Database connected")
   } catch (error) {
         console.log("Database error")
   }
}