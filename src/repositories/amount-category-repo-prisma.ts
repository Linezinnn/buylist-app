import { prismaClient } from "../database/prisma-client";
import { AmountCategoryType } from "../types/amount-category-types";
import { AmountCategoryRepository } from "./interfaces/repositories-interfaces";

export class AmountCategoryRepositoryPrisma implements AmountCategoryRepository {
   async create(name: string): Promise<AmountCategoryType> {
      const result = await prismaClient.amountCategory.create({
         data: {
            name,
         }
      })

      return result
   }

   async getByName(name: string): Promise<AmountCategoryType | null> {
       const result = await prismaClient.amountCategory.findFirst({
         where: {
            name,
         }
       })

       return result
   }
}