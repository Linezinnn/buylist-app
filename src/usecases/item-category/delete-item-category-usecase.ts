import { statusCode } from "../../constants/http-status-codes";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteItemCategoryUseCase } from "./interfaces/item-category-usecase-interfaces";
import { ItemCategoryDTODeleteType } from "../../types/item-category-types";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemCategoryDTODeleteSchema } from "../../packages/@buylist-api/schemas/item-category-schema";

export class DeleteItemCategoryUseCase implements IDeleteItemCategoryUseCase {
   constructor(
      private repository: IItemCategoryRepository
   ) {}

   async execute(data: ItemCategoryDTODeleteType): Promise<void> {
      const validatedId = validateFunction({
         schema: ItemCategoryDTODeleteSchema,
         data,
      })

      const itemCategory = await this.repository.delete(validatedId)
      
      if(!itemCategory) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: 'Not found: The item category with this id does not exists'
         })
      }
   }
}