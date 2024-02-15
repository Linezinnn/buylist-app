import { 
   AmountCategoryDTODeleteType, 
   AmountCategoryDTOPostType, 
   AmountCategoryResponseType 
} from "../../../types/amount-category-types";

export interface ICreateAmountCategoryUseCase {
   execute(data: AmountCategoryDTOPostType): Promise<AmountCategoryResponseType>
}

export interface IGetAllAmountCategoriesUsecase {
   execute(): Promise<AmountCategoryResponseType[]>
}

export interface IDeleteAmountCategoryUseCase {
   execute(data: AmountCategoryDTODeleteType): Promise<void>
}