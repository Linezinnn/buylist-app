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

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  Routes: () => Routes
});
module.exports = __toCommonJS(routes_exports);

// src/routes/amount-category-routes.ts
var AmountCategoryRoutes = class {
  constructor(serverInstance, controller) {
    this.serverInstance = serverInstance;
    this.controller = controller;
  }
  createAmountCategory(prefix) {
    this.serverInstance.post(prefix, (req, res) => {
      this.controller.create(req, res);
    });
  }
  getAllAmountCategories(prefix) {
    this.serverInstance.get(prefix, (_, res) => {
      this.controller.getAll(res);
    });
  }
  deleteAmountCategory(prefix) {
    this.serverInstance.delete(`${prefix}/:id`, (req, res) => {
      this.controller.delete(req, res);
    });
  }
};

// src/routes/item-category-routes.ts
var ItemCategoryRoutes = class {
  constructor(serverInstance, controller) {
    this.serverInstance = serverInstance;
    this.controller = controller;
  }
  createItemCategory(prefix) {
    this.serverInstance.post(prefix, (req, res) => {
      this.controller.create(req, res);
    });
  }
  getAllItemCategories(prefix) {
    this.serverInstance.get(prefix, (_, res) => {
      this.controller.getAll(res);
    });
  }
  deleteItemCategory(prefix) {
    this.serverInstance.delete(`${prefix}/:id`, (req, res) => {
      this.controller.delete(req, res);
    });
  }
  getItemCategoryById(prefix) {
    this.serverInstance.get(`${prefix}/:id`, (req, res) => {
      this.controller.getById(req, res);
    });
  }
};

// src/routes/item-routes.ts
var ItemRoutes = class {
  constructor(serverInstance, controller) {
    this.serverInstance = serverInstance;
    this.controller = controller;
  }
  createItem(prefix) {
    this.serverInstance.post(prefix, (req, res) => {
      this.controller.create(req, res);
    });
  }
  getItemById(prefix) {
    this.serverInstance.get(`${prefix}/:id`, (req, res) => {
      this.controller.getById(req, res);
    });
  }
  getAllItems(prefix) {
    this.serverInstance.get(prefix, (_, res) => {
      this.controller.getAll(res);
    });
  }
  deleteItem(prefix) {
    this.serverInstance.delete(`${prefix}/:id`, (req, res) => {
      this.controller.delete(req, res);
    });
  }
  checkItem(prefix) {
    this.serverInstance.patch(`${prefix}/:id`, (req, res) => {
      this.controller.checkItem(req, res);
    });
  }
};

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

// src/controllers/amount-category-controller.ts
var AmountCategoryController = class {
  constructor(createAmountCategoryUseCase, getAllAmountCategoriesUseCase, deleteAmountCategoryUseCase) {
    this.createAmountCategoryUseCase = createAmountCategoryUseCase;
    this.getAllAmountCategoriesUseCase = getAllAmountCategoriesUseCase;
    this.deleteAmountCategoryUseCase = deleteAmountCategoryUseCase;
  }
  create(request, response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const data = request.body;
          const result = yield this.createAmountCategoryUseCase.execute(data);
          response.status(statusCode.CREATED).header("location", `/amount-category/${result.id}`).send(result);
        })
      });
    });
  }
  getAll(response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const result = yield this.getAllAmountCategoriesUseCase.execute();
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
          yield this.deleteAmountCategoryUseCase.execute(id != null ? id : "");
          response.status(statusCode.NO_CONTENT).send();
        })
      });
    });
  }
};

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

// src/controllers/item-controller.ts
var ItemController = class {
  constructor(createItemUseCase, getItemByIdUseCase, getAllItemsUseCase, deleteItemUseCase, checkItemUseCase) {
    this.createItemUseCase = createItemUseCase;
    this.getItemByIdUseCase = getItemByIdUseCase;
    this.getAllItemsUseCase = getAllItemsUseCase;
    this.deleteItemUseCase = deleteItemUseCase;
    this.checkItemUseCase = checkItemUseCase;
  }
  create(request, response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const data = request.body;
          const result = yield this.createItemUseCase.execute(data);
          response.status(statusCode.CREATED).header("location", `/item/${result.id}`).send(result);
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
          const result = yield this.getItemByIdUseCase.execute(id != null ? id : "");
          response.status(statusCode.OK).send(result);
        })
      });
    });
  }
  getAll(response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const result = yield this.getAllItemsUseCase.execute();
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
          yield this.deleteItemUseCase.execute(id != null ? id : "");
          response.status(statusCode.NO_CONTENT).send();
        })
      });
    });
  }
  checkItem(request, response) {
    return __async(this, null, function* () {
      controllerHandlingFastify({
        response,
        callback: () => __async(this, null, function* () {
          const { id } = request.params;
          const data = request.body;
          const result = yield this.checkItemUseCase.execute(id != null ? id : "", data);
          response.status(statusCode.OK).send(result);
        })
      });
    });
  }
};

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

// src/usecases/amount-category/get-all-amount-categories-usecase.ts
var GetAllAmountCategoriesUsecase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute() {
    return __async(this, null, function* () {
      const allAmountCategories = yield this.repository.getAll();
      allAmountCategories.map((amountCategory) => {
        validateFunction({
          schema: AmountCategoryResponseSchema,
          data: amountCategory
        });
      });
      return allAmountCategories;
    });
  }
};

// src/usecases/amount-category/delete-amount-category-usecase.ts
var DeleteAmountCategoryUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(id) {
    return __async(this, null, function* () {
      const { id: idValidated } = validateFunction({
        schema: AmountCategoryDTOSchema,
        data: { id }
      });
      if (!idValidated)
        return;
      const amountCategory = yield this.repository.delete(idValidated);
      if (!amountCategory) {
        throw new UpError({
          statusCode: statusCode.NOT_FOUND,
          message: "Not found: The amount category with this id does not exists"
        });
      }
    });
  }
};

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

// src/usecases/item-category/get-all-item-categories-usecase.ts
var GetAllItemCategoriesUsecase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute() {
    return __async(this, null, function* () {
      const allItemCategories = yield this.repository.getAll();
      allItemCategories.map((itemCategory) => {
        validateFunction({
          schema: ItemCategoryResponseSchema,
          data: itemCategory
        });
      });
      return allItemCategories;
    });
  }
};

// src/usecases/item-category/delete-item-category-usecase.ts
var DeleteItemCategoryUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(id) {
    return __async(this, null, function* () {
      const { id: idValidated } = validateFunction({
        schema: ItemCategoryDTOGetSchema,
        data: { id }
      });
      if (!idValidated)
        return;
      const itemCategory = yield this.repository.delete(idValidated);
      if (!itemCategory) {
        throw new UpError({
          statusCode: statusCode.NOT_FOUND,
          message: "Not found: The item category with this id does not exists"
        });
      }
    });
  }
};

// src/usecases/item-category/get-item-category-by-id-usecase.ts
var GetItemCategoryByIdUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(id) {
    return __async(this, null, function* () {
      const { id: idValidated } = validateFunction({
        schema: ItemCategoryDTOGetSchema,
        data: { id }
      });
      const itemCategory = yield this.repository.getById(idValidated);
      if (!itemCategory) {
        throw new UpError({
          statusCode: statusCode.NOT_FOUND,
          message: "Not found: The item category with this id does not exists"
        });
      }
      const itemCategoryValidated = validateFunction({
        schema: ItemCategoryResponseSchema,
        data: itemCategory
      });
      return itemCategoryValidated;
    });
  }
};

// src/utils/validations/schemas/item-schema.ts
var import_zod4 = require("zod");
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

// src/usecases/item/create-item-usecase.ts
var CreateItemUseCase = class {
  constructor(repository, amountCategoryRepository, itemCategoryRepository) {
    this.repository = repository;
    this.amountCategoryRepository = amountCategoryRepository;
    this.itemCategoryRepository = itemCategoryRepository;
  }
  execute(data) {
    return __async(this, null, function* () {
      let validatedData = validateFunction({
        schema: ItemDTOMutationSchema,
        data
      });
      const checkIfNameAlreadyExists = yield this.repository.getByName(validatedData.name);
      if (checkIfNameAlreadyExists) {
        throw new UpError({
          statusCode: statusCode.BAD_REQUEST,
          message: "Bad Request: The name already exists"
        });
      }
      const checkIfAmountCategoryIdExists = yield this.amountCategoryRepository.getById(validatedData.amountCategoryId);
      if (!checkIfAmountCategoryIdExists) {
        throw new UpError({
          statusCode: statusCode.BAD_REQUEST,
          message: "Bad Request: The amount category id is not exists"
        });
      }
      const checkIfItemCategoryIdExists = yield this.itemCategoryRepository.getById(validatedData.itemCategoryId);
      if (!checkIfItemCategoryIdExists) {
        throw new UpError({
          statusCode: statusCode.BAD_REQUEST,
          message: "Bad Request: The item category id is not exists"
        });
      }
      const item = yield this.repository.create(validatedData);
      const itemValidated = validateFunction({
        schema: ItemResponseSchema,
        data: item
      });
      return itemValidated;
    });
  }
};

// src/usecases/item/get-item-by-id-usecase.ts
var GetItemByIdUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(id) {
    return __async(this, null, function* () {
      const { id: idValidated } = validateFunction({
        schema: ItemDTOGetSchema,
        data: { id }
      });
      const item = yield this.repository.getById(idValidated);
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

// src/usecases/item/get-all-items-usecase.ts
var GetAllItemsUsecase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute() {
    return __async(this, null, function* () {
      const allItems = yield this.repository.getAll();
      allItems.map((item) => {
        validateFunction({
          schema: ItemResponseSchema,
          data: item
        });
      });
      return allItems;
    });
  }
};

// src/usecases/item/delete-item-usecase.ts
var DeleteItemUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  execute(id) {
    return __async(this, null, function* () {
      const { id: idValidated } = validateFunction({
        schema: ItemDTOGetSchema,
        data: { id }
      });
      if (!idValidated)
        return;
      const item = yield this.repository.delete(idValidated);
      if (!item) {
        throw new UpError({
          statusCode: statusCode.NOT_FOUND,
          message: "Not found: The item with this id does not exists"
        });
      }
    });
  }
};

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

// src/repositories/amount-category-repo-prisma.ts
var import_library = require("@prisma/client/runtime/library");

// src/database/prisma-client.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var DatabaseClientPrisma = class {
  constructor(provider) {
    this.provider = provider;
    this.isConnected = false;
  }
  connect() {
    return __async(this, null, function* () {
      try {
        yield this.provider.$connect();
        console.log("Database connected");
        this.isConnected = true;
      } catch (error) {
        console.log("Database Connection Error: ", error);
        this.isConnected = false;
      }
    });
  }
};
var Database = new DatabaseClientPrisma(prismaClient);

// src/repositories/amount-category-repo-prisma.ts
var AmountCategoryRepositoryPrisma = class {
  create(name) {
    return __async(this, null, function* () {
      const result = yield prismaClient.amountCategory.create({
        data: { name }
      });
      return result;
    });
  }
  getByName(name) {
    return __async(this, null, function* () {
      const result = yield prismaClient.amountCategory.findFirst({
        where: { name }
      });
      return result;
    });
  }
  getAll() {
    return __async(this, null, function* () {
      const result = yield prismaClient.amountCategory.findMany();
      return result;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      try {
        yield prismaClient.amountCategory.delete({
          where: { id }
        });
        return true;
      } catch (err) {
        if (err instanceof import_library.PrismaClientKnownRequestError)
          return false;
        throw err;
      }
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const result = yield prismaClient.amountCategory.findFirst({
        where: { id }
      });
      return result;
    });
  }
};

// src/repositories/item-category-repo-prisma.ts
var import_library2 = require("@prisma/client/runtime/library");
var ItemCategoryRepositoryPrisma = class {
  create(name, color) {
    return __async(this, null, function* () {
      const result = yield prismaClient.itemCategory.create({
        data: { name, color }
      });
      return result;
    });
  }
  getByName(name) {
    return __async(this, null, function* () {
      const result = yield prismaClient.itemCategory.findFirst({
        where: { name }
      });
      return result;
    });
  }
  getAll() {
    return __async(this, null, function* () {
      const result = yield prismaClient.itemCategory.findMany();
      return result;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      try {
        yield prismaClient.itemCategory.delete({
          where: { id }
        });
        return true;
      } catch (err) {
        if (err instanceof import_library2.PrismaClientKnownRequestError)
          return false;
        throw err;
      }
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const result = yield prismaClient.itemCategory.findFirst({
        where: { id }
      });
      return result;
    });
  }
};

// src/repositories/item-repo-prisma.ts
var import_library3 = require("@prisma/client/runtime/library");
var ItemRepositoryPrisma = class {
  create(_0) {
    return __async(this, arguments, function* ({
      name,
      amount,
      amountCategoryId,
      itemCategoryId
    }) {
      const result = yield prismaClient.item.create({
        data: { name, amount, amountCategoryId, itemCategoryId },
        include: {
          amountCategory: true,
          ItemCategory: true
        }
      });
      return result;
    });
  }
  getByName(name) {
    return __async(this, null, function* () {
      const result = yield prismaClient.item.findFirst({
        where: { name },
        include: {
          amountCategory: true,
          ItemCategory: true
        }
      });
      return result;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const result = yield prismaClient.item.findUnique({
        where: { id },
        include: {
          amountCategory: true,
          ItemCategory: true
        }
      });
      return result;
    });
  }
  getAll() {
    return __async(this, null, function* () {
      const result = yield prismaClient.item.findMany({
        include: {
          amountCategory: true,
          ItemCategory: true
        }
      });
      return result;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      try {
        yield prismaClient.item.delete({
          where: { id }
        });
        return true;
      } catch (err) {
        if (err instanceof import_library3.PrismaClientKnownRequestError)
          return false;
        throw err;
      }
    });
  }
  checkItem(id, data) {
    return __async(this, null, function* () {
      try {
        const result = yield prismaClient.item.update({
          where: { id },
          data: {
            isChecked: data.checked
          },
          include: {
            amountCategory: true,
            ItemCategory: true
          }
        });
        return result;
      } catch (err) {
        if (err instanceof import_library3.PrismaClientKnownRequestError)
          return null;
        throw err;
      }
    });
  }
};

// src/routes/index.ts
function Routes(serverInstance) {
  return __async(this, null, function* () {
    const amountCategoryRoutes = new AmountCategoryRoutes(
      serverInstance,
      new AmountCategoryController(
        new CreateAmountCategoryUseCase(new AmountCategoryRepositoryPrisma()),
        new GetAllAmountCategoriesUsecase(new AmountCategoryRepositoryPrisma()),
        new DeleteAmountCategoryUseCase(new AmountCategoryRepositoryPrisma())
      )
    );
    const itemCategoryRoutes = new ItemCategoryRoutes(
      serverInstance,
      new ItemCategoryController(
        new CreateItemCategoryUseCase(new ItemCategoryRepositoryPrisma()),
        new GetAllItemCategoriesUsecase(new ItemCategoryRepositoryPrisma()),
        new DeleteItemCategoryUseCase(new ItemCategoryRepositoryPrisma()),
        new GetItemCategoryByIdUseCase(new ItemCategoryRepositoryPrisma())
      )
    );
    const itemRoutes = new ItemRoutes(
      serverInstance,
      new ItemController(
        new CreateItemUseCase(
          new ItemRepositoryPrisma(),
          new AmountCategoryRepositoryPrisma(),
          new ItemCategoryRepositoryPrisma()
        ),
        new GetItemByIdUseCase(new ItemRepositoryPrisma()),
        new GetAllItemsUsecase(new ItemRepositoryPrisma()),
        new DeleteItemUseCase(new ItemRepositoryPrisma()),
        new CheckItemUseCase(new ItemRepositoryPrisma())
      )
    );
    amountCategoryRoutes.createAmountCategory("/amount-category");
    amountCategoryRoutes.getAllAmountCategories("/all-amount-categories");
    amountCategoryRoutes.deleteAmountCategory("/amount-category");
    itemCategoryRoutes.createItemCategory("/item-category");
    itemCategoryRoutes.getAllItemCategories("/all-item-categories");
    itemCategoryRoutes.deleteItemCategory("/item-category");
    itemCategoryRoutes.getItemCategoryById("/item-category");
    itemRoutes.createItem("/item");
    itemRoutes.getItemById("/item");
    itemRoutes.getAllItems("/all-items");
    itemRoutes.deleteItem("/item");
    itemRoutes.checkItem("/check-item");
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Routes
});
