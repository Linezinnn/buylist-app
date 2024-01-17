import { AmountCategoryType } from "../../types/amount-category-types";

export interface AmountCategoryRepository {
   create(name: string): Promise<AmountCategoryType>
   getByName(name: string): Promise<AmountCategoryType | null>
}