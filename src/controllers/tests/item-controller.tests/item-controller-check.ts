import { describe, test, expect } from "vitest"
import { randomUUID } from "crypto"

import { ICheckItemUseCase, ICreateItemUseCase } from "../../../usecases/item/interfaces/item-interfaces"
import { ItemType } from "../../../types/item-types"
import { TESTServerInstanceType } from "./index.spec"

import { UpError } from "../../../errors/up-error"
import { ItemController } from "../../item-controller"

export function ItemControllerCheckTest(serverInstance: TESTServerInstanceType) {
   const date = new Date()
   const unusedUsecase = null
   const uuid = randomUUID()
   
   const itemMock = {
      name: "TESTE",
      amount: 200,
      isChecked: true,
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

   const usecase: ICheckItemUseCase = { 
      execute: (): Promise<ItemType> => {
         return Promise.resolve(itemMock)
      }
   }

   describe('check item', () => {
      test('must pass', async () => {
         const usecaseClone = { ...usecase }
         
         const controller = new ItemController(
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
            usecaseClone,
         )
            
         serverInstance.request.params = { id: 'id_test' }
         serverInstance.request.body = { checked: true }
         
         await controller.checkItem(serverInstance.request, serverInstance.response)
         
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
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
            usecaseClone, 
         )

         serverInstance.request.params = { id: 'id_test' }
         serverInstance.request.body = { checked: true }

         expect(async () => {
            await controller.checkItem(serverInstance.request, serverInstance.response)
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
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
            usecaseClone, 
         )

         expect(async () => {
            await controller.checkItem(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toEqual(500)
         }).not.toThrow()
      })
   })
}