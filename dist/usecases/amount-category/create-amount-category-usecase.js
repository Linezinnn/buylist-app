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

// src/usecases/amount-category/create-amount-category-usecase.ts
var create_amount_category_usecase_exports = {};
__export(create_amount_category_usecase_exports, {
  CreateAmountCategoryUseCase: () => CreateAmountCategoryUseCase
});
module.exports = __toCommonJS(create_amount_category_usecase_exports);

// src/constants/http-status-codes.ts
var statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

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

// src/utils/validations/schemas/amount-category-schema.ts
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

// src/utils/validations/zod-validate-function.ts
var import_zod2 = require("zod");
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

// src/usecases/amount-category/create-amount-category-usecase.ts
var CreateAmountCategoryUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(data) {
    return __async(this, null, function* () {
      const validatedData = validateFunction({
        schema: AmountCategoryDTOSchema,
        data
      });
      if (!validatedData.name) {
        throw new UpError({
          statusCode: statusCode.BAD_REQUEST,
          message: "Bad Request: The payload need a name for creation"
        });
      }
      const checkIfNameAlreadyExists = yield this.repository.getByName(validatedData.name);
      if (checkIfNameAlreadyExists) {
        throw new UpError({
          statusCode: statusCode.BAD_REQUEST,
          message: "Bad Request: The name already exists"
        });
      }
      const amountCategory = yield this.repository.create(validatedData.name);
      const amountCategoryValidated = validateFunction({
        schema: AmountCategoryResponseSchema,
        data: amountCategory
      });
      return amountCategoryValidated;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateAmountCategoryUseCase
});
