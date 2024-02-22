import { statusCode } from "../constants/http-status-codes";

import { ServerRequest, ServerResponse } from "../types/server-types";
import { IItemCategoryController } from "./interfaces/controllers-interfaces";
import { 
   ItemCategoryDTODeleteType, 
   ItemCategoryDTOGetType, 
   ItemCategoryDTOPostType, 
   ItemCategoryResponseType, 
} from "../types/item-category-types";
import { ICreateItemCategoryUseCase, 
   IDeleteItemCategoryUseCase, 
   IGetAllItemCategoriesUseCase, 
   IGetItemCategoryByIdUseCase 
} from "../usecases/item-category/interfaces/item-category-usecase-interfaces";

import { controllerHandlingFastify } from "./controller-handlings/controller-handling-fastify";

export class ItemCategoryController implements IItemCategoryController {
   constructor(
      private createItemCategoryUseCase: ICreateItemCategoryUseCase,
      private getAllItemCategoriesUseCase: IGetAllItemCategoriesUseCase,
      private deleteItemCategoryUseCase: IDeleteItemCategoryUseCase,
      private getItemCategoryByIdUseCase: IGetItemCategoryByIdUseCase,
   ) {}

   async create(request: ServerRequest, response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const data = request.body as ItemCategoryDTOPostType

            const result: ItemCategoryResponseType = await this.createItemCategoryUseCase.execute(data)

            response
            .status(statusCode.CREATED)
            .header('location', `/item-category/${result.id}`)
            .send(result)
         }
      })
   }

   async getAll(response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const result: ItemCategoryResponseType[] = await this.getAllItemCategoriesUseCase.execute()

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
            const paramsData = request.params as ItemCategoryDTODeleteType

            await this.deleteItemCategoryUseCase.execute(paramsData)

            response
            .status(statusCode.NO_CONTENT)
            .send()
         }
      })
   }

   async getById(request: ServerRequest, response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const paramsData = request.params as ItemCategoryDTOGetType

            const result = await this.getItemCategoryByIdUseCase.execute(paramsData)

            response
            .status(statusCode.OK)
            .send(result)
         }
      })
   }
}