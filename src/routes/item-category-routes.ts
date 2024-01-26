import { IItemCategoryController } from "../controllers/interfaces/controllers-interfaces"
import { ServerInstance } from "../types/server-types"
import { IItemCategoryRoutes } from "./interfaces/routes-interfaces"

export class ItemCategoryRoutes implements IItemCategoryRoutes {
   constructor(
      private serverInstance: ServerInstance,
      private controller: IItemCategoryController
   ) {}

   createItemCategory(prefix: string): void {
      this.serverInstance.post(prefix, (req, res) => {
         this.controller.create(req, res)
      })
   }

   getAllItemCategories(prefix: string): void {
      this.serverInstance.get(prefix, (_, res) => {
         this.controller.getAll(res)
      })
   }

   deleteItemCategory(prefix: string): void {
      this.serverInstance.delete(`${prefix}/:id`, (req, res) => {
         this.controller.delete(req, res)
      })
   }
}