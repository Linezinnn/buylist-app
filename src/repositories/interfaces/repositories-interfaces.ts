import { AmountCategoryType } from "../../types/amount-category-types";

export interface IAmountCategoryRepository {
   create(name: string): Promise<AmountCategoryType>
   getByName(name: string): Promise<AmountCategoryType | null>
   getAll(): Promise<AmountCategoryType[]>
}