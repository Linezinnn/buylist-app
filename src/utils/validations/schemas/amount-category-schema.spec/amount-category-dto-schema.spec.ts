import { describe, expect, test } from 'vitest'
import { ZodError } from 'zod'

import { AmountCategoryDTOSchema } from '../amount-category-schema'

export function TESTAmountCategoryDTOSchema() {
   describe('amount category dto schema', () => {
      test('validation needs to pass', () => {
         const testData = {
            name: 'teste',
            id: '1'
         }

         const validatedData = AmountCategoryDTOSchema.parse(testData)

         expect(validatedData).toHaveProperty('name', 'teste')
         expect(validatedData).toHaveProperty('id', '1')
      })

      test('cannot pass because have a name with numbers', () => {
         const testData = {
            name: 'teste2',
            id: '1'
         }

         expect(() => {
            try {
               AmountCategoryDTOSchema.parse(testData)
               
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
         const testData = {
            name: '',
            id: '1'
         }

         expect(() => {
            try {
               AmountCategoryDTOSchema.parse(testData)
               
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
         const testData = {
            name: 'este_texto_e_longo',
            id: '1'
         }

         expect(() => {
            try {
               AmountCategoryDTOSchema.parse(testData)
               
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
            id: '1'
         }

         const validatedData = AmountCategoryDTOSchema.parse(testData)

         expect(validatedData).toHaveProperty('id', '1')
      })
   })
}
