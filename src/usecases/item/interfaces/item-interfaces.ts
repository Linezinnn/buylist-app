import { ItemDTOCheckType, ItemDTOMutationType, ItemType } from "../../../types/item-types";

export interface ICreateItemUseCase {
   execute(data: ItemDTOMutationType): Promise<ItemType>
}

export interface IGetItemByIdUseCase {
   execute(id: string): Promise<ItemType>
}

export interface IGetAllItemsUseCase {
   execute(): Promise<ItemType[]>
}

export interface IDeleteItemUseCase {
   execute(id: string): Promise<void>
}

export interface ICheckItemUseCase {
   execute(id: string, data: ItemDTOCheckType): Promise<ItemType>
}