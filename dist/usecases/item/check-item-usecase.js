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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/usecases/item/check-item-usecase.ts
var check_item_usecase_exports = {};
__export(check_item_usecase_exports, {
  CheckItemUseCase: () => CheckItemUseCase
});
module.exports = __toCommonJS(check_item_usecase_exports);

// src/constants/http-status-codes.ts
var statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

// src/utils/validations/zod-validate-function.ts
var import_zod = require("zod");

// src/errors/up-error.ts
var UpError = class {
  constructor({
    message,
    error,
    statusCode: statusCode2
  }) {
    this.$statusCode = statusCode2;
    this.$error = error;
    this.$message = message;
  }
  get statusCode() {
    return this.$statusCode;
  }
  get error() {
    return this.$error;
  }
  get message() {
    return this.$message;
  }
};

// src/utils/validations/zod-validate-function.ts
function validateFunction({ schema, data }) {
  try {
    const validatedData = schema.parse(data);
    return validatedData;
  } catch (error) {
    if (error instanceof import_zod.ZodError) {
      throw new UpError({
        statusCode: 400,
        message: error.issues[0].message,
        error
      });
    }
    throw new Error("Unxpected zod validation error");
  }
}

// src/utils/validations/schemas/item-schema.ts
var import_zod4 = require("zod");

// src/utils/validations/schemas/amount-category-schema.ts
var import_zod2 = require("zod");

// src/utils/regex/index.ts
var RGBCodeRegex = /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
var HEXCodeRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
var StringNotContainsANumberRegex = /^[^\d]*$/;

// src/utils/validations/schemas/amount-category-schema.ts
var AmountCategoryDTOSchema = import_zod2.z.object({
  name: (0, import_zod2.string)().regex(StringNotContainsANumberRegex, "The name must not contain a number in the string").min(1, "The minimum name length is 1").max(6, "The maximum name length is 6").optional(),
  id: (0, import_zod2.string)().uuid().optional()
});
var AmountCategoryResponseSchema = import_zod2.z.object({
  name: (0, import_zod2.string)().regex(StringNotContainsANumberRegex, "The name must not contain a number in the string").min(1, "The minimum name length is 1").max(6, "The maximum name length is 6"),
  id: (0, import_zod2.string)().uuid(),
  createdAt: (0, import_zod2.date)()
});

// src/utils/validations/schemas/item-category-schema.ts
var import_zod3 = require("zod");
var ItemCategoryDTOMutationSchema = import_zod3.z.object({
  name: (0, import_zod3.string)().max(30, "The maximium name length is 30").min(3, "The minimum name length is 3"),
  color: (0, import_zod3.string)().refine((color) => {
    return RGBCodeRegex.test(color) || HEXCodeRegex.test(color);
  }, "The color must be a valid HEX or RGB code")
});
var ItemCategoryDTOGetSchema = import_zod3.z.object({
  id: (0, import_zod3.string)().uuid("This uuid is invalid")
});
var ItemCategoryResponseSchema = import_zod3.z.object({
  name: (0, import_zod3.string)().min(3, "The minimum name length is 3").max(30, "The maximum name length is 30"),
  color: (0, import_zod3.string)().regex(HEXCodeRegex, "The color must be a HEX code"),
  id: (0, import_zod3.string)().uuid("This uuid is invalid"),
  createdAt: (0, import_zod3.date)()
});

// src/utils/validations/schemas/item-schema.ts
var ItemDTOMutationSchema = import_zod4.z.object({
  name: (0, import_zod4.string)().max(30, "The maximium name length is 30").min(3, "The minimum name length is 3").transform((name) => {
    return name.toUpperCase();
  }),
  amountCategoryId: (0, import_zod4.string)().uuid("This uuid is invalid"),
  itemCategoryId: (0, import_zod4.string)().uuid("This uuid is invalid"),
  amount: (0, import_zod4.number)().max(1e5, "The maximium amount is 100.000").min(1, "The minimum amount is 1")
});
var ItemDTOGetSchema = import_zod4.z.object({
  id: (0, import_zod4.string)().uuid("This uuid is invalid")
});
var ItemResponseSchema = import_zod4.z.object({
  name: (0, import_zod4.string)().max(30, "The maximium name length is 30").min(3, "The minimum name length is 3").transform((name) => {
    return name.toUpperCase();
  }),
  amount: (0, import_zod4.number)().max(1e5, "The maximium amount is 100.000").min(1, "The minimum amount is 1"),
  isChecked: (0, import_zod4.boolean)(),
  amountCategoryId: (0, import_zod4.string)().uuid("This uuid is invalid"),
  itemCategoryId: (0, import_zod4.string)().uuid("This uuid is invalid"),
  id: (0, import_zod4.string)().uuid("This uuid is invalid"),
  createdAt: (0, import_zod4.date)(),
  updatedAt: (0, import_zod4.date)(),
  amountCategory: AmountCategoryResponseSchema,
  ItemCategory: ItemCategoryResponseSchema
});
var ItemDTOCheckSchema = import_zod4.z.object({
  checked: import_zod4.z.boolean()
});

// src/usecases/item/check-item-usecase.ts
var CheckItemUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(id, data) {
    return __async(this, null, function* () {
      const { id: idValidated } = validateFunction({
        schema: ItemDTOGetSchema,
        data: { id }
      });
      let checkedValited = validateFunction({
        schema: ItemDTOCheckSchema,
        data
      });
      const item = yield this.repository.checkItem(idValidated, checkedValited);
      if (!item) {
        throw new UpError({
          statusCode: statusCode.NOT_FOUND,
          message: "Not found: The item with this id does not exists"
        });
      }
      const itemValidated = validateFunction({
        schema: ItemResponseSchema,
        data: item
      });
      return itemValidated;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckItemUseCase
});
