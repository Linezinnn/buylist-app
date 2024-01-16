import { FastifyInstance } from "fastify"

export type ServerInstance = FastifyInstance

export interface IAmountCategoryRoutes {
   createAmountCategory(prefix: string): void
}