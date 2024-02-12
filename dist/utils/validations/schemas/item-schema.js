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

// src/utils/validations/schemas/item-schema.ts
var item_schema_exports = {};
__export(item_schema_exports, {
  ItemDTOCheckSchema: () => ItemDTOCheckSchema,
  ItemDTOGetSchema: () => ItemDTOGetSchema,
  ItemDTOMutationSchema: () => ItemDTOMutationSchema,
  ItemResponseSchema: () => ItemResponseSchema
});
module.exports = __toCommonJS(item_schema_exports);
var import_zod3 = require("zod");

// src/utils/validations/schemas/amount-category-schema.ts
var import_zod = require("zod");

// src/utils/regex/index.ts
var RGBCodeRegex = /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
var HEXCodeRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
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

// src/utils/validations/schemas/item-category-schema.ts
var import_zod2 = require("zod");
var ItemCategoryDTOMutationSchema = import_zod2.z.object({
  name: (0, import_zod2.string)().max(30, "The maximium name length is 30").min(3, "The minimum name length is 3"),
  color: (0, import_zod2.string)().refine((color) => {
    return RGBCodeRegex.test(color) || HEXCodeRegex.test(color);
  }, "The color must be a valid HEX or RGB code")
});
var ItemCategoryDTOGetSchema = import_zod2.z.object({
  id: (0, import_zod2.string)().uuid("This uuid is invalid")
});
var ItemCategoryResponseSchema = import_zod2.z.object({
  name: (0, import_zod2.string)().min(3, "The minimum name length is 3").max(30, "The maximum name length is 30"),
  color: (0, import_zod2.string)().regex(HEXCodeRegex, "The color must be a HEX code"),
  id: (0, import_zod2.string)().uuid("This uuid is invalid"),
  createdAt: (0, import_zod2.date)()
});

// src/utils/validations/schemas/item-schema.ts
var ItemDTOMutationSchema = import_zod3.z.object({
  name: (0, import_zod3.string)().max(30, "The maximium name length is 30").min(3, "The minimum name length is 3").transform((name) => {
    return name.toUpperCase();
  }),
  amountCategoryId: (0, import_zod3.string)().uuid("This uuid is invalid"),
  itemCategoryId: (0, import_zod3.string)().uuid("This uuid is invalid"),
  amount: (0, import_zod3.number)().max(1e5, "The maximium amount is 100.000").min(1, "The minimum amount is 1")
});
var ItemDTOGetSchema = import_zod3.z.object({
  id: (0, import_zod3.string)().uuid("This uuid is invalid")
});
var ItemResponseSchema = import_zod3.z.object({
  name: (0, import_zod3.string)().max(30, "The maximium name length is 30").min(3, "The minimum name length is 3").transform((name) => {
    return name.toUpperCase();
  }),
  amount: (0, import_zod3.number)().max(1e5, "The maximium amount is 100.000").min(1, "The minimum amount is 1"),
  isChecked: (0, import_zod3.boolean)(),
  amountCategoryId: (0, import_zod3.string)().uuid("This uuid is invalid"),
  itemCategoryId: (0, import_zod3.string)().uuid("This uuid is invalid"),
  id: (0, import_zod3.string)().uuid("This uuid is invalid"),
  createdAt: (0, import_zod3.date)(),
  updatedAt: (0, import_zod3.date)(),
  amountCategory: AmountCategoryResponseSchema,
  ItemCategory: ItemCategoryResponseSchema
});
var ItemDTOCheckSchema = import_zod3.z.object({
  checked: import_zod3.z.boolean()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemDTOCheckSchema,
  ItemDTOGetSchema,
  ItemDTOMutationSchema,
  ItemResponseSchema
});
