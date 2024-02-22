import { describe, test, expect } from "vitest"

import { ItemCategoryType } from "../../../types/item-category-types"
import { IGetItemCategoryByIdUseCase } from "../../../usecases/item-category/interfaces/item-category-usecase-interfaces"
import { TESTServerInstanceType } from "./index.spec"

import { UpError } from "../../../errors/up-error"
import { ItemCategoryController } from "../../item-category-controller"

export function ItemCategoryControllerGetByIdTest(serverInstance: TESTServerInstanceType) {
   const createdAt = new Date()
   const unusedUsecase = null
   
   const usecase: IGetItemCategoryByIdUseCase = { 
      execute: (): Promise<ItemCategoryType> => {
         return Promise.resolve({ 
            name: 'test',
            color: '#fff',
            id: 'id_test',
            createdAt,
         })
      }
   }

   describe('get by id', () => {
      test('must pass', async () => {
         const usecaseClone = { ...usecase }

         serverInstance.request.params = { id: 'id_test' }
         
         const controller = new ItemCategoryController(
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
            usecaseClone,
         ) 
            
         await controller.getById(serverInstance.request, serverInstance.response)
         
         expect(serverInstance.getResponse.status).toBe(200)
         expect(serverInstance.getResponse.send).toStrictEqual({ 
            name: 'test',
            color: '#fff',
            id: 'id_test',
            createdAt,
         })
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
            unusedUsecase as any,
            unusedUsecase as any,
            usecaseClone, 
         )

         expect(async () => {
            await controller.getById(serverInstance.request, serverInstance.response)
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
            unusedUsecase as any,
            unusedUsecase as any,
            usecaseClone, 
         )

         expect(async () => {
            await controller.getById(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(500)
         }).not.toThrow()
      })
   })
}