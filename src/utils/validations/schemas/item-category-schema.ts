import { date, string, z } from "zod";

import { HEXCodeRegex, RGBCodeRegex } from "../../regex";

export const ItemCategoryDTOMutationSchema = z.object({
   name: string()
      .max(30, 'The maximium name length is 30')
      .min(3, 'The minimum name length is 3'),
   color: string()
      .refine((color) => {
         return RGBCodeRegex.test(color) || HEXCodeRegex.test(color)
      }, 'The color must be a valid HEX or RGB code')
})

export const ItemCategoryDTOGetSchema = z.object({
   id: string().uuid('This uuid is invalid')
})

export const ItemCategoryResponseSchema = z.object({
   name: string()
      .min(3, 'The minimum name length is 3')
      .max(30, 'The maximum name length is 30'),
   color: string()
      .regex(HEXCodeRegex, 'The color must be a HEX code'),
   id: string().uuid('This uuid is invalid'),
   createdAt: date(),
})

export type ItemCategoryDTOMutationSchemaType = z.infer<typeof ItemCategoryDTOMutationSchema>
export type ItemCategoryDTOGetSchemaType = z.infer<typeof ItemCategoryDTOGetSchema>
export type ItemCategoryResponseSchemaType = z.infer<typeof ItemCategoryResponseSchema>