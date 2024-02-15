import { statusCode } from "../../constants/http-status-codes";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";

import { ICreateItemCategoryUseCase } from "./interfaces/item-category-usecase-interfaces";
import { ItemCategoryDTOPostType, ItemCategoryResponseType } from "../../types/item-category-types";

import { validateFunction } from "../../utils/validations/zod-validate-function";
import { convertRGBToHEXColor } from "../../utils/functions/convert-rgb-to-hex";
import { HEXCodeRegex } from "../../packages/@buylist-api/regex";

import { UpError } from "../../errors/up-error";
import { ItemCategoryDTOPostSchema, ItemCategoryResponseSchema } from "../../packages/@buylist-api/schemas/item-category-schema";

export class CreateItemCategoryUseCase implements ICreateItemCategoryUseCase {
   constructor(
      private repository: IItemCategoryRepository
   ) {}

   async execute(data: ItemCategoryDTOPostType): Promise<ItemCategoryResponseType> {
      let validatedData = validateFunction({
         schema: ItemCategoryDTOPostSchema,
         data,
      })

      const checkIfNameAlreadyExists = await this.repository.getByName(validatedData.name) 

      if(checkIfNameAlreadyExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: 'Bad Request: The name already exists'
         })
      }

      if(!HEXCodeRegex.test(validatedData.color)){
         validatedData.color = convertRGBToHEXColor(validatedData.color)
      }
      
      const itemCategory = await this.repository.create(validatedData)

      const itemCategoryValidated = validateFunction({
         schema: ItemCategoryResponseSchema,
         data: itemCategory
      })

      return itemCategoryValidated
   }
}