import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

// interface ProtectRequest extends Request {
//   user: {};
// }

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // verify user token
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      return next(new Error(`Your are not authenticated`));
    }

    try {
      // @ts-ignore
      const jwtSecret: string = process.env.JWT_SECRET;

      const verifiedToken = await jwt.verify(token, jwtSecret);

      // @ts-ignore
      const user = await User.findById(verifiedToken?.id);

      if (!user) return next(new Error("You are not recognized by the system"));

      //@ts-ignore
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      return next(new Error("You are not authorized"));
    }

    next();
  }
);

export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user;

    if (!user) {
      res.status(401);
      return next(new Error("Not authorized"));
    }

    if (!roles.includes(user.role)) {
      res.status(401);
      return next(new Error("You are not allowed to perform this action"));
    }
  };
};
