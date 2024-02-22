import { describe, test, expect } from "vitest";
import { randomUUID } from "crypto";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";

import { DeleteItemUseCase } from "./delete-item-usecase";
import { UpError } from "../../errors/up-error";
import { ItemType } from "../../types/item-types";
import { CheckItemUseCase } from "./check-item-usecase";

describe('check item usecase', () => {
   const date = new Date()
   const uuid = randomUUID()
   const anotherUUID = randomUUID()

   const itemMock = {
      name: "TESTE",
      amount: 200,
      isChecked: true,
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
      checkItem(): Promise<ItemType | null>{
         return Promise.resolve(itemMock)
      }
   }

   test('must pass', () => {
      const usecase = new CheckItemUseCase(repository as IItemRepository)

      expect(async () => {
         const result = await usecase.execute(uuid, { checked: true })

         expect(result).toStrictEqual(itemMock)
      }).not.toThrow()
   })

   test('cannot pass if the id is invalid', () => {
      const usecase = new CheckItemUseCase(repository as IItemRepository)

      expect(async () => {
         await usecase.execute('id_invalido', { checked: true })
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the item not exists with this id', () => {
      let repositoryClone = { ...repository }

      repositoryClone.checkItem = () => Promise.resolve(null)

      const usecase = new CheckItemUseCase(repositoryClone as IItemRepository)

      expect(async () => {
         await usecase.execute(anotherUUID, { checked: true })
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.checkItem = (name): any => Promise.resolve({
         name: name,
      })

      const usecase = new CheckItemUseCase(repositoryClone as IItemRepository)

      expect(async () => {
         await usecase.execute(uuid, { checked: true })
      }).rejects.toThrow(UpError)
   })
})