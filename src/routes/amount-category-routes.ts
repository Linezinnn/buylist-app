import { IAmountCategoryController } from "../controllers/interfaces/controllers-interfaces"
import { IAmountCategoryRoutes, ServerInstance } from "./interfaces/routes-interfaces"

export class AmountCategoryRoutes implements IAmountCategoryRoutes {
   constructor(
      private serverInstance: ServerInstance,
      private controller: IAmountCategoryController
   ) {}

   createAmountCategory(prefix: string): void {
      this.serverInstance.post(prefix, (req, res) => {
         this.controller.create(req, res)
      })
   }
}