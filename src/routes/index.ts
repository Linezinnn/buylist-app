import { ServerInstance } from "../types/server-types";

import { AmountCategoryRoutes } from "./amount-category-routes";
import { ItemCategoryRoutes } from "./item-category-routes";
import { ItemRoutes } from "./item-routes";

import { AmountCategoryController } from "../controllers/amount-category-controller";
import { ItemCategoryController } from "../controllers/item-category-controller";
import { ItemController } from "../controllers/item-controller";

import { CreateAmountCategoryUseCase } from "../usecases/amount-category/create-amount-category-usecase";
import { GetAllAmountCategoriesUsecase } from "../usecases/amount-category/get-all-amount-categories-usecase";
import { DeleteAmountCategoryUseCase } from "../usecases/amount-category/delete-amount-category-usecase";

import { CreateItemCategoryUseCase } from "../usecases/item-category/create-item-category-usecase";
import { GetAllItemCategoriesUsecase } from "../usecases/item-category/get-all-item-categories-usecase";
import { DeleteItemCategoryUseCase } from "../usecases/item-category/delete-item-category-usecase";
import { GetItemCategoryByIdUseCase } from "../usecases/item-category/get-item-category-by-id-usecase";

import { CreateItemUseCase } from "../usecases/item/create-item-usecase";

import { AmountCategoryRepositoryPrisma } from "../repositories/amount-category-repo-prisma";
import { ItemCategoryRepositoryPrisma } from "../repositories/item-category-repo-prisma";
import { ItemRepositoryPrisma } from "../repositories/item-repo-prisma";
import { GetItemByIdUseCase } from "../usecases/item/get-item-by-id-usecase";
import { GetAllItemsUsecase } from "../usecases/item/get-all-items-usecase";

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
         new DeleteItemCategoryUseCase(new ItemCategoryRepositoryPrisma()),
         new GetItemCategoryByIdUseCase(new ItemCategoryRepositoryPrisma()),
      )
   )
   
   const itemRoutes = new ItemRoutes(
      serverInstance,
      new ItemController(
         new CreateItemUseCase(
            new ItemRepositoryPrisma(), 
            new AmountCategoryRepositoryPrisma,
            new ItemCategoryRepositoryPrisma, 
         ),
         new GetItemByIdUseCase(new ItemRepositoryPrisma()),
         new GetAllItemsUsecase(new ItemRepositoryPrisma()),
      )
   )

   amountCategoryRoutes.createAmountCategory('/amount-category')
   amountCategoryRoutes.getAllAmountCategories('/all-amount-categories')
   amountCategoryRoutes.deleteAmountCategory('/amount-category')

   itemCategoryRoutes.createItemCategory('/item-category')
   itemCategoryRoutes.getAllItemCategories('/all-item-categories')
   itemCategoryRoutes.deleteItemCategory('/item-category')
   itemCategoryRoutes.getItemCategoryById('/item-category')

   itemRoutes.createItem('/item')
   itemRoutes.getItemById('/item')
   itemRoutes.getAllItems('/all-items')
}