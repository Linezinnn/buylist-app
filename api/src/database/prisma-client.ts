import { PrismaClient } from "@prisma/client"
import { IDatabaseClient } from "./interfaces/database-client-interface"

export const prismaClient = new PrismaClient()

export class DatabaseClientPrisma implements IDatabaseClient {
   constructor(
      private provider: PrismaClient
   ) {}

   public isConnected: boolean = false

   async connect() {
      try {
         await this.provider.$connect()
         console.log('Database connected')

         this.isConnected = true
      } catch (error) {
         console.log('Database Connection Error: ', error)

         this.isConnected = false
      }
   }
}

export const Database = new DatabaseClientPrisma(prismaClient)