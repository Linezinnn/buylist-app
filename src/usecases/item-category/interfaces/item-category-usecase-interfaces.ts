import { ItemCategoryDTOMutationType, ItemCategoryType } from "../../../types/item-category-types";

export interface ICreateItemCategoryUseCase {
   execute(data: ItemCategoryDTOMutationType): Promise<ItemCategoryType>
}

export interface IGetAllItemCategoriesUseCase {
   execute(): Promise<ItemCategoryType[]>
}