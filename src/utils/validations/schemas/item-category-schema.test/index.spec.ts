import { describe } from "vitest"

import { TESTItemCategoryDTOGetSchema } from "./item-category-dto-get-schema"
import { TESTItemCategoryDTOMutationSchema } from "./item-category-dto-mutation-schema"
import { TESTItemCategoryResponseSchema } from "./item-category-response.schema"

describe('item categories schemas', () => {
   TESTItemCategoryDTOGetSchema()
   TESTItemCategoryDTOMutationSchema()
   TESTItemCategoryResponseSchema()
})