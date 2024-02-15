import { z } from "zod";

import { HEXCodeRegex, RGBCodeRegex } from "../regex";
import { messages } from "./messages";

const itemCategoryVariables = {
   name: z.string()
      .min(1, messages.REQUIRED.EN)
      .min(3, messages.MAX_LENGTH(3).EN)
      .max(16, messages.MIN_LENGTH(16).EN),
   color: z.string()
      .refine((color) => {
         return RGBCodeRegex.test(color) || HEXCodeRegex.test(color)
      }, messages.REGEX("not is a HEX or RGB code").EN),
   id: z.string()
      .min(1, messages.REQUIRED.EN)
      .uuid(messages.UUID.EN),
   createdAt: z.date(),
}

export const ItemCategoryDTOGetSchema = z.object({
   id: itemCategoryVariables.id
})

export const ItemCategoryDTOPostSchema = z.object({
   name: itemCategoryVariables.name,
   color: itemCategoryVariables.color
})

export const ItemCategoryDTODeleteSchema = z.object({
   id: itemCategoryVariables.id
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
export type ItemCategoryResponseSchemaType = z.infer<typeof ItemCategoryResponseSchema>