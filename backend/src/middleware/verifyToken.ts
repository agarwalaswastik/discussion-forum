import type { MyRequestHandler } from "server";

import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/userModel";

type RequestHandler = MyRequestHandler<object, object, object, object>;
const verifyToken: RequestHandler = async (_req, res, next) => {
  try {
    const token = res.locals.jwtCookie;
    if (!token) return res.status(401).json({ error: "No token provided" });

    if (!process.env.JWT_SECRET) throw new Error("Token couldn't be verified as no JWT Secret was found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ error: "Invalid token provided" });

    const user = await User.findById((decoded as JwtPayload)._id).select("-password");
    if (!user) return res.status(404).json({ error: "No such user" });

    res.locals.verifiedUser = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
