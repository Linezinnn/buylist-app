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

// src/utils/validations/schemas/item-category-schema.ts
var item_category_schema_exports = {};
__export(item_category_schema_exports, {
  ItemCategoryDTOGetSchema: () => ItemCategoryDTOGetSchema,
  ItemCategoryDTOMutationSchema: () => ItemCategoryDTOMutationSchema,
  ItemCategoryResponseSchema: () => ItemCategoryResponseSchema
});
module.exports = __toCommonJS(item_category_schema_exports);
var import_zod = require("zod");

// src/utils/regex/index.ts
var RGBCodeRegex = /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
var HEXCodeRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

// src/utils/validations/schemas/item-category-schema.ts
var ItemCategoryDTOMutationSchema = import_zod.z.object({
  name: (0, import_zod.string)().max(30, "The maximium name length is 30").min(3, "The minimum name length is 3"),
  color: (0, import_zod.string)().refine((color) => {
    return RGBCodeRegex.test(color) || HEXCodeRegex.test(color);
  }, "The color must be a valid HEX or RGB code")
});
var ItemCategoryDTOGetSchema = import_zod.z.object({
  id: (0, import_zod.string)().uuid("This uuid is invalid")
});
var ItemCategoryResponseSchema = import_zod.z.object({
  name: (0, import_zod.string)().min(3, "The minimum name length is 3").max(30, "The maximum name length is 30"),
  color: (0, import_zod.string)().regex(HEXCodeRegex, "The color must be a HEX code"),
  id: (0, import_zod.string)().uuid("This uuid is invalid"),
  createdAt: (0, import_zod.date)()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemCategoryDTOGetSchema,
  ItemCategoryDTOMutationSchema,
  ItemCategoryResponseSchema
});
