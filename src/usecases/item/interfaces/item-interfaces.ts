import { ItemDTOGetType, ItemDTOMutationType, ItemType } from "../../../types/item-types";

export interface ICreateItemUseCase {
   execute(data: ItemDTOMutationType): Promise<ItemType>
}

export interface IGetItemByIdUseCase {
   execute(id: string): Promise<ItemType>
}

export interface IGetAllItemsUseCase {
   execute(): Promise<ItemType[]>
}