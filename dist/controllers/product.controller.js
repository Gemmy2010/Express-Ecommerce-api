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
exports.modifyProduct = exports.getProduct = exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * @route '/'
 * @method POST
 * @access public
 */
// @ts-ignore
exports.getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({});
    return res.json({
        message: "success",
        products,
    });
}));
exports.createProduct = (0, express_async_handler_1.default)(
// @ts-ignore
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.default(req.body);
    yield product.save();
    return res.status(201).json({
        message: "success",
    });
}));
//@ts-ignore
exports.deleteProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findByIdAndDelete(req.params.id);
    if (!product) {
        res.status(404);
        return next(new Error(`Resource not found`));
    }
    return res.json({
        status: "success",
        message: "Resource was deleted",
    });
}));
//@ts-ignore
exports.updateProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findByIdAndUpdate(req.params.id);
    if (!product) {
        res.status(404);
        return next(new Error(`Resource not found`));
    }
    return res.json({
        status: "success",
        message: "Resource has been updated",
    });
}));
// @ts-ignore
exports.getProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(req.params.id);
    if (!product) {
        res.status(404);
        return next(new Error(`Resource not found`));
    }
    res.json({
        product,
        message: "success",
    });
}));
const modifyProduct = (req, res) => {
    res.json({
        message: "modify product",
    });
};
exports.modifyProduct = modifyProduct;
