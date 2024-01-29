import { statusCode } from "../../constants/http-status-codes";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IGetItemCategoryByIdUseCase } from "./interfaces/item-category-usecase-interfaces";
import { ItemCategoryType } from "../../types/item-category-types";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemCategoryDTOGetSchema, ItemCategoryResponseSchema } from "../../utils/validations/schemas/item-category-schema";

export class GetItemCategoryByIdUseCase implements IGetItemCategoryByIdUseCase {
   constructor(
      private repository: IItemCategoryRepository
   ) {}

   async execute(id: string): Promise<ItemCategoryType> {
      const { id: idValidated } = validateFunction({
         schema: ItemCategoryDTOGetSchema,
         data: { id },
      })

      const itemCategory = await this.repository.getById(idValidated)
      
      if(!itemCategory) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: 'Not found: The item category with this id does not exists'
         })
      }

      const itemCategoryValidated = validateFunction({
         schema: ItemCategoryResponseSchema,
         data: itemCategory
      })

      return itemCategoryValidated
   }
}