import { z } from 'zod'

import { StringNotContainsANumberRegex } from '../regex'
import { messages } from './messages'

const amountCategoryVariables = {
   name: z.string()
      .min(1, messages.REQUIRED.PT)
      .min(1, messages.MIN_LENGTH(1).PT)
      .max(16, messages.MAX_LENGTH(16).PT)
      .regex(StringNotContainsANumberRegex, messages.REGEX("cannot contain numbers").PT),
   id: z.string()
      .min(1, messages.REQUIRED.PT)
      .uuid(messages.UUID.PT),
   createdAt: z.date(),
   skipChecks: z.boolean(),
}

export const AmountCategoryDTOGetSchema = z.object({
   id: amountCategoryVariables.id,
})

export const AmountCategoryDTOPostSchema = z.object({
   name: amountCategoryVariables.name,
})

export const AmountCategoryDTODeleteSchema = z.object({
   id: amountCategoryVariables.id,
   skipChecks: amountCategoryVariables.skipChecks,
})

export const AmountCategoryDTODeleteOptionsSchema = z.object({
   skipChecks: amountCategoryVariables.skipChecks,
})

export const AmountCategoryResponseSchema = z.object({
   name: amountCategoryVariables.name,
   id: amountCategoryVariables.id,
   createdAt: amountCategoryVariables.createdAt,
})

export type AmountCategoryDTOGetSchemaType = z.infer<typeof AmountCategoryDTOGetSchema>
export type AmountCategoryDTOPostSchemaType = z.infer<typeof AmountCategoryDTOPostSchema>
export type AmountCategoryDTODeleteSchemaType = z.infer<typeof AmountCategoryDTODeleteSchema>
export type AmountCategoryDTODeleteOptionsSchemaType = z.infer<typeof AmountCategoryDTODeleteOptionsSchema>
export type AmountCategoryResponseSchemaType = z.infer<typeof AmountCategoryResponseSchema>
