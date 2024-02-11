import { describe, test, expect } from "vitest"
import { randomUUID } from "crypto"

import { ICreateItemUseCase } from "../../../usecases/item/interfaces/item-interfaces"
import { ItemType } from "../../../types/item-types"
import { TESTServerInstanceType } from "./index.spec"

import { UpError } from "../../../errors/up-error"
import { ItemController } from "../../item-controller"

export function ItemControllerCreateTest(serverInstance: TESTServerInstanceType) {
   const date = new Date()
   const unusedUsecase = null
   const uuid = randomUUID()
   
   const itemMock = {
      name: "TESTE",
      amount: 200,
      isChecked: false,
      amountCategoryId: uuid,
      itemCategoryId: uuid,
      id: 'test',
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

   const usecase: ICreateItemUseCase = { 
      execute: (): Promise<ItemType> => {
         return Promise.resolve(itemMock)
      }
   }

   describe('create', () => {
      test('must pass', async () => {
         const usecaseClone = { ...usecase }
         
         const controller = new ItemController(
            usecaseClone,
            unusedUsecase as any,
            unusedUsecase as any,
            unusedUsecase as any,
         )
            
         await controller.create(serverInstance.request, serverInstance.response)
         
         expect(serverInstance.getResponse.status).toBe(201)
         expect(serverInstance.getResponse.header).toStrictEqual(['location', '/item/test'])
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

         const controller = new ItemController(
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