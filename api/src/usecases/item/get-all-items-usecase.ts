import { IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { ItemResponseType } from "../../types/item-types";
import { IGetAllItemsUseCase } from "./interfaces/item-interfaces";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { ItemResponseSchema } from "../../packages/@buylist-api/schemas/item-schema";

export class GetAllItemsUsecase implements IGetAllItemsUseCase {
   constructor(
      private repository: IItemRepository
   ) {}

   async execute(): Promise<ItemResponseType[]> {
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