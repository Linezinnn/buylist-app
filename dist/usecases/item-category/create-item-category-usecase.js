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

// src/usecases/item-category/create-item-category-usecase.ts
var create_item_category_usecase_exports = {};
__export(create_item_category_usecase_exports, {
  CreateItemCategoryUseCase: () => CreateItemCategoryUseCase
});
module.exports = __toCommonJS(create_item_category_usecase_exports);

// src/constants/http-status-codes.ts
var statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

// src/utils/validations/schemas/item-category-schema.ts
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

// src/utils/validations/zod-validate-function.ts
var import_zod2 = require("zod");

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
    if (error instanceof import_zod2.ZodError) {
      throw new UpError({
        statusCode: 400,
        message: error.issues[0].message,
        error
      });
    }
    throw new Error("Unxpected zod validation error");
  }
}

// src/utils/functions/convert-rgb-to-hex.ts
var convertRGBToHEXColor = (rgb) => {
  const [r, g, b] = rgb.replace("rgb(", "").replace(")", "").split(",");
  return "#" + [Number(r), Number(g), Number(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
};

// src/usecases/item-category/create-item-category-usecase.ts
var CreateItemCategoryUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(data) {
    return __async(this, null, function* () {
      let validatedData = validateFunction({
        schema: ItemCategoryDTOMutationSchema,
        data
      });
      const checkIfNameAlreadyExists = yield this.repository.getByName(validatedData.name);
      if (checkIfNameAlreadyExists) {
        throw new UpError({
          statusCode: statusCode.BAD_REQUEST,
          message: "Bad Request: The name already exists"
        });
      }
      if (!HEXCodeRegex.test(validatedData.color)) {
        validatedData.color = convertRGBToHEXColor(validatedData.color);
      }
      const itemCategory = yield this.repository.create(
        validatedData.name,
        validatedData.color
      );
      const itemCategoryValidated = validateFunction({
        schema: ItemCategoryResponseSchema,
        data: itemCategory
      });
      return itemCategoryValidated;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateItemCategoryUseCase
});
