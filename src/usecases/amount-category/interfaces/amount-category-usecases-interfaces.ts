import { AmountCategoryDTOType, AmountCategoryType } from "../../../types/amount-category-types";

export interface ICreateAmountCategoryUseCase {
   execute(data: AmountCategoryDTOType): Promise<AmountCategoryType>
}

export interface IGetAllAmountCategoriesUsecase {
   execute(): Promise<AmountCategoryType[]>
}

export interface IDeleteAmountCategoryUseCase {
   execute(id: string): Promise<void>
}