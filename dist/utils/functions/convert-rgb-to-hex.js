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

// src/utils/functions/convert-rgb-to-hex.ts
var convert_rgb_to_hex_exports = {};
__export(convert_rgb_to_hex_exports, {
  convertRGBToHEXColor: () => convertRGBToHEXColor
});
module.exports = __toCommonJS(convert_rgb_to_hex_exports);
var convertRGBToHEXColor = (rgb) => {
  const [r, g, b] = rgb.replace("rgb(", "").replace(")", "").split(",");
  return "#" + [Number(r), Number(g), Number(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertRGBToHEXColor
});
