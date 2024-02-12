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
   
   const itemMock = {
      name: "TESTE",
      amount: 200,
      isChecked: false,
      amountCategoryId: uuid,
      itemCategoryId: uuid,
      id: 'id_test',
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

   const usecase: IGetItemByIdUseCase = { 
      execute: (): Promise<ItemType> => {
         return Promise.resolve(itemMock)
      }
   }

   describe('get by id', () => {
      test('must pass', async () => {
         const usecaseClone = { ...usecase }

         serverInstance.request.params = { id: 'id_test' }
         
         const controller = new ItemController(
            unusedUsecase as any,
            usecaseClone,
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
         ) 
            
         await controller.getById(serverInstance.request, serverInstance.response)
         
         expect(serverInstance.getResponse.status).toBe(200)
         expect(serverInstance.getResponse.send).toStrictEqual(itemMock)
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
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
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
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
         )

         expect(async () => {
            await controller.getById(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(500)
         }).not.toThrow()
      })
   })
}