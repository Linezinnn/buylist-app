import { describe } from "vitest"

import { TESTServerRequest, TESTServerResponse } from "../../types/server-types"

import { AmountCategoryControllerCreateTest } from "./amount-category-controller-create"
import { AmountCategoryControllerGetTest } from "./amount-category-controller-get"
import { AmountCategoryControllerDeleteTest } from "./amount-category-controller-delete"

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

describe('amount category controller', () => {
   AmountCategoryControllerCreateTest(new ServerInstance())
   AmountCategoryControllerDeleteTest(new ServerInstance())
   AmountCategoryControllerGetTest(new ServerInstance())
})