import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaClient } from "../database/prisma-client";

import { 
   AmountCategoryDTODeleteType, 
   AmountCategoryDTOGetType, 
   AmountCategoryDTOPostType, 
   AmountCategoryResponseType 
} from "../types/amount-category-types";
import { IAmountCategoryRepository } from "./interfaces/repositories-interfaces";

export class AmountCategoryRepositoryPrisma implements IAmountCategoryRepository {
   async create(data: AmountCategoryDTOPostType): Promise<AmountCategoryResponseType> {
      const result = await prismaClient.amountCategory.create({ data })

      return result
   }

   async getByName(name: string): Promise<AmountCategoryResponseType | null> {
      const result = await prismaClient.amountCategory.findFirst({
         where: { name }
      })

      return result
   }

   async getAll(): Promise<AmountCategoryResponseType[]> {
      const result = await prismaClient.amountCategory.findMany()

      return result 
   }

   async delete({ id }: AmountCategoryDTOGetType): Promise<boolean> {
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

   async getById({ id }: AmountCategoryDTOGetType): Promise<AmountCategoryResponseType | null> {
      const result = await prismaClient.amountCategory.findUnique({
         where: { id }
      })

      return result
   }
}