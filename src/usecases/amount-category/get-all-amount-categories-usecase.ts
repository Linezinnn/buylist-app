import { IAmountCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { AmountCategoryType } from "../../types/amount-category-types";
import { IGetAllAmountCategoriesUsecase } from "../amount-category/interfaces/amount-category-usecases-interfaces";

import { AmountCategoryResponseSchema } from "../../utils/validations/schemas/amount-category-schema";
import { validateFunction } from "../../utils/validations/zod-validate-function";

export class GetAllAmountCategoriesUsecase implements IGetAllAmountCategoriesUsecase {
   constructor(
      private repository: IAmountCategoryRepository
   ) {}

   async execute(): Promise<AmountCategoryType[]> {
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