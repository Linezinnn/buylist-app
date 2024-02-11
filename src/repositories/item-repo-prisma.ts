import { prismaClient } from "../database/prisma-client";

import { IItemRepository } from "./interfaces/repositories-interfaces";
import { ItemDTOMutationType, ItemType } from "../types/item-types";

export class ItemRepositoryPrisma implements IItemRepository {
   async create({ 
      name, amount, amountCategoryId, itemCategoryId 
   }: ItemDTOMutationType): Promise<ItemType> {
      const result = await prismaClient.item.create({
         data: { name, amount, amountCategoryId, itemCategoryId },
         include: {
            amountCategory: true,
            ItemCategory: true,
         }
      })

      return result
   }

   async getByName(name: string): Promise<ItemType | null> {
      const result = await prismaClient.item.findFirst({
         where: { name },
         include: {
            amountCategory: true,
            ItemCategory: true,
         }
      })

      return result
   }

   async getById(id: string): Promise<ItemType | null> {
      const result = await prismaClient.item.findUnique({
         where: { id },
         include: {
            amountCategory: true,
            ItemCategory: true,
         }
      })
 
      return result 
   }

   async getAll(): Promise<ItemType[]> {
      const result = await prismaClient.item.findMany({
         include: {
            amountCategory: true,
            ItemCategory: true,
         }
      })

      return result 
   }
}

