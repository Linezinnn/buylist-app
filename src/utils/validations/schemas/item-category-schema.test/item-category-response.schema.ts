import { describe, test, expect } from "vitest";
import { randomUUID } from "crypto";
import { ZodError } from "zod";

import { ItemCategoryResponseSchema } from "../item-category-schema";

export function TESTItemCategoryResponseSchema() {
   const uuid = randomUUID()
   const createdAt = new Date()
   const testData = {
      name: 'name_test',
      color: '#FFF',
      id: uuid,
      createdAt,
   }
   
   describe('item category response schema', () => {
      test('the validation needs to pass', () => {
         const validatedData = ItemCategoryResponseSchema.parse(testData)
   
         expect(validatedData).toHaveProperty('name', 'name_test')
         expect(validatedData).toHaveProperty('color', '#FFF')
         expect(validatedData).toHaveProperty('id', uuid)
         expect(validatedData).toHaveProperty('createdAt', createdAt)
      })
   
      test('the name cannot have a name length greater than 30 characters', () => {
         const testDataClone = { ...testData }
         testDataClone.name = 'this_name_have_a_length_greater_than_30_characters'
   
         expect(() => {
            try {
               ItemCategoryResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The maximum name length is 30")
   
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
               ItemCategoryResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The minimum name length is 3")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   
      describe('The color must be a HEX code', () => {
         test('correct value', () => {
            const validatedData = ItemCategoryResponseSchema.parse(testData)
   
            expect(validatedData).toHaveProperty('color', '#FFF')
         })
   
         const testDataClone = { ...testData }
         testDataClone.color = 'hsl(0, 100%, 50%)'
   
         test('incorrect value', () => {
            expect(() => {
               try {
                  ItemCategoryResponseSchema.parse(testDataClone)
               } catch (error) {
                  if(error instanceof ZodError){
                     const { message } = error.issues[0]
                     expect(message).toEqual("The color must be a HEX code")
      
                     throw 'test pass' 
                  }
               }
            }).toThrow('test pass')
         })
      })
   
      test('unable to pass because ID is invalid', () => {
         let testDataClone = { ...testData }
         testDataClone.id = 'invalid_id' as any
   
         expect(() => {
            try {
               ItemCategoryResponseSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("This uuid is invalid")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   
      test('cannot pass because the date is not valid', () => {
         let testDataClone = { ...testData }
         testDataClone.createdAt = 'incorrect_date' as any
   
         expect(() => {
               ItemCategoryResponseSchema.parse(testDataClone)
         }).toThrow(ZodError)
      })
   })
}
