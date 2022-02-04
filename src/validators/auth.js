"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestValidated = exports.validateSigninRequests = exports.validateSignupRequests = void 0;
const express_validator_1 = require("express-validator");
exports.validateSignupRequests = [
    //taking username and password only currently
    (0, express_validator_1.check)("username").notEmpty().withMessage("username is requiered"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 6 })
        .withMessage("password must be atleast 6 character long"),
];
exports.validateSigninRequests = [
    (0, express_validator_1.check)("username").notEmpty().withMessage("valid email is requiered"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 6 })
        .withMessage("password must be atleast 6 character long"),
];
const isRequestValidated = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.array().length > 0) {
        res.status(400).json({ error: errors.array()[0].msg });
        return;
    }
    next();
};
exports.isRequestValidated = isRequestValidated;
