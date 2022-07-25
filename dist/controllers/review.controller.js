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
exports.getReview = exports.updateReview = exports.deleteReview = exports.createReview = exports.getReviews = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const review_model_1 = __importDefault(require("../models/review.model"));
/**
 * @route '/'
 * @method POST
 * @access public
 */
// @ts-ignore
exports.getReviews = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.createReview = (0, express_async_handler_1.default)(
// @ts-ignore
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    // @ts-ignore
    const userId = req.user._id;
    const { title, comment, rating } = req.body;
    const userHasCreatedReview = yield product_model_1.default.findOne({ productId, userId });
    if (userHasCreatedReview)
        return next(new Error("You have already reviewed the product"));
    const product = yield product_model_1.default.findById(productId);
    const reviewToCreate = {
        productId,
        userId,
        title,
        comment,
        rating,
        product,
    };
    yield review_model_1.default.create(reviewToCreate);
}));
exports.deleteReview = (0, express_async_handler_1.default)(
//@ts-ignore
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
//@ts-ignore
exports.updateReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
// @ts-ignore
exports.getReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
