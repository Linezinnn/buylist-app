import { statusCode } from "../../constants/http-status-codes";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IGetItemByIdUseCase } from "./interfaces/item-interfaces";
import { ItemDTOGetType, ItemResponseType } from "../../types/item-types";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemDTOGetSchema, ItemResponseSchema } from "../../packages/@buylist-api/schemas/item-schema";

export class GetItemByIdUseCase implements IGetItemByIdUseCase {
   constructor(
      private repository: IItemRepository
   ) {}

   async execute(data: ItemDTOGetType): Promise<ItemResponseType> {
      const validatedId = validateFunction({
         schema: ItemDTOGetSchema,
         data,
      })

      const item = await this.repository.getById(validatedId)
      
      if(!item) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }

      const itemValidated = validateFunction({
         schema: ItemResponseSchema,
         data: item
      })

      return itemValidated
   }
}