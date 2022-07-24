"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// router.post("/", createProduct);
// router.get("/", getProducts);
router
    .route("/")
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(["admin"]), product_controller_1.createProduct)
    .get(product_controller_1.getProducts);
router
    .route("/:id")
    .get(product_controller_1.getProduct)
    .delete(auth_middleware_1.protect, product_controller_1.deleteProduct)
    .put(auth_middleware_1.protect, product_controller_1.updateProduct);
// router.get("/:id", getProduct);
// router.delete("/:id", deleteProduct);
// router.put("/:id", updateProduct);
exports.default = router;
