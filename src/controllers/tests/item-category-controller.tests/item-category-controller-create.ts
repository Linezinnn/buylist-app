import { describe, test, expect } from "vitest"

import { ItemCategoryType } from "../../../types/item-category-types"
import { ICreateItemCategoryUseCase } from "../../../usecases/item-category/interfaces/item-category-usecase-interfaces"
import { TESTServerInstanceType } from "./index.spec"

import { UpError } from "../../../errors/up-error"
import { ItemCategoryController } from "../../item-category-controller"

export function ItemCategoryControllerCreateTest(serverInstance: TESTServerInstanceType) {
   const createdAt = new Date()
   const unusedUsecase = null
   
   const usecase: ICreateItemCategoryUseCase = { 
      execute: (): Promise<ItemCategoryType> => {
         return Promise.resolve({ 
            name: 'test',
            color: '#fff',
            id: 'test',
            createdAt,
         })
      }
   }

   describe('create', () => {
      test('must pass', async () => {
         const usecaseClone = { ...usecase }
         
         const controller = new ItemCategoryController(
            usecaseClone,
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
         ) 
            
         await controller.create(serverInstance.request, serverInstance.response)
         
         expect(serverInstance.getResponse.status).toBe(201)
         expect(serverInstance.getResponse.header).toStrictEqual(['location', '/item-category/test'])
         expect(serverInstance.getResponse.send).toStrictEqual({ 
            name: 'test',
            color: '#fff',
            id: 'test',
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
            usecaseClone, 
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
         )

         expect(async () => {
            await controller.create(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(400)
         }).not.toThrow()
      })

      test('with an unxpect error, should handle it', () => {
         let usecaseClone = { ...usecase }
         usecaseClone.execute = () => {
            throw new Error('unxpected error')
         }

         const controller = new ItemCategoryController(
            usecaseClone, 
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
         )

         expect(async () => {
            await controller.create(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(500)
         }).not.toThrow()
      })
   })
}