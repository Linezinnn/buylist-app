import { describe, test, expect } from "vitest";

import { TESTServerInstanceType } from "./index.spec";
import { IDeleteItemUseCase } from "../../../usecases/item/interfaces/item-interfaces";

import { UpError } from "../../../errors/up-error";
import { ItemController } from "../../item-controller";

export function ItemControllerDeleteTest(serverInstance: TESTServerInstanceType) {
   const unusedUsecase = null
   const usecase: IDeleteItemUseCase = {
      execute(): Promise<void> {
         return Promise.resolve()
      },
   }

   describe('delete', () => {
      test('must pass', () => {
         const usecaseClone = { ...usecase }
   
         const controller = new ItemController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            unusedUsecase as any,
            usecaseClone,
            unusedUsecase as any,
         )  
         
         serverInstance.request.params = { id: 'id_test' }
         
         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toBe(204)
         }).not.toThrow()
      })

      test('should return an id variable even if it does not exist',  () => {
         const usecaseClone = { ...usecase }

         const controller = new ItemController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            unusedUsecase as any,
            usecaseClone,
            unusedUsecase as any,
         )

         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toBe(204)
         }).not.toThrow()
      })

      test('With an error, should handle it', () => {
         let usecaseClone = { ...usecase }
         usecaseClone.execute = () => {
            throw new UpError({
               message: 'test_error',
               statusCode: 400,
            })
         }

         const controller = new ItemController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            unusedUsecase as any,
            usecaseClone,
            unusedUsecase as any,
         )

         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toBe(400)
         }).not.toThrow()
      })

      test('With an unxpect error, should handle it', () => {
         let usecaseClone = { ...usecase }
         usecaseClone.execute = () => {
            throw new Error('expected error')
         }

         const controller = new ItemController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            unusedUsecase as any,
            usecaseClone,
            unusedUsecase as any,
         )

         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toBe(500)
         }).not.toThrow()
      })
   })
}