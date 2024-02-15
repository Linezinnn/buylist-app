import { 
   ItemDTOCheckType, 
   ItemDTODeleteType, 
   ItemDTOGetType, 
   ItemDTOPostType, 
   ItemResponseType 
} from "../../../types/item-types"

export interface ICreateItemUseCase {
   execute(data: ItemDTOPostType): Promise<ItemResponseType>
}

export interface IGetItemByIdUseCase {
   execute(data: ItemDTOGetType): Promise<ItemResponseType>
}

export interface IGetAllItemsUseCase {
   execute(): Promise<ItemResponseType[]>
}

export interface IDeleteItemUseCase {
   execute(data: ItemDTODeleteType): Promise<void>
}

export type CheckItemUseCaseDataType = ItemDTOGetType & ItemDTOCheckType

export interface ICheckItemUseCase {
   execute(data: CheckItemUseCaseDataType): Promise<ItemResponseType>
}