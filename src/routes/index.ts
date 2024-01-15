import { FastifyInstance } from "fastify";
import { CreateAmountCategoryRoute } from "./create-amount-category";

export type RouteParamsType = {
   serverInstance: FastifyInstance,
   prefix: string,
}

export async function Routes(serverInstance: FastifyInstance) {
   CreateAmountCategoryRoute({ serverInstance, prefix: '/amount-category' })
}