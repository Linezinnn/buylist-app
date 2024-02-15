import { z } from 'zod'

import { StringNotContainsANumberRegex } from '../regex'
import { messages } from './messages'

const amountCategoryVariables = {
   name: z.string()
      .min(1, messages.REQUIRED.EN)
      .min(1, messages.MAX_LENGTH(1).EN)
      .max(16, messages.MIN_LENGTH(16).EN)
      .regex(StringNotContainsANumberRegex, messages.REGEX("cannot contain numbers").EN),
   id: z.string()
      .min(1, messages.REQUIRED.EN)
      .uuid(messages.UUID.EN),
   createdAt: z.date(),
}

export const AmountCategoryDTOGetSchema = z.object({
   id: amountCategoryVariables.id,
})

export const AmountCategoryDTOPostSchema = z.object({
   name: amountCategoryVariables.name,
})

export const AmountCategoryDTODeleteSchema = z.object({
   id: amountCategoryVariables.id,
})

export const AmountCategoryResponseSchema = z.object({
   name: amountCategoryVariables.name,
   id: amountCategoryVariables.id,
   createdAt: amountCategoryVariables.createdAt,
})

export type AmountCategoryDTOGetSchemaType = z.infer<typeof AmountCategoryDTOGetSchema>
export type AmountCategoryDTOPostSchemaType = z.infer<typeof AmountCategoryDTOPostSchema>
export type AmountCategoryDTODeleteSchemaType = z.infer<typeof AmountCategoryDTODeleteSchema>
export type AmountCategoryResponseSchemaType = z.infer<typeof AmountCategoryResponseSchema>
