import { ServerRequest, ServerResponse } from "../../types/server-types";

export interface IAmountCategoryController {
   create(request: ServerRequest, response: ServerResponse): Promise<void>
   getAll(response: ServerResponse): Promise<void>
   delete(request: ServerRequest, response: ServerResponse): Promise<void>
}

export interface IItemCategoryController {
   create(request: ServerRequest, response: ServerResponse): Promise<void>
   getAll(response: ServerResponse): Promise<void>
}