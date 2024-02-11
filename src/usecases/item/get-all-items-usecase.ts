import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { ItemType } from "../../types/item-types";
import { IGetAllItemsUseCase } from "./interfaces/item-interfaces";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemResponseSchema } from "../../utils/validations/schemas/item-schema";

export class GetAllItemsUsecase implements IGetAllItemsUseCase {
   constructor(
      private repository: IItemRepository
   ) {}

   async execute(): Promise<ItemType[]> {
      const allItems = await this.repository.getAll()

      allItems.map(item => {
         validateFunction({
            schema: ItemResponseSchema,
            data: item,
         })
      })
      
      return allItems
   }
   
}