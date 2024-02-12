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

// src/controllers/item-category-controller.ts
var item_category_controller_exports = {};
__export(item_category_controller_exports, {
  ItemCategoryController: () => ItemCategoryController
});
module.exports = __toCommonJS(item_category_controller_exports);

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

// src/controllers/controller-handlings/controller-handling-fastify.ts
function controllerHandlingFastify(_0) {
  return __async(this, arguments, function* ({ callback, response }) {
    try {
      yield callback();
    } catch (error) {
      if (error instanceof UpError) {
        response.status(error.statusCode || statusCode.BAD_REQUEST).send(error);
        return;
      }
      response.status(statusCode.INTERNAL_ERROR).send(`Unxpected error: the error shoulds be instance of UpError. Received error data: ${error}`);
    }
  });
}

// src/controllers/item-category-controller.ts
var ItemCategoryController = class {
  constructor(createItemCategoryUseCase, getAllItemCategoriesUseCase, deleteItemCategoryUseCase, getItemCategoryByIdUseCase) {
    this.createItemCategoryUseCase = createItemCategoryUseCase;
    this.getAllItemCategoriesUseCase = getAllItemCategoriesUseCase;
    this.deleteItemCategoryUseCase = deleteItemCategoryUseCase;
    this.getItemCategoryByIdUseCase = getItemCategoryByIdUseCase;
  }
  create(request, response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const data = request.body;
          const result = yield this.createItemCategoryUseCase.execute(data);
          response.status(statusCode.CREATED).header("location", `/item-category/${result.id}`).send(result);
        })
      });
    });
  }
  getAll(response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const result = yield this.getAllItemCategoriesUseCase.execute();
          response.status(statusCode.OK).send(result);
        })
      });
    });
  }
  delete(request, response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const { id } = request.params;
          yield this.deleteItemCategoryUseCase.execute(id != null ? id : "");
          response.status(statusCode.NO_CONTENT).send();
        })
      });
    });
  }
  getById(request, response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const { id } = request.params;
          const result = yield this.getItemCategoryByIdUseCase.execute(id != null ? id : "");
          response.status(statusCode.OK).send(result);
        })
      });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemCategoryController
});
