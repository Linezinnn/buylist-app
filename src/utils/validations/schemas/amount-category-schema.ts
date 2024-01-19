import { date, string, z } from 'zod'

export const AmountCategoryDTOSchema = z.object({
   name: string()
      .regex(/^[^\d]*$/, "The name must not contain a number in the string")
      .min(1, 'The minimum name length is 1')
      .max(6, 'The maximum name length is 6')
      .optional(),
   id: string().optional(),
})

export const AmountCategoryResponseSchema = z.object({
   name: string()
      .regex(/^[^\d]*$/, "The name must not contain a number in the string")
      .min(1, 'The minimum name length is 1')
      .max(6, 'The maximum name length is 6'),
   id: string(),
   createdAt: date(),
})

export type AmountCategoryDTOSchemaType = z.infer<typeof AmountCategoryDTOSchema>
export type AmountCategoryResponseSchemaType = z.infer<typeof AmountCategoryResponseSchema>
