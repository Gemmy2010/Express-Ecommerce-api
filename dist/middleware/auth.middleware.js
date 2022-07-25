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
exports.authorize = exports.protect = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
// interface ProtectRequest extends Request {
//   user: {};
// }
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // verify user token
    let token = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        res.status(401);
        return next(new Error(`Your are not authenticated`));
    }
    try {
        // @ts-ignore
        const jwtSecret = process.env.JWT_SECRET;
        const verifiedToken = yield jsonwebtoken_1.default.verify(token, jwtSecret);
        // @ts-ignore
        const user = yield user_model_1.default.findById(verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.id);
        if (!user)
            return next(new Error("You are not recognized by the system"));
        //@ts-ignore
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401);
        return next(new Error("You are not authorized or your token has expired"));
    }
    next();
}));
const authorize = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const user = req.user;
        if (!user) {
            res.status(401);
            return next(new Error("Not authorized"));
        }
        if (!roles.includes(user.role)) {
            res.status(401);
            return next(new Error("You are not allowed to perform this action"));
        }
    });
};
exports.authorize = authorize;
