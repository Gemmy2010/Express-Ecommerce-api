"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const review_controller_1 = require("../controllers/review.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router
    .route("/:id")
    .post(auth_middleware_1.protect, review_controller_1.createReview)
    .get(review_controller_1.getReviews)
    .put(auth_middleware_1.protect, product_controller_1.updateProduct)
    .delete(auth_middleware_1.protect, review_controller_1.deleteReview);
exports.default = router;
