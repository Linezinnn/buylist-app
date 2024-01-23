import { describe, test, expect } from "vitest";

import { IDeleteAmountCategoryUseCase } from "../../usecases/interfaces/usecases-interfaces";
import { TESTServerInstanceType } from "./index.spec";

import { AmountCategoryController } from "../amount-category-controller";
import { UpError } from "../../errors/up-error";

export function AmountCategoryControllerDeleteTest(serverInstance: TESTServerInstanceType) {
   const unusedUsecase = null
   
   describe('delete', () => {
      test('must pass', async () => {
         const usecase: IDeleteAmountCategoryUseCase = {
            execute(id): Promise<void> {
               return Promise.resolve()
            },
         }
         
         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecase
         )  
         
         serverInstance.request.params = { id: 'id_test' }
         
         await expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
         }).not.toThrow()
         expect(serverInstance.getResponse.status).toBe(204)
      })

      test('should return an id variable even if it does not exist',  () => {
         const usecase: IDeleteAmountCategoryUseCase = {
            execute(id): Promise<void> {
               return Promise.resolve()
            },
         }

         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecase
         )

         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
         }).not.toThrow()
         expect(serverInstance.getResponse.status).toBe(204)
      })

      test('With an error, should handle it', () => {
         const usecase: IDeleteAmountCategoryUseCase = {
            execute(id): Promise<void> {
               throw new UpError({
                  message: 'test_error',
                  statusCode: 400,
               })
            },
         }

         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecase
         )

         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
         }).not.toThrow()
         expect(serverInstance.getResponse.status).toBe(400)
      })

      test('With an unxpect error, should handle it', () => {
         const usecase: IDeleteAmountCategoryUseCase = {
            execute(id): Promise<void> {
               throw new Error('expected error')
            },
         }

         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecase
         )

         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
         }).not.toThrow()
      })
   })
}