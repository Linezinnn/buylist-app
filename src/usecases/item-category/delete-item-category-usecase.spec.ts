import { describe, test, expect } from "vitest";
import { randomUUID } from "crypto";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";

import { DeleteItemCategoryUseCase } from "./delete-item-category-usecase";
import { UpError } from "../../errors/up-error";

describe('delete item category usecase', () => {
   const repository: Partial<IItemCategoryRepository> = {
      delete(): Promise<boolean>{
         return Promise.resolve(true)
      }
   }

   test('must pass', () => {
      const repositoryClone = { ...repository }

      const usecase = new DeleteItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(() => {
         usecase.execute(randomUUID())
      }).not.toThrow()
   })

   test('cannot pass if the id is invalid', () => {
      const repositoryClone = { ...repository }

      const usecase = new DeleteItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute('id_invalido')
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the amount category not exists with this id', () => {
      const repositoryClone = { ...repository }

      repository.delete = (id: string): Promise<boolean> => Promise.resolve(false)

      const usecase = new DeleteItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute('id_invalido')
      }).rejects.toThrow(UpError)
   })
})