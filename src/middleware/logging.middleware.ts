import { Request, Response, NextFunction } from "express";

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Logging middleware");

  next();
};

export const secondLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Second logger");

  next();
};
