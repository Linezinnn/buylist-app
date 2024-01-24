import { ServerInstance } from "../types/server-types";

import { AmountCategoryRoutes } from "./amount-category-routes";

import { AmountCategoryController } from "../controllers/amount-category-controller";

import { CreateAmountCategoryUseCase } from "../usecases/amount-category/create-amount-category-usecase";
import { GetAllAmountCategoriesUsecase } from "../usecases/amount-category/get-all-amount-categories-usecase";
import { DeleteAmountCategoryUseCase } from "../usecases/amount-category/delete-amount-category-usecase";

import { AmountCategoryRepositoryPrisma } from "../repositories/amount-category-repo-prisma";

export async function Routes(serverInstance: ServerInstance) {
   const amountCategoryRoutes = new AmountCategoryRoutes(
      serverInstance, 
      new AmountCategoryController(
         new CreateAmountCategoryUseCase(new AmountCategoryRepositoryPrisma()),
         new GetAllAmountCategoriesUsecase(new AmountCategoryRepositoryPrisma()),
         new DeleteAmountCategoryUseCase(new AmountCategoryRepositoryPrisma()),
   ))

   amountCategoryRoutes.createAmountCategory('/amount-category')
   amountCategoryRoutes.getAllAmountCategories('/all-amount-categories')
   amountCategoryRoutes.deleteAmountCategory('/amount-category')
}