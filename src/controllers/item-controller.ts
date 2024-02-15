import { statusCode } from "../constants/http-status-codes";

import { ServerRequest, ServerResponse } from "../types/server-types";
import { 
   ItemDTOCheckType, 
   ItemDTODeleteType, 
   ItemDTOGetType, 
   ItemDTOPostType, 
   ItemResponseType 
} from "../types/item-types";
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
            const data = request.body as ItemDTOPostType
            const result: ItemResponseType = await this.createItemUseCase.execute(data)

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
            const paramsData = request.params as ItemDTOGetType

            const result = await this.getItemByIdUseCase.execute(paramsData)

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
            const result = await this.getAllItemsUseCase.execute()

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
            const paramsData = request.params as ItemDTODeleteType

            await this.deleteItemUseCase.execute(paramsData)

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
            const { isChecked } = request.body as ItemDTOCheckType

            const result = await this.checkItemUseCase.execute({ id, isChecked })

            response
            .status(statusCode.OK)
            .send(result)
         }
      })
   }
}