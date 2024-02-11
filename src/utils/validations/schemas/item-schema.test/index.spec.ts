import { describe } from "vitest"

import { TESTItemDTOGetSchema } from "./item-dto-get-schema"
import { TESTItemDTOMutationSchema } from "./item-dto-mutation-schema"
import { TESTItemResponseSchema } from "./item-response.schema"

describe('item schemas', () => {
   TESTItemDTOGetSchema()
   TESTItemDTOMutationSchema()
   TESTItemResponseSchema()
})