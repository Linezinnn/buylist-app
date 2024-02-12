import { statusCode } from "../constants/http-status-codes";

import { ServerRequest, ServerResponse } from "../types/server-types";
import { ItemDTOCheckType, ItemDTOGetType, ItemDTOMutationType, ItemType } from "../types/item-types";
import { IItemController } from "./interfaces/controllers-interfaces";

import { controllerHandlingFastify } from "./controller-handlings/controller-handling-fastify";
import { 
   ICheckItemUseCase, 
   ICreateItemUseCase, 
   IDeleteItemUseCase, 
   IGetAllItemsUseCase, 
   IGetItemByIdUseCase 
} from "../usecases/item/interfaces/item-interfaces";

export class ItemController implements IItemController {
   constructor(
      private createItemUseCase: ICreateItemUseCase,
      private getItemByIdUseCase: IGetItemByIdUseCase,
      private getAllItemsUseCase: IGetAllItemsUseCase,
      private deleteItemUseCase: IDeleteItemUseCase,
      private checkItemUseCase: ICheckItemUseCase,
   ) {}

   async create(request: ServerRequest, response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const data = request.body as ItemDTOMutationType
            const result: ItemType = await this.createItemUseCase.execute(data)

            response
            .status(statusCode.CREATED)
            .header('location', `/item/${result.id}`)
            .send(result)
         }
      })
   }

   async getById(request: ServerRequest, response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const { id } = request.params as ItemDTOGetType

            const result = await this.getItemByIdUseCase.execute(id ?? '')

            response
            .status(statusCode.OK)
            .send(result)
         }
      })
   }

   async getAll(response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const result: ItemType[] = await this.getAllItemsUseCase.execute()

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
            const { id } = request.params as ItemDTOGetType

            await this.deleteItemUseCase.execute(id ?? '')

            response
            .status(statusCode.NO_CONTENT)
            .send()
         }
      })
   }
   
   async checkItem(request: ServerRequest, response: ServerResponse): Promise<void> {
      controllerHandlingFastify({
         response,
         callback: async () => {
            const { id } = request.params as ItemDTOGetType
            const data = request.body as ItemDTOCheckType

            const result = await this.checkItemUseCase.execute(id ?? '', data)

            response
            .status(statusCode.OK)
            .send(result)
         }
      })
   }
}