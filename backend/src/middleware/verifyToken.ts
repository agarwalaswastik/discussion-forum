import type { MyRequestHandler } from "server";

import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/userModel";

/*
 * this middleware should read the jwt token from the request cookies
 * if the token is valid, res.locals.verifiedUser should be set to the correct user
 * if the token is invalid, unauthorized response should be sent to the client
 * any other errors are server-side problems and should be thrown to the next middleware
 */
type RequestHandler = MyRequestHandler<object, object, object, object>;
const verifyToken: RequestHandler = async (_req, res, next) => {
  try {
    // readToken must have already read the cookie and put it in locals.jwtCookie
    const token = res.locals.jwtCookie;
    if (!token) return res.status(401).json({ error: "No token provided" });

    if (!process.env.JWT_SECRET) throw new Error("Token couldn't be verified as no JWT Secret was found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ error: "Invalid token provided" });

    // exclude password from queried user as it's no longer needed beyond this middleware
    const user = await User.findById((decoded as JwtPayload)._id).select("-password");
    const userPassword = await User.findById((decoded as JwtPayload)._id).select("password");
    if (!user || !userPassword) return res.status(404).json({ error: "No such user" });

    res.locals.verifiedUser = user;
    res.locals.verifiedUserPassword = userPassword;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
