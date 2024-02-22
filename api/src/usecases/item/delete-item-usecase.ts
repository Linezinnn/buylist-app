import { statusCode } from "../../constants/http-status-codes";

import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteItemUseCase } from "./interfaces/item-interfaces";
import { ItemDTODeleteType } from "../../types/item-types";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemDTOGetSchema } from "../../packages/@buylist-api/schemas/item-schema";
import { responseMessages } from "../../packages/@buylist-api/response-messages";

export class DeleteItemUseCase implements IDeleteItemUseCase {
   constructor(
      private repository: IItemRepository
   ) {}

   async execute(data: ItemDTODeleteType): Promise<void> {
      const validatedId = validateFunction({
         schema: ItemDTOGetSchema,
         data,
      })

      const item = await this.repository.delete(validatedId)
      
      if(!item) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: responseMessages.ID_NOT_FOUND,
         })
      }
   }
}