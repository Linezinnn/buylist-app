import { describe, test, expect } from "vitest"
import { randomUUID } from "crypto"

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces"
import { ItemCategoryType } from "../../types/item-category-types"

import { GetAllItemCategoriesUsecase } from "./get-all-item-categories-usecase"
import { UpError } from "../../errors/up-error"

describe('get all item categories usecase', () => {
   const createdAt = new Date()
   const uuid = randomUUID()

   const repository: Partial<IItemCategoryRepository> = {
      getAll(): Promise<ItemCategoryType[]> {
         return Promise.resolve([{
            name: 'test',
            color: '#fff',
            id: uuid,
            createdAt,
         }])
      },
   }

   test('must pass', async () => {
      const repositoryClone = { ...repository }

      const usecase = new GetAllItemCategoriesUsecase(repositoryClone as IItemCategoryRepository)

      const result = await usecase.execute()

      expect(result).toStrictEqual([{
         name: 'test',
         color: '#fff',
         id: uuid,
         createdAt,
      }])
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getAll = (): any => Promise.resolve([{
         name: 'test'
      }])

      const usecase = new GetAllItemCategoriesUsecase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute()
      }).rejects.toThrow(UpError)
   })
})