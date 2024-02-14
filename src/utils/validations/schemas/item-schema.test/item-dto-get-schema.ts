import { describe, test, expect } from 'vitest'
import { randomUUID } from 'crypto'
import { ZodError } from 'zod'

import { ItemDTOGetSchema } from '../item-schema'

export function TESTItemDTOGetSchema() {
   const uuid = randomUUID()
   const testData = { id: uuid }

   describe('item dto get schema', () => {
      test('the validation needs to pass', () => {
         const validatedData = ItemDTOGetSchema.parse(testData)
         expect(validatedData).toStrictEqual({ id: uuid })
      })
   
      test('unable to pass because ID is invalid', () => {
         let testDataClone = { ...testData }
         testDataClone.id = 'invalid_id' as any
   
         expect(() => {
            try {
               ItemDTOGetSchema.parse(testDataClone)
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