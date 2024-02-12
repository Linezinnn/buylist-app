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

// src/routes/item-category-routes.ts
var item_category_routes_exports = {};
__export(item_category_routes_exports, {
  ItemCategoryRoutes: () => ItemCategoryRoutes
});
module.exports = __toCommonJS(item_category_routes_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemCategoryRoutes
});
