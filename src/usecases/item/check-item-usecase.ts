import { statusCode } from "../../constants/http-status-codes";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { CheckItemUseCaseDataType, ICheckItemUseCase } from "./interfaces/item-interfaces";
import { ItemResponseType } from "../../types/item-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";


import { UpError } from "../../errors/up-error";
import { ItemDTOCheckSchema, ItemDTOGetSchema, ItemResponseSchema } from "../../packages/@buylist-api/schemas/item-schema";

export class CheckItemUseCase implements ICheckItemUseCase {
   constructor(
      private repository: IItemRepository,
   ) {}

   async execute({ id, isChecked }: CheckItemUseCaseDataType): Promise<ItemResponseType> {
      const { id: validatedId } = validateFunction({
         schema: ItemDTOGetSchema,
         data: { id },
      })
      
      const { isChecked: valitedIsChecked } = validateFunction({
         schema: ItemDTOCheckSchema,
         data: { isChecked },
      })

      const item = await this.repository.checkItem({ 
         id: validatedId,
         isChecked: valitedIsChecked,
      }) 

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