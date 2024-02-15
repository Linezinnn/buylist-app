import { statusCode } from "../../constants/http-status-codes";

import { IAmountCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { AmountCategoryDTOPostType, AmountCategoryResponseType } from "../../types/amount-category-types";
import { ICreateAmountCategoryUseCase } from "../amount-category/interfaces/amount-category-usecases-interfaces";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { AmountCategoryDTOPostSchema, AmountCategoryResponseSchema } from "../../packages/@buylist-api/schemas/amount-category-schema";

export class CreateAmountCategoryUseCase implements ICreateAmountCategoryUseCase {
   constructor(
      private repository: IAmountCategoryRepository
   ) {}

   async execute(data: AmountCategoryDTOPostType): Promise<AmountCategoryResponseType> {
      const validatedData = validateFunction({
         schema: AmountCategoryDTOPostSchema,
         data,
      })

      const checkIfNameAlreadyExists = await this.repository.getByName(validatedData.name) 

      if(checkIfNameAlreadyExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: 'Bad Request: The name already exists'
         })
      }
      
      const amountCategory = await this.repository.create(validatedData)

      const amountCategoryValidated = validateFunction({
         schema: AmountCategoryResponseSchema,
         data: amountCategory
      })

      return amountCategoryValidated
   }
}