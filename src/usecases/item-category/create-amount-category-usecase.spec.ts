import { describe, expect, test } from "vitest";
import { randomUUID } from "crypto";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";

import { UpError } from "../../errors/up-error";
import { CreateItemCategoryUseCase } from "./create-item-category-usecase";

describe('create item category usecase', () => {
   const createdAt = new Date()
   const uuid = randomUUID()

   const repository: Partial<IItemCategoryRepository> = {
      create(name) {
         return Promise.resolve({
            name: name,
            color: '#fff',
            id: uuid,
            createdAt,
         })
      },
      getByName(name) {
         return Promise.resolve(null)
      },
   }

   test('must pass', async () => {
      const usecase = new CreateItemCategoryUseCase(repository as IItemCategoryRepository)

      const result = await usecase.execute({ name: 'test', color: '#fff' })

      expect(result).toStrictEqual({
         name: 'test',
         color: '#fff',
         id: uuid,
         createdAt,
      })
   })

   test('cannot pass if name already exists', () => {
      let repositoryClone = { ...repository }

      repositoryClone.getByName = (name) => Promise.resolve({
         name: name,
         color: '#fff',
         id: uuid,
         createdAt,
      })

      const usecase = new CreateItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute({ name: 'test', color: '#fff' })
      }).rejects.toThrow(UpError)
   })

   test('should throw an error if the database schema is invalid', () => {
      const repositoryClone = { ...repository }

      repositoryClone.create = (name): any => Promise.resolve({
         name: name,
      })

      const usecase = new CreateItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         await usecase.execute({ name: 'test', color: '#fff' })
      }).rejects.toThrow(UpError)
   })

   test('cannot pass because the name has less than 3 character', () => {
      const repositoryClone = { ...repository }

      const usecase = new CreateItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         try {
            await usecase.execute({ name: '', color: '#fff' })
         } catch (error) {
            if(error instanceof UpError) {
               expect(error.message).toBe('The minimum name length is 3')
            }
   
            throw 'test pass'
         }
      }).rejects.toThrow('test pass')
   })

   test('cannot pass because the name has more than 30 character', () => {
      const repositoryClone = { ...repository }

      const usecase = new CreateItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         try {
            await usecase.execute({ name: 'this_text_has_to_more_at_30_characters', color: '#fff' })
         } catch (error) {
            if(error instanceof UpError) {
               expect(error.message).toBe('The maximium name length is 30')
            }
   
            throw 'test pass'
         }
      }).rejects.toThrow('test pass')
   })

   test('cannot pass because the color is not a HEX or RGB color', () => {
      const repositoryClone = { ...repository }

      const usecase = new CreateItemCategoryUseCase(repositoryClone as IItemCategoryRepository)

      expect(async () => {
         try {
            await usecase.execute({ name: 'test', color: 'hsl(100%, 0%, 53%)' })
         } catch (error) {
            if(error instanceof UpError) {
               expect(error.message).toBe('The color must be a valid HEX, RGB, or HSL code')
            }
   
            throw 'test pass'
         }
      }).rejects.toThrow('test pass')
   })
})