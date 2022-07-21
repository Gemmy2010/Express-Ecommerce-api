import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // verify user token

    let token = "";

    if (!token) {
     res.status(401);
      return next(new Error(`Your are not authenticated`));
    }

    next();
  }
);

export const authorize = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
