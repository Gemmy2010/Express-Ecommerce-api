import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    res.status(400);
    return next(new Error(`Password do not match`));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return next(new Error(`Email already exists`));
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "user",
  });

  res.status(201).json({
    status: "success",
    message: "Your account was successfully created now you can login",
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;



  let user = await User.findOne({
    email,
  });

  if (!user || !(await user.comparePassword(password))) {
    res.status(400);
    return next(new Error(`You have provided wrong credentials`));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({
    status: "success",
    user: {
      name: user.name,
      token: token,
    },
  });
};

export const logout = (req: Request, res: Response) => {
  res.json({
    message: "logout user",
  });
};
