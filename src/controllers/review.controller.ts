import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import asyncHandler from "express-async-handler";
import Review from "../models/review.model";

/**
 * @route '/'
 * @method POST
 * @access public
 */

// @ts-ignore
export const getReviews = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const createReview = asyncHandler(
  // @ts-ignore
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    // @ts-ignore
    const userId = req.user._id;

    const { title, comment, rating } = req.body;

    const userHasCreatedReview = await Product.findOne({ productId, userId });

    if (userHasCreatedReview)
      return next(new Error("You have already reviewed the product"));

    const product = await Product.findById(productId);

    const reviewToCreate = {
      productId,
      userId,
      title,
      comment,
      rating,
      product,
    };

    await Review.create(reviewToCreate);
  }
);

export const deleteReview = asyncHandler(
  //@ts-ignore
  async (req: Request, res: Response, next: NextFunction) => {}
);
//@ts-ignore
export const updateReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
// @ts-ignore
export const getReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      return next(new Error(`Resource not found`));
    }
    res.json({
      product,
      message: "success",
    });
  }
);
