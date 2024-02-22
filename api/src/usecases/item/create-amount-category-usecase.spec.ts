import { describe, expect, test } from "vitest";
import { randomUUID } from "crypto";

import { 
   IAmountCategoryRepository, 
   IItemCategoryRepository, 
   IItemRepository 
} from "../../repositories/interfaces/repositories-interfaces";

import { UpError } from "../../errors/up-error";
import { CreateItemUseCase } from "./create-item-usecase";

describe('create item usecase', () => {
   const date = new Date()
   const uuid = randomUUID()

   const itemMock = {
      name: "TESTE",
      amount: 200,
      isChecked: false,
      amountCategoryId: uuid,
      itemCategoryId: uuid,
      id: uuid,
      updatedAt: date,
      createdAt: date,
      amountCategory: {
        name: "Litros",
        id: uuid,
        createdAt: date
      },
      ItemCategory: {
        name: "teste",
        color: "#fff",
        id: uuid,
        createdAt: date
      }
   }

   const itemRepository: Partial<IItemRepository> = {
      create(name) {
         return Promise.resolve(itemMock)
      },
      getByName: (name) => {
         return Promise.resolve(null)
      },
   }

   const itemCategoryRepository: Partial<IItemCategoryRepository> = {
      getById(id) {
         return Promise.resolve({
            name: "item_category",
            id: uuid,
            createdAt: date,
            color: "#fff",
         })
      }
   }

   const amountCategoryRepository: Partial<IAmountCategoryRepository> = {
      getById(id) {
         return Promise.resolve({
            name: "item_category",
            id: uuid,
            createdAt: date,
         })
      }
   }

   test('must pass', async () => {
      const usecase = new CreateItemUseCase(
         itemRepository as IItemRepository,
         amountCategoryRepository as IAmountCategoryRepository,
         itemCategoryRepository as IItemCategoryRepository
      )

      const result = await usecase.execute({
         name: 'test',
         amount: 200,
         amountCategoryId: uuid,
         itemCategoryId: uuid,
      })

      expect(result).toStrictEqual(itemMock)
   })

   test('cannot pass if name already exists', () => {
      let repositoryClone = { ...itemRepository }

      repositoryClone.getByName = (name: string) => {
         return Promise.resolve(itemMock)
      }

      const usecase = new CreateItemUseCase(
         repositoryClone as IItemRepository,
         amountCategoryRepository as IAmountCategoryRepository,
         itemCategoryRepository as IItemCategoryRepository
      )

      expect(async () => {
         await usecase.execute({
            name: 'test',
            amount: 200,
            amountCategoryId: uuid,
            itemCategoryId: uuid,
         })
      }).rejects.toThrow(UpError)
   })

   test('cannot pass if amount category not exists', () => {
      let repositoryClone = { ...amountCategoryRepository }

      repositoryClone.getById = (id: string) => Promise.resolve(null)

      const usecase = new CreateItemUseCase(
         itemRepository as IItemRepository,
         repositoryClone as IAmountCategoryRepository,
         itemCategoryRepository as IItemCategoryRepository
      )

      expect(async () => {
         await usecase.execute({
            name: 'test',
            amount: 200,
            amountCategoryId: uuid,
            itemCategoryId: uuid,
         })
      }).rejects.toThrow(UpError)
   })

   test('cannot pass if item category not exists', () => {
      let repositoryClone = { ...itemCategoryRepository }

      repositoryClone.getById = (id: string) => Promise.resolve(null)

      const usecase = new CreateItemUseCase(
         itemRepository as IItemRepository,
         amountCategoryRepository as IAmountCategoryRepository,
         repositoryClone as IItemCategoryRepository
      )

      expect(async () => {
         await usecase.execute({
            name: 'test',
            amount: 200,
            amountCategoryId: uuid,
            itemCategoryId: uuid,
         })
      }).rejects.toThrow(UpError)
   })

   test('cannot pass because data is invalid', () => {
      const usecase = new CreateItemUseCase(
         itemRepository as IItemRepository,
         amountCategoryRepository as IAmountCategoryRepository,
         itemCategoryRepository as IItemCategoryRepository
      )

      expect(async () => {
         try {
            await usecase.execute({ 
               name: 'this_text_has_to_more_at_30_characters', 
               amount: 200,
               amountCategoryId: uuid,
               itemCategoryId: uuid,
            })
         } catch (error) {
            if(error instanceof UpError) {
               expect(error.message).toBe('The maximium name length is 30')
            }
   
            throw 'test pass'
         }
      }).rejects.toThrow('test pass')
   })
})