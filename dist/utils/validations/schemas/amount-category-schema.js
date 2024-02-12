"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/validations/schemas/amount-category-schema.ts
var amount_category_schema_exports = {};
__export(amount_category_schema_exports, {
  AmountCategoryDTOSchema: () => AmountCategoryDTOSchema,
  AmountCategoryResponseSchema: () => AmountCategoryResponseSchema
});
module.exports = __toCommonJS(amount_category_schema_exports);
var import_zod = require("zod");

// src/utils/regex/index.ts
var StringNotContainsANumberRegex = /^[^\d]*$/;

// src/utils/validations/schemas/amount-category-schema.ts
var AmountCategoryDTOSchema = import_zod.z.object({
  name: (0, import_zod.string)().regex(StringNotContainsANumberRegex, "The name must not contain a number in the string").min(1, "The minimum name length is 1").max(6, "The maximum name length is 6").optional(),
  id: (0, import_zod.string)().uuid().optional()
});
var AmountCategoryResponseSchema = import_zod.z.object({
  name: (0, import_zod.string)().regex(StringNotContainsANumberRegex, "The name must not contain a number in the string").min(1, "The minimum name length is 1").max(6, "The maximum name length is 6"),
  id: (0, import_zod.string)().uuid(),
  createdAt: (0, import_zod.date)()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AmountCategoryDTOSchema,
  AmountCategoryResponseSchema
});
