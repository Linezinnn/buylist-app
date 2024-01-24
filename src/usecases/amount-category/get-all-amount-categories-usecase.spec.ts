import { describe, test, expect } from "vitest"
import { randomUUID } from "crypto"

import { IAmountCategoryRepository } from "../../repositories/interfaces/repositories-interfaces"
import { AmountCategoryType } from "../../types/amount-category-types"

import { GetAllAmountCategoriesUsecase } from "./get-all-amount-categories-usecase"
import { UpError } from "../../errors/up-error"

describe('get all amount categories usecase', () => {
   const createdAt = new Date()
   const uuid = randomUUID()

   const repository: Partial<IAmountCategoryRepository> = {
      getAll(): Promise<AmountCategoryType[]> {
         return Promise.resolve([{
            name: 'test',
            id: uuid,
            createdAt,
         }])
      },
   }

   test('must pass', async () => {
      const repositoryClone = { ...repository }

      const usecase = new GetAllAmountCategoriesUsecase(repositoryClone as IAmountCategoryRepository)

      const result = await usecase.execute()

      expect(result).toStrictEqual([{
         name: 'test',
         id: uuid,
         createdAt,
      }])
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getAll = (): any => Promise.resolve([{
         name: 'test'
      }])

      const usecase = new GetAllAmountCategoriesUsecase(repositoryClone as IAmountCategoryRepository)

      expect(async () => {
         await usecase.execute()
      }).rejects.toThrow(UpError)
   })
})