import { describe, test, expect } from "vitest"

import { TESTServerInstanceType } from "./index.spec"
import { IGetAllItemCategoriesUseCase } from "../../../usecases/item-category/interfaces/item-category-usecase-interfaces"
import { ItemCategoryType } from "../../../types/item-category-types"
import { ItemCategoryController } from "../../item-category-controller"

import { UpError } from "../../../errors/up-error"

export function ItemCategoryControllerGetAllTest(serverInstance: TESTServerInstanceType) {
   const createdAt = new Date()
   const unusedUsecase = null
   const usecase: IGetAllItemCategoriesUseCase = { 
      execute: (): Promise<ItemCategoryType[]> => {
         return Promise.resolve([{ 
            name: 'test',
            color: '#fff',
            id: 'test',
            createdAt,
         }])
      }
   }
   
   describe('get all', () => {
      test('must pass', async () => {
         const controller = new ItemCategoryController(
            unusedUsecase as any,
            usecase,
         )

         await controller.getAll(serverInstance.response)

         expect(serverInstance.getResponse.status).toBe(200)
         expect(serverInstance.getResponse.send).toStrictEqual([{ 
            name: 'test',
            color: '#fff',
            id: 'test',
            createdAt,
         }])
      })

      test('with an error, should handle it', () => {
         let usecaseClone = { ...usecase }
         usecaseClone.execute = () => {
            throw new UpError({
               message: 'erro de teste',
               statusCode: 400,
            })
         }

         const controller = new ItemCategoryController(
            unusedUsecase as any,
            usecaseClone,
         )

         expect(async () => {
            await controller.getAll(serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(400)
         }).not.toThrow()
      })

      test('with an unxpect error, should handle it', () => {
         let usecaseClone = { ...usecase }
         usecaseClone.execute = () => {
            throw new Error('unxpected error')
         }

         const controller = new ItemCategoryController(
            unusedUsecase as any,
            usecaseClone,
         )

         expect(async () => {
            await controller.create(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(500)
         }).not.toThrow()
      })
   })
}