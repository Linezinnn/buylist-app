import { describe, test, expect } from "vitest"
import { randomUUID } from "crypto"

import { TESTServerInstanceType } from "./index.spec"
import { IGetAllItemsUseCase } from "../../../usecases/item/interfaces/item-interfaces"
import { ItemType } from "../../../types/item-types"
import { ItemController } from "../../item-controller"

import { UpError } from "../../../errors/up-error"


export function ItemControllerGetAllTest(serverInstance: TESTServerInstanceType) {
   const date = new Date()
   const unusedUsecase = null
   const uuid = randomUUID()

   const itemMock = {
      name: "teste",
      amount: 200,
      isChecked: false,
      amountCategoryId: uuid,
      itemCategoryId: uuid,
      id: uuid,
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

   const usecase: IGetAllItemsUseCase = { 
      execute: (): Promise<ItemType[]> => {
         return Promise.resolve([itemMock])
      }
   }
   
   describe('get all', () => {
      test('must pass', async () => {
         const controller = new ItemController(
            unusedUsecase as any,
            unusedUsecase as any,
            usecase,
         )

         await controller.getAll(serverInstance.response)

         expect(serverInstance.getResponse.status).toBe(200)
         expect(serverInstance.getResponse.send).toStrictEqual([itemMock])
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

         const controller = new ItemController(
            unusedUsecase as any,
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