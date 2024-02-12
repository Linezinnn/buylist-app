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

// src/utils/regex/index.ts
var regex_exports = {};
__export(regex_exports, {
  HEXCodeRegex: () => HEXCodeRegex,
  RGBCodeRegex: () => RGBCodeRegex,
  StringNotContainsANumberRegex: () => StringNotContainsANumberRegex
});
module.exports = __toCommonJS(regex_exports);
var RGBCodeRegex = /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
var HEXCodeRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
var StringNotContainsANumberRegex = /^[^\d]*$/;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HEXCodeRegex,
  RGBCodeRegex,
  StringNotContainsANumberRegex
});
