import { describe, test, expect } from 'vitest'
import { Database } from './prisma-client'

describe('database', () => {
   test('must connect database client', async () => {
      await Database.connect()
      expect(Database.isConnected).toEqual(true)
   })
})