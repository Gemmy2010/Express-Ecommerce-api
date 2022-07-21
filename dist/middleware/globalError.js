"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const globalError = function errorHandler(error, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: "fail",
        // @ts-ignore
        message: error.message,
        // @ts-ignore
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
};
exports.globalError = globalError;
