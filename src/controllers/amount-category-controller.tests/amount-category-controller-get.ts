import { describe, test, expect } from "vitest"

import { AmountCategoryType } from "../../types/amount-category-types"
import { IGetAllAmountCategoriesUsecase } from "../../usecases/amount-category/interfaces/amount-category-usecases-interfaces"
import { TESTServerInstanceType } from "./index.spec"

import { AmountCategoryController } from "../amount-category-controller"
import { UpError } from "../../errors/up-error"

export function AmountCategoryControllerGetTest(serverInstance: TESTServerInstanceType) {
   const createdAt = new Date()
   const unusedUsecase = null
   const usecase: IGetAllAmountCategoriesUsecase = { 
      execute: (): Promise<AmountCategoryType[]> => {
         return Promise.resolve([{ 
            name: 'test',
            id: 'test',
            createdAt,
         }])
      }
   }
   
   describe('get', () => {
      test('must pass', async () => {
         const controller = new AmountCategoryController(
            unusedUsecase as any,
            usecase,
            unusedUsecase as any,
         )

         await controller.getAll(serverInstance.response)

         expect(serverInstance.getResponse.status).toBe(200)
         expect(serverInstance.getResponse.send).toStrictEqual([{ 
            name: 'test',
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

         const controller = new AmountCategoryController(
            unusedUsecase as any,
            usecaseClone,
            unusedUsecase as any,
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

         const controller = new AmountCategoryController(
            unusedUsecase as any,
            usecaseClone,
            unusedUsecase as any,
         )

         expect(async () => {
            await controller.create(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(500)
         }).not.toThrow()
      })
   })
}