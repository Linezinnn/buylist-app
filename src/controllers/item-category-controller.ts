import { statusCode } from "../constants/http-status-codes";

import { ServerRequest, ServerResponse } from "../types/server-types";
import { IItemCategoryController } from "./interfaces/controllers-interfaces";
import { ItemCategoryDTOGetType, ItemCategoryDTOMutationType, ItemCategoryType } from "../types/item-category-types";
import { ICreateItemCategoryUseCase, IDeleteItemCategoryUseCase, IGetAllItemCategoriesUseCase, IGetItemCategoryByIdUseCase } from "../usecases/item-category/interfaces/item-category-usecase-interfaces";

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
            const data = request.body as ItemCategoryDTOMutationType

            const result: ItemCategoryType = await this.createItemCategoryUseCase.execute(data)

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
            const result: ItemCategoryType[] = await this.getAllItemCategoriesUseCase.execute()

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
            const { id } = request.params as ItemCategoryDTOGetType

            await this.deleteItemCategoryUseCase.execute(id ?? '')

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
            const { id } = request.params as ItemCategoryDTOGetType

            const result = await this.getItemCategoryByIdUseCase.execute(id ?? '')

            response
            .status(statusCode.OK)
            .send(result)
         }
      })
   }
}