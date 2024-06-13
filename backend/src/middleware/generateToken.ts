import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import type { Types } from "mongoose";

const generateToken = (_req: Request, res: Response, next: NextFunction) => {
  const { _id }: { _id: Types.ObjectId } = res.locals.newUser;

  const token = jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  next();
};

export default generateToken;
