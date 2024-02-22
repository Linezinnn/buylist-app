import { 
   AmountCategoryDTODeleteType, 
   AmountCategoryDTOGetType, 
   AmountCategoryDTOPostType, 
   AmountCategoryResponseType 
} from "../../types/amount-category-types";
import { 
   ItemCategoryDTODeleteType, 
   ItemCategoryDTOGetType, 
   ItemCategoryDTOPostType,
   ItemCategoryResponseType, 
} from "../../types/item-category-types";
import { 
   ItemDTOCheckType, 
   ItemDTODeleteType, 
   ItemDTOGetType, 
   ItemDTOPostType, 
   ItemResponseType, 
} from "../../types/item-types";
import { CheckItemUseCaseDataType } from "../../usecases/item/interfaces/item-interfaces";

export interface IAmountCategoryRepository {
   create: (data: AmountCategoryDTOPostType) => Promise<AmountCategoryResponseType>
   getByName: (name: string) => Promise<AmountCategoryResponseType | null>
   getAll: () => Promise<AmountCategoryResponseType[]>
   delete: (data: AmountCategoryDTODeleteType) => Promise<boolean>
   getById: (data: AmountCategoryDTOGetType) => Promise<AmountCategoryResponseType | null>
}

export interface IItemCategoryRepository {
   create: (data: ItemCategoryDTOPostType) => Promise<ItemCategoryResponseType>
   getByName: (name: string) => Promise<ItemCategoryResponseType | null>
   getAll: () => Promise<ItemCategoryResponseType[]>
   delete: (data: ItemCategoryDTODeleteType) => Promise<boolean>
   getById: (id: ItemCategoryDTOGetType) => Promise<ItemCategoryResponseType | null>
}

export interface IItemRepository {
   create: (data: ItemDTOPostType) => Promise<ItemResponseType>
   getByName: (name: string) => Promise<ItemResponseType | null>
   getById: (data: ItemDTOGetType) => Promise<ItemResponseType | null>
   getAll: () => Promise<ItemResponseType[]>
   delete: (data: ItemDTODeleteType) => Promise<boolean>
   checkItem: (data: CheckItemUseCaseDataType) => Promise<ItemResponseType | null>
}