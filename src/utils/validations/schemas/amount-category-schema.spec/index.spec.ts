import { describe } from "vitest";

import { TESTAmountCategoryDTOSchema } from "./amount-category-dto-schema.spec";
import { TESTAmountCategoryResponseSchema } from "./amount-category-response-schema.spec";

describe('amount category schemas', () => {
   TESTAmountCategoryDTOSchema()
   TESTAmountCategoryResponseSchema()
})