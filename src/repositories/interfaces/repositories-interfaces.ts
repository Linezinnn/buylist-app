import { AmountCategoryType } from "../../types/amount-category-types";
import { ItemCategoryType } from "../../types/item-category-types";

export interface IAmountCategoryRepository {
   create: (name: string) => Promise<AmountCategoryType>
   getByName: (name: string) => Promise<AmountCategoryType | null>
   getAll: () => Promise<AmountCategoryType[]>
   delete: (id: string) => Promise<boolean>
}

export interface IItemCategoryRepository {
   create: (name: string, color: string) => Promise<ItemCategoryType>
   getByName: (name: string) => Promise<ItemCategoryType | null>
   getAll: () => Promise<ItemCategoryType[]>
   delete: (id: string) => Promise<boolean>
}