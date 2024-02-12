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

// src/routes/amount-category-routes.ts
var amount_category_routes_exports = {};
__export(amount_category_routes_exports, {
  AmountCategoryRoutes: () => AmountCategoryRoutes
});
module.exports = __toCommonJS(amount_category_routes_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AmountCategoryRoutes
});
