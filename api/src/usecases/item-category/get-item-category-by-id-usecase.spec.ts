import { describe, expect, test } from "vitest";
import { randomUUID } from "crypto";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";

import { UpError } from "../../errors/up-error";
import { CreateItemCategoryUseCase } from "./create-item-category-usecase";
import { GetItemCategoryByIdUseCase } from "./get-item-category-by-id-usecase";

describe('get item category by id usecase', () => {
   const createdAt = new Date()
   const uuid = randomUUID()

   const repository: Partial<IItemCategoryRepository> = {
      getById(name) {
         return Promise.resolve({
            name: 'test',
            color: '#fff',
            id: uuid,
            createdAt,
         })
      },
   }

   test('must pass', async () => {
      const usecase = new GetItemCategoryByIdUseCase(repository as IItemCategoryRepository)

      const result = await usecase.execute(uuid)

      expect(result).toStrictEqual({
         name: 'test',
         color: '#fff',
         id: uuid,
         createdAt,
      })
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getById = (name): any => Promise.resolve({
         name: name,
      })

      const usecase = new GetItemCategoryByIdUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute(uuid)
      }).rejects.toThrow(UpError)
   })

   test('cannot pass if the id is invalid', () => {
      const repositoryClone = { ...repository }

      const usecase = new GetItemCategoryByIdUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute('id_invalido')
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the item category not exists with this id', () => {
      const repositoryClone = { ...repository }

      repository.delete = (id: string): Promise<boolean> => Promise.resolve(false)

      const usecase = new GetItemCategoryByIdUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute('id_invalido')
      }).rejects.toThrow(UpError)
   })
})