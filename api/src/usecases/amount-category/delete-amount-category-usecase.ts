import { statusCode } from "../../constants/http-status-codes";

import { IAmountCategoryRepository, IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteAmountCategoryUseCase } from "../amount-category/interfaces/amount-category-usecases-interfaces";

import { UpError } from "../../errors/up-error";

import { AmountCategoryDTODeleteType } from "../../types/amount-category-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { AmountCategoryDTODeleteSchema } from "../../packages/@buylist-api/schemas/amount-category-schema";
import { responseMessages } from "../../packages/@buylist-api/response-messages";

export class DeleteAmountCategoryUseCase implements IDeleteAmountCategoryUseCase {
   constructor(
      private repository: IAmountCategoryRepository,
      private itemRepository: IItemRepository,
   ) {}

   async execute({ id, skipChecks = false }: AmountCategoryDTODeleteType): Promise<void> {
      const validatedData = validateFunction({
         schema: AmountCategoryDTODeleteSchema,
         data: { id, skipChecks },
      })

      if(!skipChecks) {
         const result = await this.itemRepository.getFirstByAmountCategoryId({ id: validatedData.id })

         if(result) {
            throw new UpError({
               statusCode: statusCode.CONFLICT,
               message: responseMessages.ITEMS_EXISTS_WITH_THIS_CATEGORY_ID,
            })
         }
      }

      const isAllDeleted = await this.itemRepository.deleteManyByAmountCategoryId({ id })

      if(!isAllDeleted) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }

      const isAmountCategoryDeleted = await this.repository.delete({ id })
      
      if(!isAmountCategoryDeleted) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }
   }
}