import { statusCode } from "../../constants/http-status-codes";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteItemUseCase } from "./interfaces/item-interfaces";

import { UpError } from "../../errors/up-error";

import { ItemDTOGetSchema } from "../../utils/validations/schemas/item-schema";
import { validateFunction } from "../../utils/validations/zod-validate-function";

export class DeleteItemUseCase implements IDeleteItemUseCase {
   constructor(
      private repository: IItemRepository
   ) {}

   async execute(id: string): Promise<void> {
      const { id: idValidated } = validateFunction({
         schema: ItemDTOGetSchema,
         data: { id },
      })

      if(!idValidated) return

      const item = await this.repository.delete(idValidated)
      
      if(!item) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: 'Not found: The item with this id does not exists'
         })
      }
   }
}