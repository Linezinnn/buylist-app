import { statusCode } from "../constants/http-status-codes";

import { ServerRequest, ServerResponse } from "../types/server-types";
import { IAmountCategoryController } from "./interfaces/controllers-interfaces";
import { AmountCategoryDTOType, AmountCategoryType } from "../types/amount-category-types";
import { 
   ICreateAmountCategoryUseCase, 
   IDeleteAmountCategoryUseCase, 
   IGetAllAmountCategoriesUsecase 
} from "../usecases/interfaces/amount-category-usecases-interfaces";

import { controllerHandlingFastify } from "./controller-handlings/controller-handling-fastify";

export class AmountCategoryController implements IAmountCategoryController {
   constructor(
      private createAmountCategoryUseCase: ICreateAmountCategoryUseCase,
      private getAllAmountCategoriesUseCase: IGetAllAmountCategoriesUsecase,
      private deleteAmountCategoryUseCase: IDeleteAmountCategoryUseCase,
   ) {}

   async create(request: ServerRequest, response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const data = request.body as AmountCategoryDTOType

            const result: AmountCategoryType = await this.createAmountCategoryUseCase.execute(data)

            response
            .status(statusCode.CREATED)
            .header('location', `/amount-category/${result.id}`)
            .send(result)
         }
      })
   }

   async getAll(response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const result: AmountCategoryType[] = await this.getAllAmountCategoriesUseCase.execute()

            response
            .status(statusCode.OK)
            .send(result)
         }
      })
   }

   async delete(request: ServerRequest, response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const { id } = request.params as AmountCategoryDTOType

            await this.deleteAmountCategoryUseCase.execute(id ?? '')

            response
            .status(statusCode.NO_CONTENT)
            .send()
         }
      })
   }
}