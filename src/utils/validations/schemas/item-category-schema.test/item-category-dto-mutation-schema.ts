import { describe, test, expect } from "vitest";
import { ZodError } from "zod";

import { ItemCategoryDTOMutationSchema } from "../item-category-schema";

export function TESTItemCategoryDTOMutationSchema() {
   const testData = {
      name: 'item_category',
      color: '#121212',
   }

   describe('item category dto mutation schema', () => {
      test('validation needs to pass', () => {
         const validatedData = ItemCategoryDTOMutationSchema.parse(testData)
   
         expect(validatedData).toHaveProperty('name', 'item_category')
         expect(validatedData).toHaveProperty('color', '#121212')
      })
   
      test('the name cannot have a name length greater than 30 characters', () => {
         const testDataClone = { ...testData }
         testDataClone.name = 'this_name_have_a_length_greater_than_30_characters'
   
         expect(() => {
            try {
               ItemCategoryDTOMutationSchema.parse(testDataClone)
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
               ItemCategoryDTOMutationSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The minimum name length is 3")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   
      describe('the color must be a HEX or RGB code', () => {
         const testDataClone = { ...testData }
   
         test('RGB', () => {
            testDataClone.color = 'rgb(255,255,255)'
            const validatedData = ItemCategoryDTOMutationSchema.parse(testDataClone)
   
            expect(validatedData).toHaveProperty('color', 'rgb(255,255,255)')
         })
   
         test('HEX', () => {
            testDataClone.color = '#FFF'
            const validatedData = ItemCategoryDTOMutationSchema.parse(testDataClone)
   
            expect(validatedData).toHaveProperty('color', '#FFF')
         })
      })
   
      test('color cannot be a code other than HEX or RGB', () => {
         const testDataClone = { ...testData }
         testDataClone.color = 'hsl(0, 100%, 50%)'
   
         expect(() => {
            try {
               ItemCategoryDTOMutationSchema.parse(testDataClone)
            } catch (error) {
               if(error instanceof ZodError){
                  const { message } = error.issues[0]
                  expect(message).toEqual("The color must be a valid HEX, RGB, or HSL code")
   
                  throw 'test pass' 
               }
            }
         }).toThrow('test pass')
      })
   })
}
