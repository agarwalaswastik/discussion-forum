import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import generateToken from "../middleware/generateToken";
import User from "../models/userModel";

const login = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { emailOrUsername, password }: { emailOrUsername: string; password: string } = req.body;

      const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
      if (!user) return res.status(400).json({ error: "No such account found" });

      if (await bcrypt.compare(password, user.password)) {
        res.locals.newUser = user;
        return next();
      }

      res.status(400).json({ error: "Incorrect password" });
    } catch (error) {
      next(error);
    }
  },
  generateToken,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newUser);
  },
];

export default login;
