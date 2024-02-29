import { z } from "zod";

import { HEXCodeRegex, RGBCodeRegex } from "../regex";
import { messages } from "./messages";

const itemCategoryVariables = {
   name: z.string()
      .min(1, messages.REQUIRED.PT)
      .min(3, messages.MIN_LENGTH(3).PT)
      .max(16, messages.MAX_LENGTH(16).PT),
   color: z.string()
      .refine((color) => {
         return RGBCodeRegex.test(color) || HEXCodeRegex.test(color)
      }, messages.REGEX("not is a HEX or RGB code").PT),
   id: z.string()
      .min(1, messages.REQUIRED.PT)
      .uuid(messages.UUID.PT),
   createdAt: z.date(),
   skipChecks: z.boolean(),
}

export const ItemCategoryDTOGetSchema = z.object({
   id: itemCategoryVariables.id,
})

export const ItemCategoryDTOPostSchema = z.object({
   name: itemCategoryVariables.name,
   color: itemCategoryVariables.color,
})

export const ItemCategoryDTODeleteSchema = z.object({
   id: itemCategoryVariables.id,
   skipChecks: itemCategoryVariables.skipChecks,
})

export const ItemCategoryDTODeleteOptionsSchema = z.object({
   skipChecks: itemCategoryVariables.skipChecks,
})

export const ItemCategoryResponseSchema = z.object({
   name: itemCategoryVariables.name,
   color: itemCategoryVariables.color,
   id: itemCategoryVariables.id,
   createdAt: itemCategoryVariables.createdAt,
})

export type ItemCategoryDTOGetSchemaType = z.infer<typeof ItemCategoryDTOGetSchema>
export type ItemCategoryDTOPostSchemaType = z.infer<typeof ItemCategoryDTOPostSchema>
export type ItemCategoryDTODeleteSchemaType = z.infer<typeof ItemCategoryDTODeleteSchema>
export type ItemCategoryDTODeleteOptionsSchemaType = z.infer<typeof ItemCategoryDTODeleteOptionsSchema>
export type ItemCategoryResponseSchemaType = z.infer<typeof ItemCategoryResponseSchema>