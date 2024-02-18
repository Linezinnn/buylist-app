import { statusCode } from "../../constants/http-status-codes";

import { IAmountCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteAmountCategoryUseCase } from "../amount-category/interfaces/amount-category-usecases-interfaces";

import { UpError } from "../../errors/up-error";

import { AmountCategoryDTODeleteType } from "../../types/amount-category-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { AmountCategoryDTODeleteSchema } from "../../packages/@buylist-api/schemas/amount-category-schema";

export class DeleteAmountCategoryUseCase implements IDeleteAmountCategoryUseCase {
   constructor(
      private repository: IAmountCategoryRepository
   ) {}

   async execute(data: AmountCategoryDTODeleteType): Promise<void> {
      const validatedId = validateFunction({
         schema: AmountCategoryDTODeleteSchema,
         data,
      })

      const amountCategory = await this.repository.delete(validatedId)
      
      if(!amountCategory) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }
   }
}