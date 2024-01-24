import { describe, test, expect } from 'vitest'
import { ZodError } from 'zod'
import { randomUUID } from 'crypto'

import { AmountCategoryResponseSchema } from '../amount-category-schema'

export function TESTAmountCategoryResponseSchema() {
   const uuid = randomUUID()
   const date = new Date()
   const testData = {
      name: 'teste',
      id: uuid,
      createdAt: date,
   }

   describe('amount category response schema', () => {
      test('validation needs to pass', () => {
         const validatedData = AmountCategoryResponseSchema.parse(testData)

         expect(validatedData).toHaveProperty('name', 'teste')
         expect(validatedData).toHaveProperty('id', uuid)
      })

      test('cannot pass because have a name with numbers', () => {
         let testDataClone = { ...testData }
         testDataClone.name = 'teste2'

         expect(() => {
            try {
               AmountCategoryResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The name must not contain a number in the string")

                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('cannot pass because name is less than 1 character', () => {
         let testDataClone = { ...testData }
         testDataClone.name = ''

         expect(() => {
            try {
               AmountCategoryResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The minimum name length is 1")

                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('cannot pass because name has more than 1 character', () => {
         let testDataClone = { ...testData }
         testDataClone.name = 'this_text_is_long'

         expect(() => {
            try {
               AmountCategoryResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The maximum name length is 6")

                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('cannot pass because it does not have an id', () => {
         const testData = {
            name: 'teste',
            createdAt: date,
         }

         expect(() => {
            try {
               AmountCategoryResponseSchema.parse(testData)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("Required")

                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('cannot pass because it does not have a name', () => {
         const testData = {
            id: uuid,
            createdAt: date,
         }

         expect(() => {
            try {
               AmountCategoryResponseSchema.parse(testData)     
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("Required")

                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('cannot pass because it does not have a valid date', () => {
         let testDataClone = { ...testData }
         testDataClone.createdAt = 'any_value' as any

         expect(() => {
            try {
               AmountCategoryResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("Expected date, received string")

                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   })
}