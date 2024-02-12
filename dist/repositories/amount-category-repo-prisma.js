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

// src/repositories/amount-category-repo-prisma.ts
var amount_category_repo_prisma_exports = {};
__export(amount_category_repo_prisma_exports, {
  AmountCategoryRepositoryPrisma: () => AmountCategoryRepositoryPrisma
});
module.exports = __toCommonJS(amount_category_repo_prisma_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AmountCategoryRepositoryPrisma
});
