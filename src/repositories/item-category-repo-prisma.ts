import { prismaClient } from "../database/prisma-client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { IItemCategoryRepository } from "./interfaces/repositories-interfaces";
import { ItemCategoryType } from "../types/item-category-types";

export class ItemCategoryRepositoryPrisma implements IItemCategoryRepository {
   async create(name: string, color: string): Promise<ItemCategoryType> {
      const result = await prismaClient.itemCategory.create({
         data: { name, color }
      })

      return result
   }

   async getByName(name: string): Promise<ItemCategoryType | null> {
      const result = await prismaClient.itemCategory.findFirst({
         where: { name }
      })

      return result
   }
   
   async getAll(): Promise<ItemCategoryType[]> {
      const result = await prismaClient.itemCategory.findMany()

      return result 
   }

   async delete(id: string): Promise<boolean> {
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
}