import { describe } from "vitest"

import { TESTServerRequest, TESTServerResponse } from "../../../types/server-types"

import { ItemCategoryControllerCreateTest } from "./item-category-controller-create"
import { ItemCategoryControllerGetAllTest } from "./item-category-controller-get-all"
import { ItemCategoryControllerDeleteTest } from "./item-category-controller-delete"

class ServerInstance {
   public getResponse = {
      header: ['', ''],
      send: '',
      status: 0,
   }

   public request = {
      body: { name: 'a' }
   } as TESTServerRequest

   public response = {
      header: (key, value) => {
         this.getResponse.header = [key, value]
         return this.response
      },
      send: (payload: any) => {
         this.getResponse.send = payload
         return this.response
      },
      status: (statusCode) => {
         this.getResponse.status = statusCode
         return this.response
      },
   } as TESTServerResponse
}

export type TESTServerInstanceType = ServerInstance

describe('item category controller', () => {
   ItemCategoryControllerCreateTest(new ServerInstance())
   ItemCategoryControllerGetAllTest(new ServerInstance())
   ItemCategoryControllerDeleteTest(new ServerInstance())
})