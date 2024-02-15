import { prismaClient } from "../database/prisma-client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { IItemCategoryRepository } from "./interfaces/repositories-interfaces";
import { 
   ItemCategoryDTODeleteType, 
   ItemCategoryDTOGetType, 
   ItemCategoryDTOPostType, 
   ItemCategoryResponseType 
} from "../types/item-category-types";

export class ItemCategoryRepositoryPrisma implements IItemCategoryRepository {
   async create(data: ItemCategoryDTOPostType): Promise<ItemCategoryResponseType> {
      const result = await prismaClient.itemCategory.create({ data })

      return result
   }

   async getByName(name: string): Promise<ItemCategoryResponseType | null> {
      const result = await prismaClient.itemCategory.findUnique({
         where: { name },
      })

      return result
   }
   
   async getAll(): Promise<ItemCategoryResponseType[]> {
      const result = await prismaClient.itemCategory.findMany()

      return result 
   }

   async delete({ id }: ItemCategoryDTODeleteType): Promise<boolean> {
      try {
         await prismaClient.itemCategory.delete({
            where: { id }
         })

         return true
      } catch (err) {
         if(err instanceof PrismaClientKnownRequestError) return false

         throw err
      }
   }
  
   async getById({ id }: ItemCategoryDTOGetType): Promise<ItemCategoryResponseType | null> {
      const result = await prismaClient.itemCategory.findFirst({
         where: { id }
      })

      return result
   }
}