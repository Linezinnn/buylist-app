import { statusCode } from "../../constants/http-status-codes";

import { IAmountCategoryRepository, IItemCategoryRepository, IItemRepository } from "../../repositories/interfaces/repositories-interfaces";
import { ICreateItemUseCase } from "./interfaces/item-interfaces";
import { ItemDTOMutationType, ItemType } from "../../types/item-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { 
   ItemDTOMutationSchema, 
   ItemResponseSchema 
} from "../../utils/validations/schemas/item-schema";

import { UpError } from "../../errors/up-error";

export class CreateItemUseCase implements ICreateItemUseCase {
   constructor(
      private repository: IItemRepository,
      private amountCategoryRepository: IAmountCategoryRepository,
      private itemCategoryRepository: IItemCategoryRepository,
   ) {}

   async execute(data: ItemDTOMutationType): Promise<ItemType> {
      let validatedData = validateFunction({
         schema: ItemDTOMutationSchema,
         data,
      })

      const checkIfNameAlreadyExists = await this.repository.getByName(validatedData.name) 

      if(checkIfNameAlreadyExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: 'Bad Request: The name already exists'
         })
      }

      const checkIfAmountCategoryIdExists = await this.amountCategoryRepository.getById(validatedData.amountCategoryId)
      
      if(!checkIfAmountCategoryIdExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: 'Bad Request: The amount category id is not exists'
         })
      }

      const checkIfItemCategoryIdExists = await this.itemCategoryRepository.getById(validatedData.itemCategoryId)
      
      if(!checkIfItemCategoryIdExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: 'Bad Request: The item category id is not exists'
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