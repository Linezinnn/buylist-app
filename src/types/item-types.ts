import { 
   ItemDTOCheckSchemaType,
   ItemDTOGetSchemaType, 
   ItemDTOMutationSchemaType, 
   ItemResponseSchemaType,
} from "../utils/validations/schemas/item-schema"

export type ItemDTOGetType = ItemDTOGetSchemaType
export type ItemDTOMutationType = ItemDTOMutationSchemaType
export type ItemDTOCheckType = ItemDTOCheckSchemaType

export type ItemType = ItemResponseSchemaType
