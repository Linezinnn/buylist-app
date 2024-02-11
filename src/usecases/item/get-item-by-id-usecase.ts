import { statusCode } from "../../constants/http-status-codes";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IGetItemByIdUseCase } from "./interfaces/item-interfaces";
import { ItemType } from "../../types/item-types";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemDTOGetSchema, ItemResponseSchema } from "../../utils/validations/schemas/item-schema";

export class GetItemByIdUseCase implements IGetItemByIdUseCase {
   constructor(
      private repository: IItemRepository
   ) {}

   async execute(id: string): Promise<ItemType> {
      const { id: idValidated } = validateFunction({
         schema: ItemDTOGetSchema,
         data: { id },
      })

      const item = await this.repository.getById(idValidated)
      
      if(!item) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: 'Not found: The item with this id does not exists'
         })
      }

      const itemValidated = validateFunction({
         schema: ItemResponseSchema,
         data: item
      })

      return itemValidated
   }
}