import { ServerInstance } from "../types/server-types";

import { AmountCategoryRoutes } from "./amount-category-routes";
import { ItemCategoryRoutes } from "./item-category-routes";

import { AmountCategoryController } from "../controllers/amount-category-controller";
import { ItemCategoryController } from "../controllers/item-category-controller";

import { CreateAmountCategoryUseCase } from "../usecases/amount-category/create-amount-category-usecase";
import { GetAllAmountCategoriesUsecase } from "../usecases/amount-category/get-all-amount-categories-usecase";
import { DeleteAmountCategoryUseCase } from "../usecases/amount-category/delete-amount-category-usecase";

import { CreateItemCategoryUseCase } from "../usecases/item-category/create-item-category-usecase";

import { AmountCategoryRepositoryPrisma } from "../repositories/amount-category-repo-prisma";
import { ItemCategoryRepositoryPrisma } from "../repositories/item-category-repo-prisma";
import { GetAllItemCategoriesUsecase } from "../usecases/item-category/get-all-item-categories-usecase";

export async function Routes(serverInstance: ServerInstance) {
   const amountCategoryRoutes = new AmountCategoryRoutes(
      serverInstance, 
      new AmountCategoryController(
         new CreateAmountCategoryUseCase(new AmountCategoryRepositoryPrisma()),
         new GetAllAmountCategoriesUsecase(new AmountCategoryRepositoryPrisma()),
         new DeleteAmountCategoryUseCase(new AmountCategoryRepositoryPrisma()),
   ))

   const itemCategoryRoutes = new ItemCategoryRoutes(
      serverInstance,
      new ItemCategoryController(
         new CreateItemCategoryUseCase(new ItemCategoryRepositoryPrisma()),
         new GetAllItemCategoriesUsecase(new ItemCategoryRepositoryPrisma()),
      )
   )

   amountCategoryRoutes.createAmountCategory('/amount-category')
   amountCategoryRoutes.getAllAmountCategories('/all-amount-categories')
   amountCategoryRoutes.deleteAmountCategory('/amount-category')

   itemCategoryRoutes.createItemCategory('/item-category')
   itemCategoryRoutes.getAllItemCategories('/all-item-categories')
}