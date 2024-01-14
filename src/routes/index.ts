import { FastifyInstance } from "fastify";
import { CreateAmountCategory } from "./create-amount-category";

export type RouteParamsType = {
   serverInstance: FastifyInstance,
   prefix: string,
}

export function Routes(serverInstance: FastifyInstance) {
   CreateAmountCategory({ serverInstance, prefix: '/category' })
}