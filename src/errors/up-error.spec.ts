import { describe, expect, test } from 'vitest'
import { UpError } from './up-error'

describe('up error', () => {
   test('must be a valid error', () => {
      const error = new UpError({
         message: 'Test',
         error: { details: 'Test' },
         statusCode: 400
      })

      expect(error).toHaveProperty('error', { details: 'Test' })
      expect(error).toHaveProperty('statusCode', 400)
      expect(error).toHaveProperty('message', 'Test')
   })

   test('the error must be correctly thrown', () => {
      expect(() => {
         throw new UpError({
            message: 'Test',
            error: { details: 'Test' },
            statusCode: 400
         })
      }).toThrow(UpError)
   })

   test('must be possible throw an error without status code and error details', () => {
      const error = new UpError({
         message: 'Test',
      })

      expect(error).toHaveProperty('message', 'Test')
      expect(error).toHaveProperty('error', undefined)
      expect(error).toHaveProperty('statusCode', undefined)
   })
})