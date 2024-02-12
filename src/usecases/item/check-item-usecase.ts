import { statusCode } from "../../constants/http-status-codes";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { ICheckItemUseCase } from "./interfaces/item-interfaces";
import { ItemDTOCheckType, ItemType } from "../../types/item-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { 
   ItemDTOCheckSchema,
   ItemDTOGetSchema,
   ItemResponseSchema 
} from "../../utils/validations/schemas/item-schema";

import { UpError } from "../../errors/up-error";

export class CheckItemUseCase implements ICheckItemUseCase {
   constructor(
      private repository: IItemRepository,
   ) {}

   async execute(id: string, data: ItemDTOCheckType): Promise<ItemType> {
      const { id: idValidated } = validateFunction({
         schema: ItemDTOGetSchema,
         data: { id },
      })
      
      let checkedValited = validateFunction({
         schema: ItemDTOCheckSchema,
         data,
      })

      const item = await this.repository.checkItem(idValidated, checkedValited) 

      if(!item) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: 'Not found: The item with this id does not exists'
         })
      }

      const itemValidated = validateFunction({
         schema: ItemResponseSchema,
         data: item,
      })

      return itemValidated
   }
}