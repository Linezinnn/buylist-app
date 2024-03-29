import { IItemController } from "../controllers/interfaces/controllers-interfaces"
import { ServerInstance } from "../types/server-types"
import { IItemRoutes } from "./interfaces/routes-interfaces"


export class ItemRoutes implements IItemRoutes {
   constructor(
      private serverInstance: ServerInstance,
      private controller: IItemController,
   ) {}

   createItem(prefix: string): void {
      this.serverInstance.post(prefix, (req, res) => {
         this.controller.create(req, res)
      })
   }

   getItemById(prefix: string): void {
      this.serverInstance.get(`${prefix}/:id`, (req, res) => {
         this.controller.getById(req, res)
      })
   }

   getAllItems(prefix: string): void {
      this.serverInstance.get(prefix, (_, res) => {
         this.controller.getAll(res)
      })
   }

   deleteItem(prefix: string): void {
      this.serverInstance.delete(`${prefix}/:id`, (req, res) => {
         this.controller.delete(req, res)
      })
   }

   checkItem(prefix: string): void {
      this.serverInstance.patch(`${prefix}/:id`, (req, res) => {
         this.controller.checkItem(req, res)
      })
   }
}