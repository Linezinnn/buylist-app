import { describe, test, expect } from "vitest";
import { randomUUID } from "crypto";
import { ZodError } from "zod";

import { ItemCategoryResponseSchema } from "../item-category-schema";
import { ItemResponseSchema } from "../item-schema";

export function TESTItemResponseSchema() {
   const uuid = randomUUID()
   const date = new Date()
   const testData = {
      name: 'name_test',
      amount: 200,
      isChecked: false,
      amountCategoryId: uuid,
      itemCategoryId: uuid,
      id: uuid,
      createdAt: date,
      updatedAt: date,
   }
   
   describe('item response schema', () => {
      test('the validation needs to pass', () => {
         const validatedData = ItemResponseSchema.parse(testData)
   
         expect(validatedData).toHaveProperty('name', 'NAME_TEST')
         expect(validatedData).toHaveProperty('amount', 200)
         expect(validatedData).toHaveProperty('isChecked', false)
         expect(validatedData).toHaveProperty('amountCategoryId', uuid)
         expect(validatedData).toHaveProperty('itemCategoryId', uuid)
         expect(validatedData).toHaveProperty('id', uuid)
         expect(validatedData).toHaveProperty('createdAt', date)
         expect(validatedData).toHaveProperty('updatedAt', date)
      })
   
      test('the name cannot have a name length greater than 30 characters', () => {
         const testDataClone = { ...testData }
         testDataClone.name = 'this_name_have_a_length_greater_than_30_characters'
   
         expect(() => {
            try {
               ItemResponseSchema.parse(testDataClone)
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
               ItemResponseSchema.parse(testDataClone)
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
               ItemResponseSchema.parse(testDataClone)
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
               ItemResponseSchema.parse(testDataClone)
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
               ItemResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The maximium amount is 100.000")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
      
      test('cannot pass because the date is not valid', () => {
         let testDataClone = { ...testData }
         testDataClone.createdAt = 'incorrect_date' as any
   
         expect(() => {
               ItemResponseSchema.parse(testDataClone)
         }).toThrow(ZodError)
      })
   })
}
