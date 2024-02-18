import { statusCode } from "../../constants/http-status-codes";

import { IAmountCategoryRepository, IItemCategoryRepository, IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { ICreateItemUseCase } from "./interfaces/item-interfaces";
import { ItemDTOPostType, ItemResponseType } from "../../types/item-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";

import { UpError } from "../../errors/up-error";
import { ItemDTOPostSchema, ItemResponseSchema } from "../../packages/@buylist-api/schemas/item-schema";

export class CreateItemUseCase implements ICreateItemUseCase {
   constructor(
      private repository: IItemRepository,
      private amountCategoryRepository: IAmountCategoryRepository,
      private itemCategoryRepository: IItemCategoryRepository,
   ) {}

   async execute(data: ItemDTOPostType): Promise<ItemResponseType> {
      const validatedData = validateFunction({
         schema: ItemDTOPostSchema,
         data,
      })

      const checkIfNameAlreadyExists = await this.repository.getByName(validatedData.name) 

      if(checkIfNameAlreadyExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: responseMessages.NAME_ALREADY_EXISTS,
         })
      }

      const checkIfAmountCategoryIdExists = await this.amountCategoryRepository.getById({ 
         id: validatedData.amountCategoryId,
      })
      
      if(!checkIfAmountCategoryIdExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: responseMessages.AMOUNT_CATEGORY_ID_NOT_EXISTS,
         })
      }

      const checkIfItemCategoryIdExists = await this.itemCategoryRepository.getById({ 
         id: validatedData.itemCategoryId,
      })
      
      if(!checkIfItemCategoryIdExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: responseMessages.ITEM_CATEGORY_ID_NOT_EXISTS,
         })
      }

      const item = await this.repository.create(validatedData)

      const itemValidated = validateFunction({
         schema: ItemResponseSchema,
         data: item,
      })

      return itemValidated
   }
}