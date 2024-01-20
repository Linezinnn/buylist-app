import { describe, test, expect } from "vitest"

import { AmountCategoryType } from "../../types/amount-category-types"
import { ICreateAmountCategoryUseCase } from "../../usecases/interfaces/usecases-interfaces"

import { TESTServerInstanceType } from "./index.spec"
import { AmountCategoryController } from "../amount-category-controller"
import { UpError } from "../../errors/up-error"

export function AmountCategoryControllerCreate(serverInstance: TESTServerInstanceType) {
   const createdAt = new Date()

   describe('create', () => {
      test('must pass', async () => {
         const usecase: ICreateAmountCategoryUseCase = { 
            execute: (data): Promise<AmountCategoryType> => {
               return Promise.resolve({ 
                  name: 'test',
                  id: 'test',
                  createdAt,
               })
            }
         }

         const controller = new AmountCategoryController(usecase)

         await controller.create(serverInstance.request, serverInstance.response)

         expect(serverInstance.getResponse.status).toBe(201)
         expect(serverInstance.getResponse.header).toStrictEqual(['location', '/amount-category/test'])
         expect(serverInstance.getResponse.send).toStrictEqual({ 
            name: 'test',
            id: 'test',
            createdAt,
         })
      })

      test('with an error, should handle it', () => {
         const usecase: ICreateAmountCategoryUseCase = { 
            execute: (data): Promise<AmountCategoryType> => {
               throw new UpError({
                  message: 'erro de teste',
                  statusCode: 400,
               })
            }
         }

         const controller = new AmountCategoryController(usecase)

         expect(async () => {
            await controller.create(serverInstance.request, serverInstance.response)
         }).not.toThrow()
         expect(serverInstance.getResponse.status).toEqual(400)
      })

      test('with an unxpect error, should handle it', () => {
         const usecase: ICreateAmountCategoryUseCase = { 
            execute: (data): Promise<AmountCategoryType> => {
               throw new Error('unxpected error')
            }
         }

         const controller = new AmountCategoryController(usecase)

         expect(async () => {
            await controller.create(serverInstance.request, serverInstance.response)
         }).not.toThrow()
         expect(serverInstance.getResponse.status).toEqual(500)
      })
   })
}