import { describe, test, expect } from "vitest"
import { randomUUID } from "crypto"

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces"
import { ItemType } from "../../types/item-types"

import { UpError } from "../../errors/up-error"
import { GetAllItemsUsecase } from "./get-all-items-usecase"

describe('get all items usecase', () => {
   const date = new Date()
   const uuid = randomUUID()

   const itemMock = {
      name: "teste",
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

   const repository: Partial<IItemRepository> = {
      getAll(): Promise<ItemType[]> {
         return Promise.resolve([itemMock])
      },
   }

   test('must pass', async () => {
      const repositoryClone = { ...repository }

      const usecase = new GetAllItemsUsecase(repositoryClone as IItemRepository)

      const result = await usecase.execute()

      expect(result).toStrictEqual([itemMock])
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getAll = (): any => Promise.resolve([{
         name: 'test'
      }])

      const usecase = new GetAllItemsUsecase(repositoryClone as IItemRepository)

      expect(async () => {
         await usecase.execute()
      }).rejects.toThrow(UpError)
   })
})