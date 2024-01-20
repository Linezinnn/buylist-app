import { describe } from "vitest"

import { TESTServerRequest, TESTServerResponse } from "../../types/server-types"

import { AmountCategoryControllerCreate } from "./amount-category-controller-create"

const serverInstance = {
   request: {
      body: { name: 'a' }
   } as TESTServerRequest,
   response: {
      header(key, value) {
         serverInstance.getResponse.header = [key, value]
         return this
      },
      send(payload: any) {
         serverInstance.getResponse.send = payload
         return this
      },
      status(statusCode) {
         serverInstance.getResponse.status = statusCode
         return this
      },
   } as TESTServerResponse,
   getResponse: {
      header: ['', ''],
      send: '',
      status: 0,
   },
}

export type TESTServerInstanceType = typeof serverInstance

describe('amount category controller', () => {
   AmountCategoryControllerCreate(serverInstance)
})