import { Request, Response, NextFunction } from "express";

export const globalError = function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: "fail",
    // @ts-ignore
    message: error.message,
    // @ts-ignore
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};
