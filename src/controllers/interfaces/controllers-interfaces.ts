import { AmountCategoryType } from "../../types/amount-category-types";

export interface IAmountCategoryController {
   create(data: AmountCategoryType): void
}