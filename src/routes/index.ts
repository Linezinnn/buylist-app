import { FastifyInstance } from "fastify";
import { AmountCategoryRoutes } from "./amount-category-routes";
import { ItemCategoryRoutes } from "./item-category-routes";
import { ItemRoutes } from "./item-routes";

export type RouteParamsType = {
   serverInstance: FastifyInstance,
   prefix: string,
}

export function Routes(serverInstance: FastifyInstance) {
   AmountCategoryRoutes({serverInstance, prefix: '/amount-category'})
   ItemCategoryRoutes({serverInstance, prefix: '/item-category'})
   ItemRoutes({serverInstance, prefix: '/item'})
}