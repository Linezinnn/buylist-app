import { describe, test, expect } from 'vitest'
import { string, z } from 'zod'

import { validateFunction } from './zod-validate-function'
import { UpError } from '../../errors/up-error'

const testSchema = z.object({
   name: string()
})

describe('zod validate function', () => {
   test('validation needs to pass', () => {
      const valitedData = validateFunction({
         schema: testSchema,
         data: { name: 'Roberto' }
      })      

      expect(valitedData).toHaveProperty('name', 'Roberto')
   })

   test('validation cannot to pass', () => {
      expect(() => {
         validateFunction({
            schema: testSchema,
            data: { name: 12 }
         })     
      }).toThrow(UpError)
   })
})