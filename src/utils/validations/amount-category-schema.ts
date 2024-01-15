import { date, string, z } from 'zod'

export const AmountCategorySchema = z.object({
   name: string()
      .max(6, 'The maximum name length is 6'),
   id: string().optional(),
   createdAt: date().optional(),
})

export type AmountCategorySchemaType = z.infer<typeof AmountCategorySchema>
