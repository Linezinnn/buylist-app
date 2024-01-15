import { RouteParamsType } from ".";
import { prismaClient } from "../database/prisma-client";
import { AmountCategorySchema } from "../utils/validations/amount-category-schema";

export function CreateAmountCategoryRoute({ serverInstance, prefix }: RouteParamsType) {
   serverInstance.post(prefix, async (request, response) => {
      const AmountCategory = AmountCategorySchema.parse(request.body)

      try {
         const result = await prismaClient.amountCategory.create({
            data: {
               name: AmountCategory.name
            }
         })

         response
         .send(result)
         .status(201)
         .header('location', `/amount-category/${result.id}`)
      } catch (error) {
         response
         .send(null)
         .status(400)
      }
      
   })
}
