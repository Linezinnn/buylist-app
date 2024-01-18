import { statusCode } from "../constants/http-status-codes";

import { IAmountCategoryRepository } from "../repositories/interfaces/repositories-interfaces";
import { AmountCategoryDTOType, AmountCategoryType } from "../types/amount-category-types";
import { ICreateAmountCategoryUseCase } from "./interfaces/usecases-interfaces";

import { UpError } from "../errors/up-error";

import { 
   AmountCategoryDTOSchema,
   AmountCategoryResponseSchema, 
} from "../utils/validations/amount-category-schema";
import { validateFunction } from "../utils/validations/zod-validate-function";

export class CreateAmountCategoryUseCase implements ICreateAmountCategoryUseCase {
   constructor(
      private repository: IAmountCategoryRepository
   ) {}

   async execute(data: AmountCategoryDTOType): Promise<AmountCategoryType> {

      const validatedData = validateFunction({
         schema: AmountCategoryDTOSchema,
         data,
      })

      if(!validatedData.name) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: 'Bad Request: The payload need a name for creation'
         })
      }

      const checkIfNameAlreadyExists = await this.repository.getByName(validatedData.name) 

      if(checkIfNameAlreadyExists) {
         throw new UpError({
            statusCode: statusCode.BAD_REQUEST,
            message: 'Bad Request: The name already exists'
         })
      }
      
      const amountCategory = await this.repository.create(validatedData.name)

      const amountCategoryValidated = validateFunction({
         schema: AmountCategoryResponseSchema,
         data: amountCategory
      })

      return amountCategoryValidated
   }
}