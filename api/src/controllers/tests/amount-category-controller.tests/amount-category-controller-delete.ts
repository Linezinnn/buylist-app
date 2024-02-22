import { describe, test, expect } from "vitest";

import { IDeleteAmountCategoryUseCase } from "../../../usecases/amount-category/interfaces/amount-category-usecases-interfaces";
import { TESTServerInstanceType } from "./index.spec";

import { AmountCategoryController } from "../../amount-category-controller";
import { UpError } from "../../../errors/up-error";

export function AmountCategoryControllerDeleteTest(serverInstance: TESTServerInstanceType) {
   const unusedUsecase = null
   const usecase: IDeleteAmountCategoryUseCase = {
      execute(): Promise<void> {
         return Promise.resolve()
      },
   }

   describe('delete', () => {
      test('must pass', () => {
         const usecaseClone = { ...usecase }
   
         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecaseClone
         )  
         
         serverInstance.request.params = { id: 'id_test' }
         
         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toBe(204)
         }).not.toThrow()
      })

      test('should return an id variable even if it does not exist',  () => {
         const usecaseClone = { ...usecase }

         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecaseClone
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

         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecaseClone
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

         const controller = new AmountCategoryController(
            unusedUsecase as any, 
            unusedUsecase as any, 
            usecaseClone
         )

         expect(async () => {
            await controller.delete(serverInstance.request, serverInstance.response)
            expect(serverInstance.getResponse.status).toBe(500)
         }).not.toThrow()
      })
   })
}