import { describe, expect, test } from "vitest";
import { randomUUID } from "crypto";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";

import { UpError } from "../../errors/up-error";
import { GetItemByIdUseCase } from "./get-item-by-id-usecase";

describe('get item by id usecase', () => {
   const date = new Date()
   const uuid = randomUUID()

   const itemMock = {
      name: "TESTE",
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

   const repository: Partial<IItemRepository> = {
      getById(name) {
         return Promise.resolve(itemMock)
      },
   }

   test('must pass', async () => {
      const usecase = new GetItemByIdUseCase(repository as IItemRepository)

      const result = await usecase.execute(uuid)

      expect(result).toStrictEqual(itemMock)
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getById = (name): any => Promise.resolve({
         name: name,
      })

      const usecase = new GetItemByIdUseCase(repositoryClone as IItemRepository)

      expect(async () => {
         await usecase.execute(uuid)
      }).rejects.toThrow(UpError)
   })

   test('cannot pass if the id is invalid', () => {
      const usecase = new GetItemByIdUseCase(repository as IItemRepository)

      expect(async () => {
         await usecase.execute('id_invalido')
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the item category not exists with this id', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getById = (id: string) => Promise.resolve(null)

      const usecase = new GetItemByIdUseCase(repositoryClone as IItemRepository)

      expect(async () => {
         await usecase.execute(uuid)
      }).rejects.toThrow(UpError)
   })
})