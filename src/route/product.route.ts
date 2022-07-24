import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

import { authorize, protect } from "../middleware/auth.middleware";

const router: Router = express.Router();

// router.post("/", createProduct);

// router.get("/", getProducts);

router
  .route("/")
  .post(protect, authorize(["admin"]), createProduct)
  .get(getProducts);

router
  .route("/:id")
  .get(getProduct)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct);

// router.get("/:id", getProduct);

// router.delete("/:id", deleteProduct);

// router.put("/:id", updateProduct);

export default router;
