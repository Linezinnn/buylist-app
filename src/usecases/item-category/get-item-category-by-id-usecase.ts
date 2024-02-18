import { statusCode } from "../../constants/http-status-codes";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IGetItemCategoryByIdUseCase } from "./interfaces/item-category-usecase-interfaces";
import { ItemCategoryDTOGetType, ItemCategoryResponseType } from "../../types/item-category-types";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemCategoryDTOGetSchema, ItemCategoryResponseSchema } from "../../packages/@buylist-api/schemas/item-category-schema";
import { responseMessages } from "../../packages/@buylist-api/response-messages";

export class GetItemCategoryByIdUseCase implements IGetItemCategoryByIdUseCase {
   constructor(
      private repository: IItemCategoryRepository
   ) {}

   async execute(data: ItemCategoryDTOGetType): Promise<ItemCategoryResponseType> {
      const validatedId = validateFunction({
         schema: ItemCategoryDTOGetSchema,
         data,
      })

      const itemCategory = await this.repository.getById(validatedId)
      
      if(!itemCategory) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }

      const itemCategoryValidated = validateFunction({
         schema: ItemCategoryResponseSchema,
         data: itemCategory,
      })

      return itemCategoryValidated
   }
}