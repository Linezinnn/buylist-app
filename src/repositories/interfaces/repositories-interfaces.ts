import { AmountCategoryType } from "../../types/amount-category-types";
import { ItemCategoryType } from "../../types/item-category-types";
import { ItemDTOMutationType, ItemType } from "../../types/item-types";

export interface IAmountCategoryRepository {
   create: (name: string) => Promise<AmountCategoryType>
   getByName: (name: string) => Promise<AmountCategoryType | null>
   getAll: () => Promise<AmountCategoryType[]>
   delete: (id: string) => Promise<boolean>
   getById: (id: string) => Promise<AmountCategoryType | null>
}

export interface IItemCategoryRepository {
   create: (name: string, color: string) => Promise<ItemCategoryType>
   getByName: (name: string) => Promise<ItemCategoryType | null>
   getAll: () => Promise<ItemCategoryType[]>
   delete: (id: string) => Promise<boolean>
   getById: (id: string) => Promise<ItemCategoryType | null>
}

export interface IItemRepository {
   create: (data: ItemDTOMutationType) => Promise<ItemType>
   getByName: (name: string) => Promise<ItemType | null>
   getById: (id: string) => Promise<ItemType | null>
}