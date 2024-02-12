import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { prismaClient } from "../database/prisma-client";

import { IItemRepository } from "./interfaces/repositories-interfaces";
import { ItemDTOCheckType, ItemDTOMutationType, ItemType } from "../types/item-types";

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

   async delete(id: string): Promise<boolean> {
      try {
         await prismaClient.item.delete({
            where: { id }
         })

         return true
      } catch (err) {
         if(err instanceof PrismaClientKnownRequestError) return false

         throw err
      }
   }

   async checkItem(id: string, data: ItemDTOCheckType): Promise<ItemType | null> {
      try {
         const result = await prismaClient.item.update({
            where: { id },
            data: {
               isChecked: data.checked
            },
            include: {
               amountCategory: true,
               ItemCategory: true,
            }
         })

         return result
      } catch (err) {
         if(err instanceof PrismaClientKnownRequestError) return null

         throw err
      }
   }
}

