"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSignin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            //FIXME: this should be a custom property in req class
            // work with extending the req class (https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request)
            // pushing in body for now
            req.body.tokenId = user;
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "invalid token sent",
            });
        }
    }
    else {
        return res.status(400).json({
            message: "authorization requiered",
        });
    }
    next();
};
exports.requireSignin = requireSignin;
