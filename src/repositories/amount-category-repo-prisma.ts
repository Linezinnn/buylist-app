import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaClient } from "../database/prisma-client";

import { AmountCategoryType } from "../types/amount-category-types";
import { IAmountCategoryRepository } from "./interfaces/repositories-interfaces";

export class AmountCategoryRepositoryPrisma implements IAmountCategoryRepository {
   async create(name: string): Promise<AmountCategoryType> {
      const result = await prismaClient.amountCategory.create({
         data: { name }
      })

      return result
   }

   async getByName(name: string): Promise<AmountCategoryType | null> {
      const result = await prismaClient.amountCategory.findFirst({
         where: { name }
      })

      return result
   }

   async getAll(): Promise<AmountCategoryType[]> {
      const result = await prismaClient.amountCategory.findMany()

      return result 
   }

   async delete(id: string): Promise<boolean> {
      try {
         await prismaClient.amountCategory.delete({
            where: { id }
         })

         return true
      } catch (err) {
         if(err instanceof PrismaClientKnownRequestError) return false

         throw err
      }
   }

   async getById(id: string): Promise<AmountCategoryType | null> {
      const result = await prismaClient.amountCategory.findFirst({
         where: { id }
      })

      return result
   }
}