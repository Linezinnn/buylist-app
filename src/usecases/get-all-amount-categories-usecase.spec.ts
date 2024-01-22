import { describe, test, expect } from "vitest"

import { IAmountCategoryRepository } from "../repositories/interfaces/repositories-interfaces"
import { AmountCategoryType } from "../types/amount-category-types"

import { GetAllAmountCategoriesUsecase } from "./get-all-amount-categories-usecase"
import { UpError } from "../errors/up-error"

describe('get all amount categories usecase', () => {
   const createdAt = new Date()

   const repository: IAmountCategoryRepository = {
      create(): any {},
      getByName(): any {},
      getAll(): Promise<AmountCategoryType[]> {
         return Promise.resolve([{
            name: 'test',
            id: 'id_test',
            createdAt,
         }])
      },
   }

   test('must pass', async () => {
      const repositoryClone = { ...repository }

      const usecase = new GetAllAmountCategoriesUsecase(repositoryClone)

      const result = await usecase.execute()

      expect(result).toStrictEqual([{
         name: 'test',
         id: 'id_test',
         createdAt,
      }])
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getAll = (): any => Promise.resolve([{
         name: 'test'
      }])

      const usecase = new GetAllAmountCategoriesUsecase(repositoryClone)

      
      expect(async () => {
         await usecase.execute()
      }).rejects.toThrow(UpError)
   })
})