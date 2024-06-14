import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/userModel";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
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