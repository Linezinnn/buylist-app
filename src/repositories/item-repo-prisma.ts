import { prismaClient } from "../database/prisma-client";

import { IItemRepository } from "./interfaces/repositories-interfaces";
import { ItemDTOMutationType, ItemType } from "../types/item-types";

export class ItemRepositoryPrisma implements IItemRepository {
   async create({ 
      name, amount, amountCategoryId, itemCategoryId 
   }: ItemDTOMutationType): Promise<ItemType> {
      const result = await prismaClient.item.create({
         data: { name, amount, amountCategoryId, itemCategoryId }
      })

      return result
   }

   async getByName(name: string): Promise<ItemType | null> {
      const result = await prismaClient.item.findFirst({
         where: { name }
      })

      return result
   }

   async getById(id: string): Promise<ItemType | null> {
      const result = await prismaClient.item.findUnique({
         where: { id }
      })

      return result
   }
}