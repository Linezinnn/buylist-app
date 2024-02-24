import { statusCode } from "../constants/http-status-codes"
import { ServerInstance } from "../types/server-types"
import { IInfoRoutes } from "./interfaces/routes-interfaces"

export class InfoRoutes implements IInfoRoutes {
   constructor(
      private serverInstance: ServerInstance,
   ) {}

   status(prefix: string): void {
      this.serverInstance.get(prefix, (_, res) => {
         res.status(statusCode.OK)
      })
   }
}