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
exports.logout = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        res.status(400);
        return next(new Error(`Password do not match`));
    }
    const userExists = yield user_model_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        return next(new Error(`Email already exists`));
    }
    const user = yield user_model_1.default.create({
        name,
        email,
        password,
        role: "user",
    });
    res.status(201).json({
        status: "success",
        message: "Your account was successfully created now you can login",
    });
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield user_model_1.default.findOne({
        email,
    });
    if (!user || !(yield user.comparePassword(password))) {
        res.status(400);
        return next(new Error(`You have provided wrong credentials`));
    }
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({
        status: "success",
        user: {
            name: user.name,
            token: token,
        },
    });
});
exports.login = login;
const logout = (req, res) => {
    res.json({
        message: "logout user",
    });
};
exports.logout = logout;
