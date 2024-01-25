import { statusCode } from "../../constants/http-status-codes";

import { IItemCategoryRepository } from "../../repositories/interfaces/repositories-interfaces";

import { ICreateItemCategoryUseCase } from "./interfaces/item-category-usecase-interfaces";
import { ItemCategoryDTOMutationType, ItemCategoryType } from "../../types/item-category-types";

import { 
   ItemCategoryDTOMutationSchema, 
   ItemCategoryResponseSchema 
} from "../../utils/validations/schemas/item-category-schema";
import { validateFunction } from "../../utils/validations/zod-validate-function";
import { convertRGBToHEXColor } from "../../utils/functions/convert-rgb-to-hex";
import { HEXCodeRegex } from "../../utils/regex";

import { UpError } from "../../errors/up-error";

export class CreateItemCategoryUseCase implements ICreateItemCategoryUseCase {
   constructor(
      private repository: IItemCategoryRepository
   ) {}

   async execute(data: ItemCategoryDTOMutationType): Promise<ItemCategoryType> {
      let validatedData = validateFunction({
         schema: ItemCategoryDTOMutationSchema,
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
      
      const itemCategory = await this.repository.create(
         validatedData.name, 
         validatedData.color
      )

      const itemCategoryValidated = validateFunction({
         schema: ItemCategoryResponseSchema,
         data: itemCategory
      })

      return itemCategoryValidated
   }
}