import { boolean, date, number, string, z } from "zod";

export const ItemDTOMutationSchema = z.object({
   name: string()
      .max(30, 'The maximium name length is 30')
      .min(3, 'The minimum name length is 3')
      .transform(name => {
         return name.toUpperCase()
      }),
   amountCategoryId: string().uuid('This uuid is invalid'),
   itemCategoryId: string().uuid('This uuid is invalid'),
   amount: number()
      .max(100000, 'The maximium amount is 100.000')
      .min(1, 'The minimum amount is 1')
})

export const ItemDTOGetSchema = z.object({
   id: string().uuid('This uuid is invalid')
})

export const ItemResponseSchema = z.object({
   name: string()
      .max(30, 'The maximium name length is 30')
      .min(3, 'The minimum name length is 3')
      .transform(name => {
         return name.toUpperCase()
      }),
   amount: number()
      .max(100000, 'The maximium amount is 100.000')
      .min(1, 'The minimum amount is 1'),
   isChecked: boolean(),
   amountCategoryId: string().uuid('This uuid is invalid'),
   itemCategoryId: string().uuid('This uuid is invalid'),
   id: string().uuid('This uuid is invalid'),
   createdAt: date(),
   updatedAt: date(),
})

export type ItemDTOMutationSchemaType = z.infer<typeof ItemDTOMutationSchema>
export type ItemDTOGetSchemaType = z.infer<typeof ItemDTOGetSchema>
export type ItemResponseSchemaType = z.infer<typeof ItemResponseSchema>