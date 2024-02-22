import { describe } from "vitest"

import { TESTServerRequest, TESTServerResponse } from "../../../types/server-types"

import { ItemControllerCreateTest } from "./item-controller-create"
import { ItemControllerGetByIdTest } from "./item-controller-get-by-id"
import { ItemControllerGetAllTest } from "./item-controller-get-all"
import { ItemControllerDeleteTest } from "./item-controller-delete"
import { ItemControllerCheckTest } from "./item-controller-check"

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

describe('item controller', () => {
   ItemControllerCreateTest(new ServerInstance())
   ItemControllerGetByIdTest(new ServerInstance())
   ItemControllerGetAllTest(new ServerInstance())
   ItemControllerDeleteTest(new ServerInstance())
   ItemControllerCheckTest(new ServerInstance())
})