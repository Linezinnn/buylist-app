import { statusCode } from "../../constants/http-status-codes";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";
import { IDeleteItemCategoryUseCase } from "./interfaces/item-category-usecase-interfaces";

import { UpError } from "../../errors/up-error";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemCategoryDTOGetSchema } from "../../utils/validations/schemas/item-category-schema";

export class DeleteItemCategoryUseCase implements IDeleteItemCategoryUseCase {
   constructor(
      private repository: IItemCategoryRepository
   ) {}

   async execute(id: string): Promise<void> {
      const { id: idValidated } = validateFunction({
         schema: ItemCategoryDTOGetSchema,
         data: { id },
      })

      if(!idValidated) return

      const itemCategory = await this.repository.delete(idValidated)
      
      if(!itemCategory) {
         throw new UpError({
            statusCode: statusCode.NOT_FOUND,
            message: 'Not found: The item category with this id does not exists'
         })
      }
   }
}