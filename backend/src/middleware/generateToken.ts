import type { MyRequestHandler } from "server";

import jwt from "jsonwebtoken";

/*
 * this middleware should create a jwt token for the verified user and set
 * a cookie to store the token
 * any errors are server-side problems and should be thrown to the next middleware
 */
type RequestHandler = MyRequestHandler<object, object, object, object>;
const generateToken: RequestHandler = (_req, res, next) => {
  if (!res.locals.verifiedUser) throw new Error("Token couldn't be generated as no verified user was found");
  if (!process.env.JWT_SECRET) throw new Error("Token couldn't be generated as no JWT Secret was found");

  const { _id } = res.locals.verifiedUser;

  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
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
