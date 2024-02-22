import { 
   ItemCategoryDTODeleteType, 
   ItemCategoryDTOGetType, 
   ItemCategoryDTOPostType, 
   ItemCategoryResponseType 
} from "../../../types/item-category-types"

export interface ICreateItemCategoryUseCase {
   execute(data: ItemCategoryDTOPostType): Promise<ItemCategoryResponseType>
}

export interface IGetAllItemCategoriesUseCase {
   execute(): Promise<ItemCategoryResponseType[]>
}

export interface IDeleteItemCategoryUseCase {
   execute(data: ItemCategoryDTODeleteType): Promise<void>
}

export interface IGetItemCategoryByIdUseCase {
   execute(data: ItemCategoryDTOGetType): Promise<ItemCategoryResponseType>
}