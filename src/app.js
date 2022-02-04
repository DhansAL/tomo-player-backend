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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = require("mongoose");
const auth_1 = require("./routes/auth");
const collections_1 = require("./routes/collections");
const home_1 = require("./routes/home");
const app = (0, express_1.default)();
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
// Body parsing Middleware
app.use(express_1.default.json());
//cors
const allowedOrigins = [`http://localhost:${PORT}`];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
//routes
app.use("/api", auth_1.authRouter);
app.use("/api", collections_1.collectionRouter);
app.use("/api", home_1.homeRouter);
dbConnect();
//  Connect to MongoDB
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.qkirs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
            .then(() => {
            console.log("connection ok  ^_^");
        })
            .catch((err) => console.log("connection error - " + err));
        try {
            app.listen(PORT, () => {
                console.log(`LISTENING ON ${PORT}`);
            });
        }
        catch (error) {
            console.error(`Error occured: ${error.message}`);
        }
    });
}
