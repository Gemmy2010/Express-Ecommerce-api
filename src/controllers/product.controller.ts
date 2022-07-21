import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import asyncHandler from "express-async-handler";

/**
 * @route '/'
 * @method POST
 * @access public
 */

// @ts-ignore
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  return res.json({
    message: "success",
    products,
  });
});

export const createProduct = asyncHandler(
  // @ts-ignore
  async (req: Request, res: Response) => {
    const product = new Product(req.body);

    await product.save();

    return res.status(201).json({
      message: "success",
    });
  }
);
//@ts-ignore
export const deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404);
      return next(new Error(`Resource not found`));
    }

    return res.json({
      status: "success",
      message: "Resource was deleted",
    });
  }
);
//@ts-ignore
export const updateProduct = asyncHandler (async (req: Request, res: Response, next:NextFunction) => {
  const product = await Product.findByIdAndUpdate(req.params.id);

  if(!product){
     res.status(404)
     return next(new Error(`Resource not found`));
  }
  

  return res.json({
    status: "success",
    message: "Resource has been updated",
  });
}
);
// @ts-ignore
export const getProduct = asyncHandler(
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

export const modifyProduct = (req: Request, res: Response) => {
  res.json({
    message: "modify product",
  });
};
