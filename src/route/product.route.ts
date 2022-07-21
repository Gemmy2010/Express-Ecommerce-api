import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

import { protect } from "../middleware/auth.middleware";

const router: Router = express.Router();

// router.post("/", createProduct);

// router.get("/", getProducts);

router.route("/").post(protect, createProduct).get(getProducts);

router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);

// router.get("/:id", getProduct);

// router.delete("/:id", deleteProduct);

// router.put("/:id", updateProduct);

export default router;
