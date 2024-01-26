import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IGetAllItemCategoriesUseCase } from "./interfaces/item-category-usecase-interfaces";
import { ItemCategoryType } from "../../types/item-category-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemCategoryResponseSchema } from "../../utils/validations/schemas/item-category-schema";

export class GetAllItemCategoriesUsecase implements IGetAllItemCategoriesUseCase {
   constructor(
      private repository: IItemCategoryRepository
   ) {}

   async execute(): Promise<ItemCategoryType[]> {
      const allItemCategories = await this.repository.getAll()

      allItemCategories.map(itemCategory => {
         validateFunction({
            schema: ItemCategoryResponseSchema,
            data: itemCategory,
         })
      })
      
      return allItemCategories
   }
   
}