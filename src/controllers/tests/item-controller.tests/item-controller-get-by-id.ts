import { describe, test, expect } from "vitest"
import { randomUUID } from "crypto"

import { TESTServerInstanceType } from "./index.spec"
import { ItemType } from "../../../types/item-types"
import { IGetItemByIdUseCase } from "../../../usecases/item/interfaces/item-interfaces"

import { UpError } from "../../../errors/up-error"
import { ItemController } from "../../item-controller"

export function ItemControllerGetByIdTest(serverInstance: TESTServerInstanceType) {
   const date = new Date()
   const uuid = randomUUID()
   const unusedUsecase = null
   
   const usecase: IGetItemByIdUseCase = { 
      execute: (): Promise<ItemType> => {
         return Promise.resolve({ 
            name: 'TEST',
            id: 'id_test',
            amount: 200,
            isChecked: false,
            amountCategoryId: uuid,
            itemCategoryId: uuid,
            createdAt: date,
            updatedAt: date,
         })
      }
   }

   describe('get by id', () => {
      test('must pass', async () => {
         const usecaseClone = { ...usecase }

         serverInstance.request.params = { id: 'id_test' }
         
         const controller = new ItemController(
            unusedUsecase as any,
            usecaseClone,
         ) 
            
         await controller.getById(serverInstance.request, serverInstance.response)
         
         expect(serverInstance.getResponse.status).toBe(200)
         expect(serverInstance.getResponse.send).toStrictEqual({ 
            name: 'TEST',
            id: 'id_test',
            amount: 200,
            isChecked: false,
            amountCategoryId: uuid,
            itemCategoryId: uuid,
            createdAt: date,
            updatedAt: date,
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

         const controller = new ItemController(
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

         const controller = new ItemController(
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