import { describe, expect, test } from "vitest";
import { randomUUID } from "crypto";

import { IAmountCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";

import { CreateAmountCategoryUseCase } from "./create-amount-category-usecase";
import { UpError } from "../../errors/up-error";

describe('create amount category usecase', () => {
   const createdAt = new Date()
   const uuid = randomUUID()

   const repository: Partial<IAmountCategoryRepository> = {
      create(name) {
         return Promise.resolve({
            name: name,
            id: uuid,
            createdAt,
         })
      },
      getByName(name) {
         return Promise.resolve(null)
      },
   }

   test('must pass', async () => {
      const repositoryClone = { ...repository }
      
      const usecase = new CreateAmountCategoryUseCase(repositoryClone as IAmountCategoryRepository)

      const result = await usecase.execute({ name: 'test' })

      expect(result).toStrictEqual({
         name: 'test',
         id: uuid,
         createdAt,
      })
   })

   test('cannot pass if name already exists', () => {
      const repositoryClone = { ...repository }

      repositoryClone.getByName = (name) => Promise.resolve({
         name: name,
         id: uuid,
         createdAt,
      })

      const usecase = new CreateAmountCategoryUseCase(repositoryClone as IAmountCategoryRepository)

      expect(async () => {
         await usecase.execute({ name: 'test' })
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.create = (name): any => Promise.resolve({
         name: name,
      })

      const usecase = new CreateAmountCategoryUseCase(repositoryClone as IAmountCategoryRepository)

      expect(async () => {
         await usecase.execute({ name: 'test' })
      }).rejects.toThrow(UpError)
   })

   test('cannot pass because name contains numbers', () => {
      const repositoryClone = { ...repository }

      const usecase = new CreateAmountCategoryUseCase(repositoryClone as IAmountCategoryRepository)

      expect(async () => {
         try {
            await usecase.execute({ name: 'test2' })
         } catch (error) {
            if(error instanceof UpError) {
               expect(error.message).toBe('The name must not contain a number in the string')
            }
   
            throw 'test pass'
         }
      }).rejects.toThrow('test pass')
   })

   test('cannot pass because it has less than 1 character', () => {
      const repositoryClone = { ...repository }

      const usecase = new CreateAmountCategoryUseCase(repositoryClone as IAmountCategoryRepository)

      expect(async () => {
         try {
            await usecase.execute({ name: '' })
         } catch (error) {
            if(error instanceof UpError) {
               expect(error.message).toBe('The minimum name length is 1')
            }
   
            throw 'test pass'
         }
      }).rejects.toThrow('test pass')
   })

   test('cannot pass because it has more than 6 character', () => {
      const repositoryClone = { ...repository }

      const usecase = new CreateAmountCategoryUseCase(repositoryClone as IAmountCategoryRepository)

      expect(async () => {
         try {
            await usecase.execute({ name: 'this_number_is_long' })
         } catch (error) {
            if(error instanceof UpError) {
               expect(error.message).toBe('The maximum name length is 6')
            }
   
            throw 'test pass'
         }
      }).rejects.toThrow('test pass')
   })
})