import { statusCode } from "../constants/http-status-codes";

import { ServerRequest, ServerResponse } from "../types/server-types";
import { ItemDTOGetType, ItemDTOMutationType, ItemType } from "../types/item-types";
import { IItemController } from "./interfaces/controllers-interfaces";

import { controllerHandlingFastify } from "./controller-handlings/controller-handling-fastify";
import { ICreateItemUseCase, IGetItemByIdUseCase } from "../usecases/item/interfaces/item-interfaces";

export class ItemController implements IItemController {
   constructor(
      private createItemUseCase: ICreateItemUseCase,
      private getItemByIdUseCase: IGetItemByIdUseCase
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
}