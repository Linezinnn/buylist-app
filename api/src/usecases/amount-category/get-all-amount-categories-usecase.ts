import { IAmountCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { AmountCategoryResponseType } from "../../types/amount-category-types";
import { IGetAllAmountCategoriesUsecase } from "../amount-category/interfaces/amount-category-usecases-interfaces";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { AmountCategoryResponseSchema } from "../../packages/@buylist-api/schemas/amount-category-schema";

export class GetAllAmountCategoriesUsecase implements IGetAllAmountCategoriesUsecase {
   constructor(
      private repository: IAmountCategoryRepository
   ) {}

   async execute(): Promise<AmountCategoryResponseType[]> {
      const allAmountCategories = await this.repository.getAll()

      allAmountCategories.map(amountCategory => {
         validateFunction({
            schema: AmountCategoryResponseSchema,
            data: amountCategory,
         })
      })
      
      return allAmountCategories
   }
}