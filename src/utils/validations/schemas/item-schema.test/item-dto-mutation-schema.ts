import { describe, test, expect } from "vitest";
import { ZodError } from "zod";
import { randomUUID } from "crypto";

import { ItemDTOMutationSchema } from "../item-schema";

export function TESTItemDTOMutationSchema() {
   const uuid = randomUUID()
   const testData = {
      name: 'item',
      amountCategoryId: uuid,
      itemCategoryId: uuid,
      amount: 200,
   }

   describe('item dto mutation schema', () => {
      test('validation needs to pass', () => {
         const validatedData = ItemDTOMutationSchema.parse(testData)
   
         expect(validatedData).toHaveProperty('name', 'ITEM')
         expect(validatedData).toHaveProperty('amountCategoryId', uuid)
         expect(validatedData).toHaveProperty('itemCategoryId', uuid)
         expect(validatedData).toHaveProperty('amount', 200)
      })
   
      test('the name cannot have a name length greater than 30 characters', () => {
         const testDataClone = { ...testData }
         testDataClone.name = 'this_name_have_a_length_greater_than_30_characters'
   
         expect(() => {
            try {
               ItemDTOMutationSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The maximium name length is 30")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   
      test('the name cannot have a name length at least than 3 characters', () => {
         const testDataClone = { ...testData }
         testDataClone.name = ''
   
         expect(() => {
            try {
               ItemDTOMutationSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The minimum name length is 3")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('unable to pass because ID is invalid', () => {
         let testDataClone = { ...testData }
         testDataClone.amountCategoryId = 'invalid_id' as any
   
         expect(() => {
            try {
               ItemDTOMutationSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("This uuid is invalid")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('the amount must be at least 1', () => {
         const testDataClone = { ...testData }
         testDataClone.amount = 0
   
         expect(() => {
            try {
               ItemDTOMutationSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The minimum amount is 1")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })

      test('the amount cannot be greater than 100.000', () => {
         const testDataClone = { ...testData }
         testDataClone.amount = 100001
   
         expect(() => {
            try {
               ItemDTOMutationSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The maximium amount is 100.000")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   })
}
