"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const collectionSchema = new mongoose_1.default.Schema({
    //BARE BASIC COLLECTION SCHEMA
    // collection is reserved in mongodb
    username: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    collectionDetails: [
        {
            name: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Collection", collectionSchema);
