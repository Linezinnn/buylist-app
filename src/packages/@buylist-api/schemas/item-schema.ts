import { z } from "zod"

import { AmountCategoryResponseSchema } from "./amount-category-schema"
import { ItemCategoryResponseSchema } from "./item-category-schema"

import { messages } from "./messages"

const itemVariables = {
   name: z.string()
      .min(1, messages.REQUIRED.EN)
      .min(3, messages.MAX_LENGTH(3).EN)
      .max(30, messages.MIN_LENGTH(30).EN)
      .transform(name => {
         return name.toUpperCase()
      }),
   amount: z.number()
      .min(1, messages.MAX_LENGTH(1).EN)
      .max(100000, messages.MIN_LENGTH(100.000).EN),
   amountCategoryId: z.string()
      .min(1, messages.REQUIRED.EN)
      .uuid(messages.UUID.EN),
   itemCategoryId: z.string()
      .min(1, messages.REQUIRED.EN)
      .uuid(messages.UUID.EN),
   id: z.string()
      .min(1, messages.REQUIRED.EN)
      .uuid(messages.UUID.EN),
   isChecked: z.boolean(),
   createdAt: z.date(),
   updatedAt: z.date(),
}

export const ItemDTOGetSchema = z.object({
   id: itemVariables.id
})

export const ItemDTOPostSchema = z.object({
   name: itemVariables.name,
   amount: itemVariables.amount,
   amountCategoryId: itemVariables.amountCategoryId,
   itemCategoryId: itemVariables.itemCategoryId,
})

export const ItemDTOUpdateSchema = z.object({
   name: itemVariables.name.optional(),
   amount: itemVariables.amount.optional(),
   amountCategoryId: itemVariables.amountCategoryId.optional(),
   itemCategoryId: itemVariables.itemCategoryId.optional(),
}) 

export const ItemDTOCheckSchema = z.object({
   isChecked: itemVariables.isChecked
})

export const ItemDTODeleteSchema = z.object({
   id: itemVariables.id,
})

export const ItemResponseSchema = z.object({
   name: itemVariables.name,
   amount: itemVariables.amount,
   isChecked: itemVariables.isChecked,
   id: itemVariables.id,
   createdAt: itemVariables.createdAt,
   updatedAt: itemVariables.updatedAt,
   amountCategory: AmountCategoryResponseSchema,
   itemCategory: ItemCategoryResponseSchema,
})

export type ItemDTOGetSchemaType = z.infer<typeof ItemDTOGetSchema>
export type ItemDTOPostSchemaType = z.infer<typeof ItemDTOPostSchema>
export type ItemDTOUpdateSchemaType = z.infer<typeof ItemDTOUpdateSchema>
export type ItemDTOCheckSchemaType = z.infer<typeof ItemDTOCheckSchema>
export type ItemDTODeleteSchemaType = z.infer<typeof ItemDTODeleteSchema>
export type ItemResponseSchemaType = z.infer<typeof ItemResponseSchema>