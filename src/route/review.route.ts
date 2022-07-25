import express, { Router } from "express";
import { updateProduct } from "../controllers/product.controller";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller";
import { protect } from "../middleware/auth.middleware";

const router: Router = express.Router();

router
  .route("/:id")
  .post(protect, createReview)
  .get(getReviews)
  .put(protect, updateProduct)
  .delete(protect, deleteReview);

export default router;
