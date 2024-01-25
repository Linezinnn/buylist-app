import { describe, test, expect } from 'vitest'
import { randomUUID } from 'crypto'
import { ZodError } from 'zod'

import { ItemCategoryDTOGetSchema } from '../item-category-schema'

export function TESTItemCategoryDTOGetSchema() {
   const uuid = randomUUID()
   const testData = { id: uuid }

   describe('item category dto get schema', () => {
      test('the validation needs to pass', () => {
         const validatedData = ItemCategoryDTOGetSchema.parse(testData)
         expect(validatedData).toStrictEqual({ id: uuid })
      })
   
      test('unable to pass because ID is invalid', () => {
         let testDataClone = { ...testData }
         testDataClone.id = 'invalid_id' as any
   
         expect(() => {
            try {
               ItemCategoryDTOGetSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("This uuid is invalid")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   })
}