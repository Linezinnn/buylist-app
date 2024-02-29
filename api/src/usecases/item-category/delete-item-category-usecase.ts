import { statusCode } from "../../constants/http-status-codes";

import { IItemCategoryRepository, IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteItemCategoryUseCase } from "./interfaces/item-category-usecase-interfaces";
import { ItemCategoryDTODeleteType } from "../../types/item-category-types";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemCategoryDTODeleteSchema } from "../../packages/@buylist-api/schemas/item-category-schema";
import { responseMessages } from "../../packages/@buylist-api/response-messages";

export class DeleteItemCategoryUseCase implements IDeleteItemCategoryUseCase {
   constructor(
      private repository: IItemCategoryRepository,
      private itemRepository: IItemRepository,
   ) {}

   async execute({ id, skipChecks = false }: ItemCategoryDTODeleteType): Promise<void> {
      const validatedData = validateFunction({
         schema: ItemCategoryDTODeleteSchema,
         data: { id, skipChecks },
      })

      if(!skipChecks) {
         const result = await this.itemRepository.getFirstByItemCategoryId({ id: validatedData.id })

         if(result) {
            throw new UpError({
               statusCode: statusCode.CONFLICT,
               message: responseMessages.ITEMS_EXISTS_WITH_THIS_ITEM_CATEGORY_ID,
            })
         }
      }
      
      const isAllDeleted = await this.itemRepository.deleteManyByItemCategoryId({ id })

      if(!isAllDeleted) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }

      const isItemCategoryDeleted = await this.repository.delete({ id })
      
      if(!isItemCategoryDeleted) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }
   }
}