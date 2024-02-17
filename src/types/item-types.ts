import { 
  ItemDTOCheckSchemaType,
  ItemDTOGetSchemaType,
  ItemDTOPostSchemaType, 
  ItemResponseSchemaType,
} from "@/packages/@buylist-api/schemas/item-schema";

export type ItemPostType = ItemDTOPostSchemaType
export type ItemCheckType = ItemDTOCheckSchemaType
export type ItemGetType = ItemDTOGetSchemaType

export type ItemResponseType = ItemResponseSchemaType