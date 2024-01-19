import { ServerInstance } from "../types/server-types";

import { AmountCategoryRoutes } from "./amount-category-routes";

import { AmountCategoryController } from "../controllers/amount-category-controller";

import { CreateAmountCategoryUseCase } from "../usecases/create-amount-category-usecase";

import { AmountCategoryRepositoryPrisma } from "../repositories/amount-category-repo-prisma";

export async function Routes(serverInstance: ServerInstance) {
   const amountCategoryRoutes = new AmountCategoryRoutes(
      serverInstance, 
      new AmountCategoryController(
         new CreateAmountCategoryUseCase(new AmountCategoryRepositoryPrisma())
   ))

   amountCategoryRoutes.createAmountCategory('/amount-category')
}