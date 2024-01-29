import { ItemCategoryDTOMutationType, ItemCategoryType } from "../../../types/item-category-types";

export interface ICreateItemCategoryUseCase {
   execute(data: ItemCategoryDTOMutationType): Promise<ItemCategoryType>
}

export interface IGetAllItemCategoriesUseCase {
   execute(): Promise<ItemCategoryType[]>
}

export interface IDeleteItemCategoryUseCase {
   execute(id: string): Promise<void>
}

export interface IGetItemCategoryByIdUseCase {
   execute(id: string): Promise<ItemCategoryType>
}