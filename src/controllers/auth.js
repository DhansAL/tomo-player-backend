"use strict";
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
exports.signin = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => {
    user_1.default.findOne({ username: req.body.username }).exec((error, user) => __awaiter(void 0, void 0, void 0, function* () {
        //if already registered
        if (user) {
            return res.status(400).json({
                message: "username already registered or taken",
            });
        }
        //create one if not
        const { username, password } = req.body;
        console.log(username, password);
        const hash_password = yield bcrypt_1.default.hash(password, 10);
        const _user = new user_1.default({
            username,
            hash_password,
        });
        _user.save((error, data) => {
            if (error) {
                console.log(error);
                return res
                    .status(400)
                    .json({ message: "something went wrong while saving user" });
            }
            if (data) {
                return res.status(200).json({
                    message: "user signed up successfully",
                });
            }
        });
    }));
};
exports.signup = signup;
const signin = (req, res) => {
    user_1.default.findOne({
        username: req.body.username,
    }).exec((error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(400).json({ error });
        }
        //FIXME: this should throw error on wrong creds.
        if (!user) {
            return res
                .status(400)
                .json({ msg: "didnt find any user. please check your credentials" });
        }
        if (user) {
            //@ts-expect-error
            //FIXME: set typedeclaration for .authenticate
            const isPassword = yield user.authenticate(req.body.password);
            if (isPassword) {
                //assign token
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                const { _id, username } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        username,
                    },
                });
            }
            else {
                res.status(400).json({
                    message: "invalid  credentials",
                });
            }
        }
    }));
};
exports.signin = signin;
