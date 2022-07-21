"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    image: {
        type: String,
        required: [true, "product image is required "],
    },
    name: {
        type: String,
        required: [true, "Product is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: [true, "Count  in stock is required"],
    },
}, { timestamps: true });
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
