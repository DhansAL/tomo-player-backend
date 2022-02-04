"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRouter = void 0;
const express = __importStar(require("express"));
const common_middleware_1 = require("../common-middleware");
const collections_1 = require("../controllers/collections");
exports.collectionRouter = express.Router();
exports.collectionRouter.post("/collections/addcollection", common_middleware_1.requireSignin, collections_1.addCollection);
exports.collectionRouter.get("/collections/getcollection", 
//TODO: validate req.body
common_middleware_1.requireSignin, collections_1.getCollections);
exports.collectionRouter.post("/collections/deletecollection", common_middleware_1.requireSignin, collections_1.deleteCollection);
