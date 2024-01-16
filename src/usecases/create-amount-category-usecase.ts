import { 
   AmountCategoryDTOSchema,
   AmountCategoryResponseSchema, 
   AmountCategoryResponseSchemaType 
} from "../utils/validations/amount-category-validate";
import { AmountCategoryRepository } from "../repositories/interfaces/repositories-interfaces";
import { AmountCategoryDTOType, AmountCategoryType } from "../types/amount-category-types";
import { ICreateAmountCategoryUseCase } from "./interfaces/usecases-interfaces";

export class CreateAmountCategoryUseCase implements ICreateAmountCategoryUseCase {
   constructor(
      private repository: AmountCategoryRepository
   ) {}

   async execute(data: AmountCategoryDTOType): Promise<AmountCategoryType> {
      const validatedData = AmountCategoryDTOSchema.parse(data)

      if(!validatedData.name) {
         throw new Error('Bad Request: The payload needs an id or a name for creation') 
      }
      
      const amountCategory = await this.repository.create(validatedData.name)

      const amountCategoryValidated = AmountCategoryResponseSchema.parse(amountCategory)

      return amountCategoryValidated
   }
}