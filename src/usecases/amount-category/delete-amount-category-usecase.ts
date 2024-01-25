import { statusCode } from "../../constants/http-status-codes";

import { IAmountCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteAmountCategoryUseCase } from "../amount-category/interfaces/amount-category-usecases-interfaces";

import { UpError } from "../../errors/up-error";

import { AmountCategoryDTOSchema } from "../../utils/validations/schemas/amount-category-schema";
import { validateFunction } from "../../utils/validations/zod-validate-function";

export class DeleteAmountCategoryUseCase implements IDeleteAmountCategoryUseCase {
   constructor(
      private repository: IAmountCategoryRepository
   ) {}

   async execute(id: string): Promise<void> {
      const { id: idValidated } = validateFunction({
         schema: AmountCategoryDTOSchema,
         data: { id },
      })

      if(!idValidated) return

      const amountCategory = await this.repository.delete(idValidated)
      
      if(!amountCategory) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: 'Not found: The amount category with this id does not exists'
         })
      }
   }
}