import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { prismaClient } from "../database/prisma-client";

import { IItemRepository } from "./interfaces/repositories-interfaces";
import {
   ItemDTODeleteType, 
   ItemDTOGetType, 
   ItemDTOPostType, 
   ItemResponseType 
} from "../types/item-types";
import { CheckItemUseCaseDataType } from "../usecases/item/interfaces/item-interfaces";
import { ItemCategoryDTOGetType } from "../types/item-category-types";
import { AmountCategoryDTOGetType } from "../types/amount-category-types";

export class ItemRepositoryPrisma implements IItemRepository {
   private selectVariables = {
      name: true,
      amount: true,
      isChecked: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      amountCategory: true,
      itemCategory: true,
   }
   
   async create(data: ItemDTOPostType): Promise<ItemResponseType> {
      const result = await prismaClient.item.create({
         data,
         select: this.selectVariables,
      })

      return result
   }

   async getByName(name: string): Promise<ItemResponseType | null> {
      const result = await prismaClient.item.findUnique({
         where: { name },
         select: this.selectVariables,
      })

      return result
   }

   async getById({ id }: ItemDTOGetType): Promise<ItemResponseType | null> {
      const result = await prismaClient.item.findUnique({
         where: { id },
         select: this.selectVariables,
      })
 
      return result 
   }

   async getAll(): Promise<ItemResponseType[]> {
      const result = await prismaClient.item.findMany({
         select: this.selectVariables
      })

      return result 
   }

   async delete({ id }: ItemDTODeleteType): Promise<boolean> {
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

   async checkItem({ id, isChecked }: CheckItemUseCaseDataType): Promise<ItemResponseType | null> {
      try {
         const result = await prismaClient.item.update({
            where: { id },
            data: {
               isChecked,
            },
            select: this.selectVariables
         })

         return result
      } catch (err) {
         if(err instanceof PrismaClientKnownRequestError) return null

         throw err
      }
   }
   
   async getFirstByItemCategoryId({ id }: ItemCategoryDTOGetType): Promise<ItemResponseType | null> {
      const result = await prismaClient.item.findFirst({
         where: { itemCategoryId: id },
         select: this.selectVariables,
      })

      return result 
   }

   async deleteManyByItemCategoryId({ id }: ItemCategoryDTOGetType): Promise<boolean> {
      try {
         await prismaClient.item.deleteMany({
            where: { itemCategoryId: id },
         })

         return true
      } catch (err) {
         if(err instanceof PrismaClientKnownRequestError) return false
         throw err
      }
   }

   async getFirstByAmountCategoryId({ id }: AmountCategoryDTOGetType): Promise<ItemResponseType | null> {
      const result = await prismaClient.item.findFirst({
         where: { amountCategoryId: id },
         select: this.selectVariables,
      })

      return result 
   }

   async deleteManyByAmountCategoryId({ id }: AmountCategoryDTOGetType): Promise<boolean> {
      try {
         await prismaClient.item.deleteMany({
            where: { amountCategoryId: id },
         })

         return true
      } catch (err) {
         if(err instanceof PrismaClientKnownRequestError) return false
         throw err
      }
   }
}

