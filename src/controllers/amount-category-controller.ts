import { statusCode } from "../constants/http-status-codes";

import { ServerRequest, ServerResponse } from "../types/server-types";
import { IAmountCategoryController } from "./interfaces/controllers-interfaces";
import { AmountCategoryDTOType, AmountCategoryType } from "../types/amount-category-types";
import { 
   ICreateAmountCategoryUseCase, 
   IGetAllAmountCategoriesUsecase 
} from "../usecases/interfaces/usecases-interfaces";

import { UpError } from "../errors/up-error";

export class AmountCategoryController implements IAmountCategoryController {
   constructor(
      private createAmountCategoryUseCase: ICreateAmountCategoryUseCase,
      private getAllAmountCategoriesUseCase: IGetAllAmountCategoriesUsecase,
   ) {}

   async create(request: ServerRequest, response: ServerResponse): Promise<void> {
      try {
         const data = request.body as AmountCategoryDTOType

         const result: AmountCategoryType = await this.createAmountCategoryUseCase.execute(data)

         response
         .status(statusCode.CREATED)
         .header('location', `/amount-category/${result.id}`)
         .send(result)
      } catch(error: unknown) {
         if(error instanceof UpError) {
            response
            .status(error.statusCode || statusCode.BAD_REQUEST)
            .send(error)

            return 
         }

         response
         .status(statusCode.INTERNAL_ERROR)
         .send(`Unxpected error: the error shoulds be instance of UpError. Received error data: ${error}`)
      }
   }

   async getAll(response: ServerResponse): Promise<void> {
      try {
         const result: AmountCategoryType[] = await this.getAllAmountCategoriesUseCase.execute()

         response
         .status(statusCode.OK)
         .send(result)
      } catch(error: unknown) {
         if(error instanceof UpError) {
            response
            .status(error.statusCode || statusCode.BAD_REQUEST)
            .send(error)

            return 
         }

         response
         .status(statusCode.INTERNAL_ERROR)
         .send(`Unxpected error: the error shoulds be instance of UpError. Received error data: ${error}`)
      }
   }
}