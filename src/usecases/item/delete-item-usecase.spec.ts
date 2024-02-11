import { describe, test, expect } from "vitest";
import { randomUUID } from "crypto";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";

import { DeleteItemUseCase } from "./delete-item-usecase";
import { UpError } from "../../errors/up-error";

describe('delete item usecase', () => {
   const repository: Partial<IItemRepository> = {
      delete(): Promise<boolean>{
         return Promise.resolve(true)
      }
   }

   test('must pass', () => {
      const usecase = new DeleteItemUseCase(repository as IItemRepository)

      expect(() => {
         usecase.execute(randomUUID())
      }).not.toThrow()
   })

   test('cannot pass if the id is invalid', () => {
      const usecase = new DeleteItemUseCase(repository as IItemRepository)

      expect(async () => {
         await usecase.execute('id_invalido')
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the item not exists with this id', () => {
      let repositoryClone = { ...repository }

      repositoryClone.delete = (id: string): Promise<boolean> => Promise.resolve(false)

      const usecase = new DeleteItemUseCase(repositoryClone as IItemRepository)

      expect(async () => {
         await usecase.execute('id_invalido')
      }).rejects.toThrow(UpError)
   })
})