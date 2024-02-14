import { describe, expect, test } from 'vitest'
import { ZodError } from 'zod'
import { randomUUID } from 'crypto'

import { AmountCategoryDTOSchema } from '../amount-category-schema'

export function TESTAmountCategoryDTOSchema() {
   const uuid = randomUUID()
   const testData = {
      name: 'teste',
      id: uuid
   }

   describe('amount category dto schema', () => {
      test('validation needs to pass', () => {
         const validatedData = AmountCategoryDTOSchema.parse(testData)

         expect(validatedData).toHaveProperty('name', 'teste')
         expect(validatedData).toHaveProperty('id', uuid)
      })

      test('cannot pass because have a name with numbers', () => {
         const testDataClone = { ...testData }
         testDataClone.name = 'teste2'

         expect(() => {
            try {
               AmountCategoryDTOSchema.parse(testDataClone)
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
         const testDataClone = { ...testData }
         testDataClone.name = ''

         expect(() => {
            try {
               AmountCategoryDTOSchema.parse(testDataClone)   
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
         const testDataClone = { ...testData }
         testDataClone.name = 'this_text_is_long'

         expect(() => {
            try {
               AmountCategoryDTOSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The maximum name length is 6")

                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('must have at least a name', () => {
         const testData = {
            name: 'teste'
         }

         const validatedData = AmountCategoryDTOSchema.parse(testData)
         expect(validatedData).toHaveProperty('name', 'teste')
      })
   
      test('must have at least an id', () => {
         const testData = {
            id: uuid
         }

         const validatedData = AmountCategoryDTOSchema.parse(testData)
         expect(validatedData).toHaveProperty('id', uuid)
      })
   })
}
